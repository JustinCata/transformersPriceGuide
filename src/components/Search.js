import React, { Component } from 'react';
import { matchPath } from 'react-router';
import Landing from './Landing'
import Product from './Product'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            posts: [],
        };
    
    }

    render() {
        const searchResults = this.state.posts.map(post =>
            (<Product
            key={post.id}
            CardID = {post.id}
            cardName = {post.cardName}
            rarity = {post.Rarity}
            />));
        return (
            <div>
                <Landing/>
                <h3><i class="fa fa-search" aria-hidden="true"></i> Search results for: <strong>{this.state.query}</strong></h3>
                <div className='col-sm-12'>

                </div>
            </div>
        );
    }
}

export default Search