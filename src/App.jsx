import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
	Col, Form, FormGroup, FormControl
} from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

import Home from './components/Home';
import About from './components/About';
import News from './components/News';
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import Login from './components/Login';
import Registration from './components/Registration';
import ScrollButton from './components/ScrollButton';
import Advertisement from './components/Advertisements';
import FulltimeJobs from './components/FulltimeJobs';
import ParttimeJobs from './components/ParttimeJobs';
import Areas from './components/Areas';
import Doctors from './components/Doctors';
import { withAlert } from "react-alert";
class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<MenuBar />
					
					<Route exact path="/" component={Login} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/about" component={About} />
					<Route exact path="/news" component={News} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Registration} />
					<Route exact path="/advertisement" component={Advertisement} />
					<Route exact path="/fulltimejoblist" component={FulltimeJobs} />
					<Route exact path="/parttimejoblist" component={ParttimeJobs} />
					<Route exact path="/doctors" component={Doctors} />
					<Route exact path="/areas" component={Areas} />
					<Footer />
					<ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
				</div>
			</Router>
		);
	}
}

export default withAlert(App);
