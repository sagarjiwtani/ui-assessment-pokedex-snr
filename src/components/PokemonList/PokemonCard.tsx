// import React, { useState } from 'react';
// import { createUseStyles } from 'react-jss';
// import Banner from './Banner';
// import PokemonDetails from './PokemonDetails';

// interface PokemonCardProps {
//   pokemonData: {
//     id: string;
//     number: string;
//     name: string;
//     weight: {
//       minimum: string;
//       maximum: string;
//     };
//     height: {
//       minimum: string;
//       maximum: string;
//     };
//     classification: string;
//     types: string[]; // Array of string types
//     resistant: string[];
//     weaknesses: string[];
//     fleeRate: number;
//     maxCP: number; // Using number instead of 'integer'
//     maxHP: number; // Using number instead of 'integer'
//     image: string;
//   };
//   index: number;
//   onSeeMoreClick: (id: string, name: string) => void;
// }

// const typeColors: { [key: string]: string } = {
//   fire: '#FF4500', // Red-Orange for Fire
//   water: '#1E90FF', // Dodger Blue for Water
//   grass: '#32CD32', // Lime Green for Grass
//   electric: '#FFD700', // Gold for Electric
//   psychic: '#9370DB', // Medium Purple for Psychic
//   fairy: '#FF69B4', // Hot Pink for Fairy
//   rock: '#8B4513', // Saddle Brown for Rock
//   flying: '#87CEEB', // Sky Blue for Flying
//   poison: '#99099c',
//   bug: '#579c09',
//   normal: '#9c9009',
//   ground: '#e3d212',
//   fighting: '#630a0e',
//   steel: '#b0b4b8',
//   ice: '#bbd6f2',
//   ghost: '#cd62e3',
//   dragon: '#0c0661',
// };

// const PokemonCard: React.FC<PokemonCardProps> = ({
//   pokemonData,
//   index,
//   onSeeMoreClick,
// }) => {
//   const classes = useStyles();
//   const [isBannerVisible, setBannerVisible] = useState(false);
//   const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

//   const typeToClassMap: { [key: string]: string } = {
//     fire: 'fire',
//     water: 'water',
//     grass: 'grass',
//     electric: 'electric',
//     psychic: 'psychic',
//     fairy: 'fairy',
//     rock: 'rock',
//     flying: 'flying',
//     poison: 'poison',
//     bug: 'bug',
//     normal: 'normal',
//     ground: 'ground',
//     fighting: 'fighting',
//     steel: 'steel',
//     ice: 'ice',
//     ghost: 'ghost',
//     dragon: 'dragon',
//   };

//   return (
//     <>
//       <div
//         className={`${classes.card} ${classes.cardHover}`}
//         onMouseEnter={() => setBannerVisible(true)} // Show banner on hover
//         onMouseLeave={() => setBannerVisible(false)} // Hide banner when not hovered
//       >
//         <div className={classes.badge}>
//           # {(index + 1).toString().padStart(3, '0')}
//         </div>
//         <img src={pokemonData.image} alt="Card" className={classes.cardImage} />
//         <div className={classes.cardName}>{pokemonData.name}</div>{' '}
//         {/* Display Pokémon name */}
//         <div className={classes.cardTypes}>
//           {pokemonData.types.map((type, index) => {
//             const typeKey = type.toLowerCase(); // Convert type to lowercase and assert type
//             const typeClassName = classes[typeToClassMap[typeKey]]; // Access the class using the map
//             return (
//               <div
//                 key={index}
//                 className={`${classes.cardType} ${typeClassName}`}
//               >
//                 {type}
//               </div>
//             );
//           })}
//         </div>
//         <Banner
//           name={pokemonData?.name}
//           id={pokemonData?.id}
//           visible={isBannerVisible}
//           onSeeMoreClick={onSeeMoreClick}
//         />
//       </div>
//       {/* <PokemonDetails isOpen={isModalOpen} onClose={handleCloseModal}> */}
//       <></>
//       {/* <div className={classes.modalContainer}></div> */}
//       {/* <h2>{pokemonData.name}</h2>
//         <p>
//           Weight: {pokemonData.weight.minimum} - {pokemonData.weight.maximum}
//         </p>
//         <p>
//           Height: {pokemonData.height.minimum} - {pokemonData.height.maximum}
//         </p>
//         <img
//           src={pokemonData.image}
//           alt="Large view"
//           className={classes.modalImage}
//         /> */}
//       {/* Add more details about the Pokémon here */}
//       {/* </PokemonDetails> */}
//     </>
//   );
// };

// const useStyles = createUseStyles(
//   {
//     card: {
//       flex: '1 1 calc(33.33% - 16px)',
//       boxSizing: 'border-box',
//       width: '100px',
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       overflow: 'hidden',
//       boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//       display: 'flex',
//       flexDirection: 'column',
//       backgroundColor: '#fff',
//       height: '325px',
//       position: 'relative',
//       background:
//         'linear-gradient(135deg, rgba(255, 182, 193, 0.6), rgba(173, 216, 230, 0.6))',
//       transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//       '&:hover': {
//         transform: 'translateY(-4px)',
//         boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
//       },
//     },
//     cardImage: {
//       width: '100%',
//       height: '250px',
//       objectFit: 'contain',
//       transition: 'transform 0.3s ease, opacity 0.3s ease',
//       mixBlendMode: 'multiply',
//     },
//     cardName: {
//       fontSize: '18px',
//       fontWeight: 'bold',
//       color: '#333',
//       textAlign: 'center',
//       marginTop: '8px',
//     },
//     cardType: {
//       flex: '1',
//       textAlign: 'center',
//       padding: '8px',
//       fontSize: '14px',
//       color: '#fff',
//       borderRadius: '4px',
//     },
//     cardTypes: {
//       display: 'flex',
//       gap: '4px',
//       justifyContent: 'center',
//       padding: '8px',
//     },
//     badge: {
//       position: 'absolute',
//       top: '8px',
//       left: '8px',
//       backgroundColor: '#FF6347',
//       color: '#fff',
//       padding: '4px 8px',
//       borderRadius: '12px',
//       fontSize: '12px',
//       fontWeight: 'bold',
//     },
//     cardHover: {
//       '&:hover $cardImage': {
//         transform: 'scale(1.1)',
//         opacity: 0.8,
//       },
//       '&:hover $banner': {
//         top: 0, // Make the banner slide down
//         opacity: 1,
//         animation: '$bounce 0.5s ease',
//       },
//     },
//     fire: {
//       backgroundColor: typeColors.fire,
//     },
//     water: {
//       backgroundColor: typeColors.water,
//     },
//     grass: {
//       backgroundColor: typeColors.grass,
//     },
//     electric: {
//       backgroundColor: typeColors.electric,
//     },
//     psychic: {
//       backgroundColor: typeColors.psychic,
//     },
//     fairy: {
//       backgroundColor: typeColors.fairy,
//     },
//     rock: {
//       backgroundColor: typeColors.rock,
//     },
//     flying: {
//       backgroundColor: typeColors.flying,
//     },
//     poison: {
//       backgroundColor: typeColors.poison,
//     },
//     bug: {
//       backgroundColor: typeColors.bug,
//     },
//     normal: {
//       backgroundColor: typeColors.normal,
//     },
//     ground: {
//       backgroundColor: typeColors.ground,
//     },
//     fighting: {
//       backgroundColor: typeColors.fighting,
//     },
//     steel: {
//       backgroundColor: typeColors.steel,
//     },
//     ice: {
//       backgroundColor: typeColors.ice,
//     },
//     ghost: {
//       backgroundColor: typeColors.ghost,
//     },
//     dragon: {
//       backgroundColor: typeColors.dragon,
//     },
//     modalImage: {
//       width: '100%',
//       height: 'auto',
//     },
//     modalContainer: {
//       width: '50%',
//       height: '500px',
//     },
//   },
//   { name: 'PokemonCard' }
// );

// export default PokemonCard;

import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Banner from './Banner';

interface PokemonCardProps {
  pokemonData: {
    id: string;
    number: string;
    name: string;
    weight: {
      minimum: string;
      maximum: string;
    };
    height: {
      minimum: string;
      maximum: string;
    };
    classification: string;
    types: string[];
    resistant: string[];
    weaknesses: string[];
    fleeRate: number;
    maxCP: number;
    maxHP: number;
    image: string;
  };
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
