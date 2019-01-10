import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router';
import mixpanel from 'mixpanel-browser';
import Nav from './Nav';
import './ProductView.css';
import './Card.css';

mixpanel.init('c5bad8f59c99ba6b634f4b3d25c032c4');
class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            avgPrice: 0.00,
            highPrice: 0,
            lowPrice: 0,
            dayChange: 0,
            viewLink: `/card/${String(props.cardName)}`,
            image:'',
        };

    this.handleSearch = this.handleSearch.bind(this);

    }

    componentDidMount() {
        mixpanel.track('Checked Card')
        const match = matchPath(this.props.history.location.pathname, {
            path: '/card/:cardName',
            exact: false,
            strict: false,
          });
          const cardName = match.params.cardName;
          this.card(cardName);

        // const query = this.props.match.params.query;
        // this.setState({
        //     query: query,
        // }, ()=>{
        //     this.search(query);
        // });
    }

    handleSearch(search) {
        this.setState({
            query: search,
        }, () => {
            this.props.history.push(`/search/${this.state.query}`);
        });
    }

    // search(query) {
    //     fetch(`https://development.metamesh.io/api/v1/guest/post?search=${query}`, {
    //         mode: 'cors',
    //         method: 'GET',   
    //     })
    //     .then(results => {
    //         return results.json();
    //     }).then(res => {
    //         console.log(res);
    //         this.setState({
    //             posts: res.posts,
    //             navbar: <Nav handleSearch={(search) => this.handleSearch(search)}/>,
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }

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
                navbar: <Nav handleSearch={(search) => this.handleSearch(search)}/>,
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
        let avgSold;
        if (this.state.dayChange > 0) {
            percentColor = 'green';
        } else {
            percentColor = 'red';
        }
        if (this.state.avgPrice.toFixed(2)== 0.00) {
            avgSold = 'No Sales';
            this.state.dayChange = 0.00
        } else {
            avgSold = `$${this.state.avgPrice.toFixed(2)}`;
        }
        return(
            <div className='col-xs-12 main'>
                {this.state.navbar}
                <div className='col-xs-12 product-card productview-card'>
                    <Link to={this.state.viewLink}>
                        <img src={`https://development.metamesh.io/${this.state.image}`} />
                    </Link>
                </div>
                <div className='col-xs-12 product-card'>
                    <div className='col-xs-6'>  
                        <h4 className='col-xs-12' style={{color: percentColor}}>{avgSold}</h4>
                        <div className='col-xs-12'>Average Sold Price</div>
                        <h4 className='col-xs-12 Stat'>{this.state.rarity}</h4>
                        <div className='col-xs-12'>Card Rarity</div>
                        <h4 className='col-xs-12 Stat'>{this.state.cardNumber}</h4>
                        <div className='col-xs-12' style={{marginBottom: 10}}>Card ID</div>
                    </div>
                    <div className='col-xs-6'>
                        <h4 className='col-xs-12'>${this.state.highPrice.toFixed(2)}</h4>
                        <div className='col-xs-12'>Listed High Price</div>
                        <h4 className='col-xs-12 Stat'>${this.state.lowPrice.toFixed(2)}</h4>
                        <div className='col-xs-12'>Listed Low Price</div>
                        <h4 className='col-xs-12 Stat ' style={{color: percentColor}} >{this.state.dayChange.toFixed(2)}%</h4>
                        <div className='col-xs-12'>Daily Price Change</div>
                    </div>
                </div>
                <div className='col-xs-1'></div>
            </div>
        );
    }
}
export default ProductView;