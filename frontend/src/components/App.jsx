import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./Home"
import Form from "./Form";
import Header from "./Header";
import Update from "./update";
import View from "./View";

function App() {
	return (
		<>
		  <Header />
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/Form" component={Form} />
			    <Route exact path="/update/:id" component={Update} />
					<Route exact path="/View/:id" component={View} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
