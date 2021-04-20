// import logo from './logo.svg';
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ProtectRoute from './components/common/protectRoute';
import Customers from './components/customers';
import Movies from './components/movies'
import MovieForm from './components/movieForm'
import NotFound from './components/notFound';
import Rentals from './components/rentals';
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


class App extends Component {
  state = {};

  componentDidMount() {
    // try {
    //   const jwt = localStorage.getItem('token');
    //   const user = jwtDecode(jwt);
    //   this.setState({ user })
    // } catch (error) {

    // }
    const user = auth.getCurrentUser()
    this.setState({ user })

  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={ user } />
        <main className='container'>
          <Switch>
            <Route path='/login' component={LoginForm}></Route>
            <Route path='/logout' component={Logout}></Route>
            {/* <Route path="/movies/:id" render={props => {
              if (!user) return <Redirect to='/login' />;
              return <MovieForm {...props} />
            }}></Route> */}
            <ProtectRoute path='/movies/:id' component={ MovieForm } />
            <Route path="/movies" render={props => <Movies {...props} user={ user } />}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path='/registerLogin' component={RegisterForm}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from='/' exact to='/movies'></Redirect>
            <Redirect to='/not-found'></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    )
  }

  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <p>
  //       Edit <code>src/App.js</code> and save to reload.
  //     </p>
  //     <a
  //       className="App-link"
  //       href="https://reactjs.org"
  //       target="_blank"
  //       rel="noopener noreferrer"
  //     >
  //       Learn React
  //     </a>
  //   </header>
  // </div>
}

export default App;
