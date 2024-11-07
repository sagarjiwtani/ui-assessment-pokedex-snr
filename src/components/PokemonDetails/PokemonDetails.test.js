import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonDetailsModal from './PokemonDetailsModal';
import { useGetPokemonDetails } from '../../hooks/GetPokemonDetails';

// Mock useGetPokemonDetails hook
jest.mock('../../hooks/useGetPokemonDetails', () => ({
  useGetPokemonDetails: jest.fn(),
}));

// Mock data for testing
const mockPokemonData = {
  pokemon: {
    id: '001',
    name: 'Bulbasaur',
    classification: 'Seed Pokémon',
    types: ['Grass', 'Poison'],
    resistant: ['Water', 'Electric'],
    weaknesses: ['Fire', 'Psychic'],
    height: { minimum: '0.61 m', maximum: '0.79 m' },
    weight: { minimum: '6.04 kg', maximum: '7.75 kg' },
    maxHP: 1071,
    maxCP: 951,
    fleeRate: 0.1,
    image: 'https://example.com/bulbasaur.png',
  },
};

describe('PokemonDetailsModal', () => {
  const onCloseMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders modal content when isOpen is true', () => {
    useGetPokemonDetails.mockReturnValue({
      data: mockPokemonData,
      loading: false,
      error: null,
    });

    render(
      <PokemonDetailsModal
        pokemonId="001"
        isOpen={true}
        onClose={onCloseMock}
        pokemonName="Bulbasaur"
      />
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/seed pokémon/i)).toBeInTheDocument();
    expect(screen.getByAltText(/bulbasaur/i)).toHaveAttribute(
      'src',
      'https://example.com/bulbasaur.png'
    );
  });

  test('does not render modal content when isOpen is false', () => {
    render(
      <PokemonDetailsModal
        pokemonId="001"
        isOpen={false}
        onClose={onCloseMock}
        pokemonName="Bulbasaur"
      />
    );

    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  });

  test('renders loader when loading is true', () => {
    useGetPokemonDetails.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <PokemonDetailsModal
        pokemonId="001"
        isOpen={true}
        onClose={onCloseMock}
        pokemonName="Bulbasaur"
      />
    );

    expect(screen.getByTestId('pokemon-details-loader')).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    useGetPokemonDetails.mockReturnValue({
      data: null,
      loading: false,
      error: { message: 'Failed to load data' },
    });

    render(
      <PokemonDetailsModal
        pokemonId="001"
        isOpen={true}
        onClose={onCloseMock}
        pokemonName="Bulbasaur"
      />
    );

    expect(screen.getByText(/error: failed to load data/i)).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    useGetPokemonDetails.mockReturnValue({
      data: mockPokemonData,
      loading: false,
      error: null,
    });

    render(
      <PokemonDetailsModal
        pokemonId="001"
        isOpen={true}
        onClose={onCloseMock}
        pokemonName="Bulbasaur"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('renders Pokémon type, resistant, and weaknesses sections correctly', () => {
    useGetPokemonDetails.mockReturnValue({
      data: mockPokemonData,
      loading: false,
      error: null,
    });

    render(
      <PokemonDetailsModal
        pokemonId="001"
        isOpen={true}
        onClose={onCloseMock}
        pokemonName="Bulbasaur"
      />
    );

    expect(screen.getByText(/types/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();

    expect(screen.getByText(/resistant/i)).toBeInTheDocument();
    expect(screen.getByText(/water/i)).toBeInTheDocument();
    expect(screen.getByText(/electric/i)).toBeInTheDocument();

    expect(screen.getByText(/weaknesses/i)).toBeInTheDocument();
    expect(screen.getByText(/fire/i)).toBeInTheDocument();
    expect(screen.getByText(/psychic/i)).toBeInTheDocument();
  });
});
