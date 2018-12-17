import React, { Component } from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state= {
            viewLink: `/card/${String(props.cardName)}`,
        }
    }
    render() {
        const api = 'https://development.metamesh.io/';
        let percentColor;
        if (this.props.dayChange > 0) {
            percentColor = 'green';
        } else {
            percentColor = 'red';
        }

        return (
            <div className='col-xs-12 Card'>
                <div className='col-xs-12 image'>
                    <Link to={this.state.viewLink}>
                        <img src={`https://development.metamesh.io/${this.props.image}`} style={{height: '100%'}}/>
                    </Link>
                </div>
                <div className='col-xs-6 price'>
                    <h4>${this.props.avgPrice}</h4>
                </div>
                <div className='col-xs-6 percentage'>
                    <h4 style={{ color: percentColor}}>{this.props.dayChange}%</h4>
                </div>
            </div>
        );
    }
}

export default Card