package me.wener.kori.logic.exp

import kotlin.js.JsName
import kotlin.jvm.JvmStatic

typealias Rewriter = (e: Expression, parent: Expression?) -> Pair<Expression, Boolean>

fun Rewriter.then(next: Rewriter): Rewriter {
  val pre = this;
  return fun(e: Expression, parent: Expression?): Pair<Expression, Boolean> {
    val (a, ac) = pre(e, parent)
    val (b, bc) = next(a, parent)
    return Pair(b, ac || bc)
  }
}

/**
 * Rewriter for boolean algebra
 *
 * * rewrite syntax - simplify
 * * rewrite semantics - modify operator
 * * transform by follow the [laws](https://en.wikipedia.org/wiki/Boolean_algebra#Laws)
 */
object Rewriters {
  @JsName("rewrite")
  @JvmStatic
  fun rewrite(expression: Expression, rewriter: Rewriter, parent: Expression? = null): Expression {
    var (e, changed) = rewriter(expression, parent)
    if (changed) {
      return rewrite(e, rewriter)
    }
    when (e) {
      is Condition -> {
        e.left = rewrite(e.left, rewriter, e)
        e.right = rewrite(e.right, rewriter, e)
      }
      is Negative -> e.expression = rewrite(e.expression, rewriter, e)
      is Parentheses -> e.expression = rewrite(e.expression, rewriter, e)
    }
    // post process - slower - but some rewrite only happen after the fore-rewriter
    val after = rewriter(e, parent)
    if (after.second) {
      return rewrite(e, rewriter)
    }
    return e
  }

  @JsName("chain")
  @JvmStatic
  fun chain(vararg rewriters: Rewriter): Rewriter {
    return fun(e: Expression, parent: Expression?): Pair<Expression, Boolean> {
      var exp = e
      var changed = false
      for (rewriter in rewriters) {
        val (a, b) = rewriter(exp, parent)
        exp = a
        changed = changed || b
      }
      return Pair(exp, changed)
    }
  }

  @JsName("groups")
  @JvmStatic
  fun groups(e: Expression, parent: Expression? = null): Pair<Expression, Boolean> {
    if (e is Condition) {
      val ops = ops(e, e.operator)
      ops.sortWith(Comparator(Rewriters::sort))
      val set = linkedSetOf<Expression>()
      set.addAll(ops)
      if (set.size != ops.size) {
        return Pair(join(e.operator, set), true)
      }
    }
    return Pair(e, false)
  }

  @JsName("simplify")
  @JvmStatic
  fun simplify(e: Expression, parent: Expression? = null): Pair<Expression, Boolean> {
    // a && a -> a
    // a || a -> a
    // a || (a && b) -> a

    if (e is Condition) {
      if (
        e.operator == ConditionOperator.AND ||
        e.operator == ConditionOperator.OR
      ) {
        if (e.left == e.right) {
          return Pair(e.left, true)
        }
      }

      // a || (a && b) -> a
      if (e.operator == ConditionOperator.OR) {
        if (e.right.let { it is Parentheses && it.expression.let { it is Condition && it.operator == ConditionOperator.AND } }) {
          val nest = (e.right as Parentheses).expression as Condition
          if (e.left == nest.left || e.left == nest.right) {
            return Pair(e.left, true)
          }
        }

        if (e.left.let { it is Parentheses && it.expression.let { it is Condition && it.operator == ConditionOperator.AND } }) {
          val nest = (e.left as Parentheses).expression as Condition
          if (e.right == nest.left || e.right == nest.right) {
            return Pair(e.left, true)
          }
        }
      }
    }

    return Pair(e, false)
  }

  /**
   * Remove unnecessary parentheses
   */
  @JsName("unnecessaryParentheses")
  @JvmStatic
  fun unnecessaryParentheses(e: Expression, parent: Expression? = null): Pair<Expression, Boolean> {
    var changed = false
    if (e is Parentheses) {
      // ((a+b)) -> (a+b)
      var nest = e.expression
      while (nest is Parentheses) {
        changed = true
        nest = nest.expression
      }

      // (a) -> a
      // (!a) -> a
      // higher priority
      if (nest is Variable || nest is Negative) {
        return Pair(nest, true)
      }

      // top level
      if (parent == null) {
        return Pair(nest, true)
      }

      // (a+b)+c -> a+b+c
      if (
        nest is Condition && nest.operator == ConditionOperator.OR &&
        parent is Condition && parent.operator == ConditionOperator.OR
      ) {
        return Pair(nest, true)
      }

      // (ab)c -> abc
      if (
        nest is Condition && nest.operator == ConditionOperator.AND &&
        parent is Condition && parent.operator == ConditionOperator.AND
      ) {
        return Pair(nest, true)
      }


      e.expression = nest
    }
    return Pair(e, changed)
  }

  /**
   * Apply double negation law
   */
  @JsName("doubleNegation")
  @JvmStatic
  fun doubleNegation(e: Expression, parent: Expression? = null): Pair<Expression, Boolean> {
    if (e is Negative) {
      var nest = e.expression
      // !!a -> a
      // !(!a) -> a
      while (nest is Parentheses) {
        nest = nest.expression
      }
      if (nest is Negative) {
        return Pair(nest.expression, true)
      }
    }
    return Pair(e, false)
  }

  /**
   * XOR to Sum Of Product
   *
   * `a ^ b` -> `(a && !b) || (!a && b)`
   */
  @JsName("xor2sop")
  @JvmStatic
  fun xor2sop(e: Expression, parent: Expression? = null): Pair<Expression, Boolean> {
    if (e is Condition && e.operator == ConditionOperator.XOR) {
      val a = e.left
      val b = e.right
      e.operator = ConditionOperator.OR
      e.left = a.and(b.not()).parentheses()
      e.right = a.not().and(b).parentheses()
      return Pair(e, true)
    }
    return Pair(e, false)
  }

  /**
   * Convert expression to Sum Of Product
   *
   * * `(a || b) && c` -> `a&&c || a&&c`
   */
  @JsName("sop")
  @JvmStatic
  fun sop(e: Expression, parent: Expression? = null): Pair<Expression, Boolean> {
    if (e is Condition && e.operator == ConditionOperator.AND) {
      var a = e.left
      if (a.let { it is Parentheses && it.expression.let { it is Condition && it.operator == ConditionOperator.OR } }) {
        val nest = (a as Parentheses).expression as Condition;

        e.operator = ConditionOperator.OR
        e.left = nest.left.and(e.right).parentheses()
        e.right = nest.right.and(e.right).parentheses()
        return Pair(e, true)
      }

      a = e.right
      if (a.let { it is Parentheses && it.expression.let { it is Condition && it.operator == ConditionOperator.OR } }) {
        val nest = (a as Parentheses).expression as Condition;

        e.operator = ConditionOperator.OR
        e.right = nest.right.and(e.left).parentheses()
        e.left = nest.left.and(e.left).parentheses()
        return Pair(e, true)
      }
    }
    return Pair(e, false)
  }


  /**
   * Extract same ops as a group
   */
  fun ops(
    e: Expression,
    op: ConditionOperator,
    g: MutableList<Expression> = mutableListOf()
  ): MutableList<Expression> {
    if (e is Condition && e.operator == op) {
      ops(e.left, op, g)
      ops(e.right, op, g)
    } else {
      g.add(e)
    }
    return g
  }

  fun sort(a: Expression, b: Expression): Int = when {
    a is Variable && b is Variable -> a.name.compareTo(b.name)
    a is Variable -> -1
    b is Variable -> 1
    else -> a.hashCode().compareTo(b.hashCode())
  }

  fun join(op: ConditionOperator, all: Collection<Expression>): Expression {
    val itor = all.iterator()
    if (all.size > 1) {
      var e = itor.next().join(itor.next(), op)
      itor.forEach {
        e = e.join(it, op)
      }
      return e
    }
    return itor.next()
  }
}
