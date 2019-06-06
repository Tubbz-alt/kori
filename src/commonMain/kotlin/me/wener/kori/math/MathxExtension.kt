package me.wener.kori.math

fun Long.factorial(): Long = Mathx.factorial(this)
fun Long.pow(n: Int): Long = Mathx.pow(this, n)

fun Int.factorial(): Long = this.toLong().factorial()
fun Int.pow(n: Int): Int = Mathx.pow(this, n)
