import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const OpeningBalance = (props) => {
    const classes = useStyles();
    const [amount, setAmount] = useState(0);
    
    const updateDetailsHandler = (event) => {
       if(event.target.value >= 0 )
          setAmount(event.target.value)
    }   
    const incomeFormHandler = (event) => {
        event.preventDefault();
        props.addOpeningBalance(amount);
        setAmount(0);
    }
  return (
    <div>
      <Dialog
        open={props.modalStatus}
        onClose={props.handleModalStatus.bind(this,'expense')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Add Opening Balance"}</DialogTitle>
        <form autoComplete="off" onSubmit={incomeFormHandler}>
        <DialogContent className={classes.root}>
          <TextField id="outlined-basic" label="Amount" required type='number'
          variant="outlined" onChange={updateDetailsHandler} value={amount}
          helperText="If no balance provided, account opening balance will be 0"
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit' onClick={props.handleModalStatus.bind(this,'openingBalance')} color="primary">
            Save
          </Button>
          <Button onClick={props.handleModalStatus.bind(this,'openingBalance')} color="primary">
            Cancle
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default OpeningBalance;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
