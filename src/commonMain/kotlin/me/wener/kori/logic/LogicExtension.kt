package me.wener.kori.logic

fun IntArray.ones(): Int = count { it == 1 }

fun IntArray.toVariableString() = QM.toVariableString(this)
fun IntArray.toBinaryRepresentationString(): String = QM.toBinaryRepresentationString(this)

fun Long.toBinaryIntArray(n: Int): IntArray = Logics.toBinaryIntArray(n, this)
fun Int.toBinaryIntArray(n: Int): IntArray = Logics.toBinaryIntArray(n, this.toLong())
fun IntArray.fromBinaryIntArrayToLong(): Long = Logics.fromBinaryIntArrayToLong(this)
