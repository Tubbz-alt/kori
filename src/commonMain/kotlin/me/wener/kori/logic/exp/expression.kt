package me.wener.kori.logic.exp

import me.wener.kori.util.addHasCode
import kotlin.js.JsName
import kotlin.jvm.JvmStatic

const val AlgebraAnd = '∧'
const val AlgebraOr = '∨'
const val AlgebraNot = '¬'

const val NULL: Char = 0.toChar()

object LogicExpressions {
  /**
   * Parse to syntax tree
   */
  @JsName("parse")
  @JvmStatic
  fun parse(exp: String): Expression {
    return LogicalExpressionParser(exp).parse();
  }

  /**
   * A simple expression evaluator
   */
  @JsName("eval")
  @JvmStatic
  fun eval(e: Expression, varEval: (name: String) -> Boolean): Boolean = when (e) {
    is Condition -> {
      when (e.operator) {
        ConditionOperator.AND -> eval(e.left, varEval) && eval(e.right, varEval)
        ConditionOperator.OR -> eval(e.left, varEval) || eval(e.right, varEval)
        ConditionOperator.XOR -> eval(e.left, varEval) xor eval(e.right, varEval)
      }
    }
    is Negative -> !eval(e.expression, varEval)
    is Parentheses -> eval(e.expression, varEval)
    is Variable -> varEval(e.name)
    else -> throw IllegalArgumentException("unexpected expression type ${e::class} $e")
  }

  @JsName("resolve")
  @JvmStatic
  fun resolve(e: Expression): Pair<List<String>, List<IntArray>> {
    val variables = variables(e)
    val results = mutableListOf<IntArray>()
    val n = variables.size

    for (cur in exhaustive(n)) {
      if (eval(e) {
          val idx = variables.indexOf(it)
          cur[idx] == 1
        }) {
        results.add(cur.copyOf())
      }
    }
    return Pair(variables, results);
  }

  fun exhaustive(n: Int): Sequence<IntArray> {
    val result = IntArray(n)
    val indexes = IntArray(n)
    return sequence {
      for (i in 0..n) {
        ones(result, indexes, 0, n - 1, 0, i)
      }
    }
  }

  /**
   * Visit all expression node
   */
  @JsName("loop")
  @JvmStatic
  fun loop(e: Expression, visitor: (e: Expression) -> Unit) {
    visitor(e)
    when (e) {
      is Condition -> {
        loop(e.left, visitor)
        loop(e.right, visitor)
      }
      is Negative -> loop(e.expression, visitor)
      is Parentheses -> loop(e.expression, visitor)
    }
  }

  /**
   * Extract variable names from expression
   */
  @JsName("variables")
  @JvmStatic
  fun variables(e: Expression): List<String> {
    val names = linkedSetOf<String>()
    loop(e) {
      if (it is Variable) {
        names.add(it.name)
      }
    }
    return names.toList()
  }

  @JsName("toExpressionString")
  @JvmStatic
  fun toExpressionString(e: Expression): String = when (e) {
    is Condition -> "${toExpressionString(e.left)} ${e.operator.toOperator()} ${toExpressionString(e.right)}"
    is Negative -> "!${toExpressionString(e.expression)}"
    is Parentheses -> "(${toExpressionString(e.expression)})"
    is Variable -> e.name
    else -> throw IllegalArgumentException("unexpected to string of $e")
  }

  @JsName("toAlgebraString")
  @JvmStatic
  fun toAlgebraString(e: Expression): String {
    return when (e) {
      is Condition -> "${e.left.toAlgebraString()} ${e.operator.toAlgebraOperator()} ${e.right.toAlgebraString()}"
      is Negative -> "$AlgebraNot${e.expression.toAlgebraString()}"
      is Parentheses -> "(${e.expression.toAlgebraString()})"
      is Variable -> e.name
      else -> throw IllegalArgumentException("unexpected to string of $e")
    }
  }

  fun printSyntaxTree(
    e: Expression,
    out: (s: String) -> Unit = { println(it) },
    indent: Int = 0
  ) {
    when (e) {
      is Condition -> {
        out("${"  ".repeat(indent)}Condition[operator=${e.operator}] -> ${e.toExpressionString()}")
        printSyntaxTree(e.left, out, indent + 1)
        printSyntaxTree(e.right, out, indent + 1)
      }
      is Negative -> {
        out("${"  ".repeat(indent)}Negative -> ${e.toExpressionString()}")
        printSyntaxTree(e.expression, out, indent + 1)
      }
      is Parentheses -> {
        out("${"  ".repeat(indent)}Parentheses -> ${e.toExpressionString()}")
        printSyntaxTree(e.expression, out, indent + 1)
      }
      is Variable -> out("${"  ".repeat(indent)}Variable[name=${e.name}]")
      else -> throw IllegalArgumentException("unexpected to string of $e")
    }
  }
}

fun Expression.toAlgebraString(): String = LogicExpressions.toAlgebraString(this)

interface Expression {

  fun parentheses(): Expression = Parentheses(this)

  fun not(): Expression = Negative(this)

  @JsName("and")
  fun and(right: Expression): Expression = join(right, ConditionOperator.AND)

  @JsName("or")
  fun or(right: Expression): Expression = join(right, ConditionOperator.OR)

  @JsName("join")
  fun join(right: Expression, op: ConditionOperator): Expression = Condition(op, this, right)

  fun toExpressionString(): String = LogicExpressions.toExpressionString(this)
}

data class Parentheses(var expression: Expression) : Expression
data class Condition(var operator: ConditionOperator, var left: Expression, var right: Expression) : Expression {
  override fun equals(other: Any?): Boolean {
    if (other !is Condition || operator != other.operator) {
      return false
    }

    // a || b  <-> b || a
    val a = left.hashCode()
    val b = right.hashCode()
    val oa = other.left.hashCode()
    val ob = other.right.hashCode()

    return if (a > b) {
      if (oa > ob) {
        left == other.left && right == other.right
      } else {
        left == other.right && right == other.left
      }
    } else {
      if (oa > ob) {
        left == other.right && right == other.left
      } else {
        left == other.left && right == other.right
      }
    }
  }

  override fun hashCode(): Int {
    // a || b  <-> b || a
    var r = 1
    r = r.addHasCode(operator)
    val a = left.hashCode()
    val b = right.hashCode()
    if (a > b) {
      r = r.addHasCode(a).addHasCode(b)
    } else {
      r = r.addHasCode(b).addHasCode(a)
    }
    return r
  }
}

data class Negative(var expression: Expression) : Expression
data class Variable(var name: String) : Expression

enum class ConditionOperator {
  AND, OR, XOR
}

fun ConditionOperator.toOperator() = when (this) {
  ConditionOperator.AND -> "&&"
  ConditionOperator.OR -> "||"
  ConditionOperator.XOR -> "^"
}

fun ConditionOperator.toAlgebraOperator() = when (this) {
  ConditionOperator.AND -> AlgebraAnd
  ConditionOperator.OR -> AlgebraOr
  else -> throw IllegalArgumentException("no algebra operator for $this")
}


suspend fun SequenceScope<IntArray>.ones(
  result: IntArray,
  indexes: IntArray,
  start: Int,
  end: Int,
  index: Int,
  n: Int
) {
  if (index == n) {
    // reset
    result.fill(0)
    // one
    for (i in 0 until n) {
      result[indexes[i]] = 1
    }
    yield(result)
  } else {
    var i = start
    while (i <= end && end - i + 1 >= n - index) {
      indexes[index] = i
      ones(result, indexes, i + 1, end, index + 1, n)
      i++
    }
  }
}

fun IntArray.fill(v: Int) {
  val n = this.size
  for (i in 0 until n) {
    this[i] = v
  }
}

fun IntArray.replace(f: Int, t: Int) {
  val n = this.size
  for (i in 0 until n) {
    if (this[i] == f) {
      this[i] = t
    }
  }
}


/**
 * A super simple boolean expression parser
 *
 * * support and/or/xor/not - C-like syntax or boolean algebra syntax
 * * support parentheses
 * * support `[a-zA-Z][a-zA-Z0-9]*` variable name
 * * subclass to add customized rules
 */
private class LogicalExpressionParser(val exp: String) {
  var idx = 0
  var c: Char = NULL
  var lastRead = false

  /**
   * Track current priority - (),!,&&,||
   *
   * * parentheses add a scope
   * * prefix is higher than logical operator
   */
  var priorities = mutableListOf(0)

  fun parse(): Expression {
    idx = 0
    val e = parseExpression()
    unexpected(NULL, read())
    return e
  }

  fun parseExpression(): Expression {
    read()
    return parseOr()
  }

  fun parseOr(): Expression {
    val left = parseAnd()
    return withPriority(0) {
      when (read()) {
        '|' -> {
          next('|')
          Condition(ConditionOperator.OR, left, parseExpression())
        }
        AlgebraOr -> Condition(ConditionOperator.OR, left, parseExpression())
        else -> {
          unread()
          null
        }
      }
    } ?: left
  }

  fun parseAnd(): Expression {
    val left = parseXor()

    return withPriority(1) {
      when (read()) {
        '&' -> {
          next('&')
          Condition(ConditionOperator.AND, left, parseExpression())
        }
        AlgebraAnd -> Condition(ConditionOperator.AND, left, parseExpression())
        else -> {
          unread()
          null
        }
      }
    } ?: left
  }

  fun parseXor(): Expression {
    val left = parseNegative()

    return withPriority(3) {
      when (read()) {
        '^' -> Condition(ConditionOperator.XOR, left, parseExpression())
        else -> {
          unread()
          null
        }
      }
    } ?: left
  }

  fun unread() {
    if (lastRead) {
      idx--
    }
  }

  fun <T> withPriority(v: Int, f: () -> T?): T? {
    if (v < priorities.last()) {
      return null
    }
    priorities.add(v)
    val t = f()
    priorities.removeAt(priorities.lastIndex)
    return t
  }

  protected fun parseNegative(): Expression {
    if (c == '!' || c == AlgebraNot) {
      return withPriority(4) {
        Negative(expression = parseExpression())
      }!!
    }
    return parseParentheses()
  }

  protected fun parseParentheses(): Expression {
    if (c == '(') {
      priorities.add(0)
      val e = Parentheses(expression = parseExpression())
      unexpected(')', read())
      priorities.removeAt(priorities.lastIndex)
      return e
    }

    return parseVariable()
  }

  protected fun parseVariable(): Expression {
    if (isVariableLeading(c)) {
      val s = idx - 1
      while (isVariablePending(next()));
      unread()
      val name = exp.substring(s, idx)
      return Variable(name)
    }
    throw LogicalExpressionSyntaxException("unexpected '${c.toMessageString()}' at $idx")
  }

  protected fun isVariableLeading(c: Char): Boolean {
    return (c in 'a'..'z') || (c in 'A'..'Z')
  }

  protected fun isVariablePending(c: Char): Boolean {
    return isVariableLeading(c) || (c in '0'..'9')
  }

  private fun read(): Char {
    while (next() == ' ');
    return c
  }

  protected fun next(): Char {
    if (idx >= exp.length) {
      lastRead = false
      c = NULL
    } else {
      lastRead = true
      c = exp[idx++]
    }
    return c
  }

  protected fun next(expected: Char): Char {
    val c = next()
    unexpected(expected, c)
    return c
  }

  private fun unexpected(expected: Char, c: Char) {
    if (expected != c) {
      throw LogicalExpressionSyntaxException("expected '${expected.toMessageString()}' got '${c.toMessageString()}' at $idx")
    }
  }
}

private fun Char.toMessageString() = if (this == NULL) "EOF" else "$this"

class LogicalExpressionSyntaxException(message: String) : RuntimeException(message)
