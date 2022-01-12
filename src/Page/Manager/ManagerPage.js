import React, { Component } from 'react';
import "./ManagerPage.scss"

class ManagerPage extends Component {
    render() {
        return (  
            <div className="bar">
                <div className="top">
                    <ul className="whole">
                        <li className="dropdown">
                            <a className="dropbtn">VIEW PERFOMANCE RECORDS</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/view-performanceM"><b><font color="darkblue">View Own Performance Records</font></b></a>
                                        <a href="/view-performanceOE"><b><font color="darkblue">View Other Employees' Performance Records</font></b></a>
                                        <a href="/mview-performanceOM"><b><font color="darkblue">View Other Managers' Performance Records</font></b></a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a className="dropbtn">PERFORMANCE RATING</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/mrate-managers"><b><font color="darkblue">Rate Managers</font></b></a>
                                        <a href="/mrate-employees"><b><font color="darkblue">Rate Employees</font></b></a>
                                    </div>   
                                </div>    
                            </div>
                        </li>
                        <li className="dropdown">
                            <a className="dropbtn">OTHER USAGES</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/fe-requests"><b><font color="darkblue">Requests from Employees</font></b></a>
                                        <a href="/m-requests"><b><font color="darkblue">Write Requests</font></b></a>
                                        <a href="/mc-requests"><b><font color="darkblue">View Requests</font></b></a>
                                        <a href="/m-goals"><b><font color="darkblue">Goals Setting for employees</font></b></a>
                                        <a href="/mc-goals"><b><font color="darkblue">View Rating Completed Goals</font></b></a>
                                    </div>   
                                </div>    
                            </div>
                        </li>
                        <li className="dropdown">
                            <a className="dropbtn">ACCOUNT MANAGEMENT</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/manage-profileM"><b><font color="darkblue">Manage Profile</font></b></a>
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

export default ManagerPage;