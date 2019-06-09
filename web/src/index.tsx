import * as React from 'react';
import ReactDOM from 'react-dom';
// import {CssBaseline, Link, ListItemIcon, ListSubheader, makeStyles} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import clsx from 'clsx'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LinkIcon from '@material-ui/icons/Link';
import Content from "./components/Content";
import {navigate} from "hookrouter";
import makeStyles from "@material-ui/core/styles/makeStyles";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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

const menus = [
  {
    label: 'Home',
    link: '/',
    icon: <DashboardIcon/>
  },
  {
    label: 'Boolean Expression',
    link: '/boolean-expression',
  },
  {
    label: 'Quine–McCluskey algorithm',
    link: '/qm',
  },
  {
    label: 'Github',
    link: 'https://github.com/wenerme/kori',
    icon: <LinkIcon/>
  },
];

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const goto = (link) => {
    if (/https?:/.test(link)) {
      window.open(link)
    } else {
      navigate(link)
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={() => setOpen(true)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Kori
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          <div>
            {
              menus.map(v => (
                <ListItem button key={v.label} onClick={() => goto(v.link)}>
                  {v.icon && (
                    <ListItemIcon>
                      {v.icon}
                    </ListItemIcon>
                  )}
                  <ListItemText primary={v.label}/>
                </ListItem>))
            }
          </div>
        </List>

        <Divider/>

        <List>
          <div>
            <ListSubheader>by</ListSubheader>
            <Link href="https://github.com/wenerme" target="_blank">
              <ListItem button>
                <ListItemText primary="wener"/>
              </ListItem>
            </Link>
            <Link href="https://kotlinlang.org" target="_blank">
              <ListItem button>
                <ListItemText primary="kotlin"/>
              </ListItem>
            </Link>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer}/>
        <Container maxWidth="lg" className={classes.container}>
          <Content/>
        </Container>
      </main>
    </div>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'));
