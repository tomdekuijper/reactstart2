'use strict';

import React from 'react';
import {Input, Button, Alert} from 'react-bootstrap';
import {changeHandler} from 'utils/component-utils';

import connectToStores from 'alt/utils/connectToStores';

import LoginStore from 'stores/login-store';
import LoginActions from 'actions/login-actions';

@connectToStores
@changeHandler
export default class FilmProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {}
    };
  }
  static contextTypes = {
    router: React.PropTypes.func
  }
  static propTypes = {
    error: React.PropTypes.string
  }
  static getStores() {
    return [LoginStore];
  }
  static getPropsFromStores() {
    return LoginStore.getState();
  }
  componentWillMount() {
    this.state = {
      login: {}
    };
  }
  register() {
    LoginActions.register(this.state.login);
  }
  login() {
    LoginActions.login(this.state.login);
  }
  render() {
    var error;
    if (this.props.error) {
      error = <Alert bsStyle="danger">{this.props.error}</Alert>;
    }
    return (
    <div className="container">
      <div className="jumbotron col-centered col-xs-10 col-sm-8 col-md-7 ">
        <h1>Starterpack</h1>
        <p className="lead">React Starter Template</p>
        <h2>Login or create account</h2>
        <br/>
        {error}
        <Input
          label='Username'
          type='text'
          value={this.state.login.username}
          onChange={this.changeHandler.bind(this, 'login', 'username')} />
        <Input
          label='Password'
          type='password'
          value={this.state.login.password}
          onChange={this.changeHandler.bind(this, 'login', 'password')} />
        <Button bsStyle="danger" onClick={this.register.bind(this)}>Create account</Button>
        <Button bsStyle="success" className="pull-right" onClick={this.login.bind(this)}>Sign in</Button>
      </div>
    </div>
    );
  }
}
