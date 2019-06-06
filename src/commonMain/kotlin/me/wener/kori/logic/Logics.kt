package me.wener.kori.logic

import kotlin.jvm.JvmStatic

/**
 * * [Logic](https://en.wikipedia.org/wiki/Lists_of_mathematics_topics#Logic)
 * * [Mathematical logic](https://en.wikipedia.org/wiki/Mathematical_logic)
 */
object Logics {
    const val IGNORED = -2
    const val REDUCED = -1
    const val FALSE = 0
    const val TRUE = 1

    @JvmStatic
    fun toBinInts(n: Int, v: Long): IntArray {
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
}
