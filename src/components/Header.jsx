import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import '../css/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
    };
    this.displayUserName = this.displayUserName.bind(this);
    this.linkList = this.linkList.bind(this);
  }

  componentDidMount() {
    getUser().then((user) => this.setState({ user, loading: false }));
  }

  displayUserName() {
    const { user: { name } } = this.state;
    if (!name) return (<span />);
    return (
      <span>
        <span>Ola </span>
        <span data-testid="header-user-name">{name}</span>
      </span>
    );
  }

  linkList() {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/TrybeTunes/search"
            data-testid="link-to-search"
          >
            Search
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/TrybeTunes/favorites"
            data-testid="link-to-favorites"
          >
            Favorites
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link active"
            aria-current="page"
            to="/TrybeTunes/profile"
            data-testid="link-to-profile"
          >
            Profile
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <header
        data-testid="header-component"
        className="bg-dark"
      >
        <nav className="container navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <h1 className="text-white navbar-brand h1-margin">TrybeTunes</h1>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              {this.linkList()}
              <span className="navbar-text">
                {loading ? <Loading /> : this.displayUserName()}
              </span>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
