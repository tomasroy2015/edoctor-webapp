import React, { Component } from 'react'
import {  Grid, Row, Col, Image,Button } from 'react-bootstrap';


export default class ActionEdit extends Component {
    constructor(props) {
        super(props); 
    }

    render() {
      return (
        <Button bsStyle="info" type="button" onClick={this.props.onClick}>Edit</Button>
      );
    }
  }
  