import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './components/home.jsx';
import Creator from './components/creator.jsx';

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
  /* {
	"username": "tdillard123",
	"password": "T3st!234"
} */
  componentDidMount() {
    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        'username': "tdillard123",
        'password': "T3st!234",
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
      .then(async res => {
        const user = await res.json();
        await this.setState({ user });
      })
  }
  render() {
    const { creator } = this.state.user;
    return (
      <Fragment>
        <Navigation isCreator={ creator }/>
        <Route exact path={'/'} component={Home} />
        <Route path={'/creator'} component={Creator} />
      </Fragment>
    );
  }
}

export default App;
