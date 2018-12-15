import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Landing from './components/Landing';
import Search from './components/Search';
import ProductView from './components/ProductView';

ReactDOM.render(
<Router>
    <div>
      <Route exact path='/'component={Landing}/> 
      <Route path='/search/:query' render={props => <Search {...props} />} />
      <Route path='/product/:product_id' render={props => <ProductView {...props} />} />
    </div>
</Router>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
