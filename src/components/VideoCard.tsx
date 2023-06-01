import React from 'react';

import { Card, CardActionArea, CardMedia } from '@mui/material';

interface IVideoCardProps {
  onClick: () => any;
  img?: string;
  name: string;
}

const VideoCard = (props: IVideoCardProps) => {
  return (
    <Card
      sx={{ width: 270, borderRadius: 3 }}
      variant="outlined"
      onClick={props.onClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={170}
          image={props.img === '' ? './movie.jpg' : props.img}
          alt={props.img}
        />
        <div
          style={{
            zIndex: 9,
            position: 'absolute',
            bottom: '11%',
            left: '10%',
            color: '#fff',
            fontSize: 14,
            letterSpacing: 0.2,
          }}
        >
          {props.name}
        </div>
        <div className="gradient"></div>
      </CardActionArea>
    </Card>
  );
};

export default VideoCard;
