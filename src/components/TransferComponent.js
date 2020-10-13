import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup, Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import { Redirect } from 'react-router-dom';
import { uniqueId } from 'lodash';


function Transfer (props) {
    const [validCustomer, setValidCustomer] = useState(1);
    const [balanceCheck, setBalanceCheck] = useState("Sufficient");
    const [putTransferTo, setPutTransferTo] = useState(false);
    const [putTransferFrom, setPutTransferFrom] = useState(false);
    const [postTransaction, setPostTransaction] = useState(false);

    const { customers, customer, setRefreshData } =  props;
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        data.debitAccount = customer.accountNumber;
        let username = data.firstname + ' ' + data.lastname;
        const customerList = customers.filter((customer) => {
            if(username || data.creditAccount || data.creditCustomer) {
                return customer.name === username || customer.accountNumber === Number(data.creditAccount) || customer.name === data.creditCustomer
            }
        })
        setValidCustomer(customerList.length);

        var balanceState;
        if(customer.balance === 0){
            balanceState = 0;
            setBalanceCheck(balanceState);
        }
        else if(customer.balance < Number(data.transferAmount)){
            balanceState = "Insufficient";
            setBalanceCheck(balanceState);
        }
        else if(customer.balance >= Number(data.transferAmount)) {
            balanceState = "Sufficient";
        }
    
        if(customerList.length === 1 && balanceState === "Sufficient") {
            const transferToData = {
                balance: customerList[0].balance + Number(data.transferAmount),
                credit: Number(data.transferAmount)
            }
            const transferFromData = {
                        balance: customer.balance - Number(data.transferAmount),
                        debit: Number(data.transferAmount)
                    }
            
            function transfer(url, transfer){
                fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(transfer),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => response.json())
                .then(result => {
                    if(transfer ===  transferFromData){
                        setPutTransferFrom(result);
                    }
                    else if(transfer === transferToData){
                        setPutTransferTo(result);
                    }
                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

            // transfer to
            transfer(baseUrl + `users/${customerList[0]._id}`, transferToData);
            
            // transfer from
            transfer(baseUrl + `users/${customer._id}`, transferFromData);
            
            // transaction table
            fetch(baseUrl + 'transactions', {
                method: 'POST',
                body: JSON.stringify({
                    transferTo: customerList[0].name,
                    transferFrom: customer.name,
                    description: data.description,
                    debitedAmount: Number(data.transferAmount),
                    balance: customer.balance - Number(data.transferAmount)
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            .then(response => response.json())
            .then(result => {
                setPostTransaction(result);
                console.log("success: ", result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }
    
    const linkTarget = {
        pathname: "/home",
        key: uniqueId(),
        state: {
            applied: true
        }        
    };
    return (
        <section id="transfer" className="d-none d-md-flex flex-column justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column justify-content-center align-items-center text-white" >
                <h1 className="pb-4 heading-light">Tell us the details for your transfer</h1>
                <FormGroup className="d-inline-flex my-3">
                    <Col xs={12} md={6} className="pl-0 text-left">
                        <input name="firstname" type="text" className="input" ref={register({minLength: 3, maxLength: 15})} placeholder="Beneficiary First Name" />
                        {errors.firstname?.type === "maxLength" && "Firstname exceed maxLength 15"}
                        {errors.firstname?.type === "minLength" && "Firstname must have 2 letters"}
                    </Col>
                    <Col xs={12} md={6} className="p-0 text-right">
                    <input name="lastname" 
                        type="text" 
                        className="input" 
                        placeholder="Beneficiary Last Name"
                        ref={register({ 
                                minLength: 3, 
                                maxLength: 15 
                                })} 
                    />
                    {errors.lastname?.type === "maxLength" && "Lastname exceed maxLength 15"}
                    {errors.lastname?.type === "minLength" && "Lastname must have 2 letters"}
                    </Col>
                </FormGroup>
                <h4 className="text-center my-3">OR</h4>
                <FormGroup className="my-3">
                    <input 
                        name="creditAccount"
                        type="text" 
                        className="input-full"
                        placeholder="Account Number"
                        ref={register({
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Invalid! Only Number can be entered"
                            },
                            minLength: 11,
                            maxLength: 17,
                        })} 
                    />
                    {errors.creditAccount?.type === "maxLength" && "Account Number exceed maxLength 17"}
                    {errors.creditAccount?.type === "minLength" && "Account Number must have 11 Numbers"}
                </FormGroup>
                <h4 className="text-center my-3">OR</h4>
                <select name="creditCustomer" ref={register} style={{borderWidth: "1px"}} className="input-full my-3" placeholder="Other Customers">
                    <option defaultValue>Other Customers</option>
                    {customers.filter((customers) => customers !== customer).map((customers) => {
                        return(
                            <React.Fragment key={customers._id}>
                                <option value={customers.name}>
                                    {customers.name}
                                </option>
                            </React.Fragment>
                        )
                    }) }
                    
                </select>
                <FormGroup className="my-5">
                    <input name="transferAmount" className="input-full mb-3" ref={register({required: true})} placeholder="Amount"/>
                </FormGroup>
                <FormGroup >
                    <input name="description" className="input-full mb-3" ref={register} placeholder="Add Transaction Note"/>
                </FormGroup>

                {balanceCheck !== "Sufficient" ? balanceCheck === "Insufficient" ? <h5 style={{color: "red"}} className="my-3">Insufficient Balance</h5>  : <h5 style={{color: "red"}} className="my-3">Zero Balance</h5> : null}
                {validCustomer <= 1 ? validCustomer === 0  ? <h5 style={{color: "red"}} className="my-3">Please! check the details. No Inputs</h5> : null : <h5 style={{color: "red"}} className="my-3">Please! double check the details. Mismatch Fields</h5>}

                <button type="submit" className="button mt-4 mb-0" >Transfer</button>

                {/* Redirect to homepage after successful transaction and users data */}
                
                {putTransferFrom && putTransferTo && postTransaction ? <Redirect refresh={true} to={linkTarget} /> : null}
            </form>
        </section>
    );
}

export default Transfer;
