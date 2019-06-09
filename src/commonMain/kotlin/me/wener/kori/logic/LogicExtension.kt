package me.wener.kori.logic

fun IntArray.ones(): Int = count { it == 1 }

fun IntArray.toVariableString() = QM.toVariableString(this)
fun IntArray.toBinaryRepresentationString(): String = QM.toBinaryRepresentationString(this)

fun Long.toBinInts(n: Int): IntArray = Logics.toBinInts(n, this)
fun Int.toBinInts(n: Int): IntArray = Logics.toBinInts(n, this.toLong())
