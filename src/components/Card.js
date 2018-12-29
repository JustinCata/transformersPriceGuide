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
        let avgSold;
        let dayChng;
        if (this.props.dayChange > 0) {
            percentColor = 'green';
            tileColor = '#00FF7F';
        } 
        if (this.props.dayChange === 0) {
            percentColor = 'rgb(3, 16, 46)';
            tileColor = 'rgb(3, 16, 46)';
        }
        if (this.props.dayChange < 0) {
            percentColor = 'red';
            tileColor = '#FF6666';
        }
        if (this.props.avgPrice.toFixed(2) == 0.00) {
            avgSold = 'No Sales';
            dayChng = '0.00';
            percentColor = 'rgb(3, 16, 46)';
            tileColor = 'rgb(3, 16, 46)';
        } else {
            avgSold = `$${this.props.avgPrice.toFixed(2)}`;
            dayChng = `${this.props.dayChange.toFixed(2)}`;
        }

        return (
            <div className='col-xs-12 Card' style={{ backgroundColor: tileColor}}>
                <div className='col-xs-12 image'>
                    <Link to={this.state.viewLink}>
                        <img src={`https://development.metamesh.io/${this.props.image}`} style={{height: '100%'}}/>
                    </Link>
                </div>
                <div className='col-xs-6 price'>
                    <h3>{avgSold}</h3>
                </div>
                <div className='col-xs-6 percentage'>
                    <h3 style={{ color: percentColor}}>{dayChng}%</h3>
                </div>
            </div>
        );
    }
}

export default Card