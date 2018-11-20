import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
    Jumbotron, Grid, Row, Col, Button, Form, FormGroup,
    ControlLabel, FormControl, Modal,Well
} from 'react-bootstrap';
import { withAlert } from "react-alert";
import EmailValidator from 'email-validator';
import userModel from '../model/User';
import userService from '../service/UserService';
import Register from '../components/Registration';


class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        //this.handleShow = this.handleShow.bind(this);
        this.doRegister = this.doRegister.bind(this);
        userService.clearSessionData(); 
        this.state = {
           user: new userModel(),
            show: false,
            activeModal: false
        };
    }

    getValidationState(type) {
        switch (type) {
            case 'email':
                if (this.state.user.email === '') return 'warning';
                else if (!EmailValidator.validate(this.state.user.email)) return 'error';
                else return 'success';

            case 'password':
                if (this.state.user.password === '') return 'warning';
                else return 'success';
            case 'name':
                if (this.state.user.name === '') return 'warning';
                else return 'success';

            case 'address':
                if (this.state.user.address === '') return 'warning';
                else return 'success';
            default: return 'success';
        }

    }
    addUser = _ => {
        // console.log(this.state);
        const { user } = this.state;
        if (this.state.user.email === '')
            return this.props.alert.error("email is required field");
        if (this.state.user.name === '')
            return this.props.alert.error("name is required field");
        if (this.state.user.address === '')
            return this.props.alert.error("address is required field");

        fetch(userService.addUser(user))
            .then(response => {
                this.props.alert.success("Congratulations! You have been registered successfully.");
                this.setState({ show: false, activeModal: false });
            })
            .catch(err => this.props.alert.error("Error" + err))
    }
    loginUser = _ => {
        // console.log(this.state);
        const { user } = this.state;

        if (this.state.user.email === '')
            return this.props.alert.error("email is required field");
        if (this.state.user.password === '')
            return this.props.alert.error("password is required field");
        if (!EmailValidator.validate(this.state.user.email))
            return this.props.alert.error("Invalid email!");

        // fetch(userService.loginUser(user))
        //     .then(response => response.json())
        //     .then(res => {
        //         if (res.code === 200) {
        //             userService.setLoggedInData(res.data);
        //             //this.getAllusers(res.data.accessToken);
        //             window.location.href = "/home";
        //         } else {
        //             return this.props.alert.error(res.message);
        //         }
        //     })
        //     .catch(err => this.props.alert.error("Error" + err))
        let nuser = new userModel();
        nuser.isLoggedIn = true;
        userService.setLoggedInData(nuser);
        window.location.href = "/home";
    }
    getAllusers(token) {
        fetch('http://localhost:4000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        })
        .then(response => response.json({ message: "Mozogashi" }))
        .then(res => {
            console.log(res)
        })
        .catch(err => this.props.alert.error("Error" + err))
    }
    doRegister() {
        this.setState({ user: new userModel(), show: false, activeModal: true });
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleClose() {
        this.setState({ show: false, activeModal: false });
    }
    // renderRegister() {
    //     let isShowModal = this.state.regShow;
    //     if (isShowModal)
    //         return <Register title="New user registration" regShow={this.state.regShow} />
    // }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         title: nextProps.title, show: nextProps.show
    //     });
    // }
    // componentDidMount(nextProps) {
    //     this.setState({
    //         title: nextProps.title, show: nextProps.show
    //     });
    // }
    render() {
        const { user } = this.state;
        var loginComponent = (
            <Grid >
             <Row className="show-grid text-center" >
                {/* <Image src="assets/registration.jpg" className="header-image" style={{ height: '510px' }} /> */}
                <Col xs={12} sm={12}>
                  
                   <Well bsSize="small" style={{marginTop:'15%',minHeight:'280px'}}>
                     <h2>User credentials</h2>
                    <Form horizontal style={{marginTop:'3%'}}>

                        <FormGroup controlId="email"
                            validationState={this.getValidationState('email')}>
                            <Col xs={12} sm={12}>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Email
                                </Col>
                                <Col sm={6} xs={6} md={6}>
                                    <FormControl type="email" placeholder="Email"
                                        value={user.email}
                                        onChange={e => this.setState({ user: { ...user, email: e.target.value } })} />
                                    <FormControl.Feedback />
                                </Col>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword"
                            validationState={this.getValidationState('password')}>
                            <Col xs={12} sm={12}>
                                <Col componentClass={ControlLabel} sm={3}>
                                    Password
                                </Col>
                                <Col sm={6} xs={6} md={6}>
                                    <FormControl type="password" placeholder="Password"
                                        value={user.password}
                                        onChange={e => this.setState({ user: { ...user, password: e.target.value } })} />
                                    <FormControl.Feedback />
                                </Col>
                            </Col>
                        </FormGroup>



                        <FormGroup>
                            <Col smOffset={2} sm={3} className="text-right">
                                <Button bsStyle="info" type="button" onClick={this.loginUser}>Login</Button>
                            </Col>
                            <Col sm={6} style={{ marginTop: '6px',textAlign:"left",cursor:"pointer" }}>
                                <a onClick={this.doRegister}>
                                New user! Click to register
                                </a>
                            </Col>
                        </FormGroup>

                    </Form>
                    </Well>
                </Col>
            </Row>
           </Grid> 
        )

        var regComponent = (
            <Modal bsSize="lg" container={this} aria-labelledby="contained-modal-title-lg" show={this.state.activeModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New user registration</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <Jumbotron>
                <h2>Register to the e-learning</h2>
                <p> Improve your japanese.Learn yourself using videos,tutorials & online exam; </p>
                <p> you can take oneline exam by paid service.We have three level.The cerficate will be handed over after passing the exmination</p>
            </Jumbotron> */}
                <Row className="show-grid text-left">
                    {/* <Image src="assets/registration.jpg" className="header-image" style={{ height: '510px' }} /> */}
                    <Col xs={12} sm={12}>
                        <Form horizontal>
                            <FormGroup controlId="name"
                                validationState={this.getValidationState('name')}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Name
                                 </Col>
                                <Col sm={6}>
                                    <FormControl type="text" placeholder="Name"
                                        value={user.name}
                                        onChange={e => this.setState({ user: { ...user, name: e.target.value } })} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="email"
                                validationState={this.getValidationState('email')}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                 </Col>
                                <Col sm={6}>
                                    <FormControl type="email" placeholder="Email"
                                        value={user.email}
                                        onChange={e => this.setState({ user: { ...user, email: e.target.value } })} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword"
                                validationState={this.getValidationState('password')}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={6}>
                                    <FormControl type="password" placeholder="Password"
                                        value={user.password}
                                        onChange={e => this.setState({ user: { ...user, password: e.target.value } })} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="address"
                                validationState={this.getValidationState('address')}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Address
                                 </Col>
                                <Col sm={6}>
                                    <FormControl type="text" placeholder="Address"
                                        value={user.address}
                                        onChange={e => this.setState({ user: { ...user, address: e.target.value } })} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="PhoneNo"
                                validationState={this.getValidationState('phone')}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Phone No
                                 </Col>
                                <Col sm={6}>
                                    <FormControl type="text" placeholder="phone"
                                        value={user.phone}
                                        onChange={e => this.setState({ user: { ...user, phone: e.target.value } })} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="Mobile"
                                validationState={this.getValidationState('mobile')}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Mobile
                                 </Col>
                                <Col sm={6}>
                                    <FormControl type="text" placeholder="mobile"
                                        value={user.mobile}
                                        onChange={e => this.setState({ user: { ...user, mobile: e.target.value } })} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>

                            {/* <FormGroup>
                                <Col smOffset={2} sm={1}>
                                    <Button bsStyle="info" type="button" onClick={this.addUser}>Register</Button>
                                </Col>

                            </FormGroup> */}

                        </Form>


                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="success" type="button" onClick={this.addUser}>Register</Button>
                <Button bsStyle="danger" onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
        )
        return (
                <div>
                    {loginComponent}
                    {regComponent}
                </div>
        )
    }
}
export default withAlert(Login);