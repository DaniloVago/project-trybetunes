import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    userName: '',
    loading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    const { name } = user;
    this.setState({
      userName: name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;

    return (
      <>
        <header data-testid="header-component" />
        { loading ? <Loading /> : (
          <div data-testid="header-user-name">
            { userName }
          </div>
        )}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </>
    );
  }
}

export default Header;
