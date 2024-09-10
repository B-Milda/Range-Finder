/* Maximální vzdálenost pro výpočet: */
const maxRange = 20;

let map = [
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', 'R', 'R', 'R', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'W'],
    ['W', 'R', 'W', 'R', 'W', 'R', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'R', 'W'],
    ['W', 'R', 'W', 'R', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'W', 'R', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'W', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'R', 'W', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'W', 'R', 'R', 'R', 'W', 'R', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'R', 'R', 'R', 'R', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'W', 'W', 'W', 'W', 'R', 'R', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'W', 'R', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'W', 'R', 'W', 'W', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'W', 'R', 'R', 'R', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W', 'R', 'W'],
    ['W', 'R', 'R', 'R', 'W', 'W', 'W', 'W', 'R', 'R', 'R', 'W', 'R', 'R', 'R', 'W'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ];

/* W = Wall, R = Road */  

/* Vytvoření kopie mapy, parse & stringify pro zrušení reference */
const mapOri = JSON.parse(JSON.stringify(map));

function rangeFinder(x, y, range = 0, sourceRoute){
    rangeFinderBase(x, y, range, sourceRoute);
    domHandler();
}

function rangeFinderBase(x, y, range = 0, sourceRoute) {
  if (map[x][y] != "W" && range <= maxRange) {
    /* Pokud je původní cesta R, nahradí R za range, jinak přidá hodnotu ke stávající*/
    if (map[x][y] === "R") {
      map[x][y] = range;
    } else {
      map[x][y] = map[x][y] + "," + range;
    }
    /* Switch pro rekurzní opakování, aby se funkce nevracela odkud přišla */ 
    switch (sourceRoute) {
      case "x+":
        rangeFinderBase(x + 1, y, range + 1, "x+");
        rangeFinderBase(x, y + 1, range + 1, "y+");
        rangeFinderBase(x, y - 1, range + 1, "y-");
        break;
      case "x-":
        rangeFinderBase(x - 1, y, range + 1, "x-");
        rangeFinderBase(x, y + 1, range + 1, "y+");
        rangeFinderBase(x, y - 1, range + 1, "y-");
        break;
      case "y+":
        rangeFinderBase(x + 1, y, range + 1, "x+");
        rangeFinderBase(x - 1, y, range + 1, "x-");
        rangeFinderBase(x, y + 1, range + 1, "y+");
        break;
      case "y-":
        rangeFinderBase(x + 1, y, range + 1, "x+");
        rangeFinderBase(x - 1, y, range + 1, "x-");
        rangeFinderBase(x, y - 1, range + 1, "y-");
        break;
      default:
        rangeFinderBase(x + 1, y, range + 1, "x+");
        rangeFinderBase(x - 1, y, range + 1, "x-");
        rangeFinderBase(x, y + 1, range + 1, "y+");
        rangeFinderBase(x, y - 1, range + 1, "y-");
        break;
    }
  }
}

function domHandler() {
  document.querySelector("#cont").innerHTML = "";
  for (let i = 0; i < map.length; i++) {
    for (let u = 0; u < map[i].length; u++) {
      const elem = document.createElement("div");
      /* Vykreslení zdi */
      if (map[i][u] === "W") {
        elem.classList.add("wall");
        /* Vykreslení cesty */
      } else if (map[i][u] === "R") {
        elem.addEventListener("click", function () {
          reset();
          rangeFinder(i, u);
        });
        /* Vykreslení vybraného políčka*/        
        // Podmínka pokud počáteční políčko je zároveň vzdálenostní (začíná 0)
      } else if (map[i][u] === 0 || (typeof map[i][u] === "string" && map[i][u].startsWith("0"))) {
        elem.classList.add("selected");
        /* Vykreslení vzdálenosti */
      } else {
        elem.innerText = map[i][u];
        elem.addEventListener("click", function () {
          reset();
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
