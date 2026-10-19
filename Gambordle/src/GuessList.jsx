import './GuessList.css'
import Guess from './Guess.jsx'

const GuessList = ({guesses}) => {

  return (
    <div id="guess-list">
      {guesses.map((guess) => {
        return (
          <Guess guess={guess} key={guess.name}/>
        )
      })}
    </div>
  )
};

export default GuessList;