import React, { Component } from 'react'
import {  Grid, Row, Col, Image } from 'react-bootstrap';
import './css/News.css';

export default class News extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Row>
                    
                        <Grid>
                            <Col xs={12} md={12} sm={8} >
                                <Image src="assets/person2.jpg" style={{ width: '250px' }} className="about-profile-pic" rounded />
                                <h3>Frank the tank</h3>
                                <p>Do an almighty painting with us. We'll put all the little clouds in and let them dance around and have fun.</p>
                                <p>It looks so good, I might as well not stop. A fan brush is a fantastic piece of equipment. Use it. Make friends with it.</p>
                                <p>In this world, everything can be happy. You can't make a mistake. Anything that happens you can learn to use - and make something beautiful out of it.</p>
                            </Col>
                        </Grid>
                    </Row>
                </Grid>
            </div>
        )
    }
}