import { useEffect, useState } from "react";
import CardItem from "./components/CardItem";
import "./App.css";
const baseCards = [
  { src: "/img/icon-arrow.png", isGuessed: false },
  { src: "/img/icon-gun.png", isGuessed: false },
  { src: "/img/icon-lance.png", isGuessed: false },
  { src: "/img/icon-rifle.png", isGuessed: false },
  { src: "/img/icon-shotgun.png", isGuessed: false },
  { src: "/img/icon-swords.png", isGuessed: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [selectedCardOne, setSelectedCardOne] = useState(null);
  const [selectedCardTwo, setSelectedCardTwo] = useState(null);
  const [cardsDisabled, setCardsDisabled] = useState(false);
  const shuffleCards = () => {
    const newDeck = [...baseCards, ...baseCards]
      .sort(() => Math.random() - 0.5)
      .map((el) => ({ ...el, id: Math.random() }));
    clearSelection();
    setCards(newDeck);
    setTurns(0)
  };

  const turnHandler = (card) => {
    selectedCardOne && selectedCardOne!== card ? setSelectedCardTwo(card) : setSelectedCardOne(card);
  };
  const clearSelection = () => {
    setSelectedCardOne(null);
    setSelectedCardTwo(null);
    setCardsDisabled(false)
  };
  useEffect(() => {
    if (selectedCardOne && selectedCardTwo) {
      setCardsDisabled(true)
      setTimeout(() => {
        if (selectedCardOne.src === selectedCardTwo.src) {
          const updatedDeck = cards.map((card) => {
            if (card.src === selectedCardOne.src) {
              return { ...card, isGuessed: true };
            } else {
              return card;
            }
          });
          setCards(updatedDeck);
          setTurns((prevTurn) => prevTurn + 1);
          clearSelection();
        } else {
          setTurns((prevTurn) => prevTurn + 1);
          clearSelection();
        }
      }, 1000);
    }
  }, [selectedCardOne, selectedCardTwo]);
  useEffect(()=>{
    shuffleCards();
  },[])
  return (
    <div className="App">
      <h1>Pair Game</h1>
      <h2>Number of turns : {turns}</h2>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-field">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            turnHandler={turnHandler}
            flipped={
              selectedCardOne === card ||
              selectedCardTwo === card ||
              card.isGuessed
            }
            disabled ={cardsDisabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
