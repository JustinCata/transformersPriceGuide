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
        let tileColor;
        if (this.props.dayChange > 0) {
            percentColor = 'green';
            tileColor = '#00FF7F';
        } else {
            percentColor = 'red';
            tileColor = '#FF6666';
        }

        return (
            <div className='col-xs-12 Card' style={{ backgroundColor: tileColor}}>
                <div className='col-xs-12 image'>
                    <Link to={this.state.viewLink}>
                        <img src={`https://development.metamesh.io/${this.props.image}`} style={{height: '100%'}}/>
                    </Link>
                </div>
                <div className='col-xs-6 price'>
                    <h3>${this.props.avgPrice.toFixed(2)}</h3>
                </div>
                <div className='col-xs-6 percentage'>
                    <h3 style={{ color: percentColor}}>{this.props.dayChange.toFixed(2)}%</h3>
                </div>
            </div>
        );
    }
}

export default Card