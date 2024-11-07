import React from 'react';
import { createUseStyles } from 'react-jss';

interface BannerProps {
  visible: boolean;
  name: string;
  onSeeMoreClick: (id: string, name: string) => void;
  id: string;
}

const Banner: React.FC<BannerProps> = ({
  visible,
  name,
  onSeeMoreClick,
  id,
}) => {
  const classes = useStyles({ visible });
  return (
    <div className={classes.banner}>
      <p>{`Want to know more about ${name}`}</p>
      <p
        className={classes.para}
        onClick={() => onSeeMoreClick(id, name)}
      >{`See More >`}</p>
    </div>
  );
};

const useStyles = createUseStyles({
  banner: {
    position: 'absolute',
    top: (props: BannerProps) => (props.visible ? '0' : '-100%'), // Slide down if visible
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark background
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    flexDirection: 'column',
    opacity: (props: BannerProps) => (props.visible ? 1 : 0), // Fade in if visible
    transition: 'opacity 0.3s ease, top 0.5s ease',
    animation: (props: BannerProps) =>
      props.visible ? '$bounce 0.5s ease' : 'none',
  },
  '@keyframes bounce': {
    '0%': { transform: 'translateY(-20%)' },
    '50%': { transform: 'translateY(5%)' },
    '100%': { transform: 'translateY(0)' },
  },
  para: {
    cursor: 'pointer',
  },
});

export default Banner;
