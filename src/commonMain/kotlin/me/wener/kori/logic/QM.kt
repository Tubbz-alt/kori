package me.wener.kori.logic

import me.wener.kori.combine.Combinatorics
import me.wener.kori.util.ifPresent
import kotlin.js.JsName
import kotlin.jvm.JvmStatic

/**
 * [Quine–McCluskey algorithm](https://en.wikipedia.org/wiki/Quine%E2%80%93McCluskey_algorithm)
 */
class QM(var vars: Int = 0, var ignored: Set<Long> = setOf(), var matches: Set<Long> = setOf()) {
  val terms = mutableListOf<Term>()
  val essentials = mutableListOf<Term>()
  val primes = mutableListOf<Term>()
  var compares = 0

  var debug = false
  val iterations = mutableListOf<List<Term>>()

  @JsName("reset")
  fun reset(vars: Int, matches: IntArray, ignored: IntArray): QM {
    require(vars > 0 && vars <= 31) { "invalid vars $vars" }
    return reset(vars, matches.map { it.toLong() }.toLongArray(), ignored.map { it.toLong() }.toLongArray())
  }

  fun reset(vars: Int, matches: LongArray, ignored: LongArray): QM {
    require(vars > 0 && vars <= 63) { "invalid vars $vars" }

    this.ignored = ignored.toSet()
    this.matches = matches.toSet()
    this.vars = vars
    return this
  }

  companion object {
    @JvmStatic
    fun of(vars: Int, ignored: LongArray = LongArray(0), vararg matches: Long): QM =
      QM(vars, ignored.toSet(), matches.toSet())

    /**
     * Estimate the compares between minterms by variable count
     *
     * 20 variables at most
     */
    @JsName("estimateMintermlistCompares")
    @JvmStatic
    fun estimateMintermlistCompares(vars: Int): Long {
      // 131282408400
      // assert(vars <= 20)
      var n: Long = 0
      for (i in 0 until vars) {
        n += Combinatorics.C(vars, i) * Combinatorics.C(vars, i + 1)
      }
      return n
    }

    @JsName("toBinaryRepresentationString")
    @JvmStatic
    fun toBinaryRepresentationString(v: IntArray): String {
      val sb = StringBuilder()
      for (i in v) {
        sb.append(toBinaryRepresentation(i))
      }
      return sb.toString()
    }

    @JsName("toBinaryRepresentation")
    @JvmStatic
    fun toBinaryRepresentation(v: Int): String {
      return when (v) {
        Logics.IGNORED -> "?"
        Logics.REDUCED -> "-"
        else -> v.toString()
      }
    }

    @JsName("toVariableString")
    @JvmStatic
    fun toVariableString(v: IntArray): String {
      val sb = StringBuilder()
      for ((idx, i) in v.withIndex()) {
        when (i) {
          Logics.FALSE -> {
            sb.append('\u0305')
            sb.append('A' + idx)
          }
          Logics.TRUE -> sb.append('A' + idx)
        }
      }
      return sb.toString()
    }

    /**
     * Combine tow minterm
     *
     * @return `null` if can not combine
     */
    @JvmStatic
    fun combine(a: IntArray, b: IntArray): IntArray? {
      var n = 0
      val bins = IntArray(a.size)
      var i = 0
      while (i < a.size && n < 2) {
        bins[i] = a[i]
        if (b[i] != a[i]) {
          n++
          bins[i] = Logics.REDUCED
        }
        i++
      }
      return if (n == 1) bins else null
    }

    fun combine(a: Term, b: Term): Term? {
      val bins = combine(a.bin, b.bin)
      if (bins != null) {
        return Term(bins, a, b)
      }
      return null
    }

    /**
     * Find all forms of a prime chart
     */
    fun essentials(
      primes: Map<Long, List<Term>>,
      targets: MutableList<Long> = mutableListOf()
    ): List<List<Term>> {
      if (targets.isEmpty()) {
        targets.addAll(primes.keys)
        targets.sort()
      }

      val essentials = mutableListOf<Term>()
      for (value in primes.values) {
        if (value.size == 1) {
          essentials.add(value.first())
        }
      }
      essentials.forEach { targets.removeAll(it.matches) }

      if (targets.isEmpty()) {
        // lucky
        return listOf(essentials);
      }

      // apply Petrick's method
      // https://en.wikipedia.org/wiki/Petrick%27s_method


      return listOf();
    }

  }

  @JsName("resolve")
  fun resolve(): QM {
    // reset state
    iterations.clear()
    terms.clear()
    essentials.clear()
    primes.clear()

    val truths = mutableListOf<Long>()
    truths.addAll(matches)
    truths.addAll(ignored)
    truths.sort()

    // init terms - build truth table
    for (match in truths) {
      val term = Term(Logics.toBinInts(vars, match))
      term.matches.add(match)
      terms.add(term)
    }

    // finding prime implicants
    val candidates = terms.toMutableList()
    val groups = linkedMapOf<Int, MutableList<Term>>()

    var ga: List<Term>
    var gb: List<Term>

    do {
      // debug the processing
      if (debug) {
        iterations.add(candidates.toList())
      }

      // clear the value list ?
      groups.clear()
      for (term: Term in candidates) {
        groups.getOrPut(term.ones, { mutableListOf() }).add(term)
        // track the prime
        primes.add(term)
      }
      candidates.clear()

      val itor = groups.values.iterator()
      gb = itor.next()

      do {
        ga = gb
        if (itor.hasNext()) {
          gb = itor.next()
        } else {
          break
        }

        if (gb.first().ones - ga.first().ones != 1) {
          continue
        }

        for (a in ga) {
          for (b in gb) {
            compares++
            combine(a, b).ifPresent { candidates.add(it) }
          }
        }
      } while (true)
    } while (candidates.isNotEmpty())

    // cleanup
    val dedup = mutableSetOf<String>()
    primes.removeAll { it.combined || !dedup.add(it.bin.toBinaryRepresentationString()) }

    val targets = mutableListOf<Long>()
    matches.forEach { targets.add(it) }

    // find essentials in primes
    // skip alternatives
    val matchTerms = mutableMapOf<Long, Term>()
    primes.forEach {
      val term = it
      it.matches.forEach { matchTerms.put(it, term) }
    }
    while (targets.isNotEmpty()) {
      val term = matchTerms[targets.removeAt(0)];
      if (targets.removeAll(term!!.matches)) {
        essentials.add(term)
      }
    }
    return this
  }

  class Term(
    /**
     * binary notation
     */
    val bin: IntArray,
    /**
     * group no.
     */
    val ones: Int,
    var a: Term? = null,
    var b: Term? = null,
    /**
     * this term has been combined to another
     *
     * not a prime implicants
     */
    var combined: Boolean = false,
    /**
     * used by MQM
     */
    var esum: Long = 0L,
    /**
     * mintermlist
     */
    var matches: MutableList<Long> = mutableListOf()
  ) {
    constructor(bins: IntArray) : this(bins, bins.ones())
    constructor(bins: IntArray, a: Term, b: Term) : this(bins, bins.ones(), a = a, b = b) {
      a.combined = true
      b.combined = true
      matches.addAll(a.matches)
      matches.addAll(b.matches)
    }

    override fun toString(): String =
      "Term($ones/$matches/${bin.toBinaryRepresentationString()}/${if (combined) "✓" else "x"})"
  }

  override fun toString(): String {
    return "QM(e=${essentials.joinToString(" + ") { it.bin.toVariableString() }}, compares=$compares)"
  }
}
