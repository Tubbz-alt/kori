package me.wener.kori.logic

import kotlin.js.JsName
import kotlin.jvm.JvmStatic

typealias LogicInt = Int

/**
 * * [Logic](https://en.wikipedia.org/wiki/Lists_of_mathematics_topics#Logic)
 * * [Mathematical logic](https://en.wikipedia.org/wiki/Mathematical_logic)
 */
object Logics {
  const val IGNORED: LogicInt = -2
  const val REDUCED: LogicInt = -1
  const val FALSE: LogicInt = 0
  const val TRUE: LogicInt = 1

  @JsName("toBinaryIntArray")
  @JvmStatic
  fun toBinaryIntArray(n: Int, v: Long): IntArray {
    val ints = IntArray(n)
    var c: Long = 1
    for (i in n - 1 downTo 0) {
      if (v and c > 0) {
        ints[i] = 1
      } else {
        ints[i] = 0
      }
      c = c shl 1
    }
    return ints
  }

  @JsName("fromBinaryIntArrayToLong")
  @JvmStatic
  fun fromBinaryIntArrayToLong(ints: IntArray): Long {
    var s = 0L
    var c = 1L
    for (i in ints.size - 1 downTo 0) {
      if (ints[i] == TRUE) {
        s += c
      }
      c = c shl 1
    }
    return s
  }
}
