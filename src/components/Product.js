import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state= {
            viewLink: `/card/${String(props.cardName)}`,
        }
    }

    render() {

        return (
            <div className='col-sm-12'>
                <div className='col-sm-6 image'>
                    <Link to={this.state.viewLink}>
                        <img style={{width: '100%'}} src={`https://development.metamesh.io/${this.props.image}`} alt="card"/>
                    </Link>
                </div>
                <div className='col-sm-6 details'>
                    <p>Card Name: {this.props.cardName}</p>
                    <p>Card ID: {this.props.cardID}</p>
                    <p>Rarity: {this.props.rarity}</p>
                </div>
            </div>
        );
    }
}

export default Product