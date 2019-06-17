package me.wener.kori.logic

fun IntArray.ones(): Int = count { it == 1 }

fun IntArray.toVariableString(names: Array<String> = arrayOf()) = QM.toVariableString(this, names)
fun List<QM.Term>.toVariableString(names: Array<String> = arrayOf()) =
  this.joinToString(" + ") { it.bin.toVariableString(names) }

fun IntArray.toBinaryRepresentationString(): String = QM.toBinaryRepresentationString(this)

fun Long.toBinaryIntArray(n: Int): IntArray = Logics.toBinaryIntArray(n, this)
fun Int.toBinaryIntArray(n: Int): IntArray = Logics.toBinaryIntArray(n, this.toLong())
fun IntArray.fromBinaryIntArrayToLong(): Long = Logics.fromBinaryIntArrayToLong(this)
