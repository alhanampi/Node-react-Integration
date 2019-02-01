import React, { Component } from 'react';
import axios from 'axios';
import './../css/styles.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import Envio from './../css/assets/Icono_Envio.png'

class Searchs extends Component {

	constructor(props) {
		super(props)

		this.state = {
			products: [],
		}
	}

	//functions:

	paramsSearch() {

		const searchParam = new URLSearchParams(window.location.search);
		const searchProduct = searchParam.get('search')

		return searchProduct;
	}

	//check if new search is equal to the last one
	componentDidUpdate() {

		if (this.lastSearch !== this.paramsSearch()) {
			this.componentDidMount();
		}
	}

	componentDidMount() {
		const searchProduct = this.paramsSearch()
		this.lastSearch = searchProduct

		axios.get('http://localhost:8080/api/items?q=' + searchProduct)
			.then((prodData) => {
				this.setState({
					products: prodData.data
				})
			})
	}

	render() {

		const products = this.state.products.items && this.state.products.items.map((p) =>
			<div key={p.id}>

				<Link to={'/details/' + p.id} >
					<div className="productos" onClick={this.link}  >
						<div className="prodBox1">
							<div className="thumbnail"><img src={p.picture} /> </div>
							<div className="productData">

								<span className="detailPrice">
									<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value=
										{p.price.amount} >
									</NumberFormat>
								</span>
								<span className="decimal">{p.price.decimals}</span>

								<span className="shipping">

									{p.shipping === true ?
										<img src={Envio} /> : ''}
								</span>

								<p className="productTitle">{p.title}</p>
							</div>
						</div>
						<div className="prodBox2">
							<p className="productAddress">{p.address}</p>
						</div>
					</div>
				</Link>
			</div>
		)
		return (
			<div>

				<div>
					<ul className="pan">
						{this.state.products.categories && this.state.products.categories.map((b) =>
							<li className="pancito" key={b.id}> {b.name}</li>)
						}
					</ul>
				</div>

				{products}

			</div>
		)
	}
}

export default Searchs;