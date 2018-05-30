import React, { Component } from 'react';
import Container from './components/Container';
import Search from './components/Search';
import Welcome from './components/Welcome';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import PhotoContainer from './components/PhotoContainer';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

class App extends Component {

    render() {
        return (
            <Router>
                <Container>
                    <Route component={Search} />
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Welcome}  />
                        <Route path="/search/:term" component={PhotoContainer}  />
                        <Route component={NotFound} />
                    </Switch>
                </Container>

            </Router>
        );
    }
}

export default App;



