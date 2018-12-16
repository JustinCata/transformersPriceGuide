import React, { Component } from 'react';
import Landing from './Landing';
import Card from './Card';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Rising: [],
            Falling: [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit() {
        this.setState({
            query: document.getElementById('search').value,
        }, () => {
            this.props.history.push(`/search/${this.state.query}`);
        });
    }

    render(){
        const risingCards = this.state.Rising.map(card => (
            <Card 
                key={card._id}
                image={card.image}
                avgPrice={card.avgPrice}
                dayChange={card.dayChange}
            />
        ));
        const fallingCards = this.state.Falling.map(card => (
            <Card 
                key={card._id}
                image={card.image}
                avgPrice={card.avgPrice}
                dayChange={card.dayChange}
            />
        ));
        return (
            <div className='Home'>
                <Landing />
                <div className='col-md-6'>
                    {risingCards}
                </div>
                <div className='col-md-6'>
                    {fallingCards}
                </div>
            </div>
        );
    }
}

export default Home;