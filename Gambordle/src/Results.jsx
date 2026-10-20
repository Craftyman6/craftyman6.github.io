import {ToastContainer, toast, Zoom} from 'react-toastify'
import Countdown from 'react-countdown'

const Results = ({guesses, correctGambit, emojis}) => {
  const closeDialog = (dialogID) => {
    const dialog = document.getElementById(dialogID);
    dialog.close();
  }
  const triesMessage = () => {
    return "Gambordle in "+guesses.length+" tr"+(guesses.length==1?"y! Wow!":"ies");
  }
  // Copies the results to the user's clipboard
  const copyToast = () => toast("Results copied to clipboard", {toastId: "copy"});
  const copyResults = () => {
    let text = triesMessage()+" ("+(new Date().toLocaleDateString())+")\n"+emojis
    navigator.clipboard.writeText(text);
    copyToast();
  }
  return (
    <dialog id="win-dialog">
      <button className="close-button" onClick={() => closeDialog("win-dialog")}>X</button>
      <h1>GGs</h1>
      <h2>Today's gambit was {correctGambit.name}</h2>
      <img
        src={correctGambit.imgSrc}
        id="win-gambit-image"
      ></img>
      <p>You guessed today's {triesMessage()}</p>
      <button id="share-button" onClick={() => copyResults()}>Copy results</button>
      <ToastContainer
        position="top-center"
        theme="dark"
        hideProgressBar
        closeOnClick
        closeButton={false}
        limit={1}
        autoClose={1500}
        transition={Zoom}
      />
      <p>Come back tomorrow for a new Gambordle!</p>
      <Countdown
        date={(new Date()).setHours(24,0,0,0)}
        daysInHours
        transition="Slide"
        autoClose="50"
      />
    </dialog>
  )
}

export default Results;