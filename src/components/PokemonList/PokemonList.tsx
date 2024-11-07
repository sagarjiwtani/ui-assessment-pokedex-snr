import React, { useCallback, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import LoadingCard from '../Loaders/LoadingCard';
import PokemonCard from './PokemonCard';
import PokemonDetailsModal from '../PokemonDetails/PokemonDetails';

export const PokemonList: React.FC = () => {
  const classes = useStyles();
  const { pokemons, loading, pokemonOptions } = useGetPokemons();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleOpenModal = useCallback((id: string, name: string) => {
    setSelectedPokemon({ id, name });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedPokemon(null);
  }, []);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pokemons, searchQuery]);

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={classes.searchInput}
        />
      </div>
      {loading && <LoadingCard n={9} />}
      <div className={classes.cardContainer}>
        {filteredPokemons.map((pkmn, idx) => (
          <PokemonCard
            pokemonData={pkmn}
            index={idx}
            key={pkmn.id}
            onSeeMoreClick={handleOpenModal}
          />
        ))}
      </div>
      {selectedPokemon && (
        <PokemonDetailsModal
          isOpen={!!selectedPokemon}
          onClose={handleCloseModal}
          pokemonId={selectedPokemon?.id}
          pokemonName={selectedPokemon?.name}
        />
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    cardContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '16px',
    },
    searchContainer: {
      marginBottom: '16px',
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    searchInput: {
      width: '300px',
      padding: '12px 20px',
      fontSize: '18px',
      textAlign: 'center',
      color: '#333',
      borderRadius: '25px',
      border: '2px solid #ddd',
      outline: 'none',
      backgroundColor: '#f8f8f8',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s ease',
      '&:focus': {
        width: '350px',
        padding: '12px 20px',
        backgroundColor: '#fff',
        borderColor: '#007bff',
      },
      '&:focus::placeholder': {
        opacity: 0,
      },
      '&:before': {
        content: "''",
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '3px',
        backgroundColor: '#007bff',
        transform: 'scaleX(0)',
        transformOrigin: 'bottom right',
        transition: 'transform 0.4s ease',
      },
      '&:focus:before': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
      },
      '&::placeholder': {
        color: '#aaa',
        transition: 'color 0.3s ease',
      },
    },
  },
  { name: 'PokemonList' }
);
