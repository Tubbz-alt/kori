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

    @JvmStatic
    fun toExpressionString(e: Expression): String = when (e) {
        is Condition -> "${toExpressionString(e.left)} ${e.operator.toOperator()} ${toExpressionString(e.right)}"
        is Negative -> "!${toExpressionString(e.expression)}"
        is Parentheses -> "(${toExpressionString(e.expression)})"
        is Variable -> e.name
        else -> throw IllegalArgumentException("unexpected to string of $e")
    }

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
}

fun Expression.toAlgebraString(): String = LogicExpressions.toAlgebraString(this)


/**
 * A super simple boolean expression parser
 *
 * * support and/or/xor/not - C-like syntax or boolean algebra syntax
 * * support parentheses
 * * support `[a-zA-Z][a-zA-Z0-9]*` variable name
 * * subclass to add customized rules
 */
open class LogicalExpressionParser(val exp: String) {
    protected var idx = 0
    protected var c: Char = NULL
    protected var lastRead = false

    /**
     * Track current priority - not > and/or/xor
     *
     * * parentheses add a scope
     * * prefix is higher than logical operator
     */
    protected var priorities = mutableListOf(0)

    fun parse(): Expression {
        idx = 0
        val e = parseExpression()
        unexpected(NULL, read())
        return e
    }

    protected fun parseExpression(): Expression {
        read()
        return parseCondition()
    }

    protected fun parseCondition(): Expression {
        val left = parseParentheses()
        val operator = nextOperator()
        if (operator != null) {
            val right = parseExpression()
            return Condition(operator, left, right)
        }
        return left
    }

    protected fun nextOperator(): ConditionOperator? {
        if (priorities.last() > 0) {
            return null
        }
        read()

        return when (c) {
            '&' -> {
                next(c);
                ConditionOperator.AND
            }
            AlgebraAnd -> ConditionOperator.AND

            '|' -> {
                next(c);
                ConditionOperator.OR
            }
            AlgebraOr -> ConditionOperator.OR

            '^' -> ConditionOperator.XOR
            else -> {
                unread()
                null
            }
        }
    }

    protected fun unread() {
        if (lastRead) {
            idx--
        }
    }

    protected fun parseParentheses(): Expression {
        if (c == '(') {
            priorities.add(0)
            val e = Parentheses(expression = parseExpression())
            unexpected(')', read())
            priorities.removeAt(priorities.lastIndex)
            return e
        }

        return parseNegative()
    }

    protected fun parseNegative(): Expression {
        if (c == '!' || c == AlgebraNot) {
            priorities[priorities.lastIndex] = priorities.last() + 1
            val e = Negative(expression = parseExpression())
            priorities[priorities.lastIndex] = priorities.last() - 1
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
        return isVariableLeading(c) || (c in '9'..'0')
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

class LogicalExpressionSyntaxException(message: String) : RuntimeException(message) {}

interface Expression {
    fun not(): Expression = Negative(this)
    fun parentheses(): Expression = Parentheses(this)

    @JsName("and")
    fun and(right: Expression): Expression = Condition(left = this, right = right, operator = ConditionOperator.AND)

    @JsName("or")
    fun or(right: Expression): Expression = Condition(left = this, right = right, operator = ConditionOperator.OR)

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

private fun Char.toMessageString() = if (this == NULL) "EOF" else "$this"

