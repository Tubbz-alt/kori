package me.wener.kori.logic

fun IntArray.ones(): Int = count { it == 1 }

fun IntArray.toVariableString(sb: StringBuilder = StringBuilder()): CharSequence {
    for ((idx, i) in this.withIndex()) {
        when (i) {
            Logics.FALSE -> {
                sb.append('\u0305')
                sb.append('A' + idx)
            }
            Logics.TRUE -> sb.append('A' + idx)
        }
    }
    return sb
}

fun IntArray.toBinString(sb: StringBuilder = StringBuilder()): CharSequence {
    for (i in this) {
        when (i) {
            Logics.IGNORED -> sb.append('?')
            Logics.REDUCED -> sb.append('-')
            else -> sb.append(i)
        }
    }
    return sb
}

fun Long.toBinInts(n: Int): IntArray = Logics.toBinInts(n, this)
fun Int.toBinInts(n: Int): IntArray = Logics.toBinInts(n, this.toLong())
