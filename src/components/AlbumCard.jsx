import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/AlbumCard.css';

class AlbumCard extends React.Component {
  render() {
    const { album: {
      collectionId,
      artworkUrl100,
      collectionName,
      artistName,
    } } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <Link
          to={ `/TrybeTunes/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="card mb-4 border-shadow text-decoration-none text-black link"
        >
          <img src={ artworkUrl100 } alt={ collectionName } className="imgcard rounded" />
          <div className="album-info p-2">
            <h1 className="h4">{collectionName}</h1>
            <h2 className="h5">{artistName}</h2>
          </div>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.objectOf(PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  })).isRequired,
};

export default AlbumCard;
