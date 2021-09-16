import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
    };
    this.getFavs = this.getFavs.bind(this);
  }

  componentDidMount() {
    this.getFavs();
  }

  getFavs() {
    getFavoriteSongs().then((favorites) => this.setState({ favorites }));
  }

  render() {
    const { favorites } = this.state;
    if (favorites.length === 0) {
      return (
        <div data-testid="page-favorites" className="container py-4">
          <h1 className="h4 ms-3">Nenhuma musica favorita</h1>
        </div>
      );
    }
    return (
      <div data-testid="page-favorites" className="container py-4">
        <h1 className="h4 ms-3">
          { `${favorites.length} ${favorites.length === 1 ? 'musica favorita'
            : 'musicas favoritas'}` }
        </h1>
        {favorites.map((favorite) => (
          <MusicCard
            key={ favorite.trackId }
            music={ favorite }
            onChange={ this.getFavs }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
