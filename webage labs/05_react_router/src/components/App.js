import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Home } from './Home'
import { About } from './About';
import { SendMail } from './SendMail'
import { Products } from './Products';
import * as products from './react-router-products.json';
import { Details } from './Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h3>React Router App</h3>
        <nav>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/sendmail">Send mail</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/details/1">Details</NavLink>
        </nav>
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/sendmail">
            <SendMail />
          </Route>
          <Route path="/products">
            <Products products={products.products} />
          </Route>
          <Route path="/details/:id">
            <Details products={products.products} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
