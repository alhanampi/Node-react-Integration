import React, { Component } from 'react';
import axios from 'axios';
import './../css/styles.css';
import NumberFormat from 'react-number-format';

class Detail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			price: [],
			loading: true
		}
	}

	//retrieve info with axios:
	componentDidMount() {
		axios.get('http://localhost:8080/api/items/' + this.props.match.params.id)
			.then((prodDetail) => {
				let prodDet = prodDetail.data
				console.log(prodDet)
				this.setState({
					loading: false,

					id: prodDet.id,
					title: prodDet.title,
					price: prodDet.price,
					picture: prodDet.picture,
					description: prodDet.description,
					sold: prodDet.sold,
					condition: prodDet.condition,
					address: prodDet.address.state_name,
					categories: prodDet.categories
				})
			})
	}

	render() {
		if (this.state.loading) {
			return <p> cargando... </p>
		}

		return (
			<span>

				<div className="details-breadcrumb">
					<ul className="breadcrumb">
						{
							this.state.categories && this.state.categories.map(categories => <li className="breadcrumb1" key={categories.id}>{categories.name}</li>)
						}
					</ul>
				</div>

				<div className="detailBox">

					<div className="box1">
						<img className="detailImg" src={this.state.picture} />
						<h2>Descripción del Producto</h2>
						<p className="detailDesc"> {this.state.description}</p>
					</div>

					<div className="box2">
						<span className="conditionSold">{this.state.condition === "new" ? "Nuevo" : "Usado"} - </span>
						<span className="detailSold"> {this.state.sold} vendidos</span>
						<h2>{this.state.title}</h2>
						<h1 className="detailPrice">
							<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'$'} value=
								{this.state.price.amount} >
							</NumberFormat>
							<span className="decimal">{this.state.price.decimals}</span>
						</h1>

						<button type="button" className="buyButton">Comprar</button>
					</div>
				</div>
			</span>
		)
	}

}

export default Detail; 