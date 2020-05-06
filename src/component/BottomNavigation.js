import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const BottomAppBar = (props) => {
  const classes = useStyles();
  return (<React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
            <Button variant="contained" className={classes.btnSty} onClick={props.initateModal.bind(this,'income')}>Add Income</Button>
            <Button variant="contained" color="secondary" onClick={props.initateModal.bind(this,'expense')}>Add Spending</Button>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </React.Fragment>);
};

export default BottomAppBar;

const useStyles = makeStyles((theme) => ({
  btnSty:{
    backgroundColor:'#43a047',
    color:'#FFF',
    marginRight:'50px'
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    alignItems:'center',
    display:'flex',
    padding:0,
    margin:0,
    justifyContent:'center'
  }
}));