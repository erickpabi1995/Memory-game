import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const cardImages = [
    { src: "img/sword-1.png", matched: false },
    { src: "img/helmet-1.png", matched: false },
    { src: "img/potion-1.png", matched: false },
    { src: "img/ring-1.png", matched: false },
    { src: "img/scroll-1.png", matched: false },
    { src: "img/shield-1.png", matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleClick = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      handleEquality();
    }
  }, [choiceOne, choiceTwo]);

  const handleEquality = () => {
    if (choiceOne.src === choiceTwo.src) {
      setCards((prevState) => {
        return prevState.map((card) => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
      });

      setTimeout(() => resetTurn(), 1000);
    } else {
      setTimeout(() => {
        resetTurn();
      }, 1000);
    }
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevState) => prevState + 1);
    setDisabled(false);
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards &&
          cards.map((card) => (
            <Card
              handleClick={handleClick}
              card={card}
              key={card.id}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
