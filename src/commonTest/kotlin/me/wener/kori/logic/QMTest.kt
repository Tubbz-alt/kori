package me.wener.kori.logic

import kotlin.test.Test

/**
 * @author [wener](http://github.com/wenerme)
 * @since 2019-06-04
 */
class QMTest {

    @Test
    fun testCombine() {
        val minimizer = QM.of(4, longArrayOf(9, 14), 4, 8, 10, 11, 12, 15).combine()
        println(minimizer)
    }
}
