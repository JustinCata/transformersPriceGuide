import React, { Component } from 'react';
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
                <div className="col-sm-12 nav">
                    {/*Logo will go here*/}
                    <img src= {logo} alt= "Logo"/>
                    <div className='col-sm-12 Search'>
                    <form action="#" onSubmit={this.onSubmit} className="form-inline">
                        <input id="search" className="form-control" type="search" placeholder="Enter Card Name or Card ID" style={{ fontFamily:"Arial, FontAwesome"}} aria-label="Search" />
                        <input type="submit" value="Find Card" />
                    </form>
                </div>      
                </div>                
                
            </div>
        );
    }
}

export default Nav;