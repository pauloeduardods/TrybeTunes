import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/Profile.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {},
      disabled: true,
    };
    this.getUserInfo = this.getUserInfo.bind(this);
    this.editForm = this.editForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.updateButtonDisable = this.updateButtonDisable.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  handleChange({ target: { name, value } }) {
    const { user } = this.state;
    user[name] = value;
    this.updateButtonDisable();
  }

  onClick(event) {
    const { user } = this.state;
    const { history } = this.props;
    event.preventDefault();
    this.setState({ loading: true });
    updateUser(user).then(() => {
      this.setState({ loading: false });
      history.push('/profile');
    });
  }

  getUserInfo() {
    this.setState({ loading: true });
    getUser().then((user) => {
      this.setState({ loading: false, user });
      this.updateButtonDisable();
    });
  }

  updateButtonDisable() {
    const { user } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const emailResult = !emailRegex.test(user.email);
    const requiredAllResult = Object.values(user).some((value) => value === '');
    if (requiredAllResult || emailResult) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

  editForm() {
    const { user: { name, email, description, image }, disabled } = this.state;
    const buttonClass = `btn ${disabled ? 'btn-secondary' : 'btn-primary'}`;
    return (
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text form-span" id="input-1">Nome</span>
          <input
            type="text"
            className="form-control"
            aria-describedby="input-1"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="edit-input-name"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text form-span" id="input-1">Email</span>
          <input
            type="text"
            className="form-control"
            aria-describedby="input-1"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="edit-input-email"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text form-span" id="input-1">Descrição</span>
          <input
            type="text"
            className="form-control"
            aria-describedby="input-1"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="edit-input-description"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text form-span" id="input-1">Foto</span>
          <input
            type="text"
            className="form-control"
            aria-describedby="input-1"
            name="image"
            value={ image }
            onChange={ this.handleChange }
            data-testid="edit-input-image"
          />
        </div>
        <div className="d-grid">
          <input
            type="submit"
            value="Salvar"
            disabled={ disabled }
            onClick={ this.onClick }
            data-testid="edit-button-save"
            className={ buttonClass }
          />
        </div>
      </form>
    );
  }

  render() {
    const { user: { name, image } } = this.state;
    const url = 'https://diaxcapital.com.br/wp-content/uploads/2021/08/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png';
    const imageUrl = image === '' ? url : image;
    const { loading } = this.state;
    const profileImage = (
      <img
        src={ imageUrl }
        alt={ name }
        data-testid="profile-image"
        className="profile-image rounded-circle"
      />
    );
    return (
      <section className="row justify-content-md-center m-4">
        <div className="col-xs-12 col-md-6 border rounded border-dark">
          <div className="row py-3">
            <div className="col-md-4 offset-md-4 row">
              <div className="image-container">
                {profileImage}
              </div>
            </div>
          </div>
          <hr />
          <div data-testid="page-profile-edit" className="container py-4">
            {loading ? <Loading /> : this.editForm()}
          </div>
        </div>
      </section>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
