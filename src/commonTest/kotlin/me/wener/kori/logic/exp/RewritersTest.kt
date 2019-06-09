package me.wener.kori.logic.exp

import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * @author [wener](http://github.com/wenerme)
 * @since 2019-06-06
 */
class RewritersTest {
  @Test
  fun tests() {
    class TestCase(val before: String, val after: String)

    for (case in arrayOf(
      TestCase("(a||b) || c", "a || b || c"),
      TestCase("a||(b || c)", "a || b || c"),
      TestCase("d||(a||b) || c", "d || a || b || c"),
      TestCase("a||(b || c)||d", "a || b || c || d"),
      TestCase("a||((b && c)||d)", "a || (b && c) || d"),
      TestCase("(a&&b)&&(c)", "a && b && c"),
      TestCase("(a&&b)&&(c) || (d || e)", "a && b && c || d || e")
    )) {
      val e = Rewriters.rewrite(
        LogicExpressions.parse(case.before),
        Rewriters::unnecessaryParentheses
      )
      assertEquals(case.after, e.toExpressionString(), "Failed ${case.before} -> ${case.after}")
    }

    for (case in arrayOf(
      TestCase("(a || b) &&c", "(a && c) || (b && c)"),
      TestCase("c && (a || b)", "(a && c) || (b && c)"),
      TestCase("(a || b) &&(c && d)", "(a && (c && d)) || (b && (c && d))")
    )) {
      val e = Rewriters.rewrite(
        LogicExpressions.parse(case.before),
        Rewriters::sop
      )
      assertEquals(case.after, e.toExpressionString(), "Failed ${case.before} -> ${case.after}")
    }

    for (case in arrayOf(
      TestCase("a || a", "a"),
      TestCase("a && a", "a"),
      TestCase("a || (b && a)", "a"),
      TestCase("(a && b) || (b && a)", "a && b"),
      TestCase("(a && b) || (b && (a && b) )", "a && b"),
      TestCase("(a || b) || (b && (a || b) )", "a || b")
    )) {
      val e = Rewriters.rewrite(
        LogicExpressions.parse(case.before),
        Rewriters.chain(
          Rewriters::simplify,
          Rewriters::unnecessaryParentheses
        )
      )
      assertEquals(
        LogicExpressions.parse(case.after),
        e,
        "Failed ${e.toExpressionString()} <-> ${case.before} -> ${case.after}"
      )
    }
  }
}
