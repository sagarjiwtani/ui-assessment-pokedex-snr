import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PokemonList } from './PokemonList'; // Assuming PokemonList is in the same directory
import { useGetPokemons } from '../../hooks/GetPokemons/useGetPokemons';
import '@testing-library/jest-dom';

// Mocking the useGetPokemons hook
jest.mock('../../hooks/useGetPokemons');

describe('PokemonList Component', () => {
  const mockPokemons = [
    { id: '1', name: 'Bulbasaur' },
    { id: '2', name: 'Ivysaur' },
    { id: '3', name: 'Venusaur' },
  ];

  const mockPokemonOptions = []; // Adjust this based on your actual options mock
  const mockLoading = false;

  beforeEach(() => {
    useGetPokemons.mockReturnValue({
      pokemons: mockPokemons,
      loading: mockLoading,
      pokemonOptions: mockPokemonOptions,
    });
  });

  test('renders Pokémon list and handles search input', async () => {
    render(<PokemonList />);

    // Test: Ensure the search input is rendered
    const searchInput = screen.getByPlaceholderText('Search Pokémon');
    expect(searchInput).toBeInTheDocument();

    // Test: Initially renders all Pokémon cards
    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });

    // Test: Filter Pokémon cards when typing into the search input
    fireEvent.change(searchInput, { target: { value: 'Bulb' } });
    await waitFor(() => {
      expect(screen.queryByText('Ivysaur')).not.toBeInTheDocument();
      expect(screen.queryByText('Venusaur')).not.toBeInTheDocument();
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });

    // Clear search input
    fireEvent.change(searchInput, { target: { value: '' } });
    await waitFor(() => {
      mockPokemons.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      });
    });
  });

  test('displays loading state when loading is true', async () => {
    useGetPokemons.mockReturnValue({
      pokemons: [],
      loading: true,
      pokemonOptions: mockPokemonOptions,
    });

    render(<PokemonList />);

    // Test: Ensure loading indicator is shown when loading is true
    expect(screen.getByTestId('loading-card')).toBeInTheDocument();
  });

  test('opens and closes the PokemonDetailsModal', async () => {
    render(<PokemonList />);

    // Test: Ensure modal doesn't open by default
    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();

    // Test: Open modal by clicking on a Pokémon card
    const bulbasaurCard = screen.getByText('Bulbasaur');
    fireEvent.click(bulbasaurCard);

    // Wait for modal to open
    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

    // Test: Close modal
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
  });
});
