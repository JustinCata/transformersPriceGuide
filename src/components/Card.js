import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
    constructor(props) {
        super();
        this.state= {
            viewLink: `/card/${String(props._id)}`,
        }
    }
    render() {
        const api = 'https://development.metamesh.io/';

        return (
            <div className='col-xs-12 Card'>
                <div className='col-xs-12 image'>
                    <Link to={this.state.viewLink}>
                        <img src={`https://development.metamesh.io/${this.props.image}`} style={{width: '100%'}}/>
                    </Link>
                </div>
                <div className='col-xs-6 price'>
                    <p>${this.props.avgPrice}</p>
                </div>
                <div className='col-xs-6 percentage'>
                    <p>{this.props.dayChange}%</p>
                </div>
            </div>
        );
    }
}

export default Card