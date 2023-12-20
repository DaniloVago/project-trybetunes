import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, addFavMusic, checked } = this.props;
    return (
      <div data-testid="page-music-card">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ `${previewUrl}` } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `favorite${trackId}` }>
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => addFavMusic(trackId) }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool,
  addFavMusic: PropTypes.func.isRequired,
};

MusicCard.defaultProps = {
  checked: false,
};

export default MusicCard;
