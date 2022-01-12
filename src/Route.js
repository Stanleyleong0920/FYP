import React from 'react'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SignIn from './Page/SignIn'
import SignUp from './Page/SignUp'
//Admin
import AdminPage from './Page/Admin/AdminPage'
import ViewEmployees from './Page/Admin/ViewEmployees'
import ViewManagers from './Page/Admin/ViewManagers'
import DownloadDataE from './Page/Admin/DownloadPerformanceRecordsE'
import DownloadDataM from './Page/Admin/DownloadPerformanceRecordsM'
import RequestsFromE from './Page/Admin/RequestsFromEmployees'
import RequestsFromM from './Page/Admin/RequestsFromManagers'
import ViewRequestsFromE from './Page/Admin/ViewRequestsFromE'
import ViewRequestsFromM from './Page/Admin/ViewRequestsFromM'
//Employee
import EmployeePage from './Page/Employee/EmployeePage'
import ViewPerformanceRecordsE from './Page/Employee/ViewPerformanceRecords'
import ViewPerformanceRecordsOM from './Page/Employee/ViewPerformanceRecordsOM'
import EViewPerformanceRecordsOE from './Page/Employee/ViewPerfomanceRecordsOE'
import ERateManagers from './Page/Employee/RateManagers'
import ERateEmployees from './Page/Employee/RateEmployees'
import ERequests from './Page/Employee/EmployeeRequests'
import EVRequests from './Page/Employee/ViewRequests'
import Feedback from './Page/Employee/Feedback'
import ViewFeedback from './Page/Employee/ViewFeedback'
import EmployeeGoals from './Page/Employee/EmployeeGoals'
import ViewGoals from './Page/Employee/ViewGoals'
import ManageProfileE from './Page/Employee/ManageProfile'
//Manager
import ManagerPage from './Page/Manager/ManagerPage'
import ViewPerformanceRecordsM from './Page/Manager/ViewPerformanceRecords'
import MViewPerformanceRecordsOM from './Page/Manager/ViewPerformanceRecordsOM'
import ViewPerformanceRecordsOE from './Page/Manager/ViewPerformanceRecordsOE'
import MRateManagers from './Page/Manager/RateManagers'
import MRateEmployees from './Page/Manager/RateEmployees'
import RequestsFromEmployees from './Page/Manager/RequestfromEmployees'
import ManagerRequests from './Page/Manager/ManagerRequests'
import ManagerGoals from './Page/Manager/ManagerGoals'
import ManageProfileM from './Page/Manager/ManageProfile'
import MViewRequests from './Page/Manager/ViewRequests'
import ManagerViewGoals from './Page/Manager/ViewGoals'

export default function AppRouting(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/sign-in" component={SignIn} />
                <Route exact path="/sign-up" component={SignUp} />

                <Route exact path="/admin-page" component={AdminPage} />
                <Route exact path="/view-employees" component={ViewEmployees}/>
                <Route exact path="/view-managers" component={ViewManagers}/>
                <Route exact path="/download-dataE" component={DownloadDataE}/>
                <Route exact path="/download-dataM" component={DownloadDataM}/>
                <Route exact path="/requests-E" component={RequestsFromE}/>
                <Route exact path="/requests-M" component={RequestsFromM}/>
                <Route exact path="/requests-EV" component={ViewRequestsFromE}/>
                <Route exact path="/requests-MV" component={ViewRequestsFromM}/>

                <Route exact path="/employee-page" component={EmployeePage}/>
                <Route exact path="/view-performanceE" component={ViewPerformanceRecordsE}/>
                <Route exact path="/view-performanceOM" component={ViewPerformanceRecordsOM}/>
                <Route exact path="/eview-performanceOE" component={EViewPerformanceRecordsOE}/>
                <Route exact path="/erate-managers" component={ERateManagers}/>
                <Route exact path="/erate-employees" component={ERateEmployees}/>
                <Route exact path="/e-requests" component={ERequests}/>
                <Route exact path="/ev-requests" component={EVRequests}/>
                <Route exact path="/feedback" component={Feedback}/>
                <Route exact path="/view-feedback" component={ViewFeedback}/>
                <Route exact path="/e-goals" component={EmployeeGoals}/>
                <Route exact path="/ec-goals" component={ViewGoals}/>
                <Route exact path="/manage-profileE" component={ManageProfileE}/>

                <Route exact path="/manager-page" component={ManagerPage}/>
                <Route exact path="/view-performanceM" component={ViewPerformanceRecordsM}/>
                <Route exact path="/view-performanceOE" component={ViewPerformanceRecordsOE}/>
                <Route exact path="/mview-performanceOM" component={MViewPerformanceRecordsOM}/>
                <Route exact path="/mrate-managers" component={MRateManagers}/>
                <Route exact path="/mrate-employees" component={MRateEmployees}/>
                <Route exact path="/fe-requests" component={RequestsFromEmployees}/>
                <Route exact path="/m-requests" component={ManagerRequests}/>
                <Route exact path="/mc-requests" component={MViewRequests}/>
                <Route exact path="/m-goals" component={ManagerGoals}/>
                <Route exact path="/mc-goals" component={ManagerViewGoals}/>
                <Route exact path="/manage-profileM" component={ManageProfileM}/>
            </Switch>
        </Router>
    )
}