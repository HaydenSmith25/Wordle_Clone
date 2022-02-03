const tileDisplay = document.querySelector(".tile-container");
const keyBoard = document.querySelector(".key-container");
const messageDisplay = document.querySelector(".message-container");

let wordle;

const getWordle = () => {
  fetch("http://localhost:8000/word")
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      wordle = json.toUpperCase();
    })
    .catch((err) => console.log(err));
};

getWordle();

const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "<<",
];

const guessRows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

guessRows.forEach((guessRow, guessRowIdx) => {
  const rowEl = document.createElement("div");
  rowEl.setAttribute("id", "guessRow-" + guessRowIdx);
  guessRow.forEach((guess, guessIdx) => {
    const tileEl = document.createElement("div");
    tileEl.setAttribute("id", "guessRow-" + guessRowIdx + "-tile-" + guessIdx);
    tileEl.classList.add("tile");
    rowEl.append(tileEl);
  });

  tileDisplay.append(rowEl);
});

keys.forEach((key) => {
  const buttonEl = document.createElement("button");
  buttonEl.textContent = key;
  buttonEl.setAttribute("id", key);
  buttonEl.addEventListener("click", () => handleClick(key));
  keyBoard.append(buttonEl);
});

const handleClick = (letter) => {
  console.log("clicked", letter);
  if (letter === "<<") {
    deleteLetter();
    console.log("guessRows", guessRows);
    return;
  }
  if (letter === "ENTER") {
    checkRow();
    console.log("check row");
    return;
  }
  addLetter(letter);
  console.log("guessRows", guessRows);
};

const addLetter = (letter) => {
  if (currentTile < 5 && currentRow < 6) {
    const tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = letter;
    guessRows[currentRow][currentTile] = letter;
    tile.setAttribute("data", letter);
    currentTile++;
  }
};

const deleteLetter = () => {
  if (currentTile > 0) {
    currentTile--;
    const tile = document.getElementById(
      "guessRow-" + currentRow + "-tile-" + currentTile
    );
    tile.textContent = "";
    guessRows[currentRow][currentTile] = "";
    tile.setAttribute("data", "");
  }
};

const checkRow = () => {
  const guess = guessRows[currentRow].join("");
  console.log("guess", guess);

  if (currentTile > 4) {
    fetch(`http://localhost:8000/check/?word=${guess}`)
      .then((response) => response.json)
      .then((json) => {
        console.log(json);
        if (json == "Entry word not found") {
          showMessage("word not in list");
          return;
        } else {
          console.log("guess is " + guess, "wordle is " + wordle);
          flipTile();
          if (wordle === guess) {
            showMessage("Spectacular!");
            isGameOver = true;
            return;
          } else {
            if (currentRow >= 5) {
              isGameOver = false;
              showMessage("Game Over");
              return;
            }
            if (currentRow < 5) {
              currentRow++;
              currentTile = 0;
            }
          }
        }
      })
      .catch((err) => console.log(err));
  }
};

const showMessage = (message) => {
  const messageEl = document.createElement("p");
  messageEl.textContent = message;
  messageDisplay.append(messageEl);
  setTimeout(() => messageDisplay.removeChild(messageEl), 2000);
};

const addColorToKey = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const rowTiles = document.querySelector("#guessRow-" + currentRow).childNodes;
  let checkWordle = wordle;
  const guess = [];

  rowTiles.forEach((tile) => {
    guess.push({ letter: tile.getAttribute("data"), color: "grey-overlay" });
  });

  guess.forEach((guess, idx) => {
    if (guess.letter === wordle[idx]) {
      guess.color = "green-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });
  guess.forEach((guess) => {
    if (checkWordle.includes(guess.letter)) {
      guess.color = "yellow-overlay";
      checkWordle = checkWordle.replace(guess.letter, "");
    }
  });

  rowTiles.forEach((tile, idx) => {
    setTimeout(() => {
      tile.classList.add("flip");
      tile.classList.add(guess[idx].color);
      addColorToKey(guess[idx].letter, guess[idx].color);
    }, 500 * idx);
  });
};
