import React, { Component } from 'react'
import {
    Grid, Row, Col, Button, Form, FormGroup,
    ControlLabel, FormControl, Modal
} from 'react-bootstrap';
import Parser from 'html-react-parser'; 
import advertiseService from '../service/AdvertisementService';
import { withAlert } from "react-alert";

class Advertisements extends Component {
   
    constructor(props) {
        super(props);
        //this.getAllAdvertisement();
        this.state = {
             advertiseData: null
         };  
    }

    // getAllAdvertisement() {
    //     fetch('http://localhost:4000/advertisement', {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: 'application/json'
    //         }
    //     })
    //     .then(res => {
    //         this.state.advertiseData = res;
    //         console.log(res);
    //     })
    //     .catch(err => this.props.alert.error("Error" + err))
    // }
    createMarkup() {
        return {__html: this.state.advertiseData};
     }
    componentDidMount() {
        advertiseService.getAdvertisement()
        .then(res => {
            console.log(res.data);
            this.setState({advertiseData:res.data});
        })
        .catch(err => this.props.alert.error("Error" + err));
    }
    render() {
        return (
            <div>

                <Grid>
                <Row className="show-grid text-left" style={{marginTop:'5%'}}>
                        {/* <Image src="assets/banner.jpg" className="header-image" style={{ height: '510px' }} /> */}
                        <Col xs={12} md={12} sm={8} >
                        {this.state.advertiseData != null &&
                           <div dangerouslySetInnerHTML= {this.createMarkup()} /> 
                        }
                        </Col>
                    </Row>

                </Grid>
            </div>
        )
    }
}

export default withAlert(Advertisements);

