import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Banner from './Banner';
import { Pokemon } from '../../hooks/useGetPokemonDetails';

interface PokemonCardProps {
  pokemonData: Pokemon;
  index: number;
  onSeeMoreClick: (id: string, name: string) => void;
}

const typeColors: { [key: string]: string } = {
  fire: '#FF4500',
  water: '#1E90FF',
  grass: '#32CD32',
  electric: '#FFD700',
  psychic: '#9370DB',
  fairy: '#FF69B4',
  rock: '#8B4513',
  flying: '#87CEEB',
  poison: '#99099c',
  bug: '#579c09',
  normal: '#9c9009',
  ground: '#e3d212',
  fighting: '#630a0e',
  steel: '#b0b4b8',
  ice: '#bbd6f2',
  ghost: '#cd62e3',
  dragon: '#0c0661',
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemonData,
  index,
  onSeeMoreClick,
}) => {
  const classes = useStyles();
  const [isBannerVisible, setBannerVisible] = useState(false);

  const handleMouseEnter = () => setBannerVisible(true);
  const handleMouseLeave = () => setBannerVisible(false);

  return (
    <div
      className={`${classes.card} ${classes.cardHover}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={classes.badge}>
        # {(index + 1).toString().padStart(3, '0')}
      </div>
      <img src={pokemonData.image} alt="Card" className={classes.cardImage} />
      <div className={classes.cardName}>{pokemonData.name}</div>

      <div className={classes.cardTypes}>
        {pokemonData.types.map((type, index) => (
          <div
            key={index}
            className={`${classes.cardType}`}
            style={{ backgroundColor: typeColors[type.toLowerCase()] }}
          >
            {type}
          </div>
        ))}
      </div>

      <Banner
        name={pokemonData?.name}
        id={pokemonData?.id}
        visible={isBannerVisible}
        onSeeMoreClick={onSeeMoreClick}
      />
    </div>
  );
};

const useStyles = createUseStyles({
  card: {
    flex: '1 1 calc(33.33% - 16px)',
    boxSizing: 'border-box',
    width: '100px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    height: '325px',
    position: 'relative',
    background:
      'linear-gradient(135deg, rgba(255, 182, 193, 0.6), rgba(173, 216, 230, 0.6))',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },
  cardImage: {
    width: '100%',
    height: '250px',
    objectFit: 'contain',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    mixBlendMode: 'multiply',
  },
  cardName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: '8px',
  },
  cardType: {
    flex: '1',
    textAlign: 'center',
    padding: '8px',
    fontSize: '14px',
    color: '#fff',
    borderRadius: '4px',
  },
  cardTypes: {
    display: 'flex',
    gap: '4px',
    justifyContent: 'center',
    padding: '8px',
  },
  badge: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: '#FF6347',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  cardHover: {
    '&:hover $cardImage': {
      transform: 'scale(1.1)',
      opacity: 0.8,
    },
  },
  modalImage: {
    width: '100%',
    height: 'auto',
  },
  modalContainer: {
    width: '50%',
    height: '500px',
  },
});

export default PokemonCard;
