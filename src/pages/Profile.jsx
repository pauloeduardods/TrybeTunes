import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      user: {},
    };
    this.displayProfile = this.displayProfile.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    this.setState({ loading: true });
    getUser().then((user) => this.setState({ loading: false, user }));
  }

  displayProfile() {
    const { user: { name, email, description, image } } = this.state;
    const url = 'https://diaxcapital.com.br/wp-content/uploads/2021/08/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png';
    const imageUrl = image === '' ? url : image;
    const editProfile = (<span className="no-display">Editar perfil</span>);
    const gear = (<i className="fas fa-cog" />);
    return (
      <section className="row justify-content-md-center">
        <div className="col-xs-12 col-sm-8 col-md-6 border rounded border-dark">
          <div className="row py-3">
            <div className="col-md-4 offset-md-4">
              <img
                src={ imageUrl }
                alt={ name }
                data-testid="profile-image"
                className="profile-image rounded-circle"
              />
            </div>
            <div className="col-md-2 offset-md-2">
              <Link
                to="/profile/edit"
                className="edit-profile btn btn-primary fs-6"
              >
                {gear}
                {editProfile}
              </Link>
            </div>
          </div>
          <hr />
          <div className="container">
            <p>
              <span className="h6">Nome: </span>
              <span>{name}</span>
            </p>
            <p>
              <span className="h6">Email: </span>
              <span>{email}</span>
            </p>
            <p>
              <span className="h6">Descrição: </span>
              <span>{description}</span>
            </p>
          </div>
        </div>
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile" className="container py-4">
        { loading ? <Loading /> : this.displayProfile() }
      </div>
    );
  }
}

export default Profile;
