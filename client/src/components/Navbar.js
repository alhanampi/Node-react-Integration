import React, { Component } from 'react';
import './../css/styles.css'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import logo from './../css/assets/Ada_Iso_Blanco.png'
import search from './../css/assets/Icono_Search.png'
import Searchs from './Searchs'
import { withRouter } from 'react-router'

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchBar: null
		}

		this.inputChange = this.inputChange.bind(this)
		this.onClickEnter = this.onClickEnter.bind(this)
	}

	//functions:
	//input:
	inputChange(e) {
		this.setState({
			searchBar: e.target.value
		})
	}

	//onclick with enter
	onClickEnter(e) {
		console.log(e)
		e.persist()
		if (e.charCode === 13) {
			this.props.history.push("/search?search=" + this.state.searchBar)
		}
	}

	render() {
		return (
			<span>
				<div className="pinkBar">
					<img src={logo} alt="logo" className="logoAda" />
					<input type="text" placeholder="Nunca dejes de buscar" value={this.inputVal} onChange={this.inputChange} onKeyPress={this.onClickEnter} />
					<span className="searchBox">
						<Link to={"/search?search=" + this.state.searchBar}>
							<button type="button">
								<img src={search} /></button></Link>

					</span>
				</div>
			</span>
		)
	}
}

export default withRouter(NavBar);