import * as React from 'react';
import {useEffect} from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx'
import {useLocalStore, useObserver} from 'mobx-react-lite';
import TruthTable from '../components/TruthTable';
import {navigate} from 'hookrouter';
import {Trans, useTranslation} from 'react-i18next';

const kori = require('../libs/kori');
window['kori'] = kori;

const {QM, Logics} = kori.me.wener.kori.logic;
const {LogicExpressions, Rewriters} = kori.me.wener.kori.logic.exp;


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const qm = new QM();
qm.debug = true;
window['qm'] = qm;
const toVariableString = QM.Companion.toVariableString.bind(QM.Companion);

// useStrict(true)
export default function LogicPane(props) {
  const rewrites = [
    {
      label: 'Double Negation',
      value: 'doubleNegation',
      attach: Rewriters.doubleNegation
    }, {
      label: 'XOR to SOP',
      value: 'xor2sop',
      attach: Rewriters.xor2sop
    }, {
      label: 'Unnecessary Parentheses',
      value: 'unnecessaryParentheses',
      attach: Rewriters.unnecessaryParentheses
    }, {
      label: 'Simplify',
      value: 'simplify',
      attach: Rewriters.simplify
    }
  ];

  const store = useLocalStore(source => ({
    rewrites: ['unnecessaryParentheses', 'doubleNegation'],
    value: props.value || '(a || b) || c && !(!d) && (e && f)',
    e: null,
    simplified: null,
    error: '',
    variables: [],
    addRewrite(v) {
      store.rewrites.push(v)
    },
    removeRewrite(v) {
      store.rewrites = store.rewrites.filter(i => i != v)
    },

    matches: [],
    truthTable: [],
    truthTableVariables: [],

    compares: 0,
    minimizedExpression: '',

    doResolve() {
      if (!store.e) {
        return
      }
      const {first: names, second: matches} = LogicExpressions.resolve(store.e)
      const matcheIntsArray = matches.toArray();
      store.truthTable = matcheIntsArray.map(v => [Logics.fromBinaryIntArrayToLong(v).toInt(), ...v, 1]).sort((a, b) => a[0] - b[0]);
      store.truthTableVariables = names.toArray();

      store.matches = matcheIntsArray.map(v => Logics.fromBinaryIntArrayToLong(v).toInt())
    },
    doApplyQmMethod() {
      store.doResolve();

      qm.reset(store.truthTableVariables.length, store.matches, [])
      try {
        qm.resolve()
      } catch (e) {
        console.log(`Failed to resolve`, e);
        return
      }
      store.compares = qm.compares;
      store.minimizedExpression = qm.essentials.toArray().map(v => toVariableString(v.bin)).join('+')

    },
    doJumpQmMethod() {
      store.doResolve();
      navigate('/qm', false, {matches: store.matches.join(','), variableCount: store.variables.length});
    }
  }), props);

  // parse new expression
  useEffect(() => {
    try {
      store.e = LogicExpressions.parse(store.value)
      store.error = null
    } catch (e) {
      console.log(`Invalid expression '${store.value}' - ${e.message}`)
      store.error = e.message
    }
    if (!store.error) {
      store.variables = LogicExpressions.variables(store.e).toArray()
    }
  }, [store.value]);

  // simplify expression
  useEffect(() => {
    if (!store.e) {
      return
    }

    const rw = rewrites
      .filter(v => store.rewrites.includes(v.value))
      .map(v => v.attach)
    store.simplified = Rewriters.rewrite(store.e, Rewriters.chain(rw))
  }, [store.e]);


  const classes = useStyles(props);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  window['testStore'] = store;


  const currentRewrites = store.rewrites;

  const {t} = useTranslation();

  return useObserver(() =>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Typography variant="h5" component="h3">
            <Trans>Boolean expression</Trans>
          </Typography>
          <TextField
            error={!!store.error}
            helperText={store.error}
            label={t('Expression')}
            value={store.value}
            placeholder="a || b && c"
            onChange={e => store.value = e.target.value}
            margin="normal"
          />
          <div>
            <Button color="primary" onClick={store.doResolve}>
              <Trans>Resolve</Trans>
            </Button>
            <Button color="primary" onClick={store.doApplyQmMethod}>
              <Trans>Minimize</Trans>
            </Button>
            <Button color="primary" onClick={store.doJumpQmMethod}>
              <Trans>Jump to QM minimizer</Trans>
            </Button>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Typography variant="h5" component="h3">
            <Trans>Results</Trans>
          </Typography>

          <List component="nav">
            <ListItem>
              <ListItemText primary={<Trans>Variables</Trans>} secondary={store.variables.join(',')} />
            </ListItem>

            <ListItem>
              <ListItemText primary={<Trans>Compares</Trans>} secondary={store.compares} />
            </ListItem>
            <ListItem>
              <ListItemText primary={<Trans>Minimized</Trans>} secondary={store.minimizedExpression} />
            </ListItem>

          </List>

        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h4">
            <Trans>Simplified expression</Trans>
          </Typography>
          <FormGroup row>
            {
              rewrites.map(v => (
                <FormControlLabel
                  key={v.value}
                  label={v.label}
                  control={
                    <Checkbox
                      value={v.value}
                      checked={currentRewrites.includes(v.value)}
                      onChange={e => {
                        if (e.target.checked) {
                          store.addRewrite(v.value)
                        } else {
                          store.removeRewrite(v.value)
                        }
                      }}
                    />
                  }
                />))
            }
          </FormGroup>
          <Typography component="p">
            {store.e && store.e.toExpressionString()}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h4">
            <Trans>Truth Table</Trans>
          </Typography>
          <TruthTable table={store.truthTable} variables={store.truthTableVariables} />
        </Paper>
      </Grid>
    </Grid>
  );
};


