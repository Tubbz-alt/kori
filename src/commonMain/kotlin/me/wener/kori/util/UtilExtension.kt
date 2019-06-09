package me.wener.kori.util


/**
 * Take from [here](https://discuss.kotlinlang.org/t/let-vs-if-not-null/3542)
 */
inline fun <T : Any, R> T?.ifPresent(callback: (T) -> R): R? {
  return this?.let(callback)
}

fun <T : Any> MutableList<T>.pollFirst(): T = this.removeAt(0)
fun <T : Any> MutableList<T>.pollLast(): T = this.removeAt(this.lastIndex)


/**
 * Helper method to build hashCode
 *
 * See java.util.Objects.hash
 */
fun Int.addHasCode(v: Any?): Int {
  return this * 31 + v.hashCode()
}
