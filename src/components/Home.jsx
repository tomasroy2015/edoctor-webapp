import React, { Component } from 'react'
import { Grid, Row, Col, Image, Button, Modal,Table } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Player } from 'video-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/fontawesome-free-regular'
import './css/video-react.css';
import './css/Home.css';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {

        return (
            <Grid>
                {/* <Jumbotron>
                    <h2>Welcome to e-learning</h2>
                    <p> Improve your japanese.Learn yourself using videos,tutorials & online exam; </p>
                    <Link to="/about">
                        <Button bsStyle="primary"> About </Button>
                    </Link>
                </Jumbotron> */}
                <Row className="show-grid text-left">
                    {/* <h2>Video tutorials</h2>
                    <Col xs={12} sm={3} className="person-wrapper">
                        <div className="VideoContainer">
                            <FontAwesomeIcon icon={faPlayCircle} className="video-playButton" onClick={this.handleShow} />
                            <Image src="assets/poster-lesson1.jpg" className="profile-pic" onClick={this.handleShow} />

                            <h5>Lesson 01</h5>
                            <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Lesson 01</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Player autoPlay={true}
                                        playsInline
                                        poster="assets/poster-lesson1.jpg"
                                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                    />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </Col>
                    <Col xs={12} sm={3} className="person-wrapper">
                        <div className="VideoContainer">
                            <FontAwesomeIcon icon={faPlayCircle} className="video-playButton" onClick={this.handleShow} />
                            <Image src="assets/poster-lesson2.jpg" className="profile-pic" onClick={this.handleShow} />

                            <h5>Lesson 02</h5>
                            <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Lesson 02</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Player autoPlay={true}
                                        playsInline
                                        poster="assets/poster-lesson2.jpg"
                                        src="https://www.youtube.com/watch?v=1ruOpnXZN6E"
                                    />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </Col>
                    <Col xs={12} sm={3} className="person-wrapper">
                        <div className="VideoContainer">
                            <FontAwesomeIcon icon={faPlayCircle} className="video-playButton" onClick={this.handleShow} />
                            <Image src="assets/poster-lesson3.jpg" className="profile-pic" onClick={this.handleShow} />

                            <h5>Lesson 03</h5>
                            <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title> Lesson 03</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Player autoPlay={true}
                                        playsInline
                                        poster="assets/poster-lesson3.jpg"
                                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                    />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </Col>
                    <Col xs={12} sm={3} className="person-wrapper">
                        <div className="VideoContainer">
                            <FontAwesomeIcon icon={faPlayCircle} className="video-playButton" onClick={this.handleShow} />
                            <Image src="assets/poster-lesson1.jpg" className="profile-pic" onClick={this.handleShow} />

                            <h5>Lesson 04</h5>
                            <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Lesson 04</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Player autoPlay={true}
                                        playsInline
                                        poster="assets/poster-lesson1.jpg"
                                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                    />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </Col>
                    <Col xs={12} sm={3} className="person-wrapper">
                        <div className="VideoContainer">
                            <FontAwesomeIcon icon={faPlayCircle} className="video-playButton" onClick={this.handleShow} />
                            <Image src="assets/poster-lesson2.jpg" className="profile-pic" onClick={this.handleShow} />

                            <h5>Lesson 05</h5>
                            <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Lesson 05</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Player autoPlay={true}
                                        playsInline
                                        poster="assets/poster-lesson2.jpg"
                                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                    />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </Col>
                    <Col xs={12} sm={3} className="person-wrapper">
                        <div className="VideoContainer">
                            <FontAwesomeIcon icon={faPlayCircle} className="video-playButton" onClick={this.handleShow} />
                            <Image src="assets/poster-lesson3.jpg" className="profile-pic" onClick={this.handleShow} />

                            <h5>Lesson 06</h5>
                            <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title> Lesson 06</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Player autoPlay={true}
                                        playsInline
                                        poster="assets/poster-lesson3.jpg"
                                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                    />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </Col>
                    <Col xs={12} sm={3} className="person-wrapper">
                        <div className="VideoContainer">
                            <FontAwesomeIcon icon={faPlayCircle} className="video-playButton" onClick={this.handleShow} />
                            <Image src="assets/teach5.jpg" className="profile-pic" onClick={this.handleShow} />

                            <h5>Lesson 07</h5>
                            <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title> Lesson 06</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Player autoPlay={true}
                                        playsInline
                                        poster="assets/teach5.jpg"
                                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                    />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </Col>
                    <Col xs={12} sm={3} className="person-wrapper">
                        <div className="VideoContainer">
                            <FontAwesomeIcon icon={faPlayCircle} className="video-playButton" onClick={this.handleShow} />
                            <Image src="assets/teach6.jpg" className="profile-pic" onClick={this.handleShow} />

                            <h5>Lesson 08</h5>
                            <Modal bsSize="large" aria-labelledby="contained-modal-title-lg" show={this.state.show} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title> Lesson 06</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Player autoPlay={true}
                                        playsInline
                                        poster="assets/teach6.jpg"
                                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                    />

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>

                    </Col> */}

                </Row>

                <Row className="show-grid text-left" style={{marginTop:'10%'}}>
                       <Col xs={12} sm={5} className="course-wrapper">
                        <div className="course-container"  />
                        <h5>Dashboard 1</h5>
                       </Col>
                        <Col xs={12} sm={5} className="course-wrapper">
                            <div className="course-container"  />
                            <h5>Dashboard 2</h5>
                        
                        </Col>
                        <Col xs={12} sm={5} className="course-wrapper">
                            <div className="course-container"  />
                            <h5>Dashboard 3</h5>
                        
                        </Col>
                        <Col xs={12} sm={5} className="course-wrapper">
                            <div className="course-container"  />
                            <h5>Dashboard 4</h5>
                        

                        </Col>
                </Row>

            </Grid>
        )
    }
}