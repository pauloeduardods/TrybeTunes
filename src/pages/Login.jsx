import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
      submitDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    const MIN_LENGTH = 3;
    this.setState({ [name]: value });
    if (value.length >= MIN_LENGTH) {
      this.setState(() => ({ submitDisable: false }));
    } else {
      this.setState({ submitDisable: true });
    }
  }

  onClick(event) {
    const { history } = this.props;
    const { name } = this.state;
    event.preventDefault();
    this.setState({ loading: true });
    createUser({ name }).then((result) => {
      history.push('/search');
    }).catch(() => false);
  }

  loginForm() {
    const { submitDisable } = this.state;
    return (
      <form className="row justify-content-md-center m-4">
        <div className="col-xs-12 col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nome</span>
            <input
              type="text"
              name="name"
              onChange={ this.handleChange }
              placeholder="Nome de usuario"
              data-testid="login-name-input"
              className="col-8 ps-3"
            />
            <input
              type="submit"
              value="Entrar"
              data-testid="login-submit-button"
              onClick={ this.onClick }
              disabled={ submitDisable }
              className="form-control btn btn-primary"
            />
          </div>
        </div>
      </form>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-login" className="container py-4">
        {loading ? <Loading /> : this.loginForm()}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
