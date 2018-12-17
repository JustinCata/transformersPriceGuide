import React, { Component } from 'react';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {query: ''};

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        this.setState({
            query: document.getElementById('search').value,
        }, () => {
            this.props.handleSubmit(this.state.query);
        });
    }

    render(){
        return (
            <div className='Landing'>
                <div className="col-sm-12">
                    {/*Logo will go here*/}
                    <p>Transformers TCG Prices</p>
                </div>                
                <div className='col-sm-12 Search'>
                    <form action="#" onSubmit={this.onSubmit} className="form-inline">
                        <input id="search" className="form-control" type="search" placeholder="Enter Card Name or Card ID" style={{ fontFamily:"Arial, FontAwesome"}} aria-label="Search" />
                        <input type="submit" value="Find Card" />
                    </form>
                </div>      
            </div>
        );
    }
}

export default Nav;