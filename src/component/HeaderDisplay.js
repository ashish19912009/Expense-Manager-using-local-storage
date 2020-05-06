import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import IconButton from '@material-ui/core/IconButton';

const HeaderDisplay = (props) => {
    const classes = useStyles();
    const[data, setData] = useState({
      balance: 0,
      income: 0,
      expense: 0
    });

  useEffect(()=>{
    setData((Ldata)=>{
      let tempInc = 0;
      let tempExp = 0;
      if(props.balanceSheet.inc_exp.length>0)
      {
        props.balanceSheet.inc_exp.forEach(el=>{
                  if(el.type === 'income')
                    tempInc += parseInt(el.amount)
                  else
                    tempExp += parseInt(el.amount)
        })
      } 
      return{
        ...Ldata,
        balance: props.balanceSheet.balance,
        income: tempInc,
        expense: tempExp
      }
;    });
  },[props.balanceSheet]);

  return (
    <div>
      <Paper elevation={3} className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <span>Balance</span>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h3" gutterBottom> {data.balance >= 0 && data.balance > 0 ? data.balance.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') : 0} CZK</Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={props.resetAll}><OfflineBoltIcon style={{color:'#FFF'}}/></IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              <span style={{color:'#6DE23A'}}>Income {data.income >= 0 && data.income > 0 ? data.income.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '):0} KC</span><br/>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              <span style={{color:'#F9615F'}}>Spendings {data.expense >= 0 && data.expense > 0 ? data.expense.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 '):0} KC</span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default HeaderDisplay;

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius:0,
    padding: '20px 10px',
    backgroundColor:'#3f51b5',
    color:'#FFF',
    position:'fixed',
    zIndex:'1',
    width:'100%'
  },
}));