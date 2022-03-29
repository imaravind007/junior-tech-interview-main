// import axios from 'axios';
// import MOCK from './mock.js';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  fetchPatients = async () => {
    console.log('In fetchPatients');
    const response = await axios.get(
      'https://ti-patient-service.azurewebsites.net/patient'
    );
    console.log(response);
    return response?.data;
  };

  fetchPatient = async (patientId) => {
    const response = await axios.get(
      `https://ti-patient-service.azurewebsites.net/patient/${patientId}`
    );
    console.log(response);
    return response?.data;
  };

  constructor() {
    super();
    this.data = this.fetchPatients(); //API Call to get data for all patients
    // this.data = MOCK;
    this.state = {
      data: this.data,
      patientDetails: null,
    };
    console.log(this.data);
  }

  fetchDetails(patientId) {
    console.log(patientId);
    // this.patientDetails = this.fetchPatient(patientId); //API Call to get data for specific patient
    //Mock Code w/o API call
    this.setState({
      patientDetails: this.data.find(
        (patient) => patient.patientId === patientId
      ),
    });
  }

  componentDidMount(){
    document.title = "Junior-Tech-Interview"
  }

  render() {
    const { data, patientDetails } = this.state;
    return (
      <div className="App">
        <table>
          <tr>
            <th>Name</th>
          </tr>
          {data &&
            data.map((val, key) => {
              return (
                <tr key={key} onClick={() => this.fetchDetails(val.patientId)}>
                  {val.lastName}, {val.firstName}
                </tr>
              );
            })}
        </table>
        {patientDetails && (
          <div class="patient-details">
            <h1>Patient Details</h1>
            <div>First Name : {patientDetails.firstName}</div>
            <div>Last Name : {patientDetails.lastName}</div>
            <div>gender: {patientDetails.gender}</div>
            <div>Date of Birth : {patientDetails.dateOfBirth}</div>
            <div>addressLine1 : {patientDetails.addressLine1}</div>
            <div>addressLine2 : {patientDetails.addressLine2}</div>
            <div>city : {patientDetails.city}</div>
            <div>state : {patientDetails.state}</div>
            <div>postalCode: {patientDetails.postalCode}</div>
          </div>
        )}

              <div id="copyright">
                    <ul>
                        <li>&copy; Aravinthan.</li>
                        <li>Code: <a href="https://github.com/imaravind007/junior-tech-interview-main">This Site</a></li>
                    </ul>
                </div>
      </div>
    );
  }
}
export default App;
