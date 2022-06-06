const Card = ({ card, handleClick, flipped, disabled }) => {
  const handleChoice = () => {
    if (!disabled) {
      handleClick(card);
    }
  };

  return (
    <>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="Card front" />
          <img
            className="back"
            src="/img/cover.png"
            alt="back"
            onClick={handleChoice}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
