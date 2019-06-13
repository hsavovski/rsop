import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Layout} from "antd";
const {Header, Content, Footer} = Layout;
import { Icon , Menu, Row , Col } from 'antd';
import { LocaleProvider } from 'antd';
import bg from 'antd/lib/locale-provider/bg_BG';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import Competitions from './Competitions';
import Home from './Home';
import Universities from './tables/Universities';
import Competitors from './tables/Competitors';
import TeamLeaders from './tables/TeamLeaders';
import Problems from './tables/Problems';

ReactDOM.render(
    <Router>
        <div className='bodyWrap'>
                <Menu
                        mode="horizontal"
                        size='big'
                    >
                        <Menu.Item key="home">
                            <Link to="/admin/">
                                <Icon type="home" />Начало
                            </Link>
                        
                        </Menu.Item>
                        <Menu.Item key="competitions">
                            <Link to="/admin/competitions">
                                <Icon type="appstore" />Състезания
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="universities">
                            <Link to="/admin/universities">
                                <Icon type="appstore" />Университети
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="competitors">
                            <Link to="/admin/competitors">
                                <Icon type="appstore" />Състезатели
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="teachers">
                            <Link to="/admin/teachers">
                                <Icon type="appstore" />Преподаватели
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="problems">
                            <Link to="/admin/problems">
                                <Icon type="appstore" /> Задачи
                            </Link>
                        </Menu.Item>
                    </Menu>
                

                    <Route exact path="/admin" component={Home} />
                    <Route path="/admin/competitions" component={Competitions} />
                    <Route path="/admin/universities" component={Universities} />
                    <Route path="/admin/competitors" component={Competitors} />
                    <Route path="/admin/teachers" component={TeamLeaders} />
                    <Route path="/admin/problems" component={Problems} />

        </div>   
    </Router>,
    document.getElementById('admin-root')
);
