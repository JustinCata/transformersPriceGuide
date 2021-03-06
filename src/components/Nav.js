import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "./assets/transformers-logo.png"
import "./Nav.css"

class Nav extends Component {
    constructor() {
        super();
        this.state = {query: ''};

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        this.setState({
            query: document.getElementById('search').value,
        }, () => {
            this.props.handleSearch(this.state.query);
        });
    }

    render(){
        return (
            <div className='Landing'>
                <div className="col-xs-12 nav">
                    {/*Logo will go here*/}
                    <Link to='/'>
                        <img src= {logo} alt= "Logo"/>
                    </Link>
                    <div className='col-xs-12 Search'>
                    <form action="#" onSubmit={this.onSubmit} className="form-inline">
                        <span id="searchField">
                            <input id="search" className="form-control" type="search" placeholder="Enter Card Name" style={{ fontFamily:"Arial, FontAwesome"}} aria-label="Search" />
                            <input className="submitSearch" type="submit" value="Find Card" />
                        </span>
                    </form>
                </div>      
                </div>                
                
            </div>
        );
    }
}

export default Nav;