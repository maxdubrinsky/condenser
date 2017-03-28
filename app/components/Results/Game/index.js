import React from 'react';
import styles from './Game.css';

const Playtime = ({playtime}) => <span>{(playtime / 60).toFixed(2)} hours</span>;

const Info = ({name, playtime}) => (
  <dl className={styles.info}>
    <dt>Name:</dt><dd>{name}</dd>
    <dt>Playtime:</dt><dd><Playtime playtime={playtime} /></dd>
  </dl>
);

const Icon = ({id, icon, onClick}) => (
  <div className={styles.icon}>
    {id && icon ?
      <img
        onClick={onClick}
        src={`http://media.steampowered.com/steamcommunity/public/images/apps/${id}/${icon}.jpg`} /> :
      <span>¯\_(ツ)_/¯</span>
    }
  </div>
);

const Game = ({name, appId, playtime, iconId, onClick, showDetails, key}) => (
  <div className={styles.container} key={key}>
    <Icon id={appId} icon={iconId} onClick={onClick} />
    {showDetails ? <Info {...{name, playtime}} /> : null}
  </div>
);

Game.propTypes = {
  name: React.PropTypes.string.isRequired,
  appId: React.PropTypes.number.isRequired,
  playtime: React.PropTypes.number.isRequired,
  iconId: React.PropTypes.string.isRequired,
  key: React.PropTypes.number.isRequired
}

export default Game;
