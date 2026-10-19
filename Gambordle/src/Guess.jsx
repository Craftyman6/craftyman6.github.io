import Criterium from './Criterium.jsx'
import './Guess.css'

const Guess = ({guess}) => {
  return (
    <div className="guess">
      <img className="guess-image" src={guess.imgSrc}></img>
      <h2>{guess.name}</h2>
      <div className="criterium-list">
        {guess.criteria.map((criterium) => {
          return (
            <Criterium criterium={criterium} key={criterium.name}/>
          );
        })}
      </div>
    </div>
  )
};

export default Guess;