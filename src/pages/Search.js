import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    buttonDisabled: true,
    loading: true,
    searchText: '',
    albumsArray: [],
    newState: '',
  };

  async componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  buttonSubmit = async () => {
    this.setState({
      loading: true,
    });
    const { searchText } = this.state;
    const albuns = await searchAlbumsAPI(searchText);
    this.setState({
      albumsArray: albuns,
      searchText: '',
      newState: searchText,
      loading: false,
    });
  };

  buttonEnable = () => {
    const { searchText } = this.state;
    const minValue = 2;
    if (searchText.length >= minValue) {
      this.setState({ buttonDisabled: false });
    }
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchText: value,
    }, () => this.buttonEnable());
  };

  render() {
    const { buttonDisabled, loading, searchText, albumsArray, newState } = this.state;
    const nullArray = albumsArray.length === 0;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchText"
              value={ searchText }
              onChange={ this.onInputChange }
            />
            <button
              data-testid="search-artist-button"
              type="submit"
              disabled={ buttonDisabled }
              onClick={ this.buttonSubmit }
            >
              Pesquisar
            </button>
          </form>
        )}

        <p>{`Resultado de álbuns de: ${newState}`}</p>
        { nullArray ? <p>Nenhum álbum foi encontrado</p> : (
          albumsArray.map((album) => (
            <div key={ album.collectionId }>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                <p>{ album.artistID }</p>
                <p>{ album.collectionID }</p>
                <p>{ album.collectionName }</p>
                <p>{ album.collectionPrice }</p>
                <p>{ album.artworkUrl100 }</p>
                <p>{ album.relaseDate }</p>
              </Link>
            </div>
          )))}
      </div>
    );
  }
}

export default Search;
