import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import '../css/Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id).then((musics) => this.setState({ musics, loading: false }));
  }

  render() {
    const { loading, musics } = this.state;
    let cardClass = 'col-xs-12 col-sm-4 d-flex ';
    cardClass += 'flex-column justify-content-center align-items-center border-cards';
    if (musics.length > 0) {
      const {
        artworkUrl100,
        collectionName,
        artistName } = musics[0];
      return (
        <div data-testid="page-album" className="container py-4">
          <div className="row justify-content-between">
            <section className={ cardClass }>
              <div className="album-fixed">
                <img src={ artworkUrl100 } alt={ collectionName } className="album-img" />
                <h2 className="text-center" data-testid="artist-name">{artistName}</h2>
                <h3 className="text-center" data-testid="album-name">{collectionName}</h3>
              </div>
            </section>
            <section className="col-xs-12 col-sm-8">
              {loading ? <Loading />
                : musics.slice(1).map((music, index) => (
                  <MusicCard
                    key={ `${music.trackId}-${index}` }
                    music={ music }
                  />))}
            </section>
          </div>
        </div>
      );
    }
    return (
      <div data-testid="page-album" />
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
