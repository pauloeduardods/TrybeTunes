import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../css/MusicCard.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favorites: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.getFavs = this.getFavs.bind(this);
    this.favCheckbox = this.favCheckbox.bind(this);
  }

  componentDidMount() {
    this.getFavs();
  }

  handleChange({ target }) {
    const { music, onChange } = this.props;
    this.setState({
      loading: true,
    });
    if (target.checked) {
      addSong(music).then(() => {
        this.setState({ loading: false });
      });
    } else {
      removeSong(music).then(() => {
        this.setState({ loading: false });
      });
    }
    this.getFavs();
    onChange();
  }

  getFavs() {
    getFavoriteSongs().then((songs) => {
      this.setState({ favorites: songs });
    });
  }

  favCheckbox(trackId, favorites) {
    const checked = favorites.some((song) => song.trackId === trackId);
    return (
      <label htmlFor={ trackId }>
        <span className="no-display">Favorita</span>
        <i className={ `${checked ? 'fas text-danger' : 'far'} fa-heart` } />
        <input
          id={ trackId }
          type="checkbox"
          name="favorite"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ this.handleChange }
          checked={ checked }
          className="d-none"
        />
      </label>
    );
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;
    const { loading, favorites } = this.state;
    return (
      <section className="row ms-2 my-2 border rounded align-items-center cardColor ps-4">
        <span className="col-5 h6 m-0 p-0">{ trackName }</span>
        <audio
          className="col-5 p-0"
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <div className="col-2 text-center p-0">
          {loading ? <Loading />
            : this.favCheckbox(trackId, favorites)}
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
};

MusicCard.defaultProps = {
  onChange: () => {},
};

export default MusicCard;
