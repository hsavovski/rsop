import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Menu, Icon} from 'antd';

import Home from './Home';
import Competitions from './tables/Competitions';
import Universities from './tables/Universities';
import Competitors from './tables/Competitors';
import TeamLeaders from './tables/TeamLeaders';
import Problems from './tables/Problems';

ReactDOM.render(
    <Router>
         <div className='bodyWrap'>
                <Menu
                        mode="horizontal"
                    >
                        <Menu.Item key="home">
                            <Link to="/">
                                <Icon type="home" />Начало
                            </Link>
                        
                        </Menu.Item>
                        <Menu.Item key="competitions">
                            <Link to="/competitions">
                                <Icon type="appstore" />Състезания
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="universities">
                            <Link to="/universities">
                                <Icon type="appstore" />Университети
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="competitors">
                            <Link to="/competitors">
                                <Icon type="appstore" />Състезатели
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="teachers">
                            <Link to="/teachers">
                                <Icon type="appstore" />Преподаватели
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="problems">
                            <Link to="/problems">
                                <Icon type="appstore" /> Задачи
                            </Link>
                        </Menu.Item>
                    </Menu>
                    <div className='gap'/>

                    <Route exact path="/" component={Home} />
                    <Route path="/competitions" component={Competitions} />
                    <Route path="/universities" component={Universities} />
                    <Route path="/competitors" component={Competitors} />
                    <Route path="/teachers" component={TeamLeaders} />
                    <Route path="/problems" component={Problems} />
        </div>   
    </Router>,
    document.getElementById('public-root')
);
