import React from 'react';
import { Link } from 'react-router-dom';



function Home() {
    return (
        <div className="row">
            <div className="col-12 text-center">
                <h1>Click below to land to Form Page!</h1>
            </div>
            
            <div className="col-12 text-center">
                <Link to="/form" className="link"><button className="button">Form with Firebase as backend</button></Link>
                {/* <Link to="/login" className="link"><button className="button">Login</button></Link> */}
            </div>
            
        </div>
    )
}

export default Home;
