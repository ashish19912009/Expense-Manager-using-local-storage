import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
/** SPA Custom Components */
import Header from '../component/HeaderDisplay';
import ListItems from '../component/allList';
import BottomMenu from '../component/BottomNavigation';
import AddItemModal from '../component/addIncomeModal';
import AddExpenseModal from '../component/addExpenseModal';
import OpeningBalance from '../component/openingBalanceModal';

const Home = () => {
    const classes = useStyles();
    const[openModelAddIncome, setAddIncomeModal] = useState(false);
    const[openModalAddExpense, setAddExpenseModal] = useState(false);
    const[openModalOpeningBal, setOpeningModal] = useState(false);
    const [accountDetails, setAccountDetails] = useState(
        JSON.parse(localStorage.getItem('accountData')) || {
        balance: null,
        inc_exp:[],
        updateSuccess: false,
        errorLowBalance: false
    });

    useEffect(() => {
        localStorage.setItem('accountData', JSON.stringify(accountDetails));
        
        if(accountDetails.balance === null)
        {
            setOpeningModal(!openModalOpeningBal);
        }
    },[accountDetails]);

    const addExpenseHandler = (data) => {
        if(data.type === 'expense' && accountDetails.balance < data.amount)
        {
            return setAccountDetails((accountData)=>{
                return {...accountData,
                        errorLowBalance: true
                    }
            });
        }
        if(data.type === 'expense')
        {
            return setAccountDetails((accountData)=> {
                const tempExpense = Object.assign([], accountData.inc_exp);
                tempExpense.push({...data})
                return {
                    ...accountData,
                    balance: accountData.balance - parseInt(data.amount),
                    inc_exp: tempExpense,
                    updateSuccess: true
                }
            })
        } 
        else if(data.type === 'income')
        {
            return setAccountDetails((accountData)=> {
                const tempIncome = Object.assign([], accountData.inc_exp);
                tempIncome.push({...data})
                return {
                    ...accountData,
                    balance: accountData.balance + parseInt(data.amount),
                    inc_exp: tempIncome,
                    updateSuccess: true
                }
            })
        }
    }
    const openModalHandler = (epxType) => {
        if(epxType === 'income')
            setAddIncomeModal(!openModelAddIncome)
        else if(epxType === 'expense')
            setAddExpenseModal(!openModalAddExpense)
        else if(epxType === 'openingBalance')
            {
                setOpeningModal(!openModalOpeningBal);
                setAccountDetails((accountData)=> {
                    return {
                        ...accountData,
                        balance: 0,
                    }
                })
            }
    }

    const handleCloseSnackbar = (type) => {
        if(type === 'low balance')
            setAccountDetails((accountData)=>{
                return {
                    ...accountData,
                    errorLowBalance: false
                }
            });
        if(type === 'success')
            setAccountDetails((accountData)=>{
                return {
                    ...accountData,
                    updateSuccess: false
                }
            });
    }

    const addOpeningBalanceHanlder = (amount) => {
        setAccountDetails((data)=>{
            return{
                ...data,
                balance: parseInt(amount)
            }
        });
    }

    const resetHandler = () => {
        localStorage.removeItem('accountData'); 
        setAccountDetails({
            balance: null,
            inc_exp:[],
            updateSuccess: false,
            errorLowBalance: false
        });
    }

    const deleteItemHandler = (position, type) => {
        setAccountDetails((data)=>{
            const temp = Object.assign([],data.inc_exp);
            let total = data.balance;
            if(type === 'income')
            {
                total -= parseInt(temp[position].amount);
            } else{
                total += parseInt(temp[position].amount);
            }
            temp.splice(position,1);
            return{
                ...data,
                balance:total,
                inc_exp: temp
            }
        }); 
    }

    return(<React.Fragment>
            <Header balanceSheet={accountDetails} resetAll={resetHandler}/>
                <ListItems balanceSheet={accountDetails} deleteItem={deleteItemHandler}/>
            <BottomMenu initateModal={openModalHandler}/>
            {/** Models and Snackbar */}
            <AddItemModal modalStatus={openModelAddIncome} handleModalStatus={openModalHandler} addExpense={addExpenseHandler}/>
            <AddExpenseModal modalStatus={openModalAddExpense} handleModalStatus={openModalHandler} addExpense={addExpenseHandler}/>
            <OpeningBalance modalStatus={openModalOpeningBal} addOpeningBalance={addOpeningBalanceHanlder} handleModalStatus={openModalHandler} />
            <Snackbar className={classes.snackbar} open={accountDetails.errorLowBalance} autoHideDuration={6000} onClose={() => handleCloseSnackbar('low balance')}>
                <Alert onClose={() => handleCloseSnackbar('low balance')} severity="error">
                Can't add expense, low account balance !!!
                </Alert>
            </Snackbar>
            <Snackbar className={classes.snackbar} open={accountDetails.updateSuccess} autoHideDuration={6000} onClose={() => handleCloseSnackbar('success')}>
                <Alert onClose={() => handleCloseSnackbar('success')} severity="success">
                Account updated successfully !!!
                </Alert>
            </Snackbar>
        </React.Fragment>)
};

export default Home;


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const useStyles = makeStyles((theme) => ({
    snackbar: {
      [theme.breakpoints.down('lg')]: {
        bottom: 150,
      },
    },
  }));
  