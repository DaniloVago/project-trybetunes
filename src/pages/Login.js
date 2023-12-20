import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    loginName: '',
    buttonDisabled: true,
    userLogin: false,
    loading: false,
  };

  buttonEnable = ({ target }) => {
    const minValue = 3;
    if (target.value.length >= minValue) {
      this.setState({ buttonDisabled: false });
    }
    this.setState({ loginName: target.value });
  };

  buttonSubmit = () => {
    this.setState({ loading: true }, async () => {
      const { loginName } = this.state;
      await createUser({ name: loginName });
      this.setState({
        loading: false,
        userLogin: true,
      });
    });
  };

  render() {
    const { loginName, buttonDisabled, userLogin, loading } = this.state;

    if (userLogin) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form>
            <p>Login</p>
            <label htmlFor="nameLogin">
              Nome:
              <input
                data-testid="login-name-input"
                type="text"
                name="nameLogin"
                value={ loginName }
                onChange={ this.buttonEnable }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ buttonDisabled }
              onClick={ this.buttonSubmit }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
