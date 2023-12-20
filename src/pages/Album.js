import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    albumName: '',
    artistName: '',
    artWork: '',
    musicsArray: [],
    loading: false,
    favMusicsArray: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    this.setState({
      loading: true,
    }, async () => {
      const selectedMusic = await getMusics(id);
      const filteredMusic = selectedMusic.filter((music) => music.trackName);
      const favoritesMusics = await getFavoriteSongs();
      this.setState({
        musicsArray: filteredMusic,
        favMusicsArray: favoritesMusics,
        albumName: selectedMusic[0].collectionName,
        artistName: selectedMusic[0].artistName,
        artWork: selectedMusic[0].artworkUrl100,
        loading: false,
      });
    });
  }

  addFavMusic = (songID) => {
    const { musicsArray } = this.state;
    this.setState({ loading: true,
    }, async () => {
      const musicFavSelected = musicsArray.find((music) => music.trackId === songID);
      musicFavSelected.checked = true;
      await addSong(musicFavSelected);
      this.setState((prevState) => ({
        loading: false,
        favMusicsArray: [...prevState.favMusicsArray, musicFavSelected],
      }));
    });
  };

  render() {
    const { albumName, artistName, artWork, musicsArray, loading,
      favMusicsArray } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <session>
            <div className="album-info">
              <img src={ artWork } alt={ albumName } />
              <p data-testid="artist-name">{ artistName }</p>
              <p data-testid="album-name">{ albumName }</p>
            </div>
            <div className="music-info">
              { musicsArray.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  songInfo={ music }
                  addFavMusic={ this.addFavMusic }
                  checked={ favMusicsArray
                    .some((favorite) => favorite.trackId === music.trackId) }
                />
              ))}
            </div>
          </session>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default Album;
