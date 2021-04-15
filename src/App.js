import './App.css';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import axios from 'axios';

export const App = () => {
  const [apiData, setApiData] = useState();
  const [totalIssue, setTotolIssue] = useState();

  useEffect(()=> {
    getTotalIssue()
    getApiData() 
  },[])

  const getApiData = async () => {
    await axios({
      method: 'get',
      url: "http://localhost:5000/getData",
    }).then(function (response) {
      setApiData(response.data)
    });
  }

  const getTotalIssue = async () => {
    await axios({
      method: 'get',
      url: "http://localhost:5000/getIssues",
    }).then(function (response) {
      setTotolIssue(response.data)
    });
  }

  return (
    <div className="App">
      <h3 className="mt-5">Total number of issues from the Issue Checklist project : {totalIssue ? totalIssue.total: ""} </h3>
      <h6> List of components that don't have a component lead :</h6>
      <Container>
        <Row className="mx-0 my-5">
          {apiData && apiData.map((item,index) => {
            if(item.realAssigneeType !== "COMPONENT_LEAD") {
              return (
                <Col sm={12} md={6} className="mb-3">
                  <div className="shadow px-3 py-2 text-left">
                    <p>Id:{item.id}</p>
                    <p>Name :{item.name}</p>
                    <p>Project : {item.project}</p>
                    <p>ProjectId : {item.projectId}</p>
                    <p>AssigneeType : {item.assigneeType}</p>
                    <p>RealAssigneeType : {item.realAssigneeType}</p>
                    <p>IsAssigneeTypeValid : {item.isAssigneeTypeValid ? "true" : "false"}</p>
                    <p>Self : {item.self}</p>
                    <p>Description : {item.description}</p>
                  </div>
                </Col>
              )
            }
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
