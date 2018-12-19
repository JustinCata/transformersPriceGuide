import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import Nav from './Nav';
import './ProductView.css';

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            avgPrice: 0.00,
            viewLink: `/card/${String(props.cardName)}`,
        };

    this.handleSearch = this.handleSearch.bind(this);

    }

    componentDidMount() {
        const match = matchPath(this.props.history.location.pathname, {
            path: '/card/:cardName',
            exact: false,
            strict: false,
          });
          const cardName = match.params.cardName;
          this.card(cardName);

          const query = this.props.match.params.query;
        this.setState({
            query: query,
        }, ()=>{
            this.search(query);
        });
    }

    handleSearch(search) {
        this.setState({
            query: search,
        }, () => {
            this.props.history.push(`/search/${this.state.query}`);
        });
    }

    search(query) {
        fetch(`https://development.metamesh.io/api/v1/guest/post?search=${query}`, {
            mode: 'cors',
            method: 'GET',   
        })
        .then(results => {
            return results.json();
        }).then(res => {
            console.log(res);
            this.setState({
                posts: res.posts,
                navbar: <Nav handleSearch={(search) => this.handleSearch(search)}/>,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    card(cardName) {
        fetch(`https://development.metamesh.io/api/v1/guest/post?search=${cardName}`, {
            mode: 'cors',
            method: 'GET',   
        })
        .then(results => {
            return results.json();
        }).then(res => {
            console.log(res);
            this.setState({
                cardName: res.posts[0].name,
                cardNumber: res.posts[0].cardNumber,
                rarity: res.posts[0].rarity,
                image: res.posts[0].image,
                avgPrice: res.posts[0].avgPrice,
                lowPrice: res.posts[0].lowPrice,
                highPrice: res.posts[0].highPrice,
                dayChange: res.posts[0].dayChange,

               
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {

        let percentColor;
        if (this.state.dayChange > 0) {
            percentColor = 'green';
        } else {
            percentColor = 'red';
        }

        return(
            <div className='col-xs-12 main'>
                {this.state.navbar}
                <div className='col-xs-12 product-card'>
                    <Link to={this.state.viewLink}>
                        <img src={`https://development.metamesh.io/${this.state.image}`} style={{width: '100%'}}/>
                    </Link>
                </div>
                <div className='col-xs-12 product-card'>
                    <div className='col-xs-6'>  
                        <h4 className='col-xs-12' style={{color: percentColor}}>${(this.state.avgPrice).toFixed(2)}</h4>
                        <div className='col-xs-12'>Average Sold Price</div>
                        <h4 className='col-xs-12 Stat'>{this.state.rarity}</h4>
                        <div className='col-xs-12'>Card Rarity</div>
                        <h4 className='col-xs-12 Stat'>{this.state.cardNumber}</h4>
                        <div className='col-xs-12' style={{marginBottom: 10}}>Card ID</div>
                    </div>
                    <div className='col-xs-6'>
                        <h4 className='col-xs-12'>${this.state.highPrice}</h4>
                        <div className='col-xs-12'>Listed High Price</div>
                        <h4 className='col-xs-12 Stat'>${this.state.lowPrice}</h4>
                        <div className='col-xs-12'>Listed Low Price</div>
                        <h4 className='col-xs-12 Stat ' style={{color: percentColor}} >{this.state.dayChange}%</h4>
                        <div className='col-xs-12'>Daily Price Change</div>
                    </div>
                </div>
                <div className='col-xs-1'></div>
            </div>
        );
    }
}
export default ProductView;