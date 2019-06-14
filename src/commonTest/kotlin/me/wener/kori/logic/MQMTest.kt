package me.wener.kori.logic

import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * @author [wener](http://github.com/wenerme)
 * @since 2019-06-05
 */
class MQMTest {

  @Test
  fun testCombine() {
    println(MQM.combine(intArrayOf(0, 0, 0, 0), intArrayOf(0, 1, 0, 0)).toMQMString())
    println(MQM.combine(5.toBinaryIntArray(4), 7.toBinaryIntArray(4)).toMQMString())

    data class CombineTest(
      var a: Int,
      var b: Int,
      var s: String,
      var esum: Int
    )

    val tests = arrayListOf(
      CombineTest(5, 7, "01-1", 2),
      CombineTest(5, 13, "-101", 8),
      CombineTest(9, 13, "1-01", 4)
    )

    for (t in tests) {
      val (ints, sum) = MQM.combine(t.a.toBinaryIntArray(4), t.b.toBinaryIntArray(4))
      assertEquals(t.esum, sum, "${t.a.toString(2, 4)} - ${t.b.toString(2, 4)}")
      assertEquals(t.s, ints.toBinaryRepresentationString().toString(), "${t.a.toString(2, 4)} - ${t.b.toString(2, 4)}")
    }
  }
}

fun Pair<IntArray, Int>.toMQMString(): String = "${first.toBinaryRepresentationString()}/$second"

fun Int.toString(radix: Int, len: Int): String = this.toString(radix).padStart(len, '0')
fun Long.toString(radix: Int, len: Int): String = this.toString(radix).padStart(len, '0')
