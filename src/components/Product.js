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
            <div className='col-xs-12'>
            <div className='col-xs-1'></div>
                <div className='col-xs-5'>
                    <Link to={this.state.viewLink}>
                        <img style={{width: '100%'}} src={`https://development.metamesh.io/${this.props.image}`} alt="card"/>
                    </Link>
                </div>
                
                <div className='col-xs-3 details Card'>
                    <h4 className='col-xs-12'>{this.props.cardName}</h4>
                    <div className='col-xs-12'>Card Name</div>
                    <h4 className='col-xs-12 Stat'>{this.props.cardID}</h4>
                    <div className='col-xs-12'>Card ID</div>
                    <h4 className='col-xs-12 Stat'>{this.props.rarity}</h4>
                    <div className='col-xs-12'>Card Rarity</div>
                </div>
            </div>
        );
    }
}

export default Product