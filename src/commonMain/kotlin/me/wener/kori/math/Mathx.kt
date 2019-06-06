package me.wener.kori.math

import kotlin.jvm.JvmStatic

object Mathx {

    /**
     * [Factorial](https://en.wikipedia.org/wiki/Factorial)
     */
    @JvmStatic
    fun factorial(n: Long): Long = when (n) {
        0L -> 1
        1L -> 1
        2L -> 2
        3L -> 6
        else -> n * factorial(n - 1)
    }

    /**
     * Returns {@code b} to the {@code k}th power. Even if the result overflows, it will be equal to
     * {@code BigInteger.valueOf(b).pow(k).longValue()}. This implementation runs in {@code O(log k)}
     * time.
     *
     * > Copied from Guava
     *
     * @throws IllegalArgumentException if {@code k < 0}
     */
    fun pow(base: Long, power: Int): Long {
        var b = base
        var k = power
        if (-2 <= b && b <= 2) {
            return when (b) {
                0L -> if (k == 0) 1 else 0
                1L -> 1
                -1L -> if (k and 1 == 0) 1 else -1
                2L -> if (k < Long.SIZE_BITS) 1L shl k else 0
                -2L -> if (k < Long.SIZE_BITS) {
                    if (k and 1 == 0) 1L shl k else -(1L shl k)
                } else {
                    0
                }
                else -> throw AssertionError()
            }
        }
        var accum: Long = 1
        while (true) {
            when (k) {
                0 -> return accum
                1 -> return accum * b
                else -> {
                    accum *= if (k and 1 == 0) 1 else b
                    b *= b
                }
            }
            k = k shr 1
        }
    }

    /**
     * Returns {@code b} to the {@code k}th power. Even if the result overflows, it will be equal to
     * {@code BigInteger.valueOf(b).pow(k).longValue()}. This implementation runs in {@code O(log k)}
     * time.
     *
     * > Copied from Guava
     *
     * @throws IllegalArgumentException if {@code k < 0}
     */
    fun pow(base: Int, power: Int): Int {
        var b = base
        var k = power
        if (-2 <= b && b <= 2) {
            return when (b.toInt()) {
                0 -> (if (k == 0) 1 else 0)
                1 -> 1
                -1 -> (if (k and 1 == 0) 1 else -1)
                2 -> if (k < Long.SIZE_BITS) 1 shl k else 0
                -2 -> if (k < Long.SIZE_BITS) {
                    if (k and 1 == 0) 1 shl k else -(1 shl k)
                } else {
                    0
                }
                else -> throw AssertionError()
            }
        }
        var accum: Int = 1
        while (true) {
            when (k) {
                0 -> return accum
                1 -> return accum * b
                else -> {
                    accum *= if (k and 1 == 0) 1 else b
                    b *= b
                }
            }
            k = k shr 1
        }
    }
}


