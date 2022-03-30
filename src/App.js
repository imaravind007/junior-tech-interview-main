import axios from 'axios';
import React, { Component } from 'react';

class App extends Component {
  async fetchPatients () 
  {
    const response = await axios.get(
      'https://ti-patient-service.azurewebsites.net/patients'
    );
    this.setState({data:response?.data , patientDetails: null });
  };

  async fetchPatient(patientId) 
  {
    const response = await axios.get(
      `https://ti-patient-service.azurewebsites.net/patient/${patientId}`
    );
    this.setState(
    {
      patientDetails: response?.data,
    }
    );
  };

  constructor() {
    super();
    this.state = {}
    this.fetchPatients(); //API Call to get data for all patients
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
                <tr key={key} onClick={() => this.fetchPatient(val.patientId)}>
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
            <div>Gender: {patientDetails.gender}</div>
            <div>Date of Birth : {patientDetails.dateOfBirth}</div>
            <div>AddressLine1 : {patientDetails.addressLine1}</div>
            <div>AddressLine2 : {patientDetails.addressLine2 || '-'}</div>
            <div>City : {patientDetails.city}</div>
            <div>State : {patientDetails.state}</div>
            <div>PostalCode: {patientDetails.postalCode}</div>
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
