///<reference path="Common/global.d.ts"/>
import * as React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import {hot} from 'react-hot-loader';
//Pages
window.Reflux = React;
window.React = React;
import PageTest from './Pages/PageTest/index';
import PagePublicList from './Pages/PagePublicList/index';
import PageIndex from './Pages/PageIndex/index';
import PageMore from './Pages/PageMore/index';
import PageColleageList from './Pages/PageColleageList/index';
import PageDetail from './Pages/PageDetail/index';
import PageEditSchedule from './Pages/PageEditSchedule/index';
import PageLeaderMapping from './Pages/PageLeaderMapping/index';

const PageManagers = require('../third/PageManagers/index');
import '../third/PageManagers/index.less';
import PageMeetingSummary from './Pages/PageMeetingSummary/index';

/* 任务-- */
import PageAddTask from './Pages/PageAddTask/index';
import PageTaskDetail from './Pages/PageTaskDetail/index';
/* --任务  */

//Less
import './App.less';

class ModalSwitch extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/test" component={PageTest}/>
                    <Route path="/publicList" component={PagePublicList}/>
                    <Route path="/index/:userId/:userIsLeader/:chooseDate?/:page?" component={PageIndex}/>
                    <Route path="/more" component={PageMore}/>
                    <Route path="/colleageList/:page?" component={PageColleageList}/>
                    <Route path="/detail/:id/:leaderId/:isFromNotice?" component={PageDetail}/>
                    <Route path="/editSchedule/:scheduleId/:leaderId/:chooseDate?" component={PageEditSchedule}/>
                    <Route path="/detail/:id/:leaderId" component={PageDetail}/>
                    <Route path="/leaderMapping" component={PageLeaderMapping}/>
                    <Route path="/managers" component={PageManagers}/>
                    <Route path="/meetingSummary/:id/:leaderId" component={PageMeetingSummary}/>
                    <Route path="/task/:recordId?" component={PageAddTask}/>
                    <Route path="/taskDetail/:recordId" component={PageTaskDetail}/>
                    <Route render={() => <Redirect to="/test"/>}/>
                </Switch>
            </div>
        );
    }
}

const App = () => (
    <HashRouter>
        <Route component={ModalSwitch}/>
    </HashRouter>
);

export default hot(module)(App);
