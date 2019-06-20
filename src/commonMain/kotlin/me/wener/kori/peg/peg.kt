package me.wener.kori.peg

import me.wener.kori.util.ifAbsent
import me.wener.kori.util.isPresent
import me.wener.kori.util.pollLast

private const val NULL: Char = 0.toChar()

data class MatchContext(
  var start: Position,
  var end: Position,
  var expression: Expression,
  var raw: String = "",
  var match: Boolean = false,
  var children: MutableList<MatchContext> = mutableListOf()
) {

  override fun toString(): String {
    return "MatchContext($match,$start,$end,$raw,$children)"
  }
}

class PegParserInterpreter(val peg: Peg) : BaseParserContext() {
  override fun unexpected(message: String): Throwable {
    return ParserException(message)
  }

  fun parse(name: String): MatchContext {
    val e = ruleOf(name)
    return parse(e)
  }

  fun parse(e: Expression): MatchContext {
    mark()
    val context = MatchContext(expression = e, start = position.copy(), end = position)
    when (e) {
      is LiteralMatch -> {
        if (e.value.commonPrefixWith(
            expression.subSequence(position.offset, expression.length),
            e.ignoreCase
          ).length == e.value.length
        ) {
          skip(e.value.length)
          context.match = true
        }
      }

      is CharacterSetMath -> {

      }

      is Label -> {
        val c = parse(e.expression)
        context.children.add(c)
        context.match = c.match
      }
      is RuleMatch -> {
        val c = parse(ruleOf(e.name))
        context.children.add(c)
        context.match = c.match
      }
      is ParenthesesMatch -> {
        val c = parse(e.expression)
        context.children.add(c)
        context.match = c.match
      }

      is AlternativeMatch -> {
        var child = parse(e.left)
        if (!child.match) {
          child = parse(e.right)
        }
        if (child.match) {
          context.children.add(child)
          context.match = true
        }
      }

      is SequenceMatch -> {
        context.match = true
        for (child in e.expressions) {
          val c = parse(child)
          if (!c.match) {
            context.match = false
            break
          }
          context.children.add(c)
        }
      }

      is AnyMatch -> {
        do {
          val c = parse(e.expression)
          if (c.match) {
            context.children.add(c)
          }
        } while (c.match)
        context.match = true
      }
      is AtLeastOneMatch -> {
        do {
          val c = parse(e.expression)
          if (c.match) {
            context.children.add(c)
          }
        } while (c.match)
        context.match = context.children.size >= 1
      }
      is AtMostOneMatch -> {
        context.children.add(parse(e.expression))
        context.match = true
      }

      is PositivePredicate -> {
        mark()
        context.match = parse(e.expression).match
        unmark()
      }
      is NegativePredicate -> {
        mark()
        context.match = !parse(e.expression).match
        unmark()
      }
    }
    if (context.match) {
      context.end = position.copy()
      context.raw = markSubString()
    } else {
      unmark()
    }
    return context
  }

  fun ruleOf(name: String): Expression {
    return peg.rules.first { it.name == name }.ifAbsent {
      throw ParserException("rule '$name' not found")
    }!!.expression
  }
}

class ParserException(message: String) : RuntimeException(message)

abstract class BaseParserContext {
  var lastRead = false
  var c: Char = NULL
  val marks = mutableListOf<Position>()
  var position = Position()

  fun mark() {
    marks.add(position.copy())
  }

  fun consumeMark() {
    marks.pollLast()
  }

  fun unmark() {
    position = marks.pollLast()
  }

  var expression: String = ""

  fun markSubString(startOffset: Int = 0, endOffset: Int = 0): String {
    val a = marks.pollLast().offset + startOffset
    val b = position.offset + endOffset
    return expression.substring(a, b)
  }

  fun tryNext(v: Char): Boolean {
    if (next() == v) {
      return true
    }
    unread()
    return false
  }

  fun hasNext(): Boolean {
    if (next() != NULL) {
      unread()
      return true
    }
    return false
  }

  protected fun next(): Char {
    while (when (read()) {
        ' ', '\t', '\r', '\n' -> true
        else -> false
      }
    );
    return c
  }

  protected fun read(): Char {
    if (position.offset >= expression.length) {
      lastRead = false
      c = NULL
    } else {
      lastRead = true
      c = expression[position.offset++]

      if (c == '\n') {
        position.line++
      } else {
        position.column++
      }
    }

    return c
  }

  protected fun read(expected: Char): Char {
    val c = read()
    unexpected(expected, c)
    return c
  }

  protected fun next(expected: Char): Char {
    val c = next()
    unexpected(expected, c)
    return c
  }

  fun unread() {
    if (lastRead) {
      position.offset--
    }
  }

  fun skip(n: Int) {
    repeat(n) {
      read()
    }
  }

  abstract fun unexpected(message: String): Throwable
  fun unexpected(expected: Char, c: Char) {
    if (expected != c) {
      throw unexpected("expected '${expected.toMessageString()}' got '${c.toMessageString()}' at $position")
    }
  }
}

class PegParser : BaseParserContext() {
  override fun unexpected(message: String): Throwable {
    return SyntaxExpcetion(message)
  }


  fun parse(): Peg {
    val node = Peg()
    while (hasNext()) {
      node.rules.add(parseRule())
    }
    return node
  }

  fun parseRule(): Rule {
    val name = nextName()
    next('=')
    val e = Rule(name = name, expression = parseExpression())
    next(';')
    return e
  }

  fun parseExpression(): Expression {
    return parseAlternative()
  }

  fun parseAlternative(): Expression {
    val e = parseSequence()
    if (tryNext('/')) {
      return AlternativeMatch(left = e, right = parseExpression())
    }
    return e
  }

  fun parseSequence(): Expression {
    val s = SequenceMatch()
    while (true) {
      try {
        mark()
        s.expressions.add(parseLabel())
        consumeMark()
      } catch (e: NoPathExpcetion) {
        unmark()
        if (s.expressions.isEmpty()) {
          throw e
        }
        break
      }
    }
    if (s.expressions.size == 1) {
      return s.expressions.first()
    }

    return s
  }

  fun parseLabel(): Expression {
    mark()
    val name = tryNextName()
    if (name.isPresent() && tryNext(':')) {
      consumeMark()
      return Label(name!!, parseExpression())
    } else {
      unmark()
    }
    return parsePredict()
  }

  fun parsePredict(): Expression {
    return when (next()) {
      '&' -> PositivePredicate(parseExpression())
      '!' -> NegativePredicate(parseExpression())
      else -> {
        unread()
        parseMatch()
      }
    }
  }

  fun parseMatch(): Expression {
    val e = parseCharacterSet()
    return when (next()) {
      '*' -> AnyMatch(e)
      '?' -> AtMostOneMatch(e)
      '+' -> AtLeastOneMatch(e)
      else -> {
        unread()
        e
      }
    }
  }

  fun parseCharacterSet(): Expression {
    if (tryNext('[')) {
      mark()
      while (next() != ']');
      return CharacterSetMath(markSubString(0, -1), tryNext('i'))
    }
    return parseDot()
  }

  fun parseDot(): Expression {
    if (tryNext('.')) {
      return DotMath()
    }
    return parseLiteral()
  }

  fun parseLiteral(): Expression {
    mark()
    if (tryNext('\'')) {
      while (next() != '\'');
      unread()
      read('\'')
    } else if (tryNext('"')) {
      while (next() != '\"');
      unread()
      read('"')
    } else {
      unmark()
      return parseRuleReference()
    }
    return LiteralMatch(markSubString(1, -1), tryNext('i'))
  }

  fun parseRuleReference(): Expression {
    val name = tryNextName()
    if (name != null) {
      return RuleMatch(name)
    }
    return parseParentheses()
  }

  fun parseParentheses(): Expression {
    if (tryNext('(')) {
      val e = parseExpression()
      read(')')
      return ParenthesesMatch(e)
    }
    throw NoPathExpcetion("no more rule to try at $position");
  }

  fun unexpected(): Throwable {
    throw SyntaxExpcetion("unexpected got '${c.toMessageString()}' at $position")
  }

  fun nextName(): String {
    return tryNextName().ifAbsent {
      throw SyntaxExpcetion("expected 'NAME' got '${c.toMessageString()}' at $position")
    }!!
  }

  fun tryNextName(): String? {
    mark()
    next()
    if ((c in 'a'..'z') || (c in 'A'..'Z')) {
      while (true) {
        read()
        if ((c in 'a'..'z') || (c in 'A'..'Z') || (c in '0'..'9')) {
          continue
        }
        break
      }
      unread()
      return markSubString()
    }
    unmark()
    return null
  }
}

data class Position(var offset: Int = 0, var line: Int = 0, var column: Int = 0) {
  override fun toString(): String {
    return "$offset:$line:$column"
  }
}

private fun Char.toMessageString() = if (this == NULL) "EOF" else "$this"

interface Node {
  fun toSyntaxString(): String = TODO()
}

interface Expression : Node {}

data class Peg(val rules: MutableList<Rule> = mutableListOf()) : Node
data class Rule(var name: String, var expression: Expression) : Node

data class RuleMatch(var name: String) : Expression
data class LiteralMatch(var value: String, var ignoreCase: Boolean = false) : Expression
data class CharacterSetMath(var value: String, var ignoreCase: Boolean = false) : Expression
class DotMath() : Expression

data class AnyMatch(var expression: Expression) : Expression
data class AtLeastOneMatch(var expression: Expression) : Expression
data class AtMostOneMatch(var expression: Expression) : Expression

data class PositivePredicate(var expression: Expression) : Expression
data class NegativePredicate(var expression: Expression) : Expression

data class Label(var name: String, var expression: Expression) : Expression

data class SequenceMatch(var expressions: MutableList<Expression> = mutableListOf()) : Expression
data class AlternativeMatch(var left: Expression, var right: Expression) : Expression
data class ParenthesesMatch(var expression: Expression) : Expression

interface CharMarcher {
  fun match(char: Char): Boolean
}

open class SyntaxExpcetion(message: String) : RuntimeException(message) {}
class NoPathExpcetion(message: String) : SyntaxExpcetion(message) {}
