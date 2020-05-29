import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/404';
import MovieForm from './components/movieForm';
class App extends Component {
    render() { 
        return ( 
            <React.Fragment>
                <Navbar/>
                <div className="content">
                    <Switch>
                        <Route path = "/movies/:id" component = {MovieForm}/>
                        <Route path = "/movies" component = {Movies}/>
                        <Route path = "/customers" component = {Customers}/>
                        <Route path = "/rentals" component = {Rentals}/>
                        <Route path = "/404" component = {NotFound}/>
                        <Redirect exact from ="/" to="/movies"/>
                        <Route path = "/" exact component = {Home}/>
                        <Redirect to ="/404"/>
                    </Switch>
                </div>
            </React.Fragment>
         );
    }
}
 
export default App;