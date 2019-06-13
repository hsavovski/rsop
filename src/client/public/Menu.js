import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Menu, Icon} from 'antd';



export default class NavMenu extends Component
{
	constructor()
	{
        super();
        let pathname = window.location.pathname.substr(1);
        !pathname && (pathname = 'home');
        this.state = {
            current: pathname,
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        this.setState({
            current: e.key,
        });
    }

	render()
	{
		return(
			<div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
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
                    <Menu.SubMenu
                        title={
                            <span className="submenu-title-wrapper">    
                                <Icon type="appstore" />Университети
                            </span>
                        }
                        >
                        <Menu.Item key="universities:1">
                            <Link to="/universities">
                                Класиране
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="universities:2">
                            <Link to="/university-list">
                                Списък с университети
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>

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
			</div>
		);
	}
}
