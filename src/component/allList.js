import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

const SimpleList = (props) => {

  const classes = useStyles();
  const[data, setData] = useState({});

  useEffect(()=>{
    setData(props.balanceSheet);
  },[props.balanceSheet]);

  return (
    <div className={classes.root}>
      <List component="nav">
        {data.inc_exp ? data.inc_exp.length > 0 ? data.inc_exp.map((el,i) => {
          const tempDt = new Date(el.date.toString());
          return (
            <ListItem button key={`${Math.random()}${el.date.toString()}`}>
            <ListItemText secondary={`${tempDt.getDate()}.${tempDt.getMonth()+1}.${tempDt.getFullYear()}`}><span className={`${classes.sheetEntry} ${el.type === 'income' ? classes.income : classes.expense}` }>{el.amount.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} KC</span></ListItemText>
            <ListItemText>{el.details}</ListItemText>
            <ListItemIcon>
              <DeleteIcon onClick={props.deleteItem.bind(this,i,el.type)}/>
            </ListItemIcon>
            <Divider />
          </ListItem>)
        }) : <ListItem><span>No Data to Show</span></ListItem> : <CircularProgress color="secondary" />}
      </List>
    </div>
  );
}

export default SimpleList;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    paddingTop:'180px',
    paddingBottom: '50px',
  },
  sheetEntry:{
    fontSize:'1.5rem',
    fontWeight:'bold'
  },
  income:{
    color:'#6DE23A',
  },
  expense:{
    color:'#BB312F'
  },
  NoData:{
    color:'#EA4B49'
  }
}));