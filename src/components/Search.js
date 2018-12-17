import React, { Component } from 'react';
import { matchPath } from 'react-router';
import Nav from './Nav'
import Product from './Product'


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            posts: [],
        };
    
    }

    componentDidMount() {
        const query = this.props.match.params.query;
        this.setState({
            query: query,
        }, ()=>{
            this.search(query);
        });
    }

    handleSubmit() {
        this.setState({
            query: document.getElementById('search').value,
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
                <Nav onSubmit={(search) => this.handleSubmit(search)} />
                <h3><i className="fa fa-search" aria-hidden="true"></i> Search results for: <strong>{this.state.query}</strong></h3>
                    {searchResults}
            </div>
        );
    }
}

export default Search