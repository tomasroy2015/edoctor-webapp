import React, { Component } from 'react'
import {
    Grid, Row, Col, Button, Form, FormGroup,
    ControlLabel, FormControl, Modal,Table
} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import ReactTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/fontawesome-free-regular';
import cellEditFactory from 'react-bootstrap-table2-editor';
import Parser from 'html-react-parser'; 
import jobPartttimeService from '../service/ParttimeJobService';
import { withAlert } from "react-alert";
import ActionEdit from "../components/ActionEdit";
class ParttimeJobs extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
             jobList: null
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
    
    componentWillMount() {
        jobPartttimeService.getPartttimeJobList()
        .then(res => {
            console.log(res);
            this.setState({jobList:res});
        })
        .catch(err => this.props.alert.error("Error" + err));
    }
    handleInsertButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for InserButton click event');
        onClick();
      }
     

     actionFormatter(cell, row) {
       function  doAction(row) {
            console.log("test");
        }
        
        return (
          <ActionEdit onClick={doAction(row)} />
        );
      };

    render() {
        function fullAddress(cell, row) {
            if (row.onSale) {
              return (
                <span>
                  <strong style={ { color: 'red' } }>$ { cell } NTD(Sales!!)</strong>
                </span>
              );
            }
          
            return (
              <span>$ { cell } NTD</span>
            );
          }

        const columns = [{
            dataField: 'job_code',
            text: 'Job Code',
            sort:true
          }, {
            dataField: 'job_title',
            text: 'Job Title',
            sort:true
          }, {
            dataField: 'job_description',
            text: 'Job Description',
            sort:true
          }, {
            dataField: 'work_address1',
            text: 'Work Location',
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
            }
          }];
         function doAction(row) {
            console.log(row);
        }

        return (
            <div>

                <Grid>
                    <Row className="show-grid text-left" style={{marginTop:'6%'}}>
                        {/* <Image src="assets/banner.jpg" className="header-image" style={{ height: '510px' }} /> */}
                        <Col xs={12} md={12} sm={8} >
                          <Button bsStyle="success" type="button" onClick={this.addUser}>Add new job</Button>
                        </Col>
                        
                        <Col xs={12} md={12} sm={8} style={{marginTop:'2%'}}>
                          {this.state.jobList &&
                           <ReactTable keyField='job_code' data={ this.state.jobList } 
                                columns={ columns } 
                                pagination={ paginationFactory() }  
                                defaultSortDirection="asc"
                           />
                          }
                            {/* <BootstrapTable ref='table' data={ this.state.jobList } pagination>
                                <TableHeaderColumn  dataField='job_code' isKey={ true } >Job Code</TableHeaderColumn>
                                <TableHeaderColumn dataField='job_title'>Job Title</TableHeaderColumn>
                                <TableHeaderColumn dataField='job_description'>Job Description</TableHeaderColumn>
                                <TableHeaderColumn dataField='work_address1'>Work Address</TableHeaderColumn>
                                <TableHeaderColumn dataField='work_contents'>Work Contents</TableHeaderColumn>
                                <TableHeaderColumn dataField='action' dataFormat={ this.actionFormatter }>Action</TableHeaderColumn>       
                            </BootstrapTable> */}
                            {/* {this.state.jobList && 
                            <Table striped bordered condensed hover>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    </tr>
                                </thead>
                                
                                <tbody>                                  
                                    {this.state.jobList.forA ((item, key) => {     
                                        console.log(item.job_code);                 
                                        <tr key = {key}>
                                            <td>{item.job_code}}</td>
                                            <td>{item.job_title}</td>
                                            <td>{item.job_description}</td>
                                            <td>{item.job_code}</td>
                                        </tr>
                                    })}
                                    
                                </tbody>
                                
                            </Table>
                            } */}
                        </Col>
                    </Row>

                </Grid>
            </div>
        )
    }
}

export default withAlert(ParttimeJobs);

