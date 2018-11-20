import React, { Component } from 'react'
import {
    Grid, Row, Col, Button, Form, FormGroup,
    ControlLabel, FormControl, Modal,Table
} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ReactTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-regular';
import Parser from 'html-react-parser'; 
import areaModel from '../model/Area';
import areaService from '../service/AreaService';
import { withAlert } from "react-alert";

class Areas extends Component {
   
    constructor(props) {
        super(props);
        this.addArea = this.addArea.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createArea = this.createArea.bind(this);
        this.state = {
             areas: null,
             show: false,
             area: new areaModel(),
             activeModal: false
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
    getValidationState(type) {
        switch (type) {
            case 'area_code':
                if (this.state.area.area_code === '') return 'warning';
                else return 'success';
           
            case 'name':
                if (this.state.area.name === '') return 'warning';
                else return 'success';

            default: return 'success';
        }

    }
    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    handleClose() {
        this.setState({ show: false, activeModal: false });
    }
    addArea() {
        this.setState({ area: new areaModel(), show: false, activeModal: true });
    }

    componentWillMount() {
        areaService.getAreas()
        .then(res => {
            this.setState({areas:res});
        })
        .catch(err => this.props.alert.error("Error" + err));
    }
    handleInsertButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for InserButton click event');
        onClick();
      }
    createArea = _ => {
         //console.log(this.state.area);
        const { area } = this.state;
        if (this.state.area.code === '')
            return this.props.alert.error("code is required field");
        if (this.state.area.name === '')
            return this.props.alert.error("name is required field");
      
        fetch(areaService.createArea(area))
            .then(response => {
                this.props.alert.success("Congratulations! Area created successfully.");
                this.setState({ show: false, activeModal: false });
                this.componentWillMount();
            })
            .catch(err => this.props.alert.error("Error" + err))
    }
    updateArea = _ => {
       // const { area } = this.state;
        if (this.state.area.code === '')
            return this.props.alert.error("code is required field");
        if (this.state.area.name === '')
            return this.props.alert.error("name is required field");
      
        fetch(areaService.updateArea(this.state.area))
            .then(response => {
                this.props.alert.success("Congratulations! Area update successfully.");
                this.setState({ show: false, activeModal: false });
                this.componentWillMount();
            })
            .catch(err => this.props.alert.error("Error" + err))
    }
    render() {
        const { area } = this.state;
        const columns = [{
            dataField: 'area_code',
            text: 'Area code',
            sort:true
          }, {
            dataField: 'name',
            text: 'Name',
            sort:true
          },
          {
            dataField: 'df2',
            isDummyField: true,
            text: 'Action ',
            formatter: (cellContent, row) => {
                return (
                    <FontAwesomeIcon icon={faEdit} className="edit-button"  onClick={doAction(row)}/>
                );            
            },events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    this.setState({area:row, show: false, activeModal: true });
                }
              }
          }];
         function doAction(row) {
            console.log(row);
        }
            var areaList = (  

                <Grid>
                    <Row className="show-grid text-left" style={{marginTop:'6%'}}>
                        {/* <Image src="assets/banner.jpg" className="header-image" style={{ height: '510px' }} /> */}
                        <Col xs={12} md={12} sm={8} >
                          <Button bsStyle="success" type="button" onClick={this.addArea}>Add new area</Button>
                        </Col>
                        
                        <Col xs={12} md={12} sm={8} style={{marginTop:'2%'}}>
                          {this.state.areas &&
                           <ReactTable keyField='job_code' data={ this.state.areas } 
                                columns={ columns } 
                                pagination={ paginationFactory() }  
                                defaultSortDirection="asc"
                           />
                          }
                        </Col>
                    </Row>

                </Grid>

          )

            var areaComponent = (

            <Modal bsSize="md" container={this} aria-labelledby="contained-modal-title-lg" show={this.state.activeModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.area.areaId === null ? "New Area" : "Edit Area"}</Modal.Title>
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
                            <FormGroup controlId="area_code"
                                    validationState={this.getValidationState('area_code')}>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Code
                                     </Col>
                                    <Col sm={6}>
                                        <FormControl type="code" placeholder="code"
                                            value={area.area_code}
                                            onChange={e => this.setState({ area: { ...area, area_code: e.target.value } })} />
                                        <FormControl.Feedback />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="name"
                                    validationState={this.getValidationState('name')}>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Name
                                     </Col>
                                    <Col sm={6}>
                                        <FormControl type="text" placeholder="Name"
                                            value={area.name}
                                            onChange={e => this.setState({ area: { ...area, name: e.target.value } })} />
                                        <FormControl.Feedback />
                                    </Col>
                                </FormGroup>
                                
    
                                {/* <FormGroup>
                                    <Col smOffset={2} sm={1}>
                                        <Button bsStyle="info" type="button" onClick={this.addarea}>Register</Button>
                                    </Col>
    
                                </FormGroup> */}
    
                            </Form>
    
    
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" type="button" onClick={this.state.area.areaId === null  ? this.createArea : this.updateArea}>Save</Button>
                    <Button bsStyle="danger" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
                                       
        
      return (
            <div>               
                {areaList}
                {areaComponent}
            </div>
         )
        
    }
}

export default withAlert(Areas);

