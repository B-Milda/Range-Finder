let map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const mapOri = JSON.parse(JSON.stringify(map));

function rangeFinder(x, y, range = 2) {
  if (map[x][y] != 0 && map[x][y] < 2 && range <= 20) {
    map[x][y] = range;
    rangeFinder(x + 1, y, range + 1);
    rangeFinder(x - 1, y, range + 1);
    rangeFinder(x, y + 1, range + 1);
    rangeFinder(x, y - 1, range + 1);
  }
  domHandler();
}

function domHandler() {
  document.querySelector("#cont").innerHTML = "";
  for (let i = 0; i < map.length; i++) {
    for (let u = 0; u < map[i].length; u++) {
      const elem = document.createElement("div");
      if (map[i][u] === 0) {
        elem.classList.add("wall");
      } else if (map[i][u] === 1) {
        elem.addEventListener("click", function () {
          rangeFinder(i, u);
        });
      } else if (map[i][u] === 2) {
        elem.classList.add("selected");
      } else {
        elem.innerText = map[i][u] - 2;
        elem.addEventListener("click", function () {
          rangeFinder(i, u);
        });
      }

      document.querySelector("#cont").appendChild(elem);
    }
  }
}

domHandler();

function reset() {
  map = JSON.parse(JSON.stringify(mapOri));
  domHandler();
}

/* Podmínka pro RangeFinder, kdyby mapa nebyla uzavřená:
    map[x]!== undefined && map[x][y]!==undefined 
    */
