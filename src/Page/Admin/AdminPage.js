import React, { Component } from 'react';
import "./AdminPage.scss"

class AdminPage extends Component {
    render() {
        return (  
            <div className="bar1">
                <div className="top1">
                    <ul className="whole1">
                        <li className="dropdown1">
                            <a className="dropbtn">USERS</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/sign-up"><b><font color="darkblue">Add a user (Manager/Employee/Admin)</font></b></a>
                                        <a href="/view-managers"><b><font color="darkblue">View Managers</font></b></a>
                                        <a href="/view-employees"><b><font color="darkblue">View Employees</font></b></a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="dropdown1">
                            <a className="dropbtn">DOWNLOAD PEFORMANCE RECORDS</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/download-dataM"><b><font color="darkblue">Managers</font></b></a>
                                        <a href="/download-dataE"><b><font color="darkblue">Employees</font></b></a>
                                    </div>   
                                </div>    
                            </div>
                        </li>
                        <li className="dropdown1">
                            <a className="dropbtn">REQUESTS</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/requests-M"><b><font color="darkblue">Requests from Managers</font></b></a>
                                        <a href="/requests-E"><b><font color="darkblue">Requests from Employees</font></b></a>
                                        <a href="/requests-MV"><b><font color="darkblue">View Managers' Approved/Declined Requests</font></b></a>
                                        <a href="/requests-EV"><b><font color="darkblue">View Employees' Approved/Declined Requests</font></b></a>
                                    </div>   
                                </div>    
                            </div>
                        </li>
                        <li className="dropdown1">
                            <a className="dropbtn">LOG OUT</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/sign-in"><b><font color="darkblue">Log Out</font></b></a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default AdminPage;