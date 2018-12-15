import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Product extends Component {
    constructor(props) {
        super();
        this.state= {
            viewLink: `/product/${String(props.id)}`,
        }
    }
    render() {
        const api = 'https://development.metamesh.io/';

        return (
            <div className='col-sm-12'>
                <div className='col-sm-6 image'>
                    <Link to={this.state.viewLink}>
                        <img style={{width: '100%'}}/>
                    </Link>
                </div>
                <div className='col-sm-6 details'>
                    <p>Card Name: {props.cardName}</p>
                    <p>Card ID: {props.cardID}</p>
                    <p>Rarity: {props.rarity}</p>
                </div>
            </div>
        );
    }
}

export default Product