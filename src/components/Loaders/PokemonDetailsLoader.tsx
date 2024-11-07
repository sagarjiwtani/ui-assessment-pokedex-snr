import React from 'react';
import { createUseStyles } from 'react-jss';

const PokemonDetailsLoader: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.shimmerLoader} />;
};

const useStyles = createUseStyles({
  shimmerLoader: {
    width: '100%',
    height: '300px',
    background: 'linear-gradient(90deg, #f3f3f3 25%, #e0e0e0 50%, #f3f3f3 75%)',
    backgroundSize: '200% 100%',
    animation: '$shimmer 1.5s infinite',
  },
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },
});

export default PokemonDetailsLoader;
