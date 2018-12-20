import React, { Component } from 'react';
import { matchPath } from 'react-router';
import Helmet from 'react-helmet';
import Nav from './Nav'
import Product from './Product'
import './Search.css'
import './ProductView.css'


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            posts: [],
        };

    this.handleSearch = this.handleSearch.bind(this);

}

    componentDidMount() {
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
                posts: res.posts
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        const searchResults = this.state.posts.map(post =>
            (<Product
            key={post._id}
            cardID = {post.cardNumber}
            cardName = {post.name}
            rarity = {post.rarity}
            image = {post.image}
            />));
        return (
            <div>
                <Helmet>
                    <title>Transformers TCG Prices</title>
                    <meta name="description" content="Transformers TCG Prices. Checkout the top 5 winning and losing cards of the day." />
                    <meta property="og:title" content="Transformers TCG Prices" />
                    <meta property="og:description" content="Transformers TCG Prices. Checkout the top 5 winning and losing cards of the day." />
                </Helmet>
                <Nav handleSearch={(search) => this.handleSearch(search)}/>
                <div className="search-bar">
                <div id="searchRes" className="col-xs-12">
                <h3><i className="fa fa-search" aria-hidden="true"></i> Search results for: <strong>{this.state.query}</strong></h3>
                </div>
                    {searchResults}
                </div>
               
            </div>
        );
    }
}

export default Search;