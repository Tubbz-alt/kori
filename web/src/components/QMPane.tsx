import {useLocalStore, useObserver} from "mobx-react-lite";
import * as React from "react";
import {useEffect} from "react";
import {
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';

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
    inputsContainer: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    },
    valuesLabel: {
      margin: theme.spacing(1)
    },
    valuesContainer: {
      display: 'inline-grid',
      gridTemplateColumns: 'repeat(10,1fr)',
      gridColumnGap: 8
    }
  }))
;

const kori = require('../libs/kori');
window['kori'] = kori;

const {QM} = kori.me.wener.kori.logic;
const toBinaryRepresentationString = QM.Companion.toBinaryRepresentationString.bind(QM.Companion);
const toBinaryRepresentation = QM.Companion.toBinaryRepresentation.bind(QM.Companion);
const toVariableString = QM.Companion.toVariableString.bind(QM.Companion);

const qm = new QM();
qm.debug = true;
window["qm"] = qm;

function MintermTable({
                        table,
                        showCombined = false,
                        onRowMouseEnter = (v) => (null),
                        onRowMouseLeave = (v) => (null)
                      }) {
  return useObserver(() =>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell><abbr title="Number of 1s">1s</abbr></TableCell>
          <TableCell>Minterm</TableCell>
          <TableCell><abbr title="Binary Representation">Binary</abbr></TableCell>
          {
            showCombined &&
            <TableCell>
              <abbr title="Term has been combined or can not combine anymore">
                ✓
              </abbr>
            </TableCell>
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          table
            .map((row, i) => (
              row.terms.map((v, j) => (
                <TableRow
                  key={`${i}-${j}`}
                  selected={v.selected}
                  onMouseEnter={() => onRowMouseEnter(v)}
                  onMouseLeave={() => onRowMouseLeave(v)}
                >
                  {
                    j === 0 &&
                    <TableCell rowSpan={row.terms.length}>{row.ones}</TableCell>
                  }
                  <TableCell>{v.matches.join(',')}</TableCell>
                  <TableCell>
                    <Typography noWrap>
                      {toBinaryRepresentationString(v.bin)}
                    </Typography>
                  </TableCell>
                  {
                    showCombined &&
                    <TableCell>{v.combined && <CheckIcon/> || <DoneAllIcon color="primary"/>}</TableCell>
                  }
                </TableRow>
              ))
            ))
        }
      </TableBody>
    </Table>
  );
}

export default function QMPane(props) {
  const classes = useStyles();
  const store = useLocalStore(() => ({
    matches: [4, 8, 10, 11, 12, 15],
    ignores: [9, 14],
    matchValue: 13,
    ignoreValue: 3,

    variableCountInput: 4,
    variableCount: 4,
    variableCountError: '',

    minimizedExpression: '',

    truthTable: [],
    mintermlist: [] as Array<{ ones: number, terms: [{ match, bin }] }>,
    primes: [] as Array<{ matches, bin }>,
    iterations: [],

    selected: null,

    estimateCompares: 0,
    compares: 0,

    addMatch(v = store.matchValue) {
      v = parseInt(v);
      if (!store.matches.includes(v)) {
        store.matches.push(v);
        store.matches = store.matches.slice().sort((a, b) => a - b)
      }
    },
    removeMatch(v) {
      store.matches = store.matches.filter(i => i != v)
    },

    addIgnore(v = store.ignoreValue) {
      v = parseInt(v);
      if (!store.ignores.includes(v)) {
        store.ignores.push(v);
        store.ignores = store.ignores.slice().sort((a, b) => a - b)
      }
    },
    removeIgnore(v) {
      store.ignores = store.ignores.filter(i => i != v)
    },
    onIterationRowHoverEnter(term) {
      console.log(`Enter ${term.bin}`)
      if (store.selected) {
        store.selected.selected = false
      }
      store.selected = term;
      store.selected.selected = true
    },
    onIterationRowHoverLeave(term) {
      console.log(`Leave ${term.bin}`)
      if (store.selected) {
        store.selected.selected = false
      }
      store.selected = null;
    },
    doResolve() {
      store.variableCount = parseInt(store.variableCountInput)
      qm.reset(store.variableCount, store.matches, store.ignores);
      try {
        qm.resolve()
      } catch (e) {
        console.log(`Failed to resolve`, e);
        return
      }
      store.compares = qm.compares;
      store.minimizedExpression = qm.essentials.toArray().map(v => toVariableString(v.bin)).join('+')

      // match,bin,1
      const terms = qm.terms.toArray();
      store.truthTable = terms.map(v => [v.matches.toArray()[0].toInt(), ...v.bin, 1]);

      const grouping = (terms) => {
        let group = terms.reduce((a, v) => {
          const ones = v.ones;
          const g = a[ones] || {ones: ones, terms: []};
          a[ones] = g;
          g.terms.push({matches: v.matches.toArray(), bin: v.bin, combined: v.combined});
          return a
        }, {});
        group = Object.values(group).sort((a: any, b: any) => a.ones - b.ones);
        group.forEach(v => v.terms.sort((a, b) => a.match - b.match));
        return group
      };
      store.mintermlist = grouping(terms);

      store.primes = qm.primes.toArray().map(v => ({
        matches: v.matches.toArray().map(v => v.toInt()),
        bin: Array.from(v.bin) // typed to js array
      }));

      store.iterations = qm.iterations.toArray().map(v => grouping(v.toArray()));
    }
  }));

  useEffect(() => {
    let n = parseInt(store.variableCount);
    store.variableCountError = null;
    if (n <= 0) {
      store.variableCountError = "count must > 0"
    } else if (n > 12) {
      store.variableCountError = "count must <= 12"
    } else if (!(n > 1)) {
      store.variableCountError = "invalid"
    }

    if (!store.variableCountError) {
      store.estimateCompares = QM.Companion.estimateMintermlistCompares(store.variableCount).toInt()
    }
  }, [store.variableCountInput]);

  useEffect(() => {
    store.doResolve()
  }, []);

  window['testStore'] = store;


  return useObserver(() =>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h4">
            Inputs
          </Typography>
          <div>
            <div className={classes.inputsContainer}>
              <TextField
                error={!!store.variableCountError}
                helperText={store.variableCountError}
                label="Variables"
                value={store.variableCountInput}
                onChange={e => store.variableCountInput = e.target.value}
                type="number"
                margin="normal"
              />
              <TextField
                label="Match"
                value={store.matchValue}
                onChange={e => store.matchValue = parseInt(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    store.addMatch();
                    e.preventDefault()
                  }
                }}
                type="number"
                margin="normal"
              />
              <TextField
                label="Ignore"
                value={store.ignoreValue}
                onChange={e => store.ignoreValue = parseInt(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    store.addIgnore();
                    e.preventDefault()
                  }
                }}
                type="number"
                margin="normal"
              />
              <Button
                color="primary"
                variant="contained"
                onClick={store.doResolve}
              >Resolve</Button>
            </div>
            <Divider style={{margin: "8px 0"}}/>
            <div>
              <Typography component="h6">
                Matches
              </Typography>
              <div className={classes.valuesContainer}>
                {
                  store
                    .matches
                    .map(v => (
                      <Chip
                        key={`match-${v}`}
                        variant="outlined"
                        color="primary"
                        label={`${v}`}
                        onDelete={() => store.removeMatch(v)}
                      />
                    )) || 'No matches'
                }
              </div>
            </div>

            <div>
              <Typography component="h6">
                Ignores
              </Typography>
              <div className={classes.valuesContainer}>
                {
                  store
                    .ignores
                    .map(v => (
                      <Chip
                        key={`match-${v}`}
                        variant="outlined"
                        color="primary"
                        label={`${v}`}
                        onDelete={() => store.removeIgnore(v)}
                      />
                    )) || 'No ignores'
                }
              </div>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h4">
            Result
          </Typography>
          <List component="nav">
            <ListItem>
              <ListItemText primary="Estimate compares" secondary={store.estimateCompares}/>
            </ListItem>
            <ListItem>
              <ListItemText primary="Expression" secondary={store.minimizedExpression}/>
            </ListItem>
            <ListItem>
              <ListItemText primary="Compares" secondary={store.compares}/>
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h4">
            Truth Table
          </Typography>
          <div>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell/>
                  {
                    Array
                      .from(Array(store.variableCount).keys())
                      .map(v => (
                        <TableCell key={v}>{String.fromCharCode('A'.charCodeAt(0) + v)}</TableCell>
                      ))
                  }
                  <TableCell>f</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  store.truthTable
                    .map((row, i) => (
                      <TableRow key={i}>
                        {
                          row
                            .map((v, i) => (
                              <TableCell key={i}>{`${i === 0 ? 'm' : ''}${v}`}</TableCell>
                            ))
                        }
                      </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h4">
            Mintermlist
          </Typography>
          <div>
            <MintermTable table={store.mintermlist}/>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h4">
            Prime Implicants Chart
          </Typography>
          <div>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {
                    store.matches.map(v => (<TableCell key={v}>{v}</TableCell>))
                  }
                  <TableCell> <ArrowRightAltIcon/> </TableCell>

                  {
                    Array
                      .from(Array(store.variableCount).keys())
                      .map(v => (
                        <TableCell key={v}>{String.fromCharCode('A'.charCodeAt(0) + v)}</TableCell>
                      ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  store
                    .primes
                    .map((row, i) => (
                      <TableRow key={i}>
                        <TableCell key={'matches'}>{row.matches.map(v => `m${v}`).join(',')}</TableCell>
                        {
                          store.matches.map((v, i) => (
                            <TableCell key={`m-${i}`}>
                              {
                                row.matches.includes(v) &&
                                <CheckIcon color="primary"/>
                              }
                            </TableCell>))
                        }
                        <TableCell> <ArrowRightAltIcon/> </TableCell>
                        {
                          row.bin.map((v, i) => (
                            <TableCell key={`bin-${i}`}>{toBinaryRepresentation(v)}</TableCell>
                          ))
                        }
                      </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </div>
        </Paper>
      </Grid>
      <Grid item md={12}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h4">
            Iterations
          </Typography>
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${store.iterations.length},1fr)`,
            gridColumnGap: 8
          }}>
            {
              store.iterations.map((v, i) => (
                <div key={i}>
                  <MintermTable
                    table={v} showCombined
                    onRowMouseEnter={store.onIterationRowHoverEnter}
                    onRowMouseLeave={store.onIterationRowHoverLeave}
                  />
                </div>
              ))
            }
          </div>
        </Paper>
      </Grid>
    </Grid>)
}
