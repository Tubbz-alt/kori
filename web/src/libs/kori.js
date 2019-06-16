(function (_, Kotlin) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var L1 = Kotlin.Long.ONE;
  var L0 = Kotlin.Long.ZERO;
  var L2 = Kotlin.Long.fromInt(2);
  var Pair = Kotlin.kotlin.Pair;
  var equals = Kotlin.equals;
  var first = Kotlin.kotlin.collections.first_7wnvza$;
  var last = Kotlin.kotlin.collections.last_7wnvza$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var toLongArray = Kotlin.kotlin.collections.toLongArray_558emf$;
  var toSet = Kotlin.kotlin.collections.toSet_se6h4x$;
  var StringBuilder_init = Kotlin.kotlin.text.StringBuilder_init;
  var toChar = Kotlin.toChar;
  var sort = Kotlin.kotlin.collections.sort_4wi501$;
  var first_0 = Kotlin.kotlin.collections.first_2p1efm$;
  var listOf = Kotlin.kotlin.collections.listOf_mh5how$;
  var toMutableList = Kotlin.kotlin.collections.toMutableList_4c7yge$;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  var removeAll = Kotlin.kotlin.collections.removeAll_qafx1e$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var joinToString = Kotlin.kotlin.collections.joinToString_fmv235$;
  var emptySet = Kotlin.kotlin.collections.emptySet_287e2$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException_init_pdl1vj$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  var sortWith = Kotlin.kotlin.collections.sortWith_nqfjgj$;
  var wrapFunction = Kotlin.wrapFunction;
  var Comparator = Kotlin.kotlin.Comparator;
  var LinkedHashSet_init = Kotlin.kotlin.collections.LinkedHashSet_init_287e2$;
  var sorted = Kotlin.kotlin.collections.sorted_exjks8$;
  var Unit = Kotlin.kotlin.Unit;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.intrinsics.COROUTINE_SUSPENDED;
  var CoroutineImpl = Kotlin.kotlin.coroutines.CoroutineImpl;
  var sequence = Kotlin.kotlin.sequences.sequence_o0x0bg$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var repeat = Kotlin.kotlin.text.repeat_94bcnn$;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var hashCode = Kotlin.hashCode;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var toBoxedChar = Kotlin.toBoxedChar;
  var unboxChar = Kotlin.unboxChar;
  var last_0 = Kotlin.kotlin.collections.last_2p1efm$;
  var get_lastIndex = Kotlin.kotlin.collections.get_lastIndex_55thoc$;
  var CharRange = Kotlin.kotlin.ranges.CharRange;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var RuntimeException_init = Kotlin.kotlin.RuntimeException_init_pdl1vj$;
  var RuntimeException = Kotlin.kotlin.RuntimeException;
  var throwCCE = Kotlin.throwCCE;
  var L6 = Kotlin.Long.fromInt(6);
  var L3 = Kotlin.Long.fromInt(3);
  var L_1 = Kotlin.Long.NEG_ONE;
  var L_2 = Kotlin.Long.fromInt(-2);
  var AssertionError_init = Kotlin.kotlin.AssertionError_init;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  ConditionOperator.prototype = Object.create(Enum.prototype);
  ConditionOperator.prototype.constructor = ConditionOperator;
  LogicalExpressionSyntaxException.prototype = Object.create(RuntimeException.prototype);
  LogicalExpressionSyntaxException.prototype.constructor = LogicalExpressionSyntaxException;
  function Combinatorics() {
    Combinatorics_instance = this;
  }
  Combinatorics.prototype.C_vux9f0$ = function (total, n) {
    return factorial_0(total).div(factorial_0(n).multiply(factorial_0(total - n | 0)));
  };
  Combinatorics.prototype.P_vux9f0$ = function (total, n) {
    return factorial_0(total).div(factorial_0(total - n | 0));
  };
  Combinatorics.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Combinatorics',
    interfaces: []
  };
  var Combinatorics_instance = null;
  function Combinatorics_getInstance() {
    if (Combinatorics_instance === null) {
      new Combinatorics();
    }
    return Combinatorics_instance;
  }
  function ones($receiver) {
    var tmp$;
    var count = 0;
    for (tmp$ = 0; tmp$ !== $receiver.length; ++tmp$) {
      var element = $receiver[tmp$];
      if (element === 1)
        count = count + 1 | 0;
    }
    return count;
  }
  function toVariableString($receiver) {
    return QM$Companion_getInstance().toVariableString($receiver);
  }
  function toBinaryRepresentationString($receiver) {
    return QM$Companion_getInstance().toBinaryRepresentationString($receiver);
  }
  function toBinaryIntArray($receiver, n) {
    return Logics_getInstance().toBinaryIntArray(n, $receiver);
  }
  function toBinaryIntArray_0($receiver, n) {
    return Logics_getInstance().toBinaryIntArray(n, Kotlin.Long.fromInt($receiver));
  }
  function fromBinaryIntArrayToLong($receiver) {
    return Logics_getInstance().fromBinaryIntArrayToLong($receiver);
  }
  function Logics() {
    Logics_instance = this;
    this.IGNORED = -2;
    this.REDUCED = -1;
    this.FALSE = 0;
    this.TRUE = 1;
  }
  Logics.prototype.toBinaryIntArray = function (n, v) {
    var ints = new Int32Array(n);
    var c = L1;
    for (var i = n - 1 | 0; i >= 0; i--) {
      if (v.and(c).toNumber() > 0) {
        ints[i] = 1;
      }
       else {
        ints[i] = 0;
      }
      c = c.shiftLeft(1);
    }
    return ints;
  };
  Logics.prototype.fromBinaryIntArrayToLong = function (ints) {
    var s = L0;
    var c = L1;
    for (var i = ints.length - 1 | 0; i >= 0; i--) {
      if (ints[i] === 1) {
        s = s.add(c);
      }
      c = c.shiftLeft(1);
    }
    return s;
  };
  Logics.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Logics',
    interfaces: []
  };
  var Logics_instance = null;
  function Logics_getInstance() {
    if (Logics_instance === null) {
      new Logics();
    }
    return Logics_instance;
  }
  function MQM() {
    MQM$Companion_getInstance();
  }
  function MQM$Companion() {
    MQM$Companion_instance = this;
  }
  MQM$Companion.prototype.estimateMintermlistCompares = function (vars) {
    return Kotlin.Long.fromInt(vars).multiply(pow(L2, vars - 1 | 0));
  };
  MQM$Companion.prototype.combine_2vb79e$ = function (a, b) {
    var n = 0;
    var bins = new Int32Array(a.length);
    var i = 0;
    var sum = 0;
    while (i < a.length && n < 2) {
      bins[i] = a[i];
      if (b[i] !== a[i]) {
        n = n + 1 | 0;
        bins[i] = -1;
        sum = pow_0(2, a.length - i - 1 | 0);
      }
      i = i + 1 | 0;
    }
    if (n === 1) {
      return new Pair(bins, sum);
    }
    return new Pair(new Int32Array([]), -1);
  };
  MQM$Companion.prototype.identical_8x7vjs$ = function (a, b) {
    return equals(a.esum, b.esum) && equals(first(a.matches), first(b.matches)) && equals(last(a.matches), last(b.matches));
  };
  MQM$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var MQM$Companion_instance = null;
  function MQM$Companion_getInstance() {
    if (MQM$Companion_instance === null) {
      new MQM$Companion();
    }
    return MQM$Companion_instance;
  }
  MQM.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'MQM',
    interfaces: []
  };
  function PetrickMethods() {
    PetrickMethods_instance = this;
  }
  PetrickMethods.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'PetrickMethods',
    interfaces: []
  };
  var PetrickMethods_instance = null;
  function PetrickMethods_getInstance() {
    if (PetrickMethods_instance === null) {
      new PetrickMethods();
    }
    return PetrickMethods_instance;
  }
  function Comparator$ObjectLiteral(closure$comparison) {
    this.closure$comparison = closure$comparison;
  }
  Comparator$ObjectLiteral.prototype.compare = function (a, b) {
    return this.closure$comparison(a, b);
  };
  Comparator$ObjectLiteral.$metadata$ = {kind: Kind_CLASS, interfaces: [Comparator]};
  var compareBy$lambda = wrapFunction(function () {
    var compareValues = Kotlin.kotlin.comparisons.compareValues_s00gnj$;
    return function (closure$selector) {
      return function (a, b) {
        var selector = closure$selector;
        return compareValues(selector(a), selector(b));
      };
    };
  });
  var AboveLine;
  function QM(vars, ignored, matches) {
    QM$Companion_getInstance();
    if (vars === void 0)
      vars = 0;
    if (ignored === void 0) {
      ignored = emptySet();
    }
    if (matches === void 0) {
      matches = emptySet();
    }
    this.vars = vars;
    this.ignored = ignored;
    this.matches = matches;
    this.terms = ArrayList_init();
    this.essentials = ArrayList_init();
    this.primes = ArrayList_init();
    this.compares = 0;
    this.comareThreshhold = pow_0(2, 16);
    this.debug = false;
    this.iterations = ArrayList_init();
  }
  QM.prototype.reset = function (vars, matches, ignored) {
    if (!(vars > 0 && vars <= 31)) {
      var message = 'invalid vars ' + vars;
      throw IllegalArgumentException_init(message.toString());
    }
    var destination = ArrayList_init_0(matches.length);
    var tmp$;
    for (tmp$ = 0; tmp$ !== matches.length; ++tmp$) {
      var item = matches[tmp$];
      destination.add_11rb$(Kotlin.Long.fromInt(item));
    }
    var tmp$_0 = toLongArray(destination);
    var destination_0 = ArrayList_init_0(ignored.length);
    var tmp$_1;
    for (tmp$_1 = 0; tmp$_1 !== ignored.length; ++tmp$_1) {
      var item_0 = ignored[tmp$_1];
      destination_0.add_11rb$(Kotlin.Long.fromInt(item_0));
    }
    return this.reset_jp13du$(vars, tmp$_0, toLongArray(destination_0));
  };
  QM.prototype.reset_jp13du$ = function (vars, matches, ignored) {
    if (!(vars > 0 && vars <= 63)) {
      var message = 'invalid vars ' + vars;
      throw IllegalArgumentException_init(message.toString());
    }
    this.ignored = toSet(ignored);
    this.matches = toSet(matches);
    this.vars = vars;
    this.compares = 0;
    return this;
  };
  function QM$Companion() {
    QM$Companion_instance = this;
  }
  QM$Companion.prototype.of_2yr2u0$ = function (vars, ignored, matches) {
    if (ignored === void 0)
      ignored = Kotlin.longArray(0);
    return new QM(vars, toSet(ignored), toSet(matches));
  };
  QM$Companion.prototype.estimateMintermlistCompares = function (vars) {
    var n = L0;
    for (var i = 0; i < vars; i++) {
      n = n.add(Combinatorics_getInstance().C_vux9f0$(vars, i).multiply(Combinatorics_getInstance().C_vux9f0$(vars, i + 1 | 0)));
    }
    return n;
  };
  QM$Companion.prototype.toBinaryRepresentationString = function (v) {
    var tmp$;
    var sb = StringBuilder_init();
    for (tmp$ = 0; tmp$ !== v.length; ++tmp$) {
      var i = v[tmp$];
      sb.append_gw00v9$(this.toBinaryRepresentation(i));
    }
    return sb.toString();
  };
  QM$Companion.prototype.toBinaryRepresentation = function (v) {
    var tmp$;
    switch (v) {
      case -2:
        tmp$ = '?';
        break;
      case -1:
        tmp$ = '-';
        break;
      default:tmp$ = v.toString();
        break;
    }
    return tmp$;
  };
  QM$Companion.prototype.toVariableString = function (v) {
    var sb = StringBuilder_init();
    for (var idx = 0; idx !== v.length; ++idx) {
      var i = v[idx];
      switch (i) {
        case 0:
          sb.append_s8itvh$(AboveLine);
          sb.append_s8itvh$(toChar(65 + idx));
          break;
        case 1:
          sb.append_s8itvh$(toChar(65 + idx));
          break;
      }
    }
    return sb.toString();
  };
  QM$Companion.prototype.combine_2vb79e$ = function (a, b) {
    var n = 0;
    var bins = new Int32Array(a.length);
    var i = 0;
    while (i < a.length && n < 2) {
      bins[i] = a[i];
      if (b[i] !== a[i]) {
        n = n + 1 | 0;
        bins[i] = -1;
      }
      i = i + 1 | 0;
    }
    return n === 1 ? bins : null;
  };
  QM$Companion.prototype.combine_8x7vjs$ = function (a, b) {
    var bins = this.combine_2vb79e$(a.bin, b.bin);
    if (bins != null) {
      return QM$QM$Term_init_0(bins, a, b);
    }
    return null;
  };
  QM$Companion.prototype.essentials_ji7n88$ = function (primes, targets) {
    if (targets === void 0) {
      targets = ArrayList_init();
    }
    var tmp$;
    if (targets.isEmpty()) {
      targets.addAll_brywnq$(primes.keys);
      sort(targets);
    }
    var essentials = ArrayList_init();
    tmp$ = primes.values.iterator();
    while (tmp$.hasNext()) {
      var value = tmp$.next();
      if (value.size === 1) {
        essentials.add_11rb$(first_0(value));
      }
    }
    var tmp$_0;
    tmp$_0 = essentials.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      targets.removeAll_brywnq$(element.matches);
    }
    if (targets.isEmpty()) {
      return listOf(essentials);
    }
    return emptyList();
  };
  QM$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var QM$Companion_instance = null;
  function QM$Companion_getInstance() {
    if (QM$Companion_instance === null) {
      new QM$Companion();
    }
    return QM$Companion_instance;
  }
  function QM$resolve$lambda(it) {
    return it.ones;
  }
  function QM$resolve$lambda_0(this$QM) {
    return function () {
      return 'too many compares ' + this$QM.comareThreshhold;
    };
  }
  function QM$resolve$lambda_1(closure$dedup) {
    return function (it) {
      return it.combined || closure$dedup.put_xwzc9p$(toBinaryRepresentationString(it.bin), it) != null;
    };
  }
  QM.prototype.resolve = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    this.iterations.clear();
    this.terms.clear();
    this.essentials.clear();
    this.primes.clear();
    var truths = ArrayList_init();
    truths.addAll_brywnq$(this.matches);
    truths.addAll_brywnq$(this.ignored);
    tmp$ = truths.iterator();
    while (tmp$.hasNext()) {
      var match = tmp$.next();
      var term = QM$QM$Term_init(Logics_getInstance().toBinaryIntArray(this.vars, match));
      term.matches.add_11rb$(match);
      this.terms.add_11rb$(term);
    }
    var candidates = toMutableList(this.terms);
    var groups = LinkedHashMap_init();
    var ga;
    var gb;
    var dedup = LinkedHashMap_init();
    do {
      if (candidates.size > 1) {
        sortWith(candidates, new Comparator$ObjectLiteral(compareBy$lambda(QM$resolve$lambda)));
      }
      if (this.debug) {
        this.iterations.add_11rb$(toList(candidates));
      }
      groups.clear();
      tmp$_0 = candidates.iterator();
      while (tmp$_0.hasNext()) {
        var term_0 = tmp$_0.next();
        var key = term_0.ones;
        var tmp$_4;
        var value = groups.get_11rb$(key);
        if (value == null) {
          var answer = ArrayList_init();
          groups.put_xwzc9p$(key, answer);
          tmp$_4 = answer;
        }
         else {
          tmp$_4 = value;
        }
        tmp$_4.add_11rb$(term_0);
        this.primes.add_11rb$(term_0);
      }
      candidates.clear();
      var itor = groups.values.iterator();
      gb = itor.next();
      do {
        ga = gb;
        if (itor.hasNext()) {
          gb = itor.next();
        }
         else {
          break;
        }
        if ((first_0(gb).ones - first_0(ga).ones | 0) !== 1) {
          continue;
        }
        tmp$_1 = ga.iterator();
        while (tmp$_1.hasNext()) {
          var a = tmp$_1.next();
          tmp$_2 = gb.iterator();
          while (tmp$_2.hasNext()) {
            var b = tmp$_2.next();
            if (!((tmp$_3 = this.compares, this.compares = tmp$_3 + 1 | 0, tmp$_3) < this.comareThreshhold)) {
              var message = QM$resolve$lambda_0(this)();
              throw IllegalArgumentException_init(message.toString());
            }
            var $receiver = QM$Companion_getInstance().combine_8x7vjs$(a, b);
            if ($receiver != null) {
              var s = toBinaryRepresentationString($receiver.bin);
              var last = dedup.get_11rb$(s);
              if (last != null) {
                last.matches.addAll_brywnq$($receiver.matches);
              }
               else {
                candidates.add_11rb$($receiver);
                dedup.put_xwzc9p$(s, $receiver);
              }
            }
          }
        }
      }
       while (true);
      var isNotEmpty$result;
      isNotEmpty$result = !candidates.isEmpty();
    }
     while (isNotEmpty$result);
    dedup.clear();
    removeAll(this.primes, QM$resolve$lambda_1(dedup));
    var targets = ArrayList_init();
    var tmp$_5;
    tmp$_5 = this.matches.iterator();
    while (tmp$_5.hasNext()) {
      var element = tmp$_5.next();
      targets.add_11rb$(element);
    }
    var matchTerms = LinkedHashMap_init();
    var tmp$_6;
    tmp$_6 = this.primes.iterator();
    while (tmp$_6.hasNext()) {
      var element_0 = tmp$_6.next();
      var term_1 = element_0;
      var tmp$_7;
      tmp$_7 = element_0.matches.iterator();
      while (tmp$_7.hasNext()) {
        var element_1 = tmp$_7.next();
        matchTerms.put_xwzc9p$(element_1, term_1);
      }
    }
    while (!targets.isEmpty()) {
      var term_2 = matchTerms.get_11rb$(first_0(targets));
      if (targets.removeAll_brywnq$(ensureNotNull(term_2).matches)) {
        this.essentials.add_11rb$(term_2);
      }
    }
    return this;
  };
  function QM$Term(bin, ones, a, b, combined, esum, matches) {
    if (a === void 0)
      a = null;
    if (b === void 0)
      b = null;
    if (combined === void 0)
      combined = false;
    if (esum === void 0)
      esum = L0;
    if (matches === void 0) {
      matches = LinkedHashSet_init();
    }
    this.bin = bin;
    this.ones = ones;
    this.a = a;
    this.b = b;
    this.combined = combined;
    this.esum = esum;
    this.matches = matches;
  }
  QM$Term.prototype.toString = function () {
    return 'Term(' + this.ones + '/' + toVariableString(this.bin) + '/' + toBinaryRepresentationString(this.bin) + '}/' + this.matches + '/' + (this.combined ? '\u2713' : 'x') + ')';
  };
  QM$Term.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Term',
    interfaces: []
  };
  function QM$QM$Term_init(bins, $this) {
    $this = $this || Object.create(QM$Term.prototype);
    QM$Term.call($this, bins, ones(bins));
    return $this;
  }
  function QM$QM$Term_init_0(bins, a, b, $this) {
    $this = $this || Object.create(QM$Term.prototype);
    QM$Term.call($this, bins, ones(bins), a, b);
    a.combined = true;
    b.combined = true;
    $this.matches.addAll_brywnq$(a.matches);
    $this.matches.addAll_brywnq$(b.matches);
    return $this;
  }
  function QM$toString$lambda(it) {
    return toVariableString(it.bin);
  }
  QM.prototype.toString = function () {
    return 'QM(e=' + joinToString(this.essentials, ' + ', void 0, void 0, void 0, void 0, QM$toString$lambda) + ', compares=' + this.compares + ')';
  };
  QM.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'QM',
    interfaces: []
  };
  var AlgebraAnd;
  var AlgebraOr;
  var AlgebraNot;
  var NULL;
  function LogicExpressions() {
    LogicExpressions_instance = this;
  }
  LogicExpressions.prototype.parse = function (exp) {
    return (new LogicalExpressionParser(exp)).parse();
  };
  LogicExpressions.prototype.eval = function (e, varEval) {
    if (Kotlin.isType(e, Condition)) {
      switch (e.operator.name) {
        case 'AND':
          return this.eval(e.left, varEval) && this.eval(e.right, varEval);
        case 'OR':
          return this.eval(e.left, varEval) || this.eval(e.right, varEval);
        case 'XOR':
          return this.eval(e.left, varEval) ^ this.eval(e.right, varEval);
        default:return Kotlin.noWhenBranchMatched();
      }
    }
     else if (Kotlin.isType(e, Negative))
      return !this.eval(e.expression, varEval);
    else if (Kotlin.isType(e, Parentheses))
      return this.eval(e.expression, varEval);
    else if (Kotlin.isType(e, Variable))
      return varEval(e.name);
    else
      throw IllegalArgumentException_init('unexpected expression type ' + Kotlin.getKClassFromExpression(e) + ' ' + e);
  };
  function LogicExpressions$resolve$lambda(closure$variables, closure$cur) {
    return function (it) {
      var idx = closure$variables.indexOf_11rb$(it);
      return closure$cur[idx] === 1;
    };
  }
  LogicExpressions.prototype.resolve = function (e) {
    var tmp$;
    var variables = sorted(this.variables(e));
    var results = ArrayList_init();
    var n = variables.size;
    tmp$ = this.exhaustive_za3lpa$(n).iterator();
    while (tmp$.hasNext()) {
      var cur = tmp$.next();
      if (this.eval(e, LogicExpressions$resolve$lambda(variables, cur))) {
        results.add_11rb$(cur.slice());
      }
    }
    return new Pair(variables, results);
  };
  function Coroutine$LogicExpressions$exhaustive$lambda(closure$n_0, closure$result_0, closure$indexes_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$closure$n = closure$n_0;
    this.local$closure$result = closure$result_0;
    this.local$closure$indexes = closure$indexes_0;
    this.local$tmp$ = void 0;
    this.local$i = void 0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$LogicExpressions$exhaustive$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$LogicExpressions$exhaustive$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$LogicExpressions$exhaustive$lambda.prototype.constructor = Coroutine$LogicExpressions$exhaustive$lambda;
  Coroutine$LogicExpressions$exhaustive$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$tmp$ = this.local$closure$n;
            this.local$i = 0;
            this.state_0 = 2;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            if (this.local$i > this.local$tmp$) {
              this.state_0 = 5;
              continue;
            }

            this.state_0 = 3;
            this.result_0 = ones_0(this.local$$receiver, this.local$closure$result, this.local$closure$indexes, 0, this.local$closure$n - 1 | 0, 0, this.local$i, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 3:
            this.state_0 = 4;
            continue;
          case 4:
            this.local$i++;
            this.state_0 = 2;
            continue;
          case 5:
            return Unit;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function LogicExpressions$exhaustive$lambda(closure$n_0, closure$result_0, closure$indexes_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$LogicExpressions$exhaustive$lambda(closure$n_0, closure$result_0, closure$indexes_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  LogicExpressions.prototype.exhaustive_za3lpa$ = function (n) {
    var result = new Int32Array(n);
    var indexes = new Int32Array(n);
    return sequence(LogicExpressions$exhaustive$lambda(n, result, indexes));
  };
  LogicExpressions.prototype.loop = function (e, visitor) {
    visitor(e);
    if (Kotlin.isType(e, Condition)) {
      this.loop(e.left, visitor);
      this.loop(e.right, visitor);
    }
     else if (Kotlin.isType(e, Negative))
      this.loop(e.expression, visitor);
    else if (Kotlin.isType(e, Parentheses))
      this.loop(e.expression, visitor);
  };
  function LogicExpressions$variables$lambda(closure$names) {
    return function (it) {
      if (Kotlin.isType(it, Variable)) {
        closure$names.add_11rb$(it.name);
      }
      return Unit;
    };
  }
  LogicExpressions.prototype.variables = function (e) {
    var names = LinkedHashSet_init();
    this.loop(e, LogicExpressions$variables$lambda(names));
    return toList(names);
  };
  LogicExpressions.prototype.toExpressionString = function (e) {
    if (Kotlin.isType(e, Condition))
      return this.toExpressionString(e.left) + ' ' + toOperator(e.operator) + ' ' + this.toExpressionString(e.right);
    else if (Kotlin.isType(e, Negative))
      return '!' + this.toExpressionString(e.expression);
    else if (Kotlin.isType(e, Parentheses))
      return '(' + this.toExpressionString(e.expression) + ')';
    else if (Kotlin.isType(e, Variable))
      return e.name;
    else
      throw IllegalArgumentException_init('unexpected to string of ' + e);
  };
  LogicExpressions.prototype.toAlgebraString = function (e) {
    var tmp$;
    if (Kotlin.isType(e, Condition))
      tmp$ = toAlgebraString(e.left) + ' ' + String.fromCharCode(toAlgebraOperator(e.operator)) + ' ' + toAlgebraString(e.right);
    else if (Kotlin.isType(e, Negative))
      tmp$ = String.fromCharCode(AlgebraNot) + toAlgebraString(e.expression);
    else if (Kotlin.isType(e, Parentheses))
      tmp$ = '(' + toAlgebraString(e.expression) + ')';
    else if (Kotlin.isType(e, Variable))
      tmp$ = e.name;
    else
      throw IllegalArgumentException_init('unexpected to string of ' + e);
    return tmp$;
  };
  function LogicExpressions$printSyntaxTree$lambda(it) {
    println(it);
    return Unit;
  }
  LogicExpressions.prototype.printSyntaxTree_ybz7d4$ = function (e, out, indent) {
    if (out === void 0)
      out = LogicExpressions$printSyntaxTree$lambda;
    if (indent === void 0)
      indent = 0;
    if (Kotlin.isType(e, Condition)) {
      out(repeat('  ', indent) + 'Condition[operator=' + e.operator + ']');
      this.printSyntaxTree_ybz7d4$(e.left, out, indent + 1 | 0);
      this.printSyntaxTree_ybz7d4$(e.right, out, indent + 1 | 0);
    }
     else if (Kotlin.isType(e, Negative)) {
      out(repeat('  ', indent) + 'Negative');
      this.printSyntaxTree_ybz7d4$(e.expression, out, indent + 1 | 0);
    }
     else if (Kotlin.isType(e, Parentheses)) {
      out(repeat('  ', indent) + 'Parentheses');
      this.printSyntaxTree_ybz7d4$(e.expression, out, indent + 1 | 0);
    }
     else if (Kotlin.isType(e, Variable))
      out(repeat('  ', indent) + 'Variable[name=' + e.name + ']');
    else
      throw IllegalArgumentException_init('unexpected to string of ' + e);
  };
  LogicExpressions.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'LogicExpressions',
    interfaces: []
  };
  var LogicExpressions_instance = null;
  function LogicExpressions_getInstance() {
    if (LogicExpressions_instance === null) {
      new LogicExpressions();
    }
    return LogicExpressions_instance;
  }
  function toAlgebraString($receiver) {
    return LogicExpressions_getInstance().toAlgebraString($receiver);
  }
  function Expression() {
  }
  Expression.prototype.not = function () {
    return new Negative(this);
  };
  Expression.prototype.parentheses = function () {
    return new Parentheses(this);
  };
  Expression.prototype.and = function (right) {
    return new Condition(ConditionOperator$AND_getInstance(), this, right);
  };
  Expression.prototype.or = function (right) {
    return new Condition(ConditionOperator$OR_getInstance(), this, right);
  };
  Expression.prototype.toExpressionString = function () {
    return LogicExpressions_getInstance().toExpressionString(this);
  };
  Expression.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'Expression',
    interfaces: []
  };
  function Parentheses(expression) {
    this.expression = expression;
  }
  Parentheses.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Parentheses',
    interfaces: [Expression]
  };
  Parentheses.prototype.component1 = function () {
    return this.expression;
  };
  Parentheses.prototype.copy_jcuwxh$ = function (expression) {
    return new Parentheses(expression === void 0 ? this.expression : expression);
  };
  Parentheses.prototype.toString = function () {
    return 'Parentheses(expression=' + Kotlin.toString(this.expression) + ')';
  };
  Parentheses.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.expression) | 0;
    return result;
  };
  Parentheses.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.expression, other.expression))));
  };
  function Condition(operator, left, right) {
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
  Condition.prototype.equals = function (other) {
    var tmp$;
    if (!Kotlin.isType(other, Condition) || this.operator !== other.operator) {
      return false;
    }
    var a = hashCode(this.left);
    var b = hashCode(this.right);
    var oa = hashCode(other.left);
    var ob = hashCode(other.right);
    if (a > b) {
      if (oa > ob) {
        tmp$ = (equals(this.left, other.left) && equals(this.right, other.right));
      }
       else {
        tmp$ = (equals(this.left, other.right) && equals(this.right, other.left));
      }
    }
     else {
      if (oa > ob) {
        tmp$ = (equals(this.left, other.right) && equals(this.right, other.left));
      }
       else {
        tmp$ = (equals(this.left, other.left) && equals(this.right, other.right));
      }
    }
    return tmp$;
  };
  Condition.prototype.hashCode = function () {
    var r = 1;
    r = addHasCode(r, this.operator);
    var a = hashCode(this.left);
    var b = hashCode(this.right);
    if (a > b) {
      r = addHasCode(addHasCode(r, a), b);
    }
     else {
      r = addHasCode(addHasCode(r, b), a);
    }
    return r;
  };
  Condition.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Condition',
    interfaces: [Expression]
  };
  Condition.prototype.component1 = function () {
    return this.operator;
  };
  Condition.prototype.component2 = function () {
    return this.left;
  };
  Condition.prototype.component3 = function () {
    return this.right;
  };
  Condition.prototype.copy_gigvwi$ = function (operator, left, right) {
    return new Condition(operator === void 0 ? this.operator : operator, left === void 0 ? this.left : left, right === void 0 ? this.right : right);
  };
  Condition.prototype.toString = function () {
    return 'Condition(operator=' + Kotlin.toString(this.operator) + (', left=' + Kotlin.toString(this.left)) + (', right=' + Kotlin.toString(this.right)) + ')';
  };
  function Negative(expression) {
    this.expression = expression;
  }
  Negative.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Negative',
    interfaces: [Expression]
  };
  Negative.prototype.component1 = function () {
    return this.expression;
  };
  Negative.prototype.copy_jcuwxh$ = function (expression) {
    return new Negative(expression === void 0 ? this.expression : expression);
  };
  Negative.prototype.toString = function () {
    return 'Negative(expression=' + Kotlin.toString(this.expression) + ')';
  };
  Negative.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.expression) | 0;
    return result;
  };
  Negative.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.expression, other.expression))));
  };
  function Variable(name) {
    this.name = name;
  }
  Variable.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Variable',
    interfaces: [Expression]
  };
  Variable.prototype.component1 = function () {
    return this.name;
  };
  Variable.prototype.copy_61zpoe$ = function (name) {
    return new Variable(name === void 0 ? this.name : name);
  };
  Variable.prototype.toString = function () {
    return 'Variable(name=' + Kotlin.toString(this.name) + ')';
  };
  Variable.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    return result;
  };
  Variable.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.name, other.name))));
  };
  function ConditionOperator(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function ConditionOperator_initFields() {
    ConditionOperator_initFields = function () {
    };
    ConditionOperator$AND_instance = new ConditionOperator('AND', 0);
    ConditionOperator$OR_instance = new ConditionOperator('OR', 1);
    ConditionOperator$XOR_instance = new ConditionOperator('XOR', 2);
  }
  var ConditionOperator$AND_instance;
  function ConditionOperator$AND_getInstance() {
    ConditionOperator_initFields();
    return ConditionOperator$AND_instance;
  }
  var ConditionOperator$OR_instance;
  function ConditionOperator$OR_getInstance() {
    ConditionOperator_initFields();
    return ConditionOperator$OR_instance;
  }
  var ConditionOperator$XOR_instance;
  function ConditionOperator$XOR_getInstance() {
    ConditionOperator_initFields();
    return ConditionOperator$XOR_instance;
  }
  ConditionOperator.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ConditionOperator',
    interfaces: [Enum]
  };
  function ConditionOperator$values() {
    return [ConditionOperator$AND_getInstance(), ConditionOperator$OR_getInstance(), ConditionOperator$XOR_getInstance()];
  }
  ConditionOperator.values = ConditionOperator$values;
  function ConditionOperator$valueOf(name) {
    switch (name) {
      case 'AND':
        return ConditionOperator$AND_getInstance();
      case 'OR':
        return ConditionOperator$OR_getInstance();
      case 'XOR':
        return ConditionOperator$XOR_getInstance();
      default:throwISE('No enum constant me.wener.kori.logic.exp.ConditionOperator.' + name);
    }
  }
  ConditionOperator.valueOf_61zpoe$ = ConditionOperator$valueOf;
  function toOperator($receiver) {
    switch ($receiver.name) {
      case 'AND':
        return '&&';
      case 'OR':
        return '||';
      case 'XOR':
        return '^';
      default:return Kotlin.noWhenBranchMatched();
    }
  }
  function toAlgebraOperator($receiver) {
    switch ($receiver.name) {
      case 'AND':
        return AlgebraAnd;
      case 'OR':
        return AlgebraOr;
      default:throw IllegalArgumentException_init('no algebra operator for ' + $receiver);
    }
  }
  function Coroutine$ones($receiver_0, result_0, indexes_0, start_0, end_0, index_0, n_0, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.exceptionState_0 = 1;
    this.local$i = void 0;
    this.local$$receiver = $receiver_0;
    this.local$result = result_0;
    this.local$indexes = indexes_0;
    this.local$start = start_0;
    this.local$end = end_0;
    this.local$index = index_0;
    this.local$n = n_0;
  }
  Coroutine$ones.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$ones.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$ones.prototype.constructor = Coroutine$ones;
  Coroutine$ones.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            if (this.local$index === this.local$n) {
              fill(this.local$result, 0);
              for (var i = 0; i < this.local$n; i++) {
                this.local$result[this.local$indexes[i]] = 1;
              }
              this.state_0 = 5;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$result, this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              continue;
            }
             else {
              this.local$i = this.local$start;
              this.state_0 = 2;
              continue;
            }

          case 1:
            throw this.exception_0;
          case 2:
            if (this.local$i > this.local$end || (this.local$end - this.local$i + 1 | 0) < (this.local$n - this.local$index | 0)) {
              this.state_0 = 4;
              continue;
            }

            this.local$indexes[this.local$index] = this.local$i;
            this.state_0 = 3;
            this.result_0 = ones_0(this.local$$receiver, this.local$result, this.local$indexes, this.local$i + 1 | 0, this.local$end, this.local$index + 1 | 0, this.local$n, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 3:
            this.local$i = this.local$i + 1 | 0;
            this.state_0 = 2;
            continue;
          case 4:
            this.state_0 = 6;
            continue;
          case 5:
            this.state_0 = 6;
            continue;
          case 6:
            return;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function ones_0($receiver_0, result_0, indexes_0, start_0, end_0, index_0, n_0, continuation_0, suspended) {
    var instance = new Coroutine$ones($receiver_0, result_0, indexes_0, start_0, end_0, index_0, n_0, continuation_0);
    if (suspended)
      return instance;
    else
      return instance.doResume(null);
  }
  function fill($receiver, v) {
    var n = $receiver.length;
    for (var i = 0; i < n; i++) {
      $receiver[i] = v;
    }
  }
  function replace($receiver, f, t) {
    var n = $receiver.length;
    for (var i = 0; i < n; i++) {
      if ($receiver[i] === f) {
        $receiver[i] = t;
      }
    }
  }
  function LogicalExpressionParser(exp) {
    this.exp = exp;
    this.idx = 0;
    this.c = toBoxedChar(NULL);
    this.lastRead = false;
    this.priorities = mutableListOf([0]);
  }
  LogicalExpressionParser.prototype.parse = function () {
    this.idx = 0;
    var e = this.parseExpression();
    this.unexpected_0(NULL, this.read_0());
    return e;
  };
  LogicalExpressionParser.prototype.parseExpression = function () {
    this.read_0();
    return this.parseOr();
  };
  function LogicalExpressionParser$parseOr$lambda(this$LogicalExpressionParser, closure$left) {
    return function () {
      switch (this$LogicalExpressionParser.read_0()) {
        case 124:
          this$LogicalExpressionParser.next_0(124);
          return new Condition(ConditionOperator$OR_getInstance(), closure$left, this$LogicalExpressionParser.parseExpression());
        case 8744:
          return new Condition(ConditionOperator$OR_getInstance(), closure$left, this$LogicalExpressionParser.parseExpression());
        default:this$LogicalExpressionParser.unread();
          return null;
      }
    };
  }
  LogicalExpressionParser.prototype.parseOr = function () {
    var tmp$;
    var left = this.parseAnd();
    return (tmp$ = this.withPriority_xsjjga$(0, LogicalExpressionParser$parseOr$lambda(this, left))) != null ? tmp$ : left;
  };
  function LogicalExpressionParser$parseAnd$lambda(this$LogicalExpressionParser, closure$left) {
    return function () {
      switch (this$LogicalExpressionParser.read_0()) {
        case 38:
          this$LogicalExpressionParser.next_0(38);
          return new Condition(ConditionOperator$AND_getInstance(), closure$left, this$LogicalExpressionParser.parseExpression());
        case 8743:
          return new Condition(ConditionOperator$AND_getInstance(), closure$left, this$LogicalExpressionParser.parseExpression());
        default:this$LogicalExpressionParser.unread();
          return null;
      }
    };
  }
  LogicalExpressionParser.prototype.parseAnd = function () {
    var tmp$;
    var left = this.parseXor();
    return (tmp$ = this.withPriority_xsjjga$(1, LogicalExpressionParser$parseAnd$lambda(this, left))) != null ? tmp$ : left;
  };
  function LogicalExpressionParser$parseXor$lambda(this$LogicalExpressionParser, closure$left) {
    return function () {
      if (this$LogicalExpressionParser.read_0() === 94)
        return new Condition(ConditionOperator$XOR_getInstance(), closure$left, this$LogicalExpressionParser.parseExpression());
      else {
        this$LogicalExpressionParser.unread();
        return null;
      }
    };
  }
  LogicalExpressionParser.prototype.parseXor = function () {
    var tmp$;
    var left = this.parseNegative_0();
    return (tmp$ = this.withPriority_xsjjga$(3, LogicalExpressionParser$parseXor$lambda(this, left))) != null ? tmp$ : left;
  };
  LogicalExpressionParser.prototype.unread = function () {
    if (this.lastRead) {
      this.idx = this.idx - 1 | 0;
    }
  };
  LogicalExpressionParser.prototype.withPriority_xsjjga$ = function (v, f) {
    if (v < last_0(this.priorities)) {
      return null;
    }
    this.priorities.add_11rb$(v);
    var t = f();
    this.priorities.removeAt_za3lpa$(get_lastIndex(this.priorities));
    return t;
  };
  function LogicalExpressionParser$parseNegative$lambda(this$LogicalExpressionParser) {
    return function () {
      return new Negative(this$LogicalExpressionParser.parseExpression());
    };
  }
  LogicalExpressionParser.prototype.parseNegative_0 = function () {
    if (unboxChar(this.c) === 33 || unboxChar(this.c) === AlgebraNot) {
      return ensureNotNull(this.withPriority_xsjjga$(4, LogicalExpressionParser$parseNegative$lambda(this)));
    }
    return this.parseParentheses_0();
  };
  LogicalExpressionParser.prototype.parseParentheses_0 = function () {
    if (unboxChar(this.c) === 40) {
      this.priorities.add_11rb$(0);
      var e = new Parentheses(this.parseExpression());
      this.unexpected_0(41, this.read_0());
      this.priorities.removeAt_za3lpa$(get_lastIndex(this.priorities));
      return e;
    }
    return this.parseVariable_0();
  };
  LogicalExpressionParser.prototype.parseVariable_0 = function () {
    if (this.isVariableLeading_0(unboxChar(this.c))) {
      var s = this.idx - 1 | 0;
      while (this.isVariablePending_0(unboxChar(this.next_1())))
      ;
      this.unread();
      var $receiver = this.exp;
      var endIndex = this.idx;
      var name = $receiver.substring(s, endIndex);
      return new Variable(name);
    }
    throw new LogicalExpressionSyntaxException("unexpected '" + toMessageString(unboxChar(this.c)) + "' at " + this.idx);
  };
  LogicalExpressionParser.prototype.isVariableLeading_0 = function (c) {
    return (new CharRange(97, 122)).contains_mef7kx$(c) || (new CharRange(65, 90)).contains_mef7kx$(c);
  };
  LogicalExpressionParser.prototype.isVariablePending_0 = function (c) {
    return this.isVariableLeading_0(c) || (new CharRange(57, 48)).contains_mef7kx$(c);
  };
  LogicalExpressionParser.prototype.read_0 = function () {
    while (unboxChar(this.next_1()) === 32)
    ;
    return unboxChar(this.c);
  };
  LogicalExpressionParser.prototype.next_1 = function () {
    var tmp$;
    if (this.idx >= this.exp.length) {
      this.lastRead = false;
      this.c = toBoxedChar(NULL);
    }
     else {
      this.lastRead = true;
      this.c = toBoxedChar(this.exp.charCodeAt((tmp$ = this.idx, this.idx = tmp$ + 1 | 0, tmp$)));
    }
    return this.c;
  };
  LogicalExpressionParser.prototype.next_0 = function (expected) {
    var c = unboxChar(this.next_1());
    this.unexpected_0(expected, c);
    return toBoxedChar(c);
  };
  LogicalExpressionParser.prototype.unexpected_0 = function (expected, c) {
    if (expected !== c) {
      throw new LogicalExpressionSyntaxException("expected '" + toMessageString(expected) + "' got '" + toMessageString(c) + "' at " + this.idx);
    }
  };
  LogicalExpressionParser.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LogicalExpressionParser',
    interfaces: []
  };
  function toMessageString($receiver) {
    return $receiver === NULL ? 'EOF' : String.fromCharCode($receiver);
  }
  function LogicalExpressionSyntaxException(message) {
    RuntimeException_init(message, this);
    this.name = 'LogicalExpressionSyntaxException';
  }
  LogicalExpressionSyntaxException.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LogicalExpressionSyntaxException',
    interfaces: [RuntimeException]
  };
  function then$lambda(closure$pre, closure$next) {
    return function (e, parent) {
      var tmp$ = closure$pre(e, parent);
      var a = tmp$.component1()
      , ac = tmp$.component2();
      var tmp$_0 = closure$next(a, parent);
      var b = tmp$_0.component1()
      , bc = tmp$_0.component2();
      return new Pair(b, ac || bc);
    };
  }
  function then($receiver, next) {
    var pre = $receiver;
    return then$lambda(pre, next);
  }
  function Rewriters() {
    Rewriters_instance = this;
  }
  Rewriters.prototype.rewrite = function (e, rewriter, parent) {
    if (parent === void 0)
      parent = null;
    var tmp$ = rewriter(e, parent);
    var a = tmp$.component1()
    , changed = tmp$.component2();
    if (changed) {
      return this.rewrite(a, rewriter);
    }
    if (Kotlin.isType(e, Condition)) {
      e.left = this.rewrite(e.left, rewriter, e);
      e.right = this.rewrite(e.right, rewriter, e);
    }
     else if (Kotlin.isType(e, Negative))
      e.expression = this.rewrite(e.expression, rewriter, e);
    else if (Kotlin.isType(e, Parentheses))
      e.expression = this.rewrite(e.expression, rewriter, e);
    return e;
  };
  function Rewriters$chain$lambda(closure$rewriters) {
    return function (e, parent) {
      var tmp$, tmp$_0;
      var exp = e;
      var changed = false;
      tmp$ = closure$rewriters;
      for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
        var rewriter = tmp$[tmp$_0];
        var tmp$_1 = rewriter(exp, parent);
        var a = tmp$_1.component1()
        , b = tmp$_1.component2();
        exp = a;
        changed = changed || b;
      }
      return new Pair(exp, changed);
    };
  }
  Rewriters.prototype.chain = function (rewriters) {
    return Rewriters$chain$lambda(rewriters);
  };
  Rewriters.prototype.simplify = function (e, parent) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    if (Kotlin.isType(e, Condition)) {
      if (e.operator === ConditionOperator$AND_getInstance() || e.operator === ConditionOperator$OR_getInstance()) {
        if (equals(e.left, e.right)) {
          return new Pair(e.left, true);
        }
      }
      if (e.operator === ConditionOperator$OR_getInstance()) {
        var it = e.right;
        var tmp$_3 = Kotlin.isType(it, Parentheses);
        if (tmp$_3) {
          var it_0 = it.expression;
          tmp$_3 = (Kotlin.isType(it_0, Condition) && it_0.operator === ConditionOperator$AND_getInstance());
        }
        if (tmp$_3) {
          var nest = Kotlin.isType(tmp$_0 = (Kotlin.isType(tmp$ = e.right, Parentheses) ? tmp$ : throwCCE()).expression, Condition) ? tmp$_0 : throwCCE();
          if (equals(e.left, nest.left) || equals(e.left, nest.right)) {
            return new Pair(e.left, true);
          }
        }
        var it_1 = e.left;
        var tmp$_4 = Kotlin.isType(it_1, Parentheses);
        if (tmp$_4) {
          var it_2 = it_1.expression;
          tmp$_4 = (Kotlin.isType(it_2, Condition) && it_2.operator === ConditionOperator$AND_getInstance());
        }
        if (tmp$_4) {
          var nest_0 = Kotlin.isType(tmp$_2 = (Kotlin.isType(tmp$_1 = e.left, Parentheses) ? tmp$_1 : throwCCE()).expression, Condition) ? tmp$_2 : throwCCE();
          if (equals(e.right, nest_0.left) || equals(e.right, nest_0.right)) {
            return new Pair(e.left, true);
          }
        }
      }
      if (hashCode(e.left) < hashCode(e.right)) {
        var tmp = e.right;
        e.right = e.left;
        e.left = tmp;
        return new Pair(e, true);
      }
    }
    return new Pair(e, false);
  };
  Rewriters.prototype.unnecessaryParentheses = function (e, parent) {
    var changed = false;
    if (Kotlin.isType(e, Parentheses)) {
      var nest = e.expression;
      while (Kotlin.isType(nest, Parentheses)) {
        changed = true;
        nest = nest.expression;
      }
      if (Kotlin.isType(nest, Variable) || Kotlin.isType(nest, Negative)) {
        return new Pair(nest, true);
      }
      if (parent == null) {
        return new Pair(nest, true);
      }
      if (Kotlin.isType(nest, Condition) && nest.operator === ConditionOperator$OR_getInstance() && Kotlin.isType(parent, Condition) && parent.operator === ConditionOperator$OR_getInstance()) {
        return new Pair(nest, true);
      }
      if (Kotlin.isType(nest, Condition) && nest.operator === ConditionOperator$AND_getInstance() && Kotlin.isType(parent, Condition) && parent.operator === ConditionOperator$AND_getInstance()) {
        return new Pair(nest, true);
      }
      e.expression = nest;
    }
    return new Pair(e, changed);
  };
  Rewriters.prototype.doubleNegation = function (e, parent) {
    if (Kotlin.isType(e, Negative)) {
      var nest = e.expression;
      while (Kotlin.isType(nest, Parentheses)) {
        nest = nest.expression;
      }
      if (Kotlin.isType(nest, Negative)) {
        return new Pair(nest.expression, true);
      }
    }
    return new Pair(e, false);
  };
  Rewriters.prototype.xor2sop = function (e, parent) {
    if (Kotlin.isType(e, Condition) && e.operator === ConditionOperator$XOR_getInstance()) {
      var a = e.left;
      var b = e.right;
      e.operator = ConditionOperator$OR_getInstance();
      e.left = a.and(b.not()).parentheses();
      e.right = a.not().and(b).parentheses();
      return new Pair(e, true);
    }
    return new Pair(e, false);
  };
  Rewriters.prototype.sop = function (e, parent) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    if (Kotlin.isType(e, Condition) && e.operator === ConditionOperator$AND_getInstance()) {
      var a = e.left;
      var it = a;
      var tmp$_3 = Kotlin.isType(it, Parentheses);
      if (tmp$_3) {
        var it_0 = it.expression;
        tmp$_3 = (Kotlin.isType(it_0, Condition) && it_0.operator === ConditionOperator$OR_getInstance());
      }
      if (tmp$_3) {
        var nest = Kotlin.isType(tmp$_0 = (Kotlin.isType(tmp$ = a, Parentheses) ? tmp$ : throwCCE()).expression, Condition) ? tmp$_0 : throwCCE();
        e.operator = ConditionOperator$OR_getInstance();
        e.left = nest.left.and(e.right).parentheses();
        e.right = nest.right.and(e.right).parentheses();
        return new Pair(e, true);
      }
      a = e.right;
      var it_1 = a;
      var tmp$_4 = Kotlin.isType(it_1, Parentheses);
      if (tmp$_4) {
        var it_2 = it_1.expression;
        tmp$_4 = (Kotlin.isType(it_2, Condition) && it_2.operator === ConditionOperator$OR_getInstance());
      }
      if (tmp$_4) {
        var nest_0 = Kotlin.isType(tmp$_2 = (Kotlin.isType(tmp$_1 = a, Parentheses) ? tmp$_1 : throwCCE()).expression, Condition) ? tmp$_2 : throwCCE();
        e.operator = ConditionOperator$OR_getInstance();
        e.right = nest_0.right.and(e.left).parentheses();
        e.left = nest_0.left.and(e.left).parentheses();
        return new Pair(e, true);
      }
    }
    return new Pair(e, false);
  };
  Rewriters.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Rewriters',
    interfaces: []
  };
  var Rewriters_instance = null;
  function Rewriters_getInstance() {
    if (Rewriters_instance === null) {
      new Rewriters();
    }
    return Rewriters_instance;
  }
  function Mathx() {
    Mathx_instance = this;
  }
  Mathx.prototype.factorial_s8cxhz$ = function (n) {
    if (equals(n, L0))
      return L1;
    else if (equals(n, L1))
      return L1;
    else if (equals(n, L2))
      return L2;
    else if (equals(n, L3))
      return L6;
    else
      return n.multiply(this.factorial_s8cxhz$(n.subtract(Kotlin.Long.fromInt(1))));
  };
  Mathx.prototype.pow_yhmem3$ = function (base, power) {
    var tmp$, tmp$_0;
    var b = base;
    var k = power;
    if (-2 <= b.toNumber() && b.toNumber() <= 2) {
      tmp$ = b;
      if (equals(tmp$, L0))
        tmp$_0 = k === 0 ? L1 : L0;
      else if (equals(tmp$, L1))
        tmp$_0 = L1;
      else if (equals(tmp$, L_1))
        tmp$_0 = (k & 1) === 0 ? L1 : L_1;
      else if (equals(tmp$, L2))
        tmp$_0 = k < 64 ? L1.shiftLeft(k) : L0;
      else if (equals(tmp$, L_2))
        if (k < 64) {
          tmp$_0 = (k & 1) === 0 ? L1.shiftLeft(k) : L1.shiftLeft(k).unaryMinus();
        }
         else {
          tmp$_0 = L0;
        }
       else
        throw AssertionError_init();
      return tmp$_0;
    }
    var accum = L1;
    while (true) {
      switch (k) {
        case 0:
          return accum;
        case 1:
          return accum.multiply(b);
        default:accum = accum.multiply((k & 1) === 0 ? L1 : b);
          b = b.multiply(b);
          break;
      }
      k = k >> 1;
    }
  };
  Mathx.prototype.pow_vux9f0$ = function (base, power) {
    var tmp$;
    var b = base;
    var k = power;
    if (-2 <= b && b <= 2) {
      switch (b) {
        case 0:
          tmp$ = k === 0 ? 1 : 0;
          break;
        case 1:
          tmp$ = 1;
          break;
        case -1:
          tmp$ = (k & 1) === 0 ? 1 : -1;
          break;
        case 2:
          tmp$ = k < 64 ? 1 << k : 0;
          break;
        case -2:
          if (k < 64) {
            tmp$ = (k & 1) === 0 ? 1 << k : -(1 << k) | 0;
          }
           else {
            tmp$ = 0;
          }

          break;
        default:throw AssertionError_init();
      }
      return tmp$;
    }
    var accum = 1;
    while (true) {
      switch (k) {
        case 0:
          return accum;
        case 1:
          return Kotlin.imul(accum, b);
        default:accum = Kotlin.imul(accum, (k & 1) === 0 ? 1 : b);
          b = Kotlin.imul(b, b);
          break;
      }
      k = k >> 1;
    }
  };
  Mathx.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Mathx',
    interfaces: []
  };
  var Mathx_instance = null;
  function Mathx_getInstance() {
    if (Mathx_instance === null) {
      new Mathx();
    }
    return Mathx_instance;
  }
  function factorial($receiver) {
    return Mathx_getInstance().factorial_s8cxhz$($receiver);
  }
  function pow($receiver, n) {
    return Mathx_getInstance().pow_yhmem3$($receiver, n);
  }
  function factorial_0($receiver) {
    return factorial(Kotlin.Long.fromInt($receiver));
  }
  function pow_0($receiver, n) {
    return Mathx_getInstance().pow_vux9f0$($receiver, n);
  }
  var ifPresent = defineInlineFunction('kori.me.wener.kori.util.ifPresent_chljag$', function ($receiver, callback) {
    return $receiver != null ? callback($receiver) : null;
  });
  var isPresent = defineInlineFunction('kori.me.wener.kori.util.isPresent_8xps0b$', function ($receiver) {
    return $receiver != null;
  });
  var isAbsent = defineInlineFunction('kori.me.wener.kori.util.isAbsent_8xps0b$', function ($receiver) {
    return $receiver == null;
  });
  function pollFirst($receiver) {
    return $receiver.removeAt_za3lpa$(0);
  }
  function pollLast($receiver) {
    return $receiver.removeAt_za3lpa$(get_lastIndex($receiver));
  }
  function addHasCode($receiver, v) {
    var tmp$;
    return ($receiver * 31 | 0) + ((tmp$ = v != null ? hashCode(v) : null) != null ? tmp$ : 0) | 0;
  }
  function hello() {
    return 'Hello from JS';
  }
  function Sample() {
  }
  Sample.prototype.checkMe = function () {
    return 12;
  };
  Sample.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Sample',
    interfaces: []
  };
  function Platform() {
    Platform_instance = this;
    this.name = 'JS';
  }
  Platform.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Platform',
    interfaces: []
  };
  var Platform_instance = null;
  function Platform_getInstance() {
    if (Platform_instance === null) {
      new Platform();
    }
    return Platform_instance;
  }
  var package$me = _.me || (_.me = {});
  var package$wener = package$me.wener || (package$me.wener = {});
  var package$kori = package$wener.kori || (package$wener.kori = {});
  var package$combine = package$kori.combine || (package$kori.combine = {});
  Object.defineProperty(package$combine, 'Combinatorics', {
    get: Combinatorics_getInstance
  });
  var package$logic = package$kori.logic || (package$kori.logic = {});
  package$logic.ones_tmsbgo$ = ones;
  package$logic.toVariableString_tmsbgo$ = toVariableString;
  package$logic.toBinaryRepresentationString_tmsbgo$ = toBinaryRepresentationString;
  package$logic.toBinaryIntArray_if0zpk$ = toBinaryIntArray;
  package$logic.toBinaryIntArray_dqglrj$ = toBinaryIntArray_0;
  package$logic.fromBinaryIntArrayToLong_tmsbgo$ = fromBinaryIntArrayToLong;
  Object.defineProperty(package$logic, 'Logics', {
    get: Logics_getInstance
  });
  Object.defineProperty(MQM, 'Companion', {
    get: MQM$Companion_getInstance
  });
  package$logic.MQM = MQM;
  Object.defineProperty(package$logic, 'PetrickMethods', {
    get: PetrickMethods_getInstance
  });
  Object.defineProperty(QM, 'Companion', {
    get: QM$Companion_getInstance
  });
  $$importsForInline$$.kori = _;
  QM.Term_init_q5rwfd$ = QM$QM$Term_init;
  QM.Term_init_z38659$ = QM$QM$Term_init_0;
  QM.Term = QM$Term;
  package$logic.QM = QM;
  var package$exp = package$logic.exp || (package$logic.exp = {});
  Object.defineProperty(package$exp, 'AlgebraAnd', {
    get: function () {
      return AlgebraAnd;
    }
  });
  Object.defineProperty(package$exp, 'AlgebraOr', {
    get: function () {
      return AlgebraOr;
    }
  });
  Object.defineProperty(package$exp, 'AlgebraNot', {
    get: function () {
      return AlgebraNot;
    }
  });
  Object.defineProperty(package$exp, 'NULL', {
    get: function () {
      return NULL;
    }
  });
  Object.defineProperty(package$exp, 'LogicExpressions', {
    get: LogicExpressions_getInstance
  });
  package$exp.toAlgebraString_vtpx22$ = toAlgebraString;
  package$exp.Expression = Expression;
  package$exp.Parentheses = Parentheses;
  package$exp.Condition = Condition;
  package$exp.Negative = Negative;
  package$exp.Variable = Variable;
  Object.defineProperty(ConditionOperator, 'AND', {
    get: ConditionOperator$AND_getInstance
  });
  Object.defineProperty(ConditionOperator, 'OR', {
    get: ConditionOperator$OR_getInstance
  });
  Object.defineProperty(ConditionOperator, 'XOR', {
    get: ConditionOperator$XOR_getInstance
  });
  package$exp.ConditionOperator = ConditionOperator;
  package$exp.toOperator_2ds0r1$ = toOperator;
  package$exp.toAlgebraOperator_2ds0r1$ = toAlgebraOperator;
  package$exp.ones_nqchij$ = ones_0;
  package$exp.fill_c03ot6$ = fill;
  package$exp.replace_6pxxqk$ = replace;
  package$exp.LogicalExpressionSyntaxException = LogicalExpressionSyntaxException;
  package$exp.then_ftk7yp$ = then;
  Object.defineProperty(package$exp, 'Rewriters', {
    get: Rewriters_getInstance
  });
  var package$math = package$kori.math || (package$kori.math = {});
  Object.defineProperty(package$math, 'Mathx', {
    get: Mathx_getInstance
  });
  package$math.factorial_mts6qi$ = factorial;
  package$math.pow_if0zpk$ = pow;
  package$math.factorial_s8ev3n$ = factorial_0;
  package$math.pow_dqglrj$ = pow_0;
  var package$util = package$kori.util || (package$kori.util = {});
  package$util.ifPresent_chljag$ = ifPresent;
  package$util.isPresent_8xps0b$ = isPresent;
  package$util.isAbsent_8xps0b$ = isAbsent;
  package$util.pollFirst_50pv6o$ = pollFirst;
  package$util.pollLast_50pv6o$ = pollLast;
  package$util.addHasCode_eiovh$ = addHasCode;
  var package$sample = _.sample || (_.sample = {});
  package$sample.hello = hello;
  package$sample.Sample = Sample;
  Object.defineProperty(package$sample, 'Platform', {
    get: Platform_getInstance
  });
  Parentheses.prototype.not = Expression.prototype.not;
  Parentheses.prototype.parentheses = Expression.prototype.parentheses;
  Parentheses.prototype.and = Expression.prototype.and;
  Parentheses.prototype.or = Expression.prototype.or;
  Parentheses.prototype.toExpressionString = Expression.prototype.toExpressionString;
  Condition.prototype.not = Expression.prototype.not;
  Condition.prototype.parentheses = Expression.prototype.parentheses;
  Condition.prototype.and = Expression.prototype.and;
  Condition.prototype.or = Expression.prototype.or;
  Condition.prototype.toExpressionString = Expression.prototype.toExpressionString;
  Negative.prototype.not = Expression.prototype.not;
  Negative.prototype.parentheses = Expression.prototype.parentheses;
  Negative.prototype.and = Expression.prototype.and;
  Negative.prototype.or = Expression.prototype.or;
  Negative.prototype.toExpressionString = Expression.prototype.toExpressionString;
  Variable.prototype.not = Expression.prototype.not;
  Variable.prototype.parentheses = Expression.prototype.parentheses;
  Variable.prototype.and = Expression.prototype.and;
  Variable.prototype.or = Expression.prototype.or;
  Variable.prototype.toExpressionString = Expression.prototype.toExpressionString;
  AboveLine = 773;
  AlgebraAnd = 8743;
  AlgebraOr = 8744;
  AlgebraNot = 172;
  NULL = toChar(0);
  Kotlin.defineModule('kori', _);
  return _;
}(module.exports, require('kotlin')));

//# sourceMappingURL=kori.js.map
