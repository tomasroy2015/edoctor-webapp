import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {  Row, Col} from 'react-bootstrap';
import './css/Footer.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPhone, faNewspaper } from '@fortawesome/fontawesome-free-solid'
import {faHandPointRight } from '@fortawesome/fontawesome-free-regular'
import {faFacebook,faGooglePlus,faTwitter,} from '@fortawesome/fontawesome-free-brands'

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <span>2018@All Rights reserved to Likstaff co Ltd.</span>						
                </div>
            </footer>
        )
    }
}