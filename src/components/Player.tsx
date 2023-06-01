import React from 'react';
import ReactPlayer from 'react-player';
import { IVideo } from '../App';

const Player = (props: IVideo) => {
  return <ReactPlayer url={props.link} controls width="100%" height="auto" />;
};
export default Player;
