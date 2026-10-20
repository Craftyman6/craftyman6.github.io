import './Criterium.css'

const Criterium = ({criterium}) => {

  const getdivs = () => {
    switch (typeof criterium.value) {
      case "string": return <div className="slot">{criterium.value}</div>;
      case "number": return <div className="slot">${criterium.value.toString()}</div>;
      case "boolean": return <div className="slot">{criterium.value ? "UNLOCKABLE" : "NO UNLOCK"}</div>
      default:
        if (Array.isArray(criterium.value)) {
          return criterium.value.map((focus) => {
            return (
              <div className="slot" key={focus}>{focus}</div>
            )
          })
        }
        return "uh oh";
    }
  }

  return (
    <div className={"criterium "+criterium.color}>
      {criterium.hint && (
        <div id="hint"><p>{criterium.hint}</p></div>
      )}
      {getdivs()}
    </div>
  )
};

export default Criterium;