import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Menu, Icon} from 'antd';

import Home from './Home';
import NavMenu from './Menu';
import Competitions from './tables/Competitions';
import Universities from './tables/Universities';
import Competitors from './tables/Competitors';
import TeamLeaders from './tables/TeamLeaders';
import Problems from './tables/Problems';
import UniversityList from './tables/UniversitiesList';

ReactDOM.render(
    <Router>
         <div className='bodyWrap'>

            <div className='top-box'>
            </div>
            <div className='round-rect'>
                <div className='react'>
                   
                    <div className='gap'/>
                        <NavMenu/>
                        <div className='small_gap'/>
                        <Route exact path="/" component={Home} />
                        <Route path="/competitions" component={Competitions} />
                        <Route path="/universities" component={Universities} />
                        <Route path="/university-list" component={UniversityList} />
                        <Route path="/competitors" component={Competitors} />
                        <Route path="/teachers" component={TeamLeaders} />
                        <Route path="/problems" component={Problems} />
                    </div>
                </div>
            <div className='bottom-box'>
            </div>
        </div>   
    </Router>,
    document.getElementById('public-root')
);
