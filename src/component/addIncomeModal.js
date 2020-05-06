import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const AddIncome = (props) => {
    const classes = useStyles();
    const [expenseDetails, setExpenseDetails] = useState({
        date: new Date(),
        type: 'income',
        amount: 0,
        details:'',
    });

    const updateDetailsHandler = (event,type) => {
        event.persist();
        if(type === 'date')
            setExpenseDetails((data)=> {
                return{
                    ...data,
                    date: event.target.value
                }
            });
        if(type === 'amount')
            setExpenseDetails((data)=> {
                return{
                    ...data,
                    amount: event.target.value
                }
        });
        if(type === 'details')
            setExpenseDetails((data)=> {
                return{
                    ...data,
                    details: event.target.value
                }
        });
    }   

const incomeFormHandler = (event) => {
    event.preventDefault();
    if(expenseDetails.amount > 0)
    {
      props.addExpense(expenseDetails);
      setExpenseDetails({
        type: 'income',
        date: new Date(),
        amount: 0,
        details: ''
      });
      props.handleModalStatus('income');
    } else {
      setExpenseDetails((data)=>{
        return {
          ...data,
          amount: 0,
          error: true
        }
      });
    }
}

  return (
    <div>
      <Dialog
        open={props.modalStatus}
        onClose={props.handleModalStatus.bind(this,'income')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Income"}</DialogTitle>
        <form autoComplete="off" onSubmit={incomeFormHandler}>
        <DialogContent className={classes.root}>
        <TextField id="outlined-basic" required type='date' variant="outlined" onChange={(event) => updateDetailsHandler(event,'date')} value={expenseDetails.date}/>
        <TextField className={(parseInt(expenseDetails.amount) === 0 || expenseDetails.amount === '') ? `${classes.effect}`: `${classes.noEffect}`} id="outlined-basic" label="Amount" required type='number' variant="outlined" onChange={(event) => updateDetailsHandler(event,'amount')} value={expenseDetails.amount} />  
        <TextField id="outlined-basic" label="Details" required type='text' variant="outlined" onChange={(event) => updateDetailsHandler(event,'details')} value={expenseDetails.details}/>
        </DialogContent>
        <DialogActions>
          <Button type='submit' color="primary">
            Save
          </Button>
          <Button onClick={props.handleModalStatus.bind(this,'income')} color="primary">
            Cancle
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddIncome;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  effect:{
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'red',
      },
      '& fieldset': {
        borderColor: 'red',
      }
    }
  },
  noEffect:{
    color:'#333'
  }
}));
