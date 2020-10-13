/* eslint-disable default-case */
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
// import { fetchCustomerData } from '../shared/api';
import { baseUrl } from '../shared/baseUrl';

function Home({customer, transaction, customers, transactions, setRefreshData, location}) {
    console.log(location)

    useEffect(() => {
        customer();
        transaction();
      })
    // if(typeof location.state !==  undefined){
    //     history.push("/form");
    //     history.replace("/home");
    // }
    // if(location.state === undefined){
    //     // window.history.go(0);
        
    //     window.location.reload();
        
    //     location.state = "something"
    // }
    
    // useEffect(() => {
        // if(location.state ===  undefined){
        //     window.location.reload(true)
        // }
    // },[])
    return (
        <div className="row">
            <div className="col-12 text-center">
                <h1>Basic Banking System</h1>
            </div>
            <div className="col-12 text-center">
                <h1 className="mb-5">Customers Table</h1> 
                <Table striped bordered >
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Avatar</th>
                        <th>Account No.</th>
                        <th>Account Type</th>
                        <th>Current Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer, index) => {
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td><img src={customer.image} alt={customer.name}/></td>
                                <td>{customer.accountNumber}</td>
                                <td>{customer.accountType}</td>
                                <td>{customer.balance}</td>
                                
                                <td className="align-middle"><Link to={`/customer/${customer.name}`}>View <i className="fa fa-user-circle" aria-hidden="true"></i></Link></td>
                            </tr>
                        )
                        })}
                    </tbody> 
                    
                </Table>
            </div>
            <div className="col-12 text-center">
                <h1 className="mb-5">Transaction Table</h1> 
                <Table striped bordered >
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Transfer From</th>
                        <th>Transfer To</th>
                        <th>Transaction Note</th>
                        <th>Debited Amount</th>
                        <th>Current Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction, index) => {
                        
                        const IsoDate = new Date(transaction.createdAt);
                        var day;
                        switch (IsoDate.getDay()){
                            case 0:
                                day = "Sunday";
                                break;
                            case 1:
                                day = "Monday";
                                break;
                            case 2:
                                day = "Tuesday";
                                break;
                            case 3:
                                day = "Wednesday";
                                break;
                            case 4:
                                day = "Thursday";
                                break;
                            case 5:
                                day = "Friday";
                                break;
                            case 6:
                                day = "Saturday";
                        }
                        const date = day + ' ' + IsoDate.getDate() + '/' + IsoDate.getMonth() + '/' + IsoDate.getFullYear() + '\n' + IsoDate.getHours() + ':' + IsoDate.getMinutes() + ':' + IsoDate.getSeconds();
                        return(
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{date}</td>
                                <td>{transaction.transferFrom}</td>
                                <td>{transaction.transferTo}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.debitedAmount}</td>
                                <td>{transaction.balance}</td>
                                
                                {/* <td className="align-middle"><Link to={`/customer/${customer.name}`}>View <i className="fa fa-user-circle" aria-hidden="true"></i></Link></td> */}
                            </tr>
                        )
                        })}
                    </tbody> 
                    
                </Table>
            </div>
            <div className="col-12 text-center">
                
                <Link to="/form" className="link"><button className="button">Form with Firebase as backend</button></Link>
                {/* <Link to="/login" className="link"><button className="button">Login</button></Link> */}
            </div>
            
        </div>  
    )
}

export default Home;
