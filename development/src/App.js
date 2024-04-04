import "./App.css";
import { useState, useEffect } from "react";
import playerData from "./assets/player-data.json";
import PlayerItem from "./components/PlayerItem";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
playerData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  const [totalPrice, setTotalPrice] = useState("0");
  const [cartItems, setCartItems] = useState([]);
  const [originalItems, setOriginalItems] = useState(playerData);
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [playersBought, setPlayersBought] = useState([]);
  const [filteredData, setFilteredData] = useState(playerData);
  const [sortState, setSortState] = useState("none");
  const [selectedClub, setSelectedClub] = useState("All");

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
  };

  const handleClubChange = (club) => {
    setSelectedClub(club);
  };

  const handleReset = () => {
    setFilteredData(originalItems);
    setSelectedPosition("All");
    setSelectedClub("All");
    setSortState("None");
    setPlayersBought([]);
    setTotalPrice("0");
  };

  const handleSort = (sortValue) => {
    if (sortValue === "ASC") {
      setSortState(sortValue);
      setFilteredData(
        filteredData.toSorted(
          (a, b) => convertPriceToNum(a.price) - convertPriceToNum(b.price)
        )
      );
    } else if (sortValue === "DESC") {
      setSortState(sortValue);
      setFilteredData(
        filteredData.toSorted(
          (a, b) => convertPriceToNum(b.price) - convertPriceToNum(a.price)
        )
      );
    } else if (sortValue === "None") {
      setSortState("None");
      setFilteredData(originalItems);
    }
  };

  const convertPriceToNum = (price) => {
    const numericStr = price.replace(/[^0-9]/g, "");
    const intValue = parseInt(numericStr, 10) * 10000;
    return intValue;
  };

  const removeItem = (item, price, name) => {
    const numericStr = price.replace(/[^0-9]/g, "");
    const intValue = parseInt(numericStr, 10) * 10000;
    let totalPriceNum;
    if (totalPrice === "") {
      totalPriceNum = 0;
    } else {
      totalPriceNum = parseInt(totalPrice.replace(/,/g, ""), 10);
    }
    const newTotalPrice = totalPriceNum - intValue;
    const formattedTotalPrice = newTotalPrice.toLocaleString();
    setTotalPrice(formattedTotalPrice);
    let index = playersBought.indexOf(item);
    if (index !== -1) {
      playersBought.splice(index, 1);
    }
    setPlayersBought(playersBought);
    if (selectedPosition === "All" && selectedClub === "All") {
      setFilteredData(
        playerData.filter((item) => !playersBought.includes(item))
      );
    } else if (selectedPosition === "All") {
      setFilteredData(
        playerData.filter(
          (item) =>
            !playersBought.includes(item) &&
            item.clubbadge.substring(6, item.clubbadge.length - 5) ===
              selectedClub
        )
      );
    } else if (selectedClub === "All") {
      setFilteredData(
        playerData.filter(
          (item) =>
            !playersBought.includes(item) &&
            item.position.toUpperCase() === selectedPosition.toUpperCase()
        )
      );
    } else {
      setFilteredData(
        playerData.filter(
          (item) =>
            !playersBought.includes(item) &&
            item.position.toUpperCase() === selectedPosition.toUpperCase() &&
            item.clubbadge.substring(6, item.clubbadge.length - 5) ===
              selectedClub
        )
      );
    }
    if (sortState === "ASC") {
      setFilteredData(
        playerData.filter(
          (item) =>
            !playersBought.includes(item) &&
            item.position.toUpperCase() === selectedPosition.toUpperCase() &&
            item.clubbadge.substring(6, item.clubbadge.length - 5) === selectedClub
        )
      );
      setFilteredData(filteredData.toSorted(
        (a, b) => convertPriceToNum(a.price) - convertPriceToNum(b.price)
      ));
    }
    else {
      setFilteredData(
        playerData.filter(
          (item) =>
            !playersBought.includes(item) &&
            item.position.toUpperCase() === selectedPosition.toUpperCase() &&
            item.clubbadge.substring(6, item.clubbadge.length - 5) === selectedClub
        )
      );
      setFilteredData(filteredData.toSorted(
        (a, b) => convertPriceToNum(b.price) - convertPriceToNum(a.price)
      ));
    }
  };

  useEffect(() => {
    let filteredDataCopy;
    console.log("HIII");
    if (selectedClub === "All" && selectedPosition === "All") {
      console.log("in here 2111");
      filteredDataCopy = playerData.filter(
        (item) => !playersBought.includes(item.name)
      );
    } else if (selectedClub === "All") {
      console.log("in here 222");
      filteredDataCopy = playerData.filter(
        (item) =>
          !playersBought.includes(item.name) &&
          item.position.toUpperCase() === selectedPosition.toUpperCase()
      );
    } else if (selectedPosition === "All") {
      console.log("in here 212");
      filteredDataCopy = playerData.filter(
        (item) =>
          !playersBought.includes(item.name) &&
          item.clubbadge.substring(6, item.clubbadge.length - 5) ===
            selectedClub
      );
    } else {
      console.log("in here 23");
      filteredDataCopy = playerData.filter(
        (item) =>
          !playersBought.includes(item.name) &&
          item.clubbadge.substring(6, item.clubbadge.length - 5) ===
            selectedClub &&
          item.position.toUpperCase() === selectedPosition.toUpperCase()
      );
    }
    if (sortState === "ASC") {
      console.log("in here");
      filteredDataCopy = filteredDataCopy.toSorted(
        (a, b) => convertPriceToNum(a.price) - convertPriceToNum(b.price)
      );
    }
    else if (sortState === "DESC") {
      console.log("in here 1");
      filteredDataCopy = filteredDataCopy.toSorted(
        (a, b) => convertPriceToNum(b.price) - convertPriceToNum(a.price)
      );
    }
    setFilteredData(filteredDataCopy);
  }, [selectedClub, selectedPosition, sortState]);

  const addItem = (item, price, name) => {
    const numericStr = price.replace(/[^0-9]/g, "");
    const intValue = parseInt(numericStr, 10) * 10000;
    let totalPriceNum;
    if (totalPrice === "") {
      totalPriceNum = 0;
    } else {
      totalPriceNum = parseInt(totalPrice.replace(/,/g, ""), 10);
    }
    const newTotalPrice = totalPriceNum + intValue;
    const formattedTotalPrice = newTotalPrice.toLocaleString();
    setTotalPrice(formattedTotalPrice);
    playersBought.push(item);
    setPlayersBought(playersBought);
    if (selectedPosition === "All" && selectedClub === "All") {
      setFilteredData(
        playerData.filter((item) => !playersBought.includes(item))
      );
    } else if (selectedPosition === "All") {
      setFilteredData(
        playerData.filter(
          (item) =>
            !playersBought.includes(item) &&
            item.clubbadge.substring(6, item.clubbadge.length - 5) ===
              selectedClub
        )
      );
    } else if (selectedClub === "All") {
      setFilteredData(
        playerData.filter(
          (item) =>
            item.position.toUpperCase() === selectedPosition.toUpperCase() &&
            !playersBought.includes(item)
        )
      );
    } else {
      setFilteredData(
        playerData.filter(
          (item) =>
            item.position.toUpperCase() === selectedPosition.toUpperCase() &&
            !playersBought.includes(item) &&
            item.clubbadge.substring(6, item.clubbadge.length - 5) ===
              selectedClub
        )
      );
    }
    cartItems.push(name);
  };

  return (
    <div className="App">
      <div class="instructions-container">
        <h1>Transfer Market ⚽</h1>
        <h2 className="add-players-slogan">
          Add players to your team by selecting them from the market shown
          below
        </h2>

        <h3>Players Available in the Market</h3>
      </div>
      <div class="filter-sort-reset-container">
        <div class="filter-position-container">
          <label aria-label="filter-by-position">
            <p className="filter-title">Filter by Position:</p>
            <select
              value={selectedPosition || ""}
              onChange={(e) => handlePositionChange(e.target.value)}
            >
              <option value="All">All</option>
              <option value="ST">ST</option>
              <option value="LW">LW</option>
              <option value="RW">RW</option>
              <option value="CAM">CAM</option>
              <option value="CM">CM</option>
              <option value="CDM">CDM</option>
              <option value="LB">LB</option>
              <option value="CB">CB</option>
              <option value="RB">RB</option>
              <option value="GK">GK</option>
            </select>
          </label>
        </div>
        <div class="filter-club-container">
          <label aria-label="filter-by-club">
            <p className="filter-title">Filter by Club:</p>
            <select
              value={selectedClub || ""}
              onChange={(e) => handleClubChange(e.target.value)}
            >
              <option value="All">All</option>
              <option value="psg">Paris Saint-Germain</option>
              <option value="mancity">Manchester City</option>
              <option value="liverpool">Liverpool</option>
              <option value="real_madrid">Real Madrid</option>
              <option value="barcelona">FC Barcelona</option>
              <option value="arsenal">Arsenal</option>
              <option value="bayern">Bayern Munich</option>
              <option value="juventus">Juventus</option>
              <option value="newcastle">Newcastle</option>
            </select>
          </label>
        </div>
        <div class="sort-container">
          <label aria-label="sorting feature">
            <p className="filter-title">Sort By:</p>
            <select
              value={sortState || ""}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="None">None</option>
              <option value="ASC">Price Ascending</option>
              <option value="DESC">Price Descending</option>
            </select>
          </label>
        </div>
        <div class="reset-button-container">
          <button classname="reset-button" aria-label="reset filters and sort button" onClick={() => handleReset()}>Reset</button>
        </div>
      </div>
      <div class="column-flex">
      <div class="player-card-container">
        {filteredData.map((item, index) => (
          <div class="player-card">
            <PlayerItem
              clickHandler={() => addItem(item, item.price, item.name)}
              item={item}
              index={index}
              image={item.image}
              inCart={playersBought.includes(item)}
            />
          </div>
        ))}
      </div>
      <div class="squad-container">
        <h2>My Squad ⚡️</h2>
        <div>
          <p className="filter-title">
            <b>Total Price (in €): </b> {totalPrice}
            <br></br>
            <br></br>
            <b>Number of Players: </b> {playersBought.length}
            <div class="cart-aggregator-container">
              {playersBought.map((item, index) => (
                <div class="player-card">
                  <PlayerItem
                    clickHandler={() => removeItem(item, item.price, item.name)}
                    item={item}
                    index={index}
                    image={item.image}
                    inCart={playersBought.includes(item)}
                  />
                </div>
              ))}
            </div>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;