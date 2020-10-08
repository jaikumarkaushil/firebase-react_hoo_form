import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import { baseUrl } from '../shared/baseUrl';

function Home(props) {
    const [customers, setCustomer] = useState([]);
    
    useEffect(() => {
        (async function customers() {
            try{
                let response = await fetch(baseUrl + 'users');
                let customers = await response.json();
                setCustomer(customers)
            }
            catch(error) {
                console.log(error)
            }
    })()
    }, [])
    
    return (
        <div className="row">
            {console.log(customers)}
            <div className="col-12 text-center">
                <h1>Basic Banking System</h1>
            </div>
            <div className="col-12 text-center">
                <h1 className="mb-5">Customers Table</h1> 
                <Table striped bordered>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Account No.</th>
                        <th>Account Type</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer, index) => {
                        return(
                            
                        
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                {customer.account.map((account, index) => {
                                    return(
                                        <React.Fragment key={index}>
                                            <td>{account.accountNumber}</td>
                                            <td>{account.accountType}</td>
                                            <td>{account.credit}</td>
                                            <td>{account.debit}</td>
                                            <td>{account.balance}</td>
                                        </React.Fragment>
                                    )
                                })}
                                
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
