package me.wener.kori.logic.exp

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals


/**
 * @author [wener](http://github.com/wenerme)
 * @since 2019-06-06
 */
class LogicExpressionsTest {
  @Test
  fun testEquals() {
    class TestCase(val a: String, val b: String)

    for (case in arrayOf(
      TestCase("a ||b", "b||a"),
      TestCase("a ^b", "b^a"),
      TestCase("a &&(b || c)", "(b||c) && a")
    )) {
      case.apply {
        assertEquals(LogicExpressions.parse(a), LogicExpressions.parse(b), "Compare $a - $b")
      }
    }

    for (case in arrayOf(
      TestCase("a ||b", "b&&a"),
      TestCase("a ^b", "c^a"),
      TestCase("a &&(b || c)", "(b||c) || a")
    )) {
      case.apply {
        assertNotEquals(LogicExpressions.parse(a), LogicExpressions.parse(b), "Compare $a - $b")
      }
    }
  }
}
