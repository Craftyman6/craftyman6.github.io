const About = () => {
  const closeDialog = (dialogID) => {
    const dialog = document.getElementById(dialogID);
    dialog.close();
  }
  return (
    <dialog id="about-dialog">
      <button className="close-button" onClick={() => closeDialog("about-dialog")}>X</button>
      <h1>How to play Gambordle</h1>
      <p>The objective of Gambordle is to guess the gambit of the day. Each guess made displays correctness of five different categories:</p>
      <h2>Cost</h2>
      <p>A gambit's cost on Pawn Difficulty. Close within $2.</p>
      <h2>Rarity</h2>
      <p>A gambit's rarity. Close if one away on the heirarchy.</p>
      <i>(COMMON &gt; RARE &gt; EPIC &gt; LEGENDARY)</i>
      <h2>Focuses</h2>
      <p>A list of one or more aspects pertaining to what the gambit does/synergizes with. Correct if focus list exactly matches. Close if at least one focus matches another.</p>
      <p>Will also display whether the amount of focuses are too many, too few, or equal.</p>
      <i>(PAWN, ROOK, KNIGHT, BISHOP, QUEEN, KING, PHANTOM, PROMOTION, BLESS, GOLDEN, PROTECTIVE, TRAP, CAPTURE, MONEY, SHOP, WAIT, LANDING, CRUMBLE, SACRIFICE, PIECE SELLER, GAMBIT SELLER, CHANCE, MOVEMENT, COUNT AS, INCREMENTAL, DELIMIT)</i>
      <h2>Trigger</h2>
      <p>What the gambit does when triggered. If a gambit does not trigger, or is unconditional, it is labeled as PASSIVE.</p>
      <i>(SKIP TURN, GIVE MONEY, GIVE PIECE, GIVE GAMBIT, MODIFY PIECE, MODIFY BOARD, MODIFY SELL VALUE, PASSIVE)</i>
      <h2>Unlockable</h2>
      <p>Specifies whether the gambit is unlocked from the start of the game, or has an unlock method.</p>
      <i>(UNLOCKABLE, NO UNLOCK)</i>
    </dialog>
  )
}

export default About;