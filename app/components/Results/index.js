import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Results.css';
import {connector} from '../../reducers/results';
import Game from './Game';

const Results = ({data, visible, onClick}) => (
  <div>
    {data.slice(0, 20).map(({name, appid, playtime_forever, img_icon_url, img_logo_url}, key) => (
      <Game
        name={name}
        appId={appid}
        iconId={key === visible ? img_logo_url : img_icon_url}
        playtime={playtime_forever}
        onClick={() => onClick(key)}
        showDetails={key === visible}
        key={key} />
    ))}
  </div>
);

export default connector(Results);
