import { Component } from 'react'
import { Home } from './home'
import { Switch, Route, Redirect, Link, Router } from 'react-router-dom';
import Signup from './register/stepper';

export default class Main extends Component<{}, {}> {

    render() {

        const HomePage = () => {
            return (
                <Home />
            )
        }

        return (
            <div >
                {/* <Header /> */}
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/register" component={() => <Signup />} />
                    <Redirect to="/home" />
                </Switch>
                {/* <Footer /> */}
            </div>
        )
    }
}
