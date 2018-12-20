import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Nav from './Nav';
import logo from './assets/color_logo.png';
import Card from './Card';
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rising: [],
            Falling: [],
            query: '',
        };

        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.getCards();
    }
    getCards() {
        fetch('https://development.metamesh.io/api/v1/guest/rising/', {
            mode: 'cors',
            method: 'GET',
        })
        .then(result => {
            return result.json();
        })
        .then(res => {
            // get top 5
            const rising = res.posts.splice(0, 5);
            // flip the script
            const inverseRise = res.posts.reverse();
            // get bottom 5
            const falling = inverseRise.splice(0, 5);
            this.setState({
                Rising: rising,
                Falling: falling,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
    handleSearch(search) {
        this.setState({
            query: search,
        }, () => {
            this.props.history.push(`/search/${this.state.query}`);
        });
    }

    render(){
        const risingCards = this.state.Rising.map(card => (
            <Card 
                key={card._id}
                cardName={card.name}
                image={card.image}
                avgPrice={card.avgPrice}
                dayChange={card.dayChange}
            />
        ));
        const fallingCards = this.state.Falling.map(card => (
            <Card 
                key={card._id}
                cardName={card.name}
                image={card.image}
                avgPrice={card.avgPrice}
                dayChange={card.dayChange}
            />
        ));
        return (
            <div className='Home'>
                <Helmet>
                    <title>Transformers TCG Prices</title>
                    <meta name="description" content="Transformers TCG Prices. Checkout the top 5 winning and losing cards of the day." />
                    <meta property="og:title" content="Transformers TCG Prices" />
                    <meta property="og:description" content="Transformers TCG Prices. Checkout the top 5 winning and losing cards of the day." />
                </Helmet>
                <Nav handleSearch={(search) => this.handleSearch(search)} />
                <div className='col-xs-12 col-md-6 col-sm-6 title'>
                    <h2 id="risingTitle">Rising Cards</h2>
                    {risingCards}
                </div>
                <div className='col-xs-12 col-md-6 col-sm-6 title'>
                    <h2 id="fallingTitle">Losing Cards</h2>
                    {fallingCards}
                </div>
                <div style={{ backgroundColor: 'white', textAlign: 'center', paddingBottom: '20px' }} className="col-xs-12">
                    <p>These prices are calculated according to eBay sales and listings</p>
                    <p>Made by:</p>
                    <a href="https://metamesh.io"><img style={{ width: '300px' }} src={logo} /></a>

                </div>
            </div>
        );
    }
}

export default Home;