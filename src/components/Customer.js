import React, { useState } from 'react';
import Transfer from './TransferComponent';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Table } from 'reactstrap';


function Customer(props) {
    const { customers, customer, setRefreshData } = props;
    const [transferView, setTransferView] = useState(false);
    if(customer) {
        return(
            <div className="mt-5 mb-5 d-flex flex-column justify-content-center align-items-center">
                <h1 className="my-5">{customer.name}</h1>
                <Table striped bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Avatar</th>
                    <th>Account No.</th>
                    <th>Account Type</th>
                    <th>Last Credit</th>
                    <th>Last Debit</th>
                    <th>Current Balance</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td><img src={customer.image} alt={customer.name}/></td>
                    <td>{customer.accountNumber}</td>
                    <td>{customer.accountType}</td>
                    <td>{customer.credit}</td>
                    <td>{customer.debit}</td>
                    <td>{customer.balance}</td>
                    
                    <td className="align-middle"><Link to={`/customer/${customer.name}`}>View <i className="fa fa-user-circle" aria-hidden="true"></i></Link></td>
                </tr>
                </tbody>                     
            </Table>
            <button className="button text-center" onClick={() => setTransferView(transferView => !transferView)}>Transfer</button>
            {transferView ? 
                <Transfer location={props.location} setRefreshData={setRefreshData} customers={customers} customer={customer}/>
                : null
            }
            </div>
        )
    }
    else {
        return(
            <Loading/>
        )
    }
}


export default Customer

