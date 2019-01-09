/**
 * Created by ico on 09.02.17.
 */
import React, {Component} from 'react';
import Login from './forms/LoginForm';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        return (
			<div>

				<div className="centered">
                    <Login/>
				</div>
			</div>
        );
    }
}