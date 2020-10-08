/* eslint-disable import/first */
import React, { Suspense } from 'react';
const FormFirebase = React.lazy(() => import('./FormFirebase'));
const Home = React.lazy(() => import('./HomeComponent'));
import {Loading } from './LoadingComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



const Main = (props) => {
  
  return (
    <TransitionGroup>
      <CSSTransition key={props.location.key} classNames="page" timeout={300}>
        <div className="container">
          <Suspense fallback={<Loading/>}>
            <Switch location={props.location}>
              <Route path="/home" component={() => <Home/>} />
              <Route exact path="/form" component={() => <FormFirebase />}/>
              <Redirect to="/home"/>
            </Switch>
          </Suspense>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default withRouter(Main);
