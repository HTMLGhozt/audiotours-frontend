import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './components/home.jsx';
import Creator from './components/creator.jsx';
import './loginForm.css';

const Navigation = props => (
  <nav>
    <Link to='/'>Home</Link>
    {/* {props.creator ? <Link to='/creator'>Creator</Link>: ''} */}
    <Link to='/creator'>Creator</Link>
  </nav>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  /* 
        'username': "tdillard123",
        'password': "T3st!234",
  */

  login(username, password) {
    // console.log(JSON.stringify({ username, password }));
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
      .then(async res => {
        console.log(res);
        if (res.status === 200) {
          const user = await res.json();
          await this.setState({ user });
        }
      });
  }
  render() {
    const { creator } = this.state.user;
    let username, password;
    if (Object.keys(this.state.user).length) {
      return (
        <Fragment>
          <Navigation isCreator={creator} />
          <Route exact path='/' render={() => <Home user={this.state.user} />} />
          <Route path='/creator' render={() => <Creator user={this.state.user} />} />
        </Fragment>
      );
    } else {
      return (
        <div className="module_background">
          <form onSubmit={(e) => {
            e.preventDefault();
            this.login(username.value, password.value);
            username.value = password.value = '';
          }}>
            <input type="text" ref={node => username = node} placeholder="username" />
            <input type="text" ref={node => password = node} placeholder="password" />
            <input type="submit" />
          </form>
        </div>
      );
    }
  }
}

export default App;
