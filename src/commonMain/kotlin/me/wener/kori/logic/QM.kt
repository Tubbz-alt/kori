package me.wener.kori.logic

import me.wener.kori.combine.Combinatorics
import me.wener.kori.util.ifPresent
import kotlin.jvm.JvmStatic

/**
 * [Quine–McCluskey algorithm](https://en.wikipedia.org/wiki/Quine%E2%80%93McCluskey_algorithm)
 */
class QM(val vars: Int, val ignored: Set<Long>, val matches: Set<Long>) {

    val essentials = mutableListOf<Term>()
    val primes = mutableMapOf<Long, Term>()
    var compares = 0;

    companion object {
        @JvmStatic
        fun of(vars: Int, matches: LongArray): QM = of(vars, LongArray(0), *matches);

        @JvmStatic
        fun of(vars: Int, ignored: LongArray, vararg matches: Long): QM = QM(vars, ignored.toSet(), matches.toSet())

        /**
         * Estimate the compares between minterms by variable count
         *
         * 20 variables at most
         */
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
            val bins = combine(a.bins, b.bins)
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

    fun combine(): QM {
        val truths = mutableListOf<Long>()
        truths.addAll(matches)
        truths.addAll(ignored)
        truths.sort()

        // init terms
        val candidates = mutableListOf<Term>()
        for (match in truths) {
            val term = Term(Logics.toBinInts(vars, match))
            term.matches.add(match)
            candidates.add(term)
        }

        // finding prime implicants
        val groups = linkedMapOf<Int, MutableList<Term>>()

        var ga: List<Term>
        var gb: List<Term>

        do {
            // clear the value list ?
            groups.clear()
            for (term: Term in candidates) {
                groups.getOrPut(term.ones, { mutableListOf() }).add(term)
                // track the prime - keep the last one - simple & works
                term.matches.forEach { primes.put(it, term) }
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
        } while (!candidates.isEmpty())

        val targets = mutableListOf<Long>()
        matches.forEach { targets.add(it) }

        // find essentials in primes
        // skip alternatives
        while (targets.isNotEmpty()) {
            val term = primes[targets.removeAt(0)];
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
        val bins: IntArray,
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
            "Term($ones/$matches/${bins.toBinString()}/${if (combined) "✓" else "x"})"
    }

    override fun toString(): String {
        return "QM(e=${essentials.joinToString(" + ") { it.bins.toVariableString() }}, compares=$compares)"
    }
}
