package me.wener.kori.logic

import me.wener.kori.math.pow
import kotlin.js.JsName
import kotlin.jvm.JvmStatic

/**
 * [Modified Quine-McCluskey](https://arxiv.org/abs/1203.2289)
 */
class MQM {
  companion object {
    /**
     * n*2^(n-1)
     */
    @JsName("estimateMintermlistCompares")
    @JvmStatic
    fun estimateMintermlistCompares(vars: Int): Long = vars * 2L.pow(vars - 1)

    /**
     * MQM combine
     *
     * @return Combined binary representation and e-sum, if can not combine, e-sum < 0
     */
    @JvmStatic
    fun combine(a: IntArray, b: IntArray): Pair<IntArray, Int> {
      var n = 0
      val bins = IntArray(a.size)
      var i = 0
      var sum = 0
      while (i < a.size && n < 2) {
        bins[i] = a[i]
        if (b[i] != a[i]) {
          n++
          bins[i] = Logics.REDUCED
          sum = 2.pow(a.size - i - 1)
        }
        i++
      }
      if (n == 1) {
        return Pair(bins, sum)
      }
      return Pair(intArrayOf(), -1)
    }

    /**
     * identical mintermlist can be excluded
     */
    fun identical(a: QM.Term, b: QM.Term): Boolean {
      // same esum
      // same least minterm and same largest minterm
      return a.esum == b.esum &&
        a.matches.first() == b.matches.first() &&
        a.matches.last() == b.matches.last()
    }
  }
}
