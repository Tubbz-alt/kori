import * as React from "react";
import {useEffect} from "react";
import {
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
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import clsx from 'clsx'
import {useLocalStore, useObserver} from "mobx-react-lite";

const kori = require('../libs/kori');
window['kori'] = kori;

const {QM} = kori.me.wener.kori.logic;
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
    }
  }), props);

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
  });

  useEffect(() => {
    if (!store.e) {
      return
    }

    const rw = rewrites
      .filter(v => store.rewrites.includes(v.value))
      .map(v => v.attach)
    store.simplified = Rewriters.rewrite(store.e, Rewriters.chain(rw))
  });


  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  window['testStore'] = store;


  const currentRewrites = store.rewrites;

  return useObserver(() =>
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Typography variant="h5" component="h3">
            Boolean expression
          </Typography>
          <TextField
            error={!!store.error}
            helperText={store.error}
            label="Expression"
            value={store.value}
            placeholder="a || b && c"
            onChange={e => store.value = e.target.value}
            margin="normal"
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <Typography variant="h5" component="h3">
            Info
          </Typography>

          <List component="nav">
            <ListItem>
              <ListItemText primary="Variables" secondary={store.variables.join(',')}/>
            </ListItem>
          </List>

        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6" component="h4">
            Simplified expression
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
    </Grid>
  );
};


