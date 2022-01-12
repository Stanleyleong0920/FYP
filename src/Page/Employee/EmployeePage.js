import React, { Component } from 'react';
import "./EmployeePage.scss"

class EmployeePage extends Component {
    render() {
        return (  
            <div className="bar2">
                <div className="top2">
                    <ul className="ul1">
                        <li className="dropdown">
                            <a  className="dropbtn">VIEW PERFORMANCE RECORDS</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/view-performanceE"><b><font color="darkblue">View Own Performance Records</font></b></a>
                                        <a href="/view-performanceOM"><b><font color="darkblue">View Other Managers' Performance Records</font></b></a>
                                        <a href="/eview-performanceOE"><b><font color="darkblue">View Other Employees' Performance Records</font></b></a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a className="dropbtn">PERFORMANCE RATING</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/erate-managers"><b><font color="darkblue">Rate Managers</font></b></a>
                                        <a href="/erate-employees"><b><font color="darkblue">Rate Employees</font></b></a>
                                    </div>   
                                </div>    
                            </div>
                        </li>
                        <li className="dropdown">
                            <a className="dropbtn">OTHER USAGES</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/e-requests"><b><font color="darkblue">Write Requests</font></b></a>
                                        <a href="/ev-requests"><b><font color="darkblue">View Requests</font></b></a>
                                        <a href="/feedback"><b><font color="darkblue">Write feedback to other employees</font></b></a>
                                        <a href="/view-feedback"><b><font color="darkblue">View feedback from other employees</font></b></a>
                                        <a href="/e-goals"><b><font color="darkblue">Goals from Managers</font></b></a>
                                        <a href="/ec-goals"><b><font color="darkblue">View Rating Completed Goals</font></b></a>
                                    </div>   
                                </div>    
                            </div>
                        </li>
                        <li className="dropdown">
                            <a className="dropbtn">ACCOUNT MANAGEMENT</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <div>
                                        <a href="/manage-profileE"><b><font color="darkblue">Manage Profile</font></b></a>
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

export default EmployeePage;