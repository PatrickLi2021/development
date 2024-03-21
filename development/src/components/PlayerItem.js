import "./PlayerItem.css";

export default function playerItem(props) {
  const { item, inCart, clickHandler } = props;
  return (
    <div class="player-container">
      <div class="player-info-container">
        <p>
          <b>{item.position}</b>
        </p>
        <img src={item.countryflag} alt="soccer player" />
        <img src={item.clubbadge} alt="soccer player" />
      </div>
      <div class="player-image-container">
        <img src={item.playerpic} alt="soccer player" />
        <p>
          <b>{item.name}</b>
        </p>
        <div class="price-container">
          <p>
            <b>{item.price}</b>
          </p>
        </div>
      </div>
      {inCart ? (
        <button onClick={clickHandler}>Remove</button>
      ) : (
        <button onClick={clickHandler}>Add</button>
      )}
    </div>
  );
}
