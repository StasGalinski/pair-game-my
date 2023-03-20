import "./CardItem.css";

const CardItem = ({ card, turnHandler,flipped ,disabled}) => {
  const clickHandler = () => {
    if(!disabled){
      turnHandler(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt={card.src}></img>
        <img 
          onClick={clickHandler}
          className="back"
          src="/img/card-cover.jpg"
          alt="Card back"
         
        ></img>
      </div>
    </div>
  );
};
export default CardItem;
