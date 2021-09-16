import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searched: '',
      disabled: true,
      loading: false,
      albums: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.searchForm = this.searchForm.bind(this);
  }

  handleChange({ target: { value, name } }) {
    const MIN_LENGTH = 2;
    this.setState({ [name]: value });
    if (value.length >= MIN_LENGTH) {
      this.setState({ disabled: false });
    }
  }

  onClick(event) {
    event.preventDefault();
    const { search } = this.state;
    this.setState({ search: '', searched: search, loading: true });
    searchAlbumsAPI(search).then((albums) => {
      this.setState({ loading: false, albums });
    });
  }

  searchForm() {
    const { disabled, search } = this.state;
    return (
      <form className="input-group mb-3">
        <input
          type="text"
          name="search"
          placeholder="Nome do Artista"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
          value={ search }
          className="ps-2 col-lg-9 col-xs-8 form-control"
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ disabled }
          onClick={ this.onClick }
          className="col-lg-3 col-xs-4 btn btn-outline-primary"
        >
          Pesquisar
          <i className=" ms-2 fas fa-search" />
        </button>
      </form>
    );
  }

  displayAlbums(albums) {
    const { searched } = this.state;
    return (
      <div className="row">
        <h1 className="text-center">
          {albums.length > 0 ? `Resultado de álbuns de: ${searched}`
            : 'Nenhum álbum foi encontrado' }
        </h1>
        {albums.map((album) => <AlbumCard key={ album } album={ album } />)}
      </div>
    );
  }

  render() {
    const { loading, albums } = this.state;
    return (
      <div data-testid="page-search" className="container py-4">
        {loading ? <Loading /> : this.searchForm() }
        <hr />
        <div>
          {albums ? this.displayAlbums(albums) : null}
        </div>
      </div>
    );
  }
}

export default Search;
