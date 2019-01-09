import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import App from './components/App';

ReactDOM.render(
	<Router>
		<div>
			<Route path="/admin/login" component={App} />
		</div>
	</Router>,
	document.getElementById('adminLogin')
);
