import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import Search from './components/Search';
import ProductView from './components/ProductView';

ReactDOM.render(
<Router>
    <div>
      <Route exact path='/'component={Home}/> 
      <Route path='/search/:query' render={props => <Search {...props} />} />
      <Route path='/card/:cardName' render={props => <ProductView {...props} />} />
    </div>
</Router>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
