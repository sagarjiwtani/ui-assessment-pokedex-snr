import React from 'react';
import { createUseStyles } from 'react-jss';

interface SkeletonViewProps {
  n: number;
}

const SkeletonCard: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.skeletonCard}>
      <div className={classes.skeletonImage}></div>
      <div className={classes.skeletonText}></div>
      <div className={`${classes.skeletonText} ${classes.short}`}></div>
    </div>
  );
};

const LoadingCard: React.FC<SkeletonViewProps> = ({ n }) => {
  const classes = useStyles();
  return (
    <div className={classes.skeletonContainer}>
      {Array.from({ length: n }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

const useStyles = createUseStyles({
  skeletonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
  skeletonCard: {
    flex: '1 1 calc(33.33% - 16px)',
    maxWidth: '400px',
    minWidth: '200px',
    height: '150px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  skeletonImage: {
    width: '100%',
    height: '80px',
    backgroundColor: '#ddd',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      height: '100%',
      width: '100%',
      background:
        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
      animation: '$shimmer 1.5s infinite',
    },
  },
  skeletonText: {
    width: '100%',
    height: '12px',
    backgroundColor: '#ddd',
    marginTop: '8px',
    borderRadius: '4px',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      height: '100%',
      width: '100%',
      background:
        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
      animation: '$shimmer 1.5s infinite',
    },
  },
  short: {
    width: '60%',
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
});

export default LoadingCard;
