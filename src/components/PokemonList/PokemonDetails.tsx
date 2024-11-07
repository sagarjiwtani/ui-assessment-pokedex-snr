import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import PokemonDetailsLoader from '../Loaders/PokemonDetailsLoader';

interface PokemonDetails {
  name: string;
  image: string;
  height: { minimum: string; maximum: string };
  weight: { minimum: string; maximum: string };
  classification: string;
  types: string[];
  weaknesses: string[];
  resistant: string[];
  maxHP: number;
  maxCP: number;
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

const TypeList: React.FC<{
  types: string[];
  className: string;
  category: string;
}> = ({ types, className, category }) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <strong>{category}</strong>
      <div className={classes.resistantArray}>
        {types.map((type, index) => {
          return (
            <span
              key={index}
              className={`${classes.resistantBox} `}
              style={{ backgroundColor: typeColors[type.toLowerCase()] }}
            >
              {type}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const PokemonDetailsModal: React.FC<{
  pokemonId: string;
  isOpen: boolean;
  onClose: () => void;
  pokemonName: string;
}> = ({ pokemonId, isOpen, onClose, pokemonName }) => {
  const { data, loading, error } = useGetPokemonDetails(pokemonId, pokemonName);
  const classes = useStyles();

  if (!isOpen) return null;

  const pokemon = data?.pokemon;

  return (
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <button className={classes.closeButton} onClick={onClose}>
          &times;
        </button>
        {loading && <PokemonDetailsLoader />}
        {error && <p className={classes.error}>Error: {error.message}</p>}
        {pokemon ? (
          <div className={classes.pokemonDetails}>
            <div className={classes.imageSection}>
              <img
                className={classes.pokemonImage}
                src={pokemon.image}
                alt={pokemon.name}
              />
            </div>
            <div className={classes.basicInfoSection}>
              <h2 className={classes.pokemonName}>{pokemon.name}</h2>
              <p className={classes.classification}>
                <strong>Classification:</strong> {pokemon.classification}
              </p>
              <div className={classes.basicInfoCards}>
                <div className={classes.basicInfoCard}>
                  <span className={classes.infoLabel}>Height</span>
                  <span>
                    {pokemon.height.minimum} - {pokemon.height.maximum}
                  </span>
                </div>
                <div className={classes.basicInfoCard}>
                  <span className={classes.infoLabel}>Weight</span>
                  <span>
                    {pokemon.weight.minimum} - {pokemon.weight.maximum}
                  </span>
                </div>
                <div className={classes.basicInfoCard}>
                  <span className={classes.infoLabel}>Max HP</span>
                  <span>{pokemon.maxHP}</span>
                </div>
                <div className={classes.basicInfoCard}>
                  <span className={classes.infoLabel}>Max CP</span>
                  <span>{pokemon.maxCP}</span>
                </div>
                <div className={classes.basicInfoCard}>
                  <span className={classes.infoLabel}>Flee Rate</span>
                  <span>{(pokemon.fleeRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <TypeList
              types={pokemon.types}
              className={classes.typeSection}
              category={'Types'}
            />
            <TypeList
              types={pokemon.resistant}
              className={classes.resistantSection}
              category={'Resistant'}
            />
            <TypeList
              types={pokemon.weaknesses}
              className={classes.weaknessSection}
              category={'Weaknesses'}
            />
          </div>
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: '$fadeIn 0.3s ease-out',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    overflowY: 'auto',
    '& strong': {
      color: '#333',
    },
    '& span': {
      color: '#333',
    },
  },
  error: { color: '#ff3333', fontSize: '1.2rem' },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '30px',
    color: '#333',
    cursor: 'pointer',
    '&:hover': { color: '#ff3333', transform: 'scale(1.1)' },
  },
  pokemonDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '15px',
  },
  imageSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  pokemonImage: {
    width: '150px',
    height: '150px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  basicInfoSection: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    width: '100%',
    textAlign: 'left',
  },
  pokemonName: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  classification: {
    fontSize: '1rem',
    fontStyle: 'italic',
    color: '#666',
    marginBottom: '10px',
  },
  basicInfoCards: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
  },
  basicInfoCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '10px 15px',
    borderRadius: '6px',
    minWidth: '100px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#444',
    display: 'block',
    marginBottom: '5px',
  },
  typeSection: { marginTop: '15px', width: '100%' },
  resistantSection: { marginTop: '15px', width: '100%' },
  weaknessSection: { marginTop: '15px', width: '100%' },
  typeBox: {
    padding: '5px 10px',
    borderRadius: '6px',
    fontWeight: 'bold',
    color: '#fff',
  },
  resistantArray: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  resistantBox: {
    backgroundColor: '#66bb6a',
    padding: '5px 10px',
    borderRadius: '6px',
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default PokemonDetailsModal;
