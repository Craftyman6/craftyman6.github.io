import { useState, useEffect } from 'react'
import Select from 'react-select'
import './App.css'
import gambits from './gambits.json'
import placeholderGambitImage from './assets/Placeholder Gambit.PNG'
import GuessList from './GuessList.jsx'
import About from './About.jsx'
import Results from './Results.jsx'
import Credits from './Credits.jsx'

const gambitImageSources = import.meta.glob('./assets/gambits/*.PNG', {
  eager: true,
  query: '?url',
  import: 'default',
});

class Criterium {
  constructor(name, value, color, hint = null) {
    this.name = name;
    this.value = value;
    this.color = color;
    this.emoji = ({"green": "🟩", "yellow": "🟨", "gray": "⬛"})[this.color];
    this.hint = hint;
  }
  static baseCriteria = ["Cost", "Rarity", "Focus", "Trigger", "Unlockable"].map(criterium => new Criterium(criterium));
  // Cost: Return green if exactly correct, yellow if within $2, and gray if more than a $2 difference
  static getCostCriterium(gambitA, gambitB) {
    return gambitA.cost == gambitB.cost ? "green" : Math.abs(gambitA.cost - gambitB.cost) < 3 ? "yellow" : "gray";
  }
  // Rarity: Return green if exactly correct, yellow if one away on the hierarchy, and gray if more than one away on the hierarchy
  static rarityyellows = {"COMMON": ["RARE"], "RARE": ["COMMON", "EPIC"], "EPIC": ["RARE", "LEGENDARY"], "LEGENDARY": ["EPIC"]};
  static getRarityCriterium(gambitA, gambitB) {
    return gambitA.rarity == gambitB.rarity ? "green" : this.rarityyellows[gambitA.rarity].includes(gambitB.rarity) ? "yellow" : "gray";
  }
  // Focus: Return green if focus list is exactly the same, yellow if any focus matches another, and gray if none of the focuses match
  static getFocusCriterium(gambitA, gambitB) {
    if (gambitA.focus.length == gambitB.focus.length) {
      let allFound = true;
      for (focus of gambitA.focus) {
        if (!gambitB.focus.includes(focus)) {allFound = false;}
      }
      for (focus of gambitB.focus) {
        if (!gambitA.focus.includes(focus)) {allFound = false;}
      }
      if (allFound) {return "green"; }
    }
    for (focus of gambitA.focus) {
      if (gambitB.focus.includes(focus)) {return "yellow"; }
    }
    return "gray";
  }
  // Trigger: Return green if exactly correct, otherwise return grey
  static getTriggerCriterium(gambitA, gambitB) {
    return gambitA.trigger == gambitB.trigger ? "green" : "gray";
  }
  // Unlockable: Return green if exactly correct, otherwise return grey
  static getUnlockableCriterium(gambitA, gambitB) {
    return gambitA.unlockable == gambitB.unlockable ? "green" : "gray";
  }
}

class Gambit {
  constructor(gambit) {
    this.name = gambit.name;
    this.cost = gambit.cost;
    this.rarity = gambit.rarity;
    this.focus = gambit.focus;
    this.trigger = gambit.trigger;
    this.unlockable = gambit.unlockable;
    const imagePath = `./assets/gambits/${this.name}.PNG`;
    this.imgSrc = gambitImageSources[imagePath];
    if (!this.imgSrc) {
      throw new Error(`Missing image for gambit "${this.name}": ${imagePath}`);
    }
    this.criteria = [];
  }
  ToString() {return this.name}
  static allGambits = gambits.map(gambit => new Gambit(gambit));
  static selectOptions = this.allGambits.map(gambit => ({value: gambit, label: gambit.name}));
  setCriteria(comparedGambit) {
    const focusHint = this.focus.length == comparedGambit.focus.length ? "=" : this.focus.length > comparedGambit.focus.length ? ">" : "<";
    this.criteria = [
      new Criterium("Cost", this.cost, Criterium.getCostCriterium(this, comparedGambit)),
      new Criterium("Rarity", this.rarity, Criterium.getRarityCriterium(this, comparedGambit)),
      new Criterium("Focus", this.focus, Criterium.getFocusCriterium(this, comparedGambit), focusHint),
      new Criterium("Trigger", this.trigger, Criterium.getTriggerCriterium(this, comparedGambit)),
      new Criterium("Unlockable", this.unlockable, Criterium.getUnlockableCriterium(this, comparedGambit))
    ]
  }
  getCriteriaEmojis() {
    return this.criteria.map(criterium => criterium.emoji).join('');
  }
}

function App() {

  /** From: bryc: https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js **/
  const prefix = '8tHifL4Cmz6A3e8';
  const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };

  // Uses the above seeded function to generate a gambit based off the current date
  const getGambitOfDay = () => {
    const curDate = new Date();
    const dateElements = [curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()];
    const dateString = dateElements.map(date => (date + '').padStart(2, '0')).join('');
    return Gambit.allGambits[cyrb53(prefix + dateString) % Gambit.allGambits.length];
  }

  // The currently selected gambit in the Select element to be guessed
  const [selectedGambit, setSelectedGambit] = useState(null);
  // The correct gambit of the day to be guessed (Addictions Gambit for testing)
  const [correctGambit, setCorrectGambit] = useState(getGambitOfDay());
  // Previous gambit guesses. Displayed in GuessList component
  const [guesses, setGuesses] = useState([]);
  // Whether the user has already guessed the gambit correctly
  const [won, setWon] = useState(false);
  // Result emojis to be displayed and copied
  const [emojis, setEmojis] = useState('');

  useEffect(() => {
    const aboutDialog = document.getElementById("about-dialog");
    if (!aboutDialog.open) {
      aboutDialog.showModal();
    }
  }, []);

  const doGuess = () => {
    // Return if no gambit is selected
    if (selectedGambit == null) {return}
    // Return if gambit has already been guessed
    if (gambitAlreadyGuessed(selectedGambit)) {return}
    // Assign criteria results to gambit object
    selectedGambit.setCriteria(correctGambit);
    // Add gambit to guess list
    setGuesses([selectedGambit, ...guesses])
    // Win if gambit was guessed correctly
    setWon(selectedGambit === correctGambit);
    // Clear gambit selection
    setSelectedGambit(null)
  };

  // Side effect for when the Gambordle is won
  useEffect(() => {
    // Don't run if they didn't win
    if (!won) {return; }
    // Initialize emojis to guess criteria
    setEmojis(guesses.toReversed().map((guess) => guess.getCriteriaEmojis()).join('\n'));
    // Show win dialog
    document.getElementById("win-dialog").showModal();
    // Show results button
    document.getElementById("results-button").style.display = "block";
  }, [won])

  // Returns whether a given gambit exists in the GuessList component
  // Used with both selectedGambit and correctGambit
  const gambitAlreadyGuessed = (gambit) => {
    return guesses.filter((guess) => guess.name == gambit.name).length > 0;
  }

  

  const openDialog = (dialogID) => {
    const dialog = document.getElementById(dialogID);
    dialog.showModal();
  }

  return (
    <>
      <header>
        <div id="options-container">
          <button className="option" id="credits-button" onClick={() => openDialog("credits-dialog")}>i</button>
          <button className="option" id="results-button" onClick={() => openDialog("win-dialog")}>Results</button>
          <button className="option" id="about-button" onClick={() => openDialog("about-dialog")}>?</button>
        </div>
        <h1>Gambordle</h1>
      </header>
      <section id="center">
        <img
          src={won?correctGambit.imgSrc:selectedGambit?selectedGambit.imgSrc:placeholderGambitImage}
          className="gambit-image"
        ></img>
        <form>
          <Select
            placeholder="Choose a gambit"
            id="gambit-select"
            options={Gambit.selectOptions}
            // Displays the gambit option coorelating to selectedGambit
            value={Gambit.selectOptions.find((option) => option.value === selectedGambit) ?? null}
            isClearable
            isDisabled = {won}
            // Change selectedGambit when element value changes
            onChange={(newValue) => setSelectedGambit(newValue ? newValue.value : null)}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: 'green',
                primary25: 'lightgreen',
                primary50: 'lightgreen',
                primary75: 'lightgreen'
              }
            })}
          ></Select>
          <button
            id="guess-button"
            // Change class based on if button should be pressed or not (for styling)
            className="guess-button"
            type="button"
            disabled={won || !selectedGambit || gambitAlreadyGuessed(selectedGambit)}
            onClick={doGuess}
          >Guess</button>
        </form>
        <GuessList id="guess-list" guesses={guesses}/>

        {/* Dialog menus */}
        <About />
        <Results guesses={guesses} correctGambit={correctGambit} emojis={emojis}/>
        <Credits />
      </section>
    </>
  )
}

export default App
