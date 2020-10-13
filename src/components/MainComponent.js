/* eslint-disable import/first */
import React, { useState, useEffect, Suspense, Component } from 'react';
const FormFirebase = React.lazy(() => import('./FormFirebase'));
const Customer = React.lazy(() => import('./Customer'));
const Home = React.lazy(() => import('./HomeComponent'));
import {Loading } from './LoadingComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { fetchCustomerData } from '../shared/api';
import { fetchTransactionData } from '../shared/api';

// export class MainComponent extends Component {
//   constructor(props){

//     this.state = {
//       customers: [],
//       transaction: []
//     }
//   }
//   componentDidUpdate
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }
// export default MainComponent



const Main = (props) => {
  const [customers, setCustomer] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [refreshData, setRefreshData] = useState(false)
  
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
  console.log(props.location)
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
              <Route exact path="/form" component={() => <FormFirebase />}/>
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
