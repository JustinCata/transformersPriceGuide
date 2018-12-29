import React, { Component } from 'react';
import Helmet from 'react-helmet';
import mixpanel from 'mixpanel-browser';

import Nav from './Nav';
import logo from './assets/color_logo.png';
import Card from './Card';
import './Home.css'
mixpanel.init('c5bad8f59c99ba6b634f4b3d25c032c4');
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rising: [],
            Falling: [],
            card1: [],
            card2: [],
            showMarket: 'none',
            showCards: 'block',
            buttonMessage: 'Show Top',
            query: '',
        };
        this.handleMarketShow = this.handleMarketShow.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        mixpanel.track('Home Page')
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
            const cards = res.posts;
            console.log('cards', cards);
            const cardCol = res.posts;
            const card1 = cardCol.splice(0, Math.floor(cardCol.length/2));
            const card2 = cardCol;
            const rising = card1.slice(0, 10);
            // flip the script
            const inverseRise = cards.reverse();
            console.log('inverse', inverseRise);
            // get bottom 5
            const falling = inverseRise.slice(0, 10);
            this.setState({
                Rising: rising,
                Falling: falling,
                card1: card1,
                card2: card2,
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
    handleMarketShow() {
        if (this.state.showMarket === 'none' && this.state.showCards === 'block') {
            
            this.setState({ 
                showMarket: 'block',
                showCards: 'none',
            }, () => {
                if (this.state.showMarket === 'block') {
                    this.setState({ buttonMessage: 'Show All' });
                }
                if (this.state.showCards === 'block') {
                    this.setState({ buttonMessage: 'Show Top' });
                }
            });
        } 
        if (this.state.showMarket === 'block' && this.state.showCards === 'none') {
            this.setState({ 
                showMarket: 'none',
                showCards: 'block',
            }, () => {
                if (this.state.showMarket === 'block') {
                    this.setState({ buttonMessage: 'Show All' });
                }
                if (this.state.showCards === 'block') {
                    this.setState({ buttonMessage: 'Show Top' });
                }
            });
        }
    }
    

    render(){
        const card1 = this.state.card1.map(card => (
            <Card 
                key={card._id}
                cardName={card.name}
                image={card.image}
                avgPrice={card.avgPrice}
                dayChange={card.dayChange}
            />
        ));
        const card2 = this.state.card2.map(card => (
            <Card 
                key={card._id}
                cardName={card.name}
                image={card.image}
                avgPrice={card.avgPrice}
                dayChange={card.dayChange}
            />
        ));
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
                {/* <div className="col-xs-12 showCards">
                    <a onClick={this.handleMarketShow} className="btn showMarket">{this.state.buttonMessage}</a>
                </div> */}
                <div id="allCards" style={{display: this.state.showCards}}>
                    <div className='col-xs-12 col-md-6 col-sm-6 title'>
                        {card1}
                    </div>
                    <div className='col-xs-12 col-md-6 col-sm-6 title'>
                        {card2}
                    </div>
                </div>
                {/* <div id="risingFalling" style={{display: this.state.showMarket}}>
                    <div className='col-xs-12 col-md-6 col-sm-6 title'>
                        <h2 id="risingTitle">Rising Cards</h2>
                        {risingCards}
                    </div>
                    <div className='col-xs-12 col-md-6 col-sm-6 title'>
                        <h2 id="fallingTitle">Losing Cards</h2>
                        {fallingCards}
                    </div>
                </div> */}
                
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