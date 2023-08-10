'use strict'
var ht = Object.create
var D = Object.defineProperty
var ct = Object.getOwnPropertyDescriptor
var pt = Object.getOwnPropertyNames
var mt = Object.getPrototypeOf,
  ft = Object.prototype.hasOwnProperty
var O = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports),
  dt = (r, e) => {
    for (var t in e) D(r, t, { get: e[t], enumerable: !0 })
  },
  _e = (r, e, t, i) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let n of pt(e))
        !ft.call(r, n) &&
          n !== t &&
          D(r, n, {
            get: () => e[n],
            enumerable: !(i = ct(e, n)) || i.enumerable,
          })
    return r
  }
var S = (r, e, t) => (
    (t = r != null ? ht(mt(r)) : {}),
    _e(
      e || !r || !r.__esModule
        ? D(t, 'default', { value: r, enumerable: !0 })
        : t,
      r
    )
  ),
  gt = (r) => _e(D({}, '__esModule', { value: !0 }), r)
var be = O((mi, _t) => {
  _t.exports = {
    name: 'dotenv',
    version: '16.0.3',
    description: 'Loads environment variables from .env file',
    main: 'lib/main.js',
    types: 'lib/main.d.ts',
    exports: {
      '.': {
        require: './lib/main.js',
        types: './lib/main.d.ts',
        default: './lib/main.js',
      },
      './config': './config.js',
      './config.js': './config.js',
      './lib/env-options': './lib/env-options.js',
      './lib/env-options.js': './lib/env-options.js',
      './lib/cli-options': './lib/cli-options.js',
      './lib/cli-options.js': './lib/cli-options.js',
      './package.json': './package.json',
    },
    scripts: {
      'dts-check': 'tsc --project tests/types/tsconfig.json',
      lint: 'standard',
      'lint-readme': 'standard-markdown',
      pretest: 'npm run lint && npm run dts-check',
      test: 'tap tests/*.js --100 -Rspec',
      prerelease: 'npm test',
      release: 'standard-version',
    },
    repository: { type: 'git', url: 'git://github.com/motdotla/dotenv.git' },
    keywords: [
      'dotenv',
      'env',
      '.env',
      'environment',
      'variables',
      'config',
      'settings',
    ],
    readmeFilename: 'README.md',
    license: 'BSD-2-Clause',
    devDependencies: {
      '@types/node': '^17.0.9',
      decache: '^4.6.1',
      dtslint: '^3.7.0',
      sinon: '^12.0.1',
      standard: '^16.0.4',
      'standard-markdown': '^7.1.0',
      'standard-version': '^9.3.2',
      tap: '^15.1.6',
      tar: '^6.1.11',
      typescript: '^4.5.4',
    },
    engines: { node: '>=12' },
  }
})
var Ce = O((fi, M) => {
  var bt = require('fs'),
    Oe = require('path'),
    Ot = require('os'),
    Ct = be(),
    At = Ct.version,
    xt =
      /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm
  function wt(r) {
    let e = {},
      t = r.toString()
    t = t.replace(
      /\r\n?/gm,
      `
`
    )
    let i
    for (; (i = xt.exec(t)) != null; ) {
      let n = i[1],
        s = i[2] || ''
      s = s.trim()
      let o = s[0]
      ;(s = s.replace(/^(['"`])([\s\S]*)\1$/gm, '$2')),
        o === '"' &&
          ((s = s.replace(
            /\\n/g,
            `
`
          )),
          (s = s.replace(/\\r/g, '\r'))),
        (e[n] = s)
    }
    return e
  }
  function Y(r) {
    console.log(`[dotenv@${At}][DEBUG] ${r}`)
  }
  function yt(r) {
    return r[0] === '~' ? Oe.join(Ot.homedir(), r.slice(1)) : r
  }
  function vt(r) {
    let e = Oe.resolve(process.cwd(), '.env'),
      t = 'utf8',
      i = !!(r && r.debug),
      n = !!(r && r.override)
    r &&
      (r.path != null && (e = yt(r.path)),
      r.encoding != null && (t = r.encoding))
    try {
      let s = I.parse(bt.readFileSync(e, { encoding: t }))
      return (
        Object.keys(s).forEach(function (o) {
          Object.prototype.hasOwnProperty.call(process.env, o)
            ? (n === !0 && (process.env[o] = s[o]),
              i &&
                Y(
                  n === !0
                    ? `"${o}" is already defined in \`process.env\` and WAS overwritten`
                    : `"${o}" is already defined in \`process.env\` and was NOT overwritten`
                ))
            : (process.env[o] = s[o])
        }),
        { parsed: s }
      )
    } catch (s) {
      return i && Y(`Failed to load ${e} ${s.message}`), { error: s }
    }
  }
  var I = { config: vt, parse: wt }
  M.exports.config = I.config
  M.exports.parse = I.parse
  M.exports = I
})
var V = O((J) => {
  var j = class extends Error {
      constructor(e, t, i) {
        super(i),
          Error.captureStackTrace(this, this.constructor),
          (this.name = this.constructor.name),
          (this.code = t),
          (this.exitCode = e),
          (this.nestedError = void 0)
      }
    },
    K = class extends j {
      constructor(e) {
        super(1, 'commander.invalidArgument', e),
          Error.captureStackTrace(this, this.constructor),
          (this.name = this.constructor.name)
      }
    }
  J.CommanderError = j
  J.InvalidArgumentError = K
})
var P = O((Q) => {
  var { InvalidArgumentError: Et } = V(),
    z = class {
      constructor(e, t) {
        switch (
          ((this.description = t || ''),
          (this.variadic = !1),
          (this.parseArg = void 0),
          (this.defaultValue = void 0),
          (this.defaultValueDescription = void 0),
          (this.argChoices = void 0),
          e[0])
        ) {
          case '<':
            ;(this.required = !0), (this._name = e.slice(1, -1))
            break
          case '[':
            ;(this.required = !1), (this._name = e.slice(1, -1))
            break
          default:
            ;(this.required = !0), (this._name = e)
            break
        }
        this._name.length > 3 &&
          this._name.slice(-3) === '...' &&
          ((this.variadic = !0), (this._name = this._name.slice(0, -3)))
      }
      name() {
        return this._name
      }
      _concatValue(e, t) {
        return t === this.defaultValue || !Array.isArray(t) ? [e] : t.concat(e)
      }
      default(e, t) {
        return (this.defaultValue = e), (this.defaultValueDescription = t), this
      }
      argParser(e) {
        return (this.parseArg = e), this
      }
      choices(e) {
        return (
          (this.argChoices = e.slice()),
          (this.parseArg = (t, i) => {
            if (!this.argChoices.includes(t))
              throw new Et(`Allowed choices are ${this.argChoices.join(', ')}.`)
            return this.variadic ? this._concatValue(t, i) : t
          }),
          this
        )
      }
      argRequired() {
        return (this.required = !0), this
      }
      argOptional() {
        return (this.required = !1), this
      }
    }
  function St(r) {
    let e = r.name() + (r.variadic === !0 ? '...' : '')
    return r.required ? '<' + e + '>' : '[' + e + ']'
  }
  Q.Argument = z
  Q.humanReadableArgName = St
})
var Z = O((Ae) => {
  var { humanReadableArgName: $t } = P(),
    X = class {
      constructor() {
        ;(this.helpWidth = void 0),
          (this.sortSubcommands = !1),
          (this.sortOptions = !1),
          (this.showGlobalOptions = !1)
      }
      visibleCommands(e) {
        let t = e.commands.filter((i) => !i._hidden)
        if (e._hasImplicitHelpCommand()) {
          let [, i, n] = e._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/),
            s = e.createCommand(i).helpOption(!1)
          s.description(e._helpCommandDescription),
            n && s.arguments(n),
            t.push(s)
        }
        return (
          this.sortSubcommands &&
            t.sort((i, n) => i.name().localeCompare(n.name())),
          t
        )
      }
      compareOptions(e, t) {
        let i = (n) =>
          n.short ? n.short.replace(/^-/, '') : n.long.replace(/^--/, '')
        return i(e).localeCompare(i(t))
      }
      visibleOptions(e) {
        let t = e.options.filter((s) => !s.hidden),
          i =
            e._hasHelpOption &&
            e._helpShortFlag &&
            !e._findOption(e._helpShortFlag),
          n = e._hasHelpOption && !e._findOption(e._helpLongFlag)
        if (i || n) {
          let s
          i
            ? n
              ? (s = e.createOption(e._helpFlags, e._helpDescription))
              : (s = e.createOption(e._helpShortFlag, e._helpDescription))
            : (s = e.createOption(e._helpLongFlag, e._helpDescription)),
            t.push(s)
        }
        return this.sortOptions && t.sort(this.compareOptions), t
      }
      visibleGlobalOptions(e) {
        if (!this.showGlobalOptions) return []
        let t = []
        for (let i = e.parent; i; i = i.parent) {
          let n = i.options.filter((s) => !s.hidden)
          t.push(...n)
        }
        return this.sortOptions && t.sort(this.compareOptions), t
      }
      visibleArguments(e) {
        return (
          e._argsDescription &&
            e._args.forEach((t) => {
              t.description =
                t.description || e._argsDescription[t.name()] || ''
            }),
          e._args.find((t) => t.description) ? e._args : []
        )
      }
      subcommandTerm(e) {
        let t = e._args.map((i) => $t(i)).join(' ')
        return (
          e._name +
          (e._aliases[0] ? '|' + e._aliases[0] : '') +
          (e.options.length ? ' [options]' : '') +
          (t ? ' ' + t : '')
        )
      }
      optionTerm(e) {
        return e.flags
      }
      argumentTerm(e) {
        return e.name()
      }
      longestSubcommandTermLength(e, t) {
        return t
          .visibleCommands(e)
          .reduce((i, n) => Math.max(i, t.subcommandTerm(n).length), 0)
      }
      longestOptionTermLength(e, t) {
        return t
          .visibleOptions(e)
          .reduce((i, n) => Math.max(i, t.optionTerm(n).length), 0)
      }
      longestGlobalOptionTermLength(e, t) {
        return t
          .visibleGlobalOptions(e)
          .reduce((i, n) => Math.max(i, t.optionTerm(n).length), 0)
      }
      longestArgumentTermLength(e, t) {
        return t
          .visibleArguments(e)
          .reduce((i, n) => Math.max(i, t.argumentTerm(n).length), 0)
      }
      commandUsage(e) {
        let t = e._name
        e._aliases[0] && (t = t + '|' + e._aliases[0])
        let i = ''
        for (let n = e.parent; n; n = n.parent) i = n.name() + ' ' + i
        return i + t + ' ' + e.usage()
      }
      commandDescription(e) {
        return e.description()
      }
      subcommandDescription(e) {
        return e.summary() || e.description()
      }
      optionDescription(e) {
        let t = []
        return (
          e.argChoices &&
            t.push(
              `choices: ${e.argChoices
                .map((i) => JSON.stringify(i))
                .join(', ')}`
            ),
          e.defaultValue !== void 0 &&
            (e.required ||
              e.optional ||
              (e.isBoolean() && typeof e.defaultValue == 'boolean')) &&
            t.push(
              `default: ${
                e.defaultValueDescription || JSON.stringify(e.defaultValue)
              }`
            ),
          e.presetArg !== void 0 &&
            e.optional &&
            t.push(`preset: ${JSON.stringify(e.presetArg)}`),
          e.envVar !== void 0 && t.push(`env: ${e.envVar}`),
          t.length > 0 ? `${e.description} (${t.join(', ')})` : e.description
        )
      }
      argumentDescription(e) {
        let t = []
        if (
          (e.argChoices &&
            t.push(
              `choices: ${e.argChoices
                .map((i) => JSON.stringify(i))
                .join(', ')}`
            ),
          e.defaultValue !== void 0 &&
            t.push(
              `default: ${
                e.defaultValueDescription || JSON.stringify(e.defaultValue)
              }`
            ),
          t.length > 0)
        ) {
          let i = `(${t.join(', ')})`
          return e.description ? `${e.description} ${i}` : i
        }
        return e.description
      }
      formatHelp(e, t) {
        let i = t.padWidth(e, t),
          n = t.helpWidth || 80,
          s = 2,
          o = 2
        function l(d, y) {
          if (y) {
            let G = `${d.padEnd(i + o)}${y}`
            return t.wrap(G, n - s, i + o)
          }
          return d
        }
        function a(d) {
          return d
            .join(
              `
`
            )
            .replace(/^/gm, ' '.repeat(s))
        }
        let u = [`Usage: ${t.commandUsage(e)}`, ''],
          h = t.commandDescription(e)
        h.length > 0 && (u = u.concat([t.wrap(h, n, 0), '']))
        let c = t
          .visibleArguments(e)
          .map((d) => l(t.argumentTerm(d), t.argumentDescription(d)))
        c.length > 0 && (u = u.concat(['Arguments:', a(c), '']))
        let _ = t
          .visibleOptions(e)
          .map((d) => l(t.optionTerm(d), t.optionDescription(d)))
        if (
          (_.length > 0 && (u = u.concat(['Options:', a(_), ''])),
          this.showGlobalOptions)
        ) {
          let d = t
            .visibleGlobalOptions(e)
            .map((y) => l(t.optionTerm(y), t.optionDescription(y)))
          d.length > 0 && (u = u.concat(['Global Options:', a(d), '']))
        }
        let E = t
          .visibleCommands(e)
          .map((d) => l(t.subcommandTerm(d), t.subcommandDescription(d)))
        return (
          E.length > 0 && (u = u.concat(['Commands:', a(E), ''])),
          u.join(`
`)
        )
      }
      padWidth(e, t) {
        return Math.max(
          t.longestOptionTermLength(e, t),
          t.longestGlobalOptionTermLength(e, t),
          t.longestSubcommandTermLength(e, t),
          t.longestArgumentTermLength(e, t)
        )
      }
      wrap(e, t, i, n = 40) {
        let s = ' \\f\\t\\v\xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF',
          o = new RegExp(`[\\n][${s}]+`)
        if (e.match(o)) return e
        let l = t - i
        if (l < n) return e
        let a = e.slice(0, i),
          u = e.slice(i).replace(
            `\r
`,
            `
`
          ),
          h = ' '.repeat(i),
          _ = '\\s\u200B',
          E = new RegExp(
            `
|.{1,${l - 1}}([${_}]|$)|[^${_}]+?([${_}]|$)`,
            'g'
          ),
          d = u.match(E) || []
        return (
          a +
          d.map((y, G) =>
            y ===
            `
`
              ? ''
              : (G > 0 ? h : '') + y.trimEnd()
          ).join(`
`)
        )
      }
    }
  Ae.Help = X
})
var ie = O((L) => {
  var { InvalidArgumentError: Tt } = V(),
    ee = class {
      constructor(e, t) {
        ;(this.flags = e),
          (this.description = t || ''),
          (this.required = e.includes('<')),
          (this.optional = e.includes('[')),
          (this.variadic = /\w\.\.\.[>\]]$/.test(e)),
          (this.mandatory = !1)
        let i = xe(e)
        ;(this.short = i.shortFlag),
          (this.long = i.longFlag),
          (this.negate = !1),
          this.long && (this.negate = this.long.startsWith('--no-')),
          (this.defaultValue = void 0),
          (this.defaultValueDescription = void 0),
          (this.presetArg = void 0),
          (this.envVar = void 0),
          (this.parseArg = void 0),
          (this.hidden = !1),
          (this.argChoices = void 0),
          (this.conflictsWith = []),
          (this.implied = void 0)
      }
      default(e, t) {
        return (this.defaultValue = e), (this.defaultValueDescription = t), this
      }
      preset(e) {
        return (this.presetArg = e), this
      }
      conflicts(e) {
        return (this.conflictsWith = this.conflictsWith.concat(e)), this
      }
      implies(e) {
        let t = e
        return (
          typeof e == 'string' && (t = { [e]: !0 }),
          (this.implied = Object.assign(this.implied || {}, t)),
          this
        )
      }
      env(e) {
        return (this.envVar = e), this
      }
      argParser(e) {
        return (this.parseArg = e), this
      }
      makeOptionMandatory(e = !0) {
        return (this.mandatory = !!e), this
      }
      hideHelp(e = !0) {
        return (this.hidden = !!e), this
      }
      _concatValue(e, t) {
        return t === this.defaultValue || !Array.isArray(t) ? [e] : t.concat(e)
      }
      choices(e) {
        return (
          (this.argChoices = e.slice()),
          (this.parseArg = (t, i) => {
            if (!this.argChoices.includes(t))
              throw new Tt(`Allowed choices are ${this.argChoices.join(', ')}.`)
            return this.variadic ? this._concatValue(t, i) : t
          }),
          this
        )
      }
      name() {
        return this.long
          ? this.long.replace(/^--/, '')
          : this.short.replace(/^-/, '')
      }
      attributeName() {
        return Vt(this.name().replace(/^no-/, ''))
      }
      is(e) {
        return this.short === e || this.long === e
      }
      isBoolean() {
        return !this.required && !this.optional && !this.negate
      }
    },
    te = class {
      constructor(e) {
        ;(this.positiveOptions = new Map()),
          (this.negativeOptions = new Map()),
          (this.dualOptions = new Set()),
          e.forEach((t) => {
            t.negate
              ? this.negativeOptions.set(t.attributeName(), t)
              : this.positiveOptions.set(t.attributeName(), t)
          }),
          this.negativeOptions.forEach((t, i) => {
            this.positiveOptions.has(i) && this.dualOptions.add(i)
          })
      }
      valueFromOption(e, t) {
        let i = t.attributeName()
        if (!this.dualOptions.has(i)) return !0
        let n = this.negativeOptions.get(i).presetArg,
          s = n !== void 0 ? n : !1
        return t.negate === (s === e)
      }
    }
  function Vt(r) {
    return r.split('-').reduce((e, t) => e + t[0].toUpperCase() + t.slice(1))
  }
  function xe(r) {
    let e,
      t,
      i = r.split(/[ |,]+/)
    return (
      i.length > 1 && !/^[[<]/.test(i[1]) && (e = i.shift()),
      (t = i.shift()),
      !e && /^-[^-]$/.test(t) && ((e = t), (t = void 0)),
      { shortFlag: e, longFlag: t }
    )
  }
  L.Option = ee
  L.splitOptionFlags = xe
  L.DualOptions = te
})
var ye = O((we) => {
  function Ft(r, e) {
    if (Math.abs(r.length - e.length) > 3) return Math.max(r.length, e.length)
    let t = []
    for (let i = 0; i <= r.length; i++) t[i] = [i]
    for (let i = 0; i <= e.length; i++) t[0][i] = i
    for (let i = 1; i <= e.length; i++)
      for (let n = 1; n <= r.length; n++) {
        let s = 1
        r[n - 1] === e[i - 1] ? (s = 0) : (s = 1),
          (t[n][i] = Math.min(
            t[n - 1][i] + 1,
            t[n][i - 1] + 1,
            t[n - 1][i - 1] + s
          )),
          n > 1 &&
            i > 1 &&
            r[n - 1] === e[i - 2] &&
            r[n - 2] === e[i - 1] &&
            (t[n][i] = Math.min(t[n][i], t[n - 2][i - 2] + 1))
      }
    return t[r.length][e.length]
  }
  function Nt(r, e) {
    if (!e || e.length === 0) return ''
    e = Array.from(new Set(e))
    let t = r.startsWith('--')
    t && ((r = r.slice(2)), (e = e.map((o) => o.slice(2))))
    let i = [],
      n = 3,
      s = 0.4
    return (
      e.forEach((o) => {
        if (o.length <= 1) return
        let l = Ft(r, o),
          a = Math.max(r.length, o.length)
        ;(a - l) / a > s &&
          (l < n ? ((n = l), (i = [o])) : l === n && i.push(o))
      }),
      i.sort((o, l) => o.localeCompare(l)),
      t && (i = i.map((o) => `--${o}`)),
      i.length > 1
        ? `
(Did you mean one of ${i.join(', ')}?)`
        : i.length === 1
        ? `
(Did you mean ${i[0]}?)`
        : ''
    )
  }
  we.suggestSimilar = Nt
})
var Ve = O((Te) => {
  var kt = require('events').EventEmitter,
    ne = require('child_process'),
    w = require('path'),
    re = require('fs'),
    p = require('process'),
    { Argument: Ht, humanReadableArgName: Rt } = P(),
    { CommanderError: se } = V(),
    { Help: Dt } = Z(),
    { Option: ve, splitOptionFlags: It, DualOptions: Mt } = ie(),
    { suggestSimilar: Ee } = ye(),
    N = class extends kt {
      constructor(e) {
        super(),
          (this.commands = []),
          (this.options = []),
          (this.parent = null),
          (this._allowUnknownOption = !1),
          (this._allowExcessArguments = !0),
          (this._args = []),
          (this.args = []),
          (this.rawArgs = []),
          (this.processedArgs = []),
          (this._scriptPath = null),
          (this._name = e || ''),
          (this._optionValues = {}),
          (this._optionValueSources = {}),
          (this._storeOptionsAsProperties = !1),
          (this._actionHandler = null),
          (this._executableHandler = !1),
          (this._executableFile = null),
          (this._executableDir = null),
          (this._defaultCommandName = null),
          (this._exitCallback = null),
          (this._aliases = []),
          (this._combineFlagAndOptionalValue = !0),
          (this._description = ''),
          (this._summary = ''),
          (this._argsDescription = void 0),
          (this._enablePositionalOptions = !1),
          (this._passThroughOptions = !1),
          (this._lifeCycleHooks = {}),
          (this._showHelpAfterError = !1),
          (this._showSuggestionAfterError = !0),
          (this._outputConfiguration = {
            writeOut: (t) => p.stdout.write(t),
            writeErr: (t) => p.stderr.write(t),
            getOutHelpWidth: () => (p.stdout.isTTY ? p.stdout.columns : void 0),
            getErrHelpWidth: () => (p.stderr.isTTY ? p.stderr.columns : void 0),
            outputError: (t, i) => i(t),
          }),
          (this._hidden = !1),
          (this._hasHelpOption = !0),
          (this._helpFlags = '-h, --help'),
          (this._helpDescription = 'display help for command'),
          (this._helpShortFlag = '-h'),
          (this._helpLongFlag = '--help'),
          (this._addImplicitHelpCommand = void 0),
          (this._helpCommandName = 'help'),
          (this._helpCommandnameAndArgs = 'help [command]'),
          (this._helpCommandDescription = 'display help for command'),
          (this._helpConfiguration = {})
      }
      copyInheritedSettings(e) {
        return (
          (this._outputConfiguration = e._outputConfiguration),
          (this._hasHelpOption = e._hasHelpOption),
          (this._helpFlags = e._helpFlags),
          (this._helpDescription = e._helpDescription),
          (this._helpShortFlag = e._helpShortFlag),
          (this._helpLongFlag = e._helpLongFlag),
          (this._helpCommandName = e._helpCommandName),
          (this._helpCommandnameAndArgs = e._helpCommandnameAndArgs),
          (this._helpCommandDescription = e._helpCommandDescription),
          (this._helpConfiguration = e._helpConfiguration),
          (this._exitCallback = e._exitCallback),
          (this._storeOptionsAsProperties = e._storeOptionsAsProperties),
          (this._combineFlagAndOptionalValue = e._combineFlagAndOptionalValue),
          (this._allowExcessArguments = e._allowExcessArguments),
          (this._enablePositionalOptions = e._enablePositionalOptions),
          (this._showHelpAfterError = e._showHelpAfterError),
          (this._showSuggestionAfterError = e._showSuggestionAfterError),
          this
        )
      }
      command(e, t, i) {
        let n = t,
          s = i
        typeof n == 'object' && n !== null && ((s = n), (n = null)),
          (s = s || {})
        let [, o, l] = e.match(/([^ ]+) *(.*)/),
          a = this.createCommand(o)
        return (
          n && (a.description(n), (a._executableHandler = !0)),
          s.isDefault && (this._defaultCommandName = a._name),
          (a._hidden = !!(s.noHelp || s.hidden)),
          (a._executableFile = s.executableFile || null),
          l && a.arguments(l),
          this.commands.push(a),
          (a.parent = this),
          a.copyInheritedSettings(this),
          n ? this : a
        )
      }
      createCommand(e) {
        return new N(e)
      }
      createHelp() {
        return Object.assign(new Dt(), this.configureHelp())
      }
      configureHelp(e) {
        return e === void 0
          ? this._helpConfiguration
          : ((this._helpConfiguration = e), this)
      }
      configureOutput(e) {
        return e === void 0
          ? this._outputConfiguration
          : (Object.assign(this._outputConfiguration, e), this)
      }
      showHelpAfterError(e = !0) {
        return (
          typeof e != 'string' && (e = !!e),
          (this._showHelpAfterError = e),
          this
        )
      }
      showSuggestionAfterError(e = !0) {
        return (this._showSuggestionAfterError = !!e), this
      }
      addCommand(e, t) {
        if (!e._name)
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`)
        return (
          (t = t || {}),
          t.isDefault && (this._defaultCommandName = e._name),
          (t.noHelp || t.hidden) && (e._hidden = !0),
          this.commands.push(e),
          (e.parent = this),
          this
        )
      }
      createArgument(e, t) {
        return new Ht(e, t)
      }
      argument(e, t, i, n) {
        let s = this.createArgument(e, t)
        return (
          typeof i == 'function' ? s.default(n).argParser(i) : s.default(i),
          this.addArgument(s),
          this
        )
      }
      arguments(e) {
        return (
          e.split(/ +/).forEach((t) => {
            this.argument(t)
          }),
          this
        )
      }
      addArgument(e) {
        let t = this._args.slice(-1)[0]
        if (t && t.variadic)
          throw new Error(
            `only the last argument can be variadic '${t.name()}'`
          )
        if (e.required && e.defaultValue !== void 0 && e.parseArg === void 0)
          throw new Error(
            `a default value for a required argument is never used: '${e.name()}'`
          )
        return this._args.push(e), this
      }
      addHelpCommand(e, t) {
        return (
          e === !1
            ? (this._addImplicitHelpCommand = !1)
            : ((this._addImplicitHelpCommand = !0),
              typeof e == 'string' &&
                ((this._helpCommandName = e.split(' ')[0]),
                (this._helpCommandnameAndArgs = e)),
              (this._helpCommandDescription =
                t || this._helpCommandDescription)),
          this
        )
      }
      _hasImplicitHelpCommand() {
        return this._addImplicitHelpCommand === void 0
          ? this.commands.length &&
              !this._actionHandler &&
              !this._findCommand('help')
          : this._addImplicitHelpCommand
      }
      hook(e, t) {
        let i = ['preSubcommand', 'preAction', 'postAction']
        if (!i.includes(e))
          throw new Error(`Unexpected value for event passed to hook : '${e}'.
Expecting one of '${i.join("', '")}'`)
        return (
          this._lifeCycleHooks[e]
            ? this._lifeCycleHooks[e].push(t)
            : (this._lifeCycleHooks[e] = [t]),
          this
        )
      }
      exitOverride(e) {
        return (
          e
            ? (this._exitCallback = e)
            : (this._exitCallback = (t) => {
                if (t.code !== 'commander.executeSubCommandAsync') throw t
              }),
          this
        )
      }
      _exit(e, t, i) {
        this._exitCallback && this._exitCallback(new se(e, t, i)), p.exit(e)
      }
      action(e) {
        let t = (i) => {
          let n = this._args.length,
            s = i.slice(0, n)
          return (
            this._storeOptionsAsProperties
              ? (s[n] = this)
              : (s[n] = this.opts()),
            s.push(this),
            e.apply(this, s)
          )
        }
        return (this._actionHandler = t), this
      }
      createOption(e, t) {
        return new ve(e, t)
      }
      addOption(e) {
        let t = e.name(),
          i = e.attributeName()
        if (e.negate) {
          let s = e.long.replace(/^--no-/, '--')
          this._findOption(s) ||
            this.setOptionValueWithSource(
              i,
              e.defaultValue === void 0 ? !0 : e.defaultValue,
              'default'
            )
        } else
          e.defaultValue !== void 0 &&
            this.setOptionValueWithSource(i, e.defaultValue, 'default')
        this.options.push(e)
        let n = (s, o, l) => {
          s == null && e.presetArg !== void 0 && (s = e.presetArg)
          let a = this.getOptionValue(i)
          if (s !== null && e.parseArg)
            try {
              s = e.parseArg(s, a)
            } catch (u) {
              if (u.code === 'commander.invalidArgument') {
                let h = `${o} ${u.message}`
                this.error(h, { exitCode: u.exitCode, code: u.code })
              }
              throw u
            }
          else s !== null && e.variadic && (s = e._concatValue(s, a))
          s == null &&
            (e.negate
              ? (s = !1)
              : e.isBoolean() || e.optional
              ? (s = !0)
              : (s = '')),
            this.setOptionValueWithSource(i, s, l)
        }
        return (
          this.on('option:' + t, (s) => {
            let o = `error: option '${e.flags}' argument '${s}' is invalid.`
            n(s, o, 'cli')
          }),
          e.envVar &&
            this.on('optionEnv:' + t, (s) => {
              let o = `error: option '${e.flags}' value '${s}' from env '${e.envVar}' is invalid.`
              n(s, o, 'env')
            }),
          this
        )
      }
      _optionEx(e, t, i, n, s) {
        if (typeof t == 'object' && t instanceof ve)
          throw new Error(
            'To add an Option object use addOption() instead of option() or requiredOption()'
          )
        let o = this.createOption(t, i)
        if ((o.makeOptionMandatory(!!e.mandatory), typeof n == 'function'))
          o.default(s).argParser(n)
        else if (n instanceof RegExp) {
          let l = n
          ;(n = (a, u) => {
            let h = l.exec(a)
            return h ? h[0] : u
          }),
            o.default(s).argParser(n)
        } else o.default(n)
        return this.addOption(o)
      }
      option(e, t, i, n) {
        return this._optionEx({}, e, t, i, n)
      }
      requiredOption(e, t, i, n) {
        return this._optionEx({ mandatory: !0 }, e, t, i, n)
      }
      combineFlagAndOptionalValue(e = !0) {
        return (this._combineFlagAndOptionalValue = !!e), this
      }
      allowUnknownOption(e = !0) {
        return (this._allowUnknownOption = !!e), this
      }
      allowExcessArguments(e = !0) {
        return (this._allowExcessArguments = !!e), this
      }
      enablePositionalOptions(e = !0) {
        return (this._enablePositionalOptions = !!e), this
      }
      passThroughOptions(e = !0) {
        if (
          ((this._passThroughOptions = !!e),
          this.parent && e && !this.parent._enablePositionalOptions)
        )
          throw new Error(
            'passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)'
          )
        return this
      }
      storeOptionsAsProperties(e = !0) {
        if (((this._storeOptionsAsProperties = !!e), this.options.length))
          throw new Error(
            'call .storeOptionsAsProperties() before adding options'
          )
        return this
      }
      getOptionValue(e) {
        return this._storeOptionsAsProperties ? this[e] : this._optionValues[e]
      }
      setOptionValue(e, t) {
        return this.setOptionValueWithSource(e, t, void 0)
      }
      setOptionValueWithSource(e, t, i) {
        return (
          this._storeOptionsAsProperties
            ? (this[e] = t)
            : (this._optionValues[e] = t),
          (this._optionValueSources[e] = i),
          this
        )
      }
      getOptionValueSource(e) {
        return this._optionValueSources[e]
      }
      getOptionValueSourceWithGlobals(e) {
        let t
        return (
          F(this).forEach((i) => {
            i.getOptionValueSource(e) !== void 0 &&
              (t = i.getOptionValueSource(e))
          }),
          t
        )
      }
      _prepareUserArgs(e, t) {
        if (e !== void 0 && !Array.isArray(e))
          throw new Error('first parameter to parse must be array or undefined')
        ;(t = t || {}),
          e === void 0 &&
            ((e = p.argv),
            p.versions && p.versions.electron && (t.from = 'electron')),
          (this.rawArgs = e.slice())
        let i
        switch (t.from) {
          case void 0:
          case 'node':
            ;(this._scriptPath = e[1]), (i = e.slice(2))
            break
          case 'electron':
            p.defaultApp
              ? ((this._scriptPath = e[1]), (i = e.slice(2)))
              : (i = e.slice(1))
            break
          case 'user':
            i = e.slice(0)
            break
          default:
            throw new Error(`unexpected parse option { from: '${t.from}' }`)
        }
        return (
          !this._name &&
            this._scriptPath &&
            this.nameFromFilename(this._scriptPath),
          (this._name = this._name || 'program'),
          i
        )
      }
      parse(e, t) {
        let i = this._prepareUserArgs(e, t)
        return this._parseCommand([], i), this
      }
      async parseAsync(e, t) {
        let i = this._prepareUserArgs(e, t)
        return await this._parseCommand([], i), this
      }
      _executeSubCommand(e, t) {
        t = t.slice()
        let i = !1,
          n = ['.js', '.ts', '.tsx', '.mjs', '.cjs']
        function s(h, c) {
          let _ = w.resolve(h, c)
          if (re.existsSync(_)) return _
          if (n.includes(w.extname(c))) return
          let E = n.find((d) => re.existsSync(`${_}${d}`))
          if (E) return `${_}${E}`
        }
        this._checkForMissingMandatoryOptions(),
          this._checkForConflictingOptions()
        let o = e._executableFile || `${this._name}-${e._name}`,
          l = this._executableDir || ''
        if (this._scriptPath) {
          let h
          try {
            h = re.realpathSync(this._scriptPath)
          } catch {
            h = this._scriptPath
          }
          l = w.resolve(w.dirname(h), l)
        }
        if (l) {
          let h = s(l, o)
          if (!h && !e._executableFile && this._scriptPath) {
            let c = w.basename(this._scriptPath, w.extname(this._scriptPath))
            c !== this._name && (h = s(l, `${c}-${e._name}`))
          }
          o = h || o
        }
        i = n.includes(w.extname(o))
        let a
        p.platform !== 'win32'
          ? i
            ? (t.unshift(o),
              (t = $e(p.execArgv).concat(t)),
              (a = ne.spawn(p.argv[0], t, { stdio: 'inherit' })))
            : (a = ne.spawn(o, t, { stdio: 'inherit' }))
          : (t.unshift(o),
            (t = $e(p.execArgv).concat(t)),
            (a = ne.spawn(p.execPath, t, { stdio: 'inherit' }))),
          a.killed ||
            ['SIGUSR1', 'SIGUSR2', 'SIGTERM', 'SIGINT', 'SIGHUP'].forEach(
              (c) => {
                p.on(c, () => {
                  a.killed === !1 && a.exitCode === null && a.kill(c)
                })
              }
            )
        let u = this._exitCallback
        u
          ? a.on('close', () => {
              u(
                new se(
                  p.exitCode || 0,
                  'commander.executeSubCommandAsync',
                  '(close)'
                )
              )
            })
          : a.on('close', p.exit.bind(p)),
          a.on('error', (h) => {
            if (h.code === 'ENOENT') {
              let c = l
                  ? `searched for local subcommand relative to directory '${l}'`
                  : 'no directory for search for local subcommand, use .executableDir() to supply a custom directory',
                _ = `'${o}' does not exist
 - if '${e._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${c}`
              throw new Error(_)
            } else if (h.code === 'EACCES')
              throw new Error(`'${o}' not executable`)
            if (!u) p.exit(1)
            else {
              let c = new se(1, 'commander.executeSubCommandAsync', '(error)')
              ;(c.nestedError = h), u(c)
            }
          }),
          (this.runningCommand = a)
      }
      _dispatchSubcommand(e, t, i) {
        let n = this._findCommand(e)
        n || this.help({ error: !0 })
        let s
        return (
          (s = this._chainOrCallSubCommandHook(s, n, 'preSubcommand')),
          (s = this._chainOrCall(s, () => {
            if (n._executableHandler) this._executeSubCommand(n, t.concat(i))
            else return n._parseCommand(t, i)
          })),
          s
        )
      }
      _checkNumberOfArguments() {
        this._args.forEach((e, t) => {
          e.required && this.args[t] == null && this.missingArgument(e.name())
        }),
          !(
            this._args.length > 0 && this._args[this._args.length - 1].variadic
          ) &&
            this.args.length > this._args.length &&
            this._excessArguments(this.args)
      }
      _processArguments() {
        let e = (i, n, s) => {
          let o = n
          if (n !== null && i.parseArg)
            try {
              o = i.parseArg(n, s)
            } catch (l) {
              if (l.code === 'commander.invalidArgument') {
                let a = `error: command-argument value '${n}' is invalid for argument '${i.name()}'. ${
                  l.message
                }`
                this.error(a, { exitCode: l.exitCode, code: l.code })
              }
              throw l
            }
          return o
        }
        this._checkNumberOfArguments()
        let t = []
        this._args.forEach((i, n) => {
          let s = i.defaultValue
          i.variadic
            ? n < this.args.length
              ? ((s = this.args.slice(n)),
                i.parseArg &&
                  (s = s.reduce((o, l) => e(i, l, o), i.defaultValue)))
              : s === void 0 && (s = [])
            : n < this.args.length &&
              ((s = this.args[n]), i.parseArg && (s = e(i, s, i.defaultValue))),
            (t[n] = s)
        }),
          (this.processedArgs = t)
      }
      _chainOrCall(e, t) {
        return e && e.then && typeof e.then == 'function'
          ? e.then(() => t())
          : t()
      }
      _chainOrCallHooks(e, t) {
        let i = e,
          n = []
        return (
          F(this)
            .reverse()
            .filter((s) => s._lifeCycleHooks[t] !== void 0)
            .forEach((s) => {
              s._lifeCycleHooks[t].forEach((o) => {
                n.push({ hookedCommand: s, callback: o })
              })
            }),
          t === 'postAction' && n.reverse(),
          n.forEach((s) => {
            i = this._chainOrCall(i, () => s.callback(s.hookedCommand, this))
          }),
          i
        )
      }
      _chainOrCallSubCommandHook(e, t, i) {
        let n = e
        return (
          this._lifeCycleHooks[i] !== void 0 &&
            this._lifeCycleHooks[i].forEach((s) => {
              n = this._chainOrCall(n, () => s(this, t))
            }),
          n
        )
      }
      _parseCommand(e, t) {
        let i = this.parseOptions(t)
        if (
          (this._parseOptionsEnv(),
          this._parseOptionsImplied(),
          (e = e.concat(i.operands)),
          (t = i.unknown),
          (this.args = e.concat(t)),
          e && this._findCommand(e[0]))
        )
          return this._dispatchSubcommand(e[0], e.slice(1), t)
        if (this._hasImplicitHelpCommand() && e[0] === this._helpCommandName)
          return (
            e.length === 1 && this.help(),
            this._dispatchSubcommand(e[1], [], [this._helpLongFlag])
          )
        if (this._defaultCommandName)
          return (
            Se(this, t),
            this._dispatchSubcommand(this._defaultCommandName, e, t)
          )
        this.commands.length &&
          this.args.length === 0 &&
          !this._actionHandler &&
          !this._defaultCommandName &&
          this.help({ error: !0 }),
          Se(this, i.unknown),
          this._checkForMissingMandatoryOptions(),
          this._checkForConflictingOptions()
        let n = () => {
            i.unknown.length > 0 && this.unknownOption(i.unknown[0])
          },
          s = `command:${this.name()}`
        if (this._actionHandler) {
          n(), this._processArguments()
          let o
          return (
            (o = this._chainOrCallHooks(o, 'preAction')),
            (o = this._chainOrCall(o, () =>
              this._actionHandler(this.processedArgs)
            )),
            this.parent &&
              (o = this._chainOrCall(o, () => {
                this.parent.emit(s, e, t)
              })),
            (o = this._chainOrCallHooks(o, 'postAction')),
            o
          )
        }
        if (this.parent && this.parent.listenerCount(s))
          n(), this._processArguments(), this.parent.emit(s, e, t)
        else if (e.length) {
          if (this._findCommand('*')) return this._dispatchSubcommand('*', e, t)
          this.listenerCount('command:*')
            ? this.emit('command:*', e, t)
            : this.commands.length
            ? this.unknownCommand()
            : (n(), this._processArguments())
        } else
          this.commands.length
            ? (n(), this.help({ error: !0 }))
            : (n(), this._processArguments())
      }
      _findCommand(e) {
        if (e)
          return this.commands.find(
            (t) => t._name === e || t._aliases.includes(e)
          )
      }
      _findOption(e) {
        return this.options.find((t) => t.is(e))
      }
      _checkForMissingMandatoryOptions() {
        for (let e = this; e; e = e.parent)
          e.options.forEach((t) => {
            t.mandatory &&
              e.getOptionValue(t.attributeName()) === void 0 &&
              e.missingMandatoryOptionValue(t)
          })
      }
      _checkForConflictingLocalOptions() {
        let e = this.options.filter((i) => {
          let n = i.attributeName()
          return this.getOptionValue(n) === void 0
            ? !1
            : this.getOptionValueSource(n) !== 'default'
        })
        e.filter((i) => i.conflictsWith.length > 0).forEach((i) => {
          let n = e.find((s) => i.conflictsWith.includes(s.attributeName()))
          n && this._conflictingOption(i, n)
        })
      }
      _checkForConflictingOptions() {
        for (let e = this; e; e = e.parent) e._checkForConflictingLocalOptions()
      }
      parseOptions(e) {
        let t = [],
          i = [],
          n = t,
          s = e.slice()
        function o(a) {
          return a.length > 1 && a[0] === '-'
        }
        let l = null
        for (; s.length; ) {
          let a = s.shift()
          if (a === '--') {
            n === i && n.push(a), n.push(...s)
            break
          }
          if (l && !o(a)) {
            this.emit(`option:${l.name()}`, a)
            continue
          }
          if (((l = null), o(a))) {
            let u = this._findOption(a)
            if (u) {
              if (u.required) {
                let h = s.shift()
                h === void 0 && this.optionMissingArgument(u),
                  this.emit(`option:${u.name()}`, h)
              } else if (u.optional) {
                let h = null
                s.length > 0 && !o(s[0]) && (h = s.shift()),
                  this.emit(`option:${u.name()}`, h)
              } else this.emit(`option:${u.name()}`)
              l = u.variadic ? u : null
              continue
            }
          }
          if (a.length > 2 && a[0] === '-' && a[1] !== '-') {
            let u = this._findOption(`-${a[1]}`)
            if (u) {
              u.required || (u.optional && this._combineFlagAndOptionalValue)
                ? this.emit(`option:${u.name()}`, a.slice(2))
                : (this.emit(`option:${u.name()}`), s.unshift(`-${a.slice(2)}`))
              continue
            }
          }
          if (/^--[^=]+=/.test(a)) {
            let u = a.indexOf('='),
              h = this._findOption(a.slice(0, u))
            if (h && (h.required || h.optional)) {
              this.emit(`option:${h.name()}`, a.slice(u + 1))
              continue
            }
          }
          if (
            (o(a) && (n = i),
            (this._enablePositionalOptions || this._passThroughOptions) &&
              t.length === 0 &&
              i.length === 0)
          ) {
            if (this._findCommand(a)) {
              t.push(a), s.length > 0 && i.push(...s)
              break
            } else if (
              a === this._helpCommandName &&
              this._hasImplicitHelpCommand()
            ) {
              t.push(a), s.length > 0 && t.push(...s)
              break
            } else if (this._defaultCommandName) {
              i.push(a), s.length > 0 && i.push(...s)
              break
            }
          }
          if (this._passThroughOptions) {
            n.push(a), s.length > 0 && n.push(...s)
            break
          }
          n.push(a)
        }
        return { operands: t, unknown: i }
      }
      opts() {
        if (this._storeOptionsAsProperties) {
          let e = {},
            t = this.options.length
          for (let i = 0; i < t; i++) {
            let n = this.options[i].attributeName()
            e[n] = n === this._versionOptionName ? this._version : this[n]
          }
          return e
        }
        return this._optionValues
      }
      optsWithGlobals() {
        return F(this).reduce((e, t) => Object.assign(e, t.opts()), {})
      }
      error(e, t) {
        this._outputConfiguration.outputError(
          `${e}
`,
          this._outputConfiguration.writeErr
        ),
          typeof this._showHelpAfterError == 'string'
            ? this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`)
            : this._showHelpAfterError &&
              (this._outputConfiguration.writeErr(`
`),
              this.outputHelp({ error: !0 }))
        let i = t || {},
          n = i.exitCode || 1,
          s = i.code || 'commander.error'
        this._exit(n, s, e)
      }
      _parseOptionsEnv() {
        this.options.forEach((e) => {
          if (e.envVar && e.envVar in p.env) {
            let t = e.attributeName()
            ;(this.getOptionValue(t) === void 0 ||
              ['default', 'config', 'env'].includes(
                this.getOptionValueSource(t)
              )) &&
              (e.required || e.optional
                ? this.emit(`optionEnv:${e.name()}`, p.env[e.envVar])
                : this.emit(`optionEnv:${e.name()}`))
          }
        })
      }
      _parseOptionsImplied() {
        let e = new Mt(this.options),
          t = (i) =>
            this.getOptionValue(i) !== void 0 &&
            !['default', 'implied'].includes(this.getOptionValueSource(i))
        this.options
          .filter(
            (i) =>
              i.implied !== void 0 &&
              t(i.attributeName()) &&
              e.valueFromOption(this.getOptionValue(i.attributeName()), i)
          )
          .forEach((i) => {
            Object.keys(i.implied)
              .filter((n) => !t(n))
              .forEach((n) => {
                this.setOptionValueWithSource(n, i.implied[n], 'implied')
              })
          })
      }
      missingArgument(e) {
        let t = `error: missing required argument '${e}'`
        this.error(t, { code: 'commander.missingArgument' })
      }
      optionMissingArgument(e) {
        let t = `error: option '${e.flags}' argument missing`
        this.error(t, { code: 'commander.optionMissingArgument' })
      }
      missingMandatoryOptionValue(e) {
        let t = `error: required option '${e.flags}' not specified`
        this.error(t, { code: 'commander.missingMandatoryOptionValue' })
      }
      _conflictingOption(e, t) {
        let i = (o) => {
            let l = o.attributeName(),
              a = this.getOptionValue(l),
              u = this.options.find((c) => c.negate && l === c.attributeName()),
              h = this.options.find((c) => !c.negate && l === c.attributeName())
            return u &&
              ((u.presetArg === void 0 && a === !1) ||
                (u.presetArg !== void 0 && a === u.presetArg))
              ? u
              : h || o
          },
          n = (o) => {
            let l = i(o),
              a = l.attributeName()
            return this.getOptionValueSource(a) === 'env'
              ? `environment variable '${l.envVar}'`
              : `option '${l.flags}'`
          },
          s = `error: ${n(e)} cannot be used with ${n(t)}`
        this.error(s, { code: 'commander.conflictingOption' })
      }
      unknownOption(e) {
        if (this._allowUnknownOption) return
        let t = ''
        if (e.startsWith('--') && this._showSuggestionAfterError) {
          let n = [],
            s = this
          do {
            let o = s
              .createHelp()
              .visibleOptions(s)
              .filter((l) => l.long)
              .map((l) => l.long)
            ;(n = n.concat(o)), (s = s.parent)
          } while (s && !s._enablePositionalOptions)
          t = Ee(e, n)
        }
        let i = `error: unknown option '${e}'${t}`
        this.error(i, { code: 'commander.unknownOption' })
      }
      _excessArguments(e) {
        if (this._allowExcessArguments) return
        let t = this._args.length,
          i = t === 1 ? '' : 's',
          s = `error: too many arguments${
            this.parent ? ` for '${this.name()}'` : ''
          }. Expected ${t} argument${i} but got ${e.length}.`
        this.error(s, { code: 'commander.excessArguments' })
      }
      unknownCommand() {
        let e = this.args[0],
          t = ''
        if (this._showSuggestionAfterError) {
          let n = []
          this.createHelp()
            .visibleCommands(this)
            .forEach((s) => {
              n.push(s.name()), s.alias() && n.push(s.alias())
            }),
            (t = Ee(e, n))
        }
        let i = `error: unknown command '${e}'${t}`
        this.error(i, { code: 'commander.unknownCommand' })
      }
      version(e, t, i) {
        if (e === void 0) return this._version
        ;(this._version = e),
          (t = t || '-V, --version'),
          (i = i || 'output the version number')
        let n = this.createOption(t, i)
        return (
          (this._versionOptionName = n.attributeName()),
          this.options.push(n),
          this.on('option:' + n.name(), () => {
            this._outputConfiguration.writeOut(`${e}
`),
              this._exit(0, 'commander.version', e)
          }),
          this
        )
      }
      description(e, t) {
        return e === void 0 && t === void 0
          ? this._description
          : ((this._description = e), t && (this._argsDescription = t), this)
      }
      summary(e) {
        return e === void 0 ? this._summary : ((this._summary = e), this)
      }
      alias(e) {
        if (e === void 0) return this._aliases[0]
        let t = this
        if (
          (this.commands.length !== 0 &&
            this.commands[this.commands.length - 1]._executableHandler &&
            (t = this.commands[this.commands.length - 1]),
          e === t._name)
        )
          throw new Error("Command alias can't be the same as its name")
        return t._aliases.push(e), this
      }
      aliases(e) {
        return e === void 0
          ? this._aliases
          : (e.forEach((t) => this.alias(t)), this)
      }
      usage(e) {
        if (e === void 0) {
          if (this._usage) return this._usage
          let t = this._args.map((i) => Rt(i))
          return []
            .concat(
              this.options.length || this._hasHelpOption ? '[options]' : [],
              this.commands.length ? '[command]' : [],
              this._args.length ? t : []
            )
            .join(' ')
        }
        return (this._usage = e), this
      }
      name(e) {
        return e === void 0 ? this._name : ((this._name = e), this)
      }
      nameFromFilename(e) {
        return (this._name = w.basename(e, w.extname(e))), this
      }
      executableDir(e) {
        return e === void 0
          ? this._executableDir
          : ((this._executableDir = e), this)
      }
      helpInformation(e) {
        let t = this.createHelp()
        return (
          t.helpWidth === void 0 &&
            (t.helpWidth =
              e && e.error
                ? this._outputConfiguration.getErrHelpWidth()
                : this._outputConfiguration.getOutHelpWidth()),
          t.formatHelp(this, t)
        )
      }
      _getHelpContext(e) {
        e = e || {}
        let t = { error: !!e.error },
          i
        return (
          t.error
            ? (i = (n) => this._outputConfiguration.writeErr(n))
            : (i = (n) => this._outputConfiguration.writeOut(n)),
          (t.write = e.write || i),
          (t.command = this),
          t
        )
      }
      outputHelp(e) {
        let t
        typeof e == 'function' && ((t = e), (e = void 0))
        let i = this._getHelpContext(e)
        F(this)
          .reverse()
          .forEach((s) => s.emit('beforeAllHelp', i)),
          this.emit('beforeHelp', i)
        let n = this.helpInformation(i)
        if (t && ((n = t(n)), typeof n != 'string' && !Buffer.isBuffer(n)))
          throw new Error(
            'outputHelp callback must return a string or a Buffer'
          )
        i.write(n),
          this.emit(this._helpLongFlag),
          this.emit('afterHelp', i),
          F(this).forEach((s) => s.emit('afterAllHelp', i))
      }
      helpOption(e, t) {
        if (typeof e == 'boolean') return (this._hasHelpOption = e), this
        ;(this._helpFlags = e || this._helpFlags),
          (this._helpDescription = t || this._helpDescription)
        let i = It(this._helpFlags)
        return (
          (this._helpShortFlag = i.shortFlag),
          (this._helpLongFlag = i.longFlag),
          this
        )
      }
      help(e) {
        this.outputHelp(e)
        let t = p.exitCode || 0
        t === 0 && e && typeof e != 'function' && e.error && (t = 1),
          this._exit(t, 'commander.help', '(outputHelp)')
      }
      addHelpText(e, t) {
        let i = ['beforeAll', 'before', 'after', 'afterAll']
        if (!i.includes(e))
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${i.join("', '")}'`)
        let n = `${e}Help`
        return (
          this.on(n, (s) => {
            let o
            typeof t == 'function'
              ? (o = t({ error: s.error, command: s.command }))
              : (o = t),
              o &&
                s.write(`${o}
`)
          }),
          this
        )
      }
    }
  function Se(r, e) {
    r._hasHelpOption &&
      e.find((i) => i === r._helpLongFlag || i === r._helpShortFlag) &&
      (r.outputHelp(), r._exit(0, 'commander.helpDisplayed', '(outputHelp)'))
  }
  function $e(r) {
    return r.map((e) => {
      if (!e.startsWith('--inspect')) return e
      let t,
        i = '127.0.0.1',
        n = '9229',
        s
      return (
        (s = e.match(/^(--inspect(-brk)?)$/)) !== null
          ? (t = s[1])
          : (s = e.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null
          ? ((t = s[1]), /^\d+$/.test(s[3]) ? (n = s[3]) : (i = s[3]))
          : (s = e.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !==
              null && ((t = s[1]), (i = s[3]), (n = s[4])),
        t && n !== '0' ? `${t}=${i}:${parseInt(n) + 1}` : e
      )
    })
  }
  function F(r) {
    let e = []
    for (let t = r; t; t = t.parent) e.push(t)
    return e
  }
  Te.Command = N
})
var He = O((C, ke) => {
  var { Argument: jt } = P(),
    { Command: Fe } = Ve(),
    { CommanderError: Pt, InvalidArgumentError: Ne } = V(),
    { Help: Lt } = Z(),
    { Option: qt } = ie()
  C = ke.exports = new Fe()
  C.program = C
  C.Argument = jt
  C.Command = Fe
  C.CommanderError = Pt
  C.Help = Lt
  C.InvalidArgumentError = Ne
  C.InvalidOptionArgumentError = Ne
  C.Option = qt
})
var Je = O((Ui, ni) => {
  ni.exports = [
    '|/-\\',
    '\u2802-\u2013\u2014\u2013-',
    '\u25D0\u25D3\u25D1\u25D2',
    '\u25F4\u25F7\u25F6\u25F5',
    '\u25F0\u25F3\u25F2\u25F1',
    '\u2596\u2598\u259D\u2597',
    '\u25A0\u25A1\u25AA\u25AB',
    '\u258C\u2580\u2590\u2584',
    '\u2589\u258A\u258B\u258C\u258D\u258E\u258F\u258E\u258D\u258C\u258B\u258A\u2589',
    '\u2581\u2583\u2584\u2585\u2586\u2587\u2588\u2587\u2586\u2585\u2584\u2583',
    '\u2190\u2196\u2191\u2197\u2192\u2198\u2193\u2199',
    '\u2524\u2518\u2534\u2514\u251C\u250C\u252C\u2510',
    '\u25E2\u25E3\u25E4\u25E5',
    '.oO\xB0Oo.',
    '.oO@*',
    ['\u{1F30D}', '\u{1F30E}', '\u{1F30F}'],
    '\u25E1\u25E1 \u2299\u2299 \u25E0\u25E0',
    '\u2631\u2632\u2634',
    '\u280B\u2819\u2839\u2838\u283C\u2834\u2826\u2827\u2807\u280F',
    '\u280B\u2819\u281A\u281E\u2816\u2826\u2834\u2832\u2833\u2813',
    '\u2804\u2806\u2807\u280B\u2819\u2838\u2830\u2820\u2830\u2838\u2819\u280B\u2807\u2806',
    '\u280B\u2819\u281A\u2812\u2802\u2802\u2812\u2832\u2834\u2826\u2816\u2812\u2810\u2810\u2812\u2813\u280B',
    '\u2801\u2809\u2819\u281A\u2812\u2802\u2802\u2812\u2832\u2834\u2824\u2804\u2804\u2824\u2834\u2832\u2812\u2802\u2802\u2812\u281A\u2819\u2809\u2801',
    '\u2808\u2809\u280B\u2813\u2812\u2810\u2810\u2812\u2816\u2826\u2824\u2820\u2820\u2824\u2826\u2816\u2812\u2810\u2810\u2812\u2813\u280B\u2809\u2808',
    '\u2801\u2801\u2809\u2819\u281A\u2812\u2802\u2802\u2812\u2832\u2834\u2824\u2804\u2804\u2824\u2820\u2820\u2824\u2826\u2816\u2812\u2810\u2810\u2812\u2813\u280B\u2809\u2808\u2808',
    '\u2884\u2882\u2881\u2841\u2848\u2850\u2860',
    '\u28B9\u28BA\u28BC\u28F8\u28C7\u2867\u2857\u284F',
    '\u28FE\u28FD\u28FB\u28BF\u287F\u28DF\u28EF\u28F7',
    '\u2801\u2802\u2804\u2840\u2880\u2820\u2810\u2808',
    [
      '\u{1F311}',
      '\u{1F312}',
      '\u{1F313}',
      '\u{1F314}',
      '\u{1F315}',
      '\u{1F31D}',
      '\u{1F316}',
      '\u{1F317}',
      '\u{1F318}',
      '\u{1F31A}',
    ],
    [
      '\u{1F55B}',
      '\u{1F550}',
      '\u{1F551}',
      '\u{1F552}',
      '\u{1F553}',
      '\u{1F554}',
      '\u{1F555}',
      '\u{1F556}',
      '\u{1F557}',
      '\u{1F558}',
      '\u{1F559}',
      '\u{1F55A}',
    ],
  ]
})
var et = O((Ze) => {
  var ze = require('readline'),
    Qe = 0,
    Xe = 60
  function ri(r) {
    this.clearLine(this.stream), this.stream.write(r)
  }
  var g = function (r) {
    if (!(this instanceof g)) return new g(r)
    typeof r == 'string' ? (r = { text: r }) : r || (r = {}),
      (this.text = r.text || ''),
      this.setSpinnerString(Qe),
      this.setSpinnerDelay(Xe),
      (this.onTick = r.onTick || ri),
      (this.stream = r.stream || process.stdout)
  }
  g.spinners = Je()
  g.setDefaultSpinnerString = function (r) {
    return (Qe = r), this
  }
  g.setDefaultSpinnerDelay = function (r) {
    return (Xe = r), this
  }
  g.prototype.start = function () {
    if (this.stream === process.stdout && this.stream.isTTY !== !0) return this
    var r = 0,
      e = this,
      t = function () {
        var i =
          e.text.indexOf('%s') > -1
            ? e.text.replace('%s', e.chars[r])
            : e.chars[r] + ' ' + e.text
        e.onTick(i), (r = ++r % e.chars.length)
      }
    return t(), (this.id = setInterval(t, this.delay)), this
  }
  g.prototype.isSpinning = function () {
    return this.id !== void 0
  }
  g.prototype.setSpinnerDelay = function (r) {
    return (this.delay = r), this
  }
  g.prototype.setSpinnerString = function (r) {
    let e = oi(r, this.spinners)
    return (this.chars = Array.isArray(e) ? e : e.split('')), this
  }
  g.prototype.setSpinnerTitle = function (r) {
    return (this.text = r), this
  }
  g.prototype.stop = function (r) {
    return this.isSpinning === !1
      ? this
      : (clearInterval(this.id),
        (this.id = void 0),
        r && this.clearLine(this.stream),
        this)
  }
  g.prototype.clearLine = function (r) {
    return ze.clearLine(r, 0), ze.cursorTo(r, 0), this
  }
  function si(r) {
    return typeof r == 'number' && r % 1 === 0
  }
  function oi(r, e) {
    if (!si(r)) return r + ''
    var t = g.spinners.length
    return (r = r >= t ? 0 : r), (r = r < 0 ? t + r : r), g.spinners[r]
  }
  Ze.Spinner = g
})
var ci = {}
dt(ci, {
  ACCOUNT_PATH: () => ui,
  LEDGER_PATH: () => ue,
  LOG_PATH: () => fe,
  SOLV_ROOT: () => ge,
  USER: () => ai,
  VOTE_ACCOUNT_PATH: () => li,
  WD: () => ut,
  program: () => x,
})
module.exports = gt(ci)
var de = S(Ce())
var Re = S(He(), 1),
  {
    program: Ai,
    createCommand: xi,
    createArgument: wi,
    createOption: yi,
    CommanderError: vi,
    InvalidArgumentError: Ei,
    InvalidOptionArgumentError: Si,
    Command: De,
    Argument: $i,
    Option: Ti,
    Help: Vi,
  } = Re.default
var Ie = '0.1.9'
var oe = require('child_process')
var ae = async (r) => {
    let e = [`sh -c "$(curl -sSfL https://release.solana.com/v${r}/install)"`]
    ;(0, oe.spawnSync)(e.join(' && '), { shell: !0, stdio: 'inherit' })
  },
  le = async (r) => {
    let e = [
      `solana-validator --ledger ${ue} exit --max-delinquent-stake ${r} --monitor`,
    ]
    ;(0, oe.spawnSync)(e.join(' && '), { shell: !0, stdio: 'inherit' })
  }
var Me =
    (r = 0) =>
    (e) =>
      `\x1B[${e + r}m`,
  je =
    (r = 0) =>
    (e) =>
      `\x1B[${38 + r};5;${e}m`,
  Pe =
    (r = 0) =>
    (e, t, i) =>
      `\x1B[${38 + r};2;${e};${t};${i}m`,
  m = {
    modifier: {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      overline: [53, 55],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      blackBright: [90, 39],
      gray: [90, 39],
      grey: [90, 39],
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39],
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgBlackBright: [100, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49],
    },
  },
  Ri = Object.keys(m.modifier),
  Bt = Object.keys(m.color),
  Wt = Object.keys(m.bgColor),
  Di = [...Bt, ...Wt]
function Ut() {
  let r = new Map()
  for (let [e, t] of Object.entries(m)) {
    for (let [i, n] of Object.entries(t))
      (m[i] = { open: `\x1B[${n[0]}m`, close: `\x1B[${n[1]}m` }),
        (t[i] = m[i]),
        r.set(n[0], n[1])
    Object.defineProperty(m, e, { value: t, enumerable: !1 })
  }
  return (
    Object.defineProperty(m, 'codes', { value: r, enumerable: !1 }),
    (m.color.close = '\x1B[39m'),
    (m.bgColor.close = '\x1B[49m'),
    (m.color.ansi = Me()),
    (m.color.ansi256 = je()),
    (m.color.ansi16m = Pe()),
    (m.bgColor.ansi = Me(10)),
    (m.bgColor.ansi256 = je(10)),
    (m.bgColor.ansi16m = Pe(10)),
    Object.defineProperties(m, {
      rgbToAnsi256: {
        value(e, t, i) {
          return e === t && t === i
            ? e < 8
              ? 16
              : e > 248
              ? 231
              : Math.round(((e - 8) / 247) * 24) + 232
            : 16 +
                36 * Math.round((e / 255) * 5) +
                6 * Math.round((t / 255) * 5) +
                Math.round((i / 255) * 5)
        },
        enumerable: !1,
      },
      hexToRgb: {
        value(e) {
          let t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16))
          if (!t) return [0, 0, 0]
          let [i] = t
          i.length === 3 && (i = [...i].map((s) => s + s).join(''))
          let n = Number.parseInt(i, 16)
          return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
        },
        enumerable: !1,
      },
      hexToAnsi256: {
        value: (e) => m.rgbToAnsi256(...m.hexToRgb(e)),
        enumerable: !1,
      },
      ansi256ToAnsi: {
        value(e) {
          if (e < 8) return 30 + e
          if (e < 16) return 90 + (e - 8)
          let t, i, n
          if (e >= 232) (t = ((e - 232) * 10 + 8) / 255), (i = t), (n = t)
          else {
            e -= 16
            let l = e % 36
            ;(t = Math.floor(e / 36) / 5),
              (i = Math.floor(l / 6) / 5),
              (n = (l % 6) / 5)
          }
          let s = Math.max(t, i, n) * 2
          if (s === 0) return 30
          let o =
            30 + ((Math.round(n) << 2) | (Math.round(i) << 1) | Math.round(t))
          return s === 2 && (o += 60), o
        },
        enumerable: !1,
      },
      rgbToAnsi: {
        value: (e, t, i) => m.ansi256ToAnsi(m.rgbToAnsi256(e, t, i)),
        enumerable: !1,
      },
      hexToAnsi: {
        value: (e) => m.ansi256ToAnsi(m.hexToAnsi256(e)),
        enumerable: !1,
      },
    }),
    m
  )
}
var Gt = Ut(),
  A = Gt
var B = S(require('node:process'), 1),
  qe = S(require('node:os'), 1),
  he = S(require('node:tty'), 1)
function b(r, e = globalThis.Deno ? globalThis.Deno.args : B.default.argv) {
  let t = r.startsWith('-') ? '' : r.length === 1 ? '-' : '--',
    i = e.indexOf(t + r),
    n = e.indexOf('--')
  return i !== -1 && (n === -1 || i < n)
}
var { env: f } = B.default,
  q
b('no-color') || b('no-colors') || b('color=false') || b('color=never')
  ? (q = 0)
  : (b('color') || b('colors') || b('color=true') || b('color=always')) &&
    (q = 1)
function Yt() {
  if ('FORCE_COLOR' in f)
    return f.FORCE_COLOR === 'true'
      ? 1
      : f.FORCE_COLOR === 'false'
      ? 0
      : f.FORCE_COLOR.length === 0
      ? 1
      : Math.min(Number.parseInt(f.FORCE_COLOR, 10), 3)
}
function Kt(r) {
  return r === 0
    ? !1
    : { level: r, hasBasic: !0, has256: r >= 2, has16m: r >= 3 }
}
function Jt(r, { streamIsTTY: e, sniffFlags: t = !0 } = {}) {
  let i = Yt()
  i !== void 0 && (q = i)
  let n = t ? q : i
  if (n === 0) return 0
  if (t) {
    if (b('color=16m') || b('color=full') || b('color=truecolor')) return 3
    if (b('color=256')) return 2
  }
  if ('TF_BUILD' in f && 'AGENT_NAME' in f) return 1
  if (r && !e && n === void 0) return 0
  let s = n || 0
  if (f.TERM === 'dumb') return s
  if (B.default.platform === 'win32') {
    let o = qe.default.release().split('.')
    return Number(o[0]) >= 10 && Number(o[2]) >= 10586
      ? Number(o[2]) >= 14931
        ? 3
        : 2
      : 1
  }
  if ('CI' in f)
    return 'GITHUB_ACTIONS' in f || 'GITEA_ACTIONS' in f
      ? 3
      : [
          'TRAVIS',
          'CIRCLECI',
          'APPVEYOR',
          'GITLAB_CI',
          'BUILDKITE',
          'DRONE',
        ].some((o) => o in f) || f.CI_NAME === 'codeship'
      ? 1
      : s
  if ('TEAMCITY_VERSION' in f)
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(f.TEAMCITY_VERSION) ? 1 : 0
  if (f.COLORTERM === 'truecolor' || f.TERM === 'xterm-kitty') return 3
  if ('TERM_PROGRAM' in f) {
    let o = Number.parseInt((f.TERM_PROGRAM_VERSION || '').split('.')[0], 10)
    switch (f.TERM_PROGRAM) {
      case 'iTerm.app':
        return o >= 3 ? 3 : 2
      case 'Apple_Terminal':
        return 2
    }
  }
  return /-256(color)?$/i.test(f.TERM)
    ? 2
    : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
        f.TERM
      ) || 'COLORTERM' in f
    ? 1
    : s
}
function Le(r, e = {}) {
  let t = Jt(r, { streamIsTTY: r && r.isTTY, ...e })
  return Kt(t)
}
var zt = {
    stdout: Le({ isTTY: he.default.isatty(1) }),
    stderr: Le({ isTTY: he.default.isatty(2) }),
  },
  Be = zt
function We(r, e, t) {
  let i = r.indexOf(e)
  if (i === -1) return r
  let n = e.length,
    s = 0,
    o = ''
  do (o += r.slice(s, i) + e + t), (s = i + n), (i = r.indexOf(e, s))
  while (i !== -1)
  return (o += r.slice(s)), o
}
function Ue(r, e, t, i) {
  let n = 0,
    s = ''
  do {
    let o = r[i - 1] === '\r'
    ;(s +=
      r.slice(n, o ? i - 1 : i) +
      e +
      (o
        ? `\r
`
        : `
`) +
      t),
      (n = i + 1),
      (i = r.indexOf(
        `
`,
        n
      ))
  } while (i !== -1)
  return (s += r.slice(n)), s
}
var { stdout: Ge, stderr: Ye } = Be,
  ce = Symbol('GENERATOR'),
  $ = Symbol('STYLER'),
  k = Symbol('IS_EMPTY'),
  Ke = ['ansi', 'ansi', 'ansi256', 'ansi16m'],
  T = Object.create(null),
  Qt = (r, e = {}) => {
    if (e.level && !(Number.isInteger(e.level) && e.level >= 0 && e.level <= 3))
      throw new Error('The `level` option should be an integer from 0 to 3')
    let t = Ge ? Ge.level : 0
    r.level = e.level === void 0 ? t : e.level
  }
var Xt = (r) => {
  let e = (...t) => t.join(' ')
  return Qt(e, r), Object.setPrototypeOf(e, H.prototype), e
}
function H(r) {
  return Xt(r)
}
Object.setPrototypeOf(H.prototype, Function.prototype)
for (let [r, e] of Object.entries(A))
  T[r] = {
    get() {
      let t = W(this, me(e.open, e.close, this[$]), this[k])
      return Object.defineProperty(this, r, { value: t }), t
    },
  }
T.visible = {
  get() {
    let r = W(this, this[$], !0)
    return Object.defineProperty(this, 'visible', { value: r }), r
  },
}
var pe = (r, e, t, ...i) =>
    r === 'rgb'
      ? e === 'ansi16m'
        ? A[t].ansi16m(...i)
        : e === 'ansi256'
        ? A[t].ansi256(A.rgbToAnsi256(...i))
        : A[t].ansi(A.rgbToAnsi(...i))
      : r === 'hex'
      ? pe('rgb', e, t, ...A.hexToRgb(...i))
      : A[t][r](...i),
  Zt = ['rgb', 'hex', 'ansi256']
for (let r of Zt) {
  T[r] = {
    get() {
      let { level: t } = this
      return function (...i) {
        let n = me(pe(r, Ke[t], 'color', ...i), A.color.close, this[$])
        return W(this, n, this[k])
      }
    },
  }
  let e = 'bg' + r[0].toUpperCase() + r.slice(1)
  T[e] = {
    get() {
      let { level: t } = this
      return function (...i) {
        let n = me(pe(r, Ke[t], 'bgColor', ...i), A.bgColor.close, this[$])
        return W(this, n, this[k])
      }
    },
  }
}
var ei = Object.defineProperties(() => {}, {
    ...T,
    level: {
      enumerable: !0,
      get() {
        return this[ce].level
      },
      set(r) {
        this[ce].level = r
      },
    },
  }),
  me = (r, e, t) => {
    let i, n
    return (
      t === void 0
        ? ((i = r), (n = e))
        : ((i = t.openAll + r), (n = e + t.closeAll)),
      { open: r, close: e, openAll: i, closeAll: n, parent: t }
    )
  },
  W = (r, e, t) => {
    let i = (...n) => ti(i, n.length === 1 ? '' + n[0] : n.join(' '))
    return Object.setPrototypeOf(i, ei), (i[ce] = r), (i[$] = e), (i[k] = t), i
  },
  ti = (r, e) => {
    if (r.level <= 0 || !e) return r[k] ? '' : e
    let t = r[$]
    if (t === void 0) return e
    let { openAll: i, closeAll: n } = t
    if (e.includes('\x1B'))
      for (; t !== void 0; ) (e = We(e, t.close, t.open)), (t = t.parent)
    let s = e.indexOf(`
`)
    return s !== -1 && (e = Ue(e, n, i, s)), i + e + n
  }
Object.defineProperties(H.prototype, T)
var ii = H(),
  Bi = H({ level: Ye ? Ye.level : 0 })
var v = ii
var tt = S(et()),
  R
;((t) => (
  (t.normal = (i) => {
    console.log(v.white(i))
  }),
  (t.syncSpinner = (i) => {
    let n = new tt.Spinner(
      v.white(i) +
        ` %s
`
    )
    try {
      return n.setSpinnerString(18), n.start(), n
    } catch (s) {
      throw (n.stop(!0), new Error(`syncSpinner Error: ${s}`))
    }
  })
))((R ||= {}))
var it = async () => {
  let r = x.command('update').description('Update Solana Validator Node')
  r
    .command('solana')
    .alias('s')
    .description('Update Solana Version')
    .argument('<version>', 'Solana Version e.g. 1.16.7')
    .action(async (e) => {
      let t = R.syncSpinner(`\u2714\uFE0F Updating Solana to ${v.green(e)}`)
      await ae(e), t.stop(!0)
    }),
    r
      .command('monitor')
      .alias('m')
      .description('Monitor Update')
      .argument('<maxDelinquentStake>', 'Max Delinquent Stake e.g. 10')
      .action(async (e) => {
        let t = R.syncSpinner(
          `\u2714\uFE0F Monitoring Update with Max Delinquent Stake ${v.green(
            e
          )}`
        )
        await le(e), t.stop(!0)
      }),
    r
      .command('all')
      .alias('a')
      .description('Update Solana Version and Monitor Update')
      .argument('<version>', 'Solana Version e.g. 1.16.7')
      .argument('<maxDelinquentStake>', 'Max Delinquent Stake e.g. 10')
      .action(async (e, t) => {
        let i = R.syncSpinner(
          `\u2714\uFE0F Updating Solana to ${v.green(
            e
          )} and Monitoring Update with Max Delinquent Stake ${v.green(t)}`
        )
        await ae(e), await le(t), i.stop(!0)
      })
}
var nt = require('child_process'),
  rt = (r) => {
    try {
      let e = `tail -f ${fe}/solana-validator.log`
      r.error
        ? (e += " | grep '(WARN|ERR)'")
        : r.info
        ? (e += ' | grep INFO')
        : r.warning && (e += ' | grep WARN'),
        console.log(e),
        (0, nt.spawn)(e, { shell: !0, stdio: 'inherit' }).on('error', (i) => {
          throw new Error(`tail Error: ${i}`)
        })
    } catch (e) {
      throw new Error(`tail Error: ${e}`)
    }
  }
var st = async () => {
  x.command('log')
    .description('log commands')
    .command('tail')
    .alias('t')
    .description('tail logs')
    .option('-i, --info', 'Follow INFO output', !1)
    .option('-w, --warning', 'Follow WARN output', !1)
    .option('-e, --error', 'Follow ERR output', !1)
    .option('-a, --all', 'Follow WARN and ERR output', !1)
    .action((e) => {
      rt(e)
    })
}
var ot = require('child_process'),
  U = require('fs'),
  at = (r) => {
    let e = `release/solv_${r}`
    ;(0, U.existsSync)(e) || (0, U.mkdirSync)(e)
    let t = `mv solv_${r}* ${e}`
    ;(0, ot.spawn)(t, { shell: !0, stdio: 'inherit' })
  }
var lt = async () => {
  x.command('release')
    .description('release commands')
    .command('mvDeb')
    .alias('m')
    .description('move deb files to release folder')
    .argument('<version>', 'Solana Version e.g. 1.16.7')
    .action((e) => {
      at(e)
    })
}
de.default.config()
var ai = process.env.SOLV_USER || 'solv',
  ge = '/mt/solana',
  ut = `${ge}/solana-validator`,
  fe = `${ut}/log`,
  li = `${ge}/vote-account.json`,
  ui = '/mt/solana-accounts',
  ue = '/mt/ledger/validator-ledger',
  x = new De()
x.name('solv').description('CLI for Solana Validators').version(Ie)
de.default.config()
async function hi() {
  try {
    x
      .command('solv')
      .description('CLI for Solana Validators')
      .action(() => {
        console.log('solv')
      }),
      await it(),
      await st(),
      await lt(),
      await x.parseAsync(process.argv)
  } catch (r) {
    console.log(r)
  }
}
hi()
0 &&
  (module.exports = {
    ACCOUNT_PATH,
    LEDGER_PATH,
    LOG_PATH,
    SOLV_ROOT,
    USER,
    VOTE_ACCOUNT_PATH,
    WD,
    program,
  })
