const Credits = () => {
  const closeDialog = (dialogID) => {
    const dialog = document.getElementById(dialogID);
    dialog.close();
  }
  return (
    <dialog id="credits-dialog">
      <button className="close-button" onClick={() => closeDialog("credits-dialog")}>X</button>
      <h1>About Gambonanza</h1>
      <p>Gambonanza is a chess roguelike video game that features "gambits" as obtainable abilities. All references, gambits, and artwork belong to Gambonanza.</p>
      <p>The game can be found on <a href="https://store.steampowered.com/app/3509230/Gambonanza/">Steam</a>, <a href="https://play.google.com/store/apps/details?id=com.strayfawnstudio.gambonanza&hl=en_US&pli=1">Google Play</a>, and the <a href="https://apps.apple.com/us/app/gambonanza/id6747752407">Apple Store</a>.</p>
      <h1>Credits</h1>
      <h2>Colin Schaffner</h2>
      <p>Development & Design</p>
      <h2>Blukulele</h2>
      <p>Gambonanza Developer</p>
      <h2>bentrd</h2>
      <p>Gambit data</p>
      <h2>Wordle & Balatrodle</h2>
      <p>Inspirations</p>
      <h2>Thomas Bolinger</h2>
      <p>Web design & React resources/courses</p>
      <i>(yes i made this for homework)</i>
    </dialog>
  )
}

export default Credits;