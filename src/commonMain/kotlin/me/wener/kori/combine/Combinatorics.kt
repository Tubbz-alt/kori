package me.wener.kori.combine

import me.wener.kori.math.factorial
import kotlin.jvm.JvmStatic

/**
 *
 * [Combinatorics](https://en.wikipedia.org/wiki/Combinatorics)
 *
 * @author <a href=http://github.com/wenerme>wener</a>
 * @since 2019-06-06
 */
object Combinatorics {
    /**
     * [Combination](https://en.wikipedia.org/wiki/Combination)
     */
    @JvmStatic
    fun C(total: Int, n: Int): Long = total.factorial() / (n.factorial() * (total - n).factorial())

    /**
     * [Permutation](https://en.wikipedia.org/wiki/Permutation)
     */
    @JvmStatic
    fun P(total: Int, n: Int): Long = total.factorial() / (total - n).factorial();

}
