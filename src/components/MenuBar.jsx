import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Button, Col, Form, 
    FormGroup, FormControl, Modal, Row, ControlLabel,
    NavDropdown,MenuItem } from 'react-bootstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
import './css/CustomNavbar.css'
import './css/Home.css';
import userService from '../service/UserService';
import { withAlert } from "react-alert";
import userModel from '../model/User';
import EmailValidator from 'email-validator';
class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.doRegister = this.doRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clickLogin = this.clickLogin.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            user: new userModel(),
            show: false,
            activeModal: false
        };
    }

    clickLogin(e) {
        if (userService.isLoggedIn()) {
            window.location.href = "/";
            userService.logout();
        } else {
            //window.location.href = "/login";
            this.setState({
                user: new userModel(),
                show: !this.state.show
            });
            //this.renderLogin();
        }

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

        fetch(userService.loginUser(user))
            .then(response => response.json())
            .then(res => {
                if (res.code === 200) {
                    userService.setLoggedInData(res.data);
                    //this.getAllusers(res.data.accessToken);
                    //window.location.href = "/";
                    this.setState({
                        show: !this.state.show
                    });
                } else {
                    return this.props.alert.error(res.message);
                }
            })
            .catch(err => this.props.alert.error("Error" + err))
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
    render() {
        const { user } = this.state;
        const isLoggedIn = userService.isLoggedIn();
        var navItem = (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={isLoggedIn ? "/home" :"/login"}>e-doctor admin</Link>
                    </Navbar.Brand>
                    {/* <Navbar.Brand>
                        <Form horizontal>
                            <FormGroup controlId="name">
                                <Col sm={12}>
                                    <FormControl className="search-text" type="text" placeholder="Search for courses" />
                                    <span className="search-icon">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>

                                </Col>
                            </FormGroup>
                        </Form>
                    </Navbar.Brand> */}
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {/* <NavItem eventKey={1} componentClass={Link} href="/" to="/">
                            Home
                       </NavItem>
                        <NavItem eventKey={2} componentClass={Link} href="/about" to="/about">
                            About
                       </NavItem>
                        <NavItem eventKey={3} componentClass={Link} href="/news" to="/news">
                            News
                       </NavItem> */}
                            {isLoggedIn === true &&                  
                                <NavDropdown eventKey={3} title="Basic Info" id="user-dropdown">
                                    <MenuItem eventKey={3.1}>Users</MenuItem>
                                    <MenuItem eventKey={3.2}>Roles</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={3.5} componentClass={Link} href="/areas" to="/areas">Area</MenuItem>
                                    <MenuItem eventKey={3.5}>Prefecture</MenuItem>
                                </NavDropdown>
                            }
                            {isLoggedIn === true &&  
                                <NavDropdown eventKey={4} title="Job Info" id="job-dropdown">
                                    <MenuItem eventKey={4.1} componentClass={Link} href="/fulltimejoblist" to="/fulltimejoblist">Fulltime Jobs</MenuItem>
                                    <MenuItem eventKey={4.2} componentClass={Link} href="/parttimejoblist" to="/parttimejoblist">Parttime Jobs</MenuItem>
                                    <MenuItem eventKey={4.3}>Spot Jobs</MenuItem>
                                    <MenuItem eventKey={4.4}>Medicheck</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey={4.5} componentClass={Link} href="/advertisement" to="/advertisement">Advertisements</MenuItem>
                                    <MenuItem eventKey={4.6}>Others</MenuItem>
                                </NavDropdown>
                            }
                            {isLoggedIn === true &&      
                                <NavDropdown eventKey={6} title="Medical Info" id="job-dropdown">
                                    <MenuItem eventKey={6.1}>Hospital Info</MenuItem>
                                    <MenuItem eventKey={6.2} componentClass={Link} href="/doctors" to="/doctors">Doctor Info </MenuItem>
                                </NavDropdown>
                            }
                            {isLoggedIn === true &&
                                <NavItem eventKey={7} componentClass={Link} to="" >
                                    <button style={{ marginTop: '-6px' }} className="btn btn-info"
                                        onClick={this.clickLogin}> Logout 
                                    </button>
                                </NavItem>
                            }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
        var loginWindow = (
            <Modal bsSize="small" id="loginModel" container={this} aria-labelledby="contained-modal-title-lg" show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Login</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body"> */}
                    <Row className="show-grid text-left">
                        {/* <Image src="assets/registration.jpg" className="header-image" style={{ height: '510px' }} /> */}
                        <Col xs={12} sm={12}>
                            <Form horizontal>

                                <FormGroup controlId="email"
                                    validationState={this.getValidationState('email')}>
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Email
                                   </Col>
                                    <Col sm={9}>
                                        <FormControl type="email" placeholder="Email"
                                            value={user.email}
                                            onChange={e => this.setState({ user: { ...user, email: e.target.value } })} />
                                        <FormControl.Feedback />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalPassword"
                                    validationState={this.getValidationState('password')}>
                                    <Col componentClass={ControlLabel} sm={3}>
                                        Password
                                     </Col>
                                    <Col sm={9}>
                                        <FormControl type="password" placeholder="Password"
                                            value={user.password}
                                            onChange={e => this.setState({ user: { ...user, password: e.target.value } })} />
                                        <FormControl.Feedback />
                                    </Col>
                                </FormGroup>



                                <FormGroup>
                                    {/* <Col smOffset={2} sm={3}>
                                        <Button bsStyle="info" type="button" onClick={this.loginUser}>Login</Button>
                                    </Col> */}
                                    <Col sm={12} style={{ marginTop: '6px', textAlign: 'center', cursor: 'pointer' }}>
                                        <a onClick={this.doRegister}>
                                            New user! Click to register
                                       </a>
                                    </Col>
                                </FormGroup>

                            </Form>


                        </Col>
                    </Row>
                    {/* </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                    </div> */}

                </Modal.Body>
                <Modal.Footer>
                    {/* <a onClick={this.doRegister}>
                        New user!
                    </a> */}
                    <Button bsStyle="info" type="button" onClick={this.loginUser}>Login</Button>
                    <Button bsStyle="danger" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )

        var regModal = (
            <Modal bsSize="lg" container={this} aria-labelledby="contained-modal-title-lg" show={this.state.activeModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h2>New user registration </h2></Modal.Title>
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
                {navItem}
                {loginWindow}
                {regModal}
            </div>
        )
    }
}

export default withAlert(MenuBar);