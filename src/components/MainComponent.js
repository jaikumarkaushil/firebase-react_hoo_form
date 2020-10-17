/* eslint-disable import/first */
import React, { useState, useEffect, Suspense } from 'react';
const Customer = React.lazy(() => import('./Customer'));
const Home = React.lazy(() => import('./HomeComponent'));
import {Loading } from './LoadingComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fetchCustomerData } from '../shared/api';
import { fetchTransactionData } from '../shared/api';

const Main = (props) => {
  const [customers, setCustomer] = useState([]);
  const [transactions, setTransactions] = useState([]);
  // to refresh the data when updated data is fetched about customers and transactions happened
  const [refreshData, setRefreshData] = useState(false);
  
  async function customer() {
    try{
        let fetchedData = await fetchCustomerData();
        setCustomer(fetchedData);
    }
    catch(error) {
        console.log(error)
    }
  };
  async function transaction() {
    try{
        let fetchedData = await fetchTransactionData();
        setTransactions(fetchedData);
    }
    catch(error) {
        console.log(error)
    }
  };
  useEffect(() => {
    customer();
    transaction();
  },[])
  const customerWithName = ({match}) => {
    return(
      <Customer location={props.location} setRefreshData={setRefreshData} customers={customers} customer={customers.filter((customer) => customer.name === match.params.customerName)[0]} />
    )
  }
  return (
    <TransitionGroup>
      <CSSTransition key={props.location.key} classNames="page" timeout={300}>
        <div className="container-fluid">
          <Suspense fallback={<Loading/>}>
            <Switch location={props.location}>
              <Route path="/home" component={() => <Home customer={customer} transaction={transaction} refreshData={refreshData} setRefreshData={setRefreshData}  customers={customers} transactions={transactions} location={props.location}/>} />
              <Route path="/customer/:customerName" component={customerWithName}/>
              <Redirect to="/home"/>
            </Switch>
          </Suspense>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default withRouter(Main);
