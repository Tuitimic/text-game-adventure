// ForestArea class and methods

class ForestArea {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedForestAreas = {};
    this._linkedCharacter = {};
    this._linkedObject = {};
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  describe() {
    return (
      "<br> Looking around the " +
      this._name +
      " you can see " +
      this._description
    );
  }

  isLink(direction) {
    return this._linkedForestAreas[direction] !== undefined;
  }

  linkRoom(direction, forest) {
    this._linkedForestAreas[direction] = forest;
  }

  linkCharacter(character) {
    this._linkedCharacter = character;
  }

  linkObject(object) {
    this._linkedObject = object;
  }

  move(direction) {
    if (direction in this._linkedForestAreas) {
      return this._linkedForestAreas[direction];
    } else {
      alert("No path that way! Wildlife area!!!!!");
      alert(this._name);
      return this;
    }
  }
}

// character class and methods
class Character {
  constructor(name, description, conversation) {
    this._name = name;
    this._description = description;
    this._conversation = conversation;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  describe() {
    return (
      "You have met " +
      this._name +
      "," +
      this._name +
      "has" +
      this._description
    );
  }
}

// sub-class
class Boss extends Character {
  constructor(name, description, weakness) {
    super(name, description);
    this._weakness = weakness;
  }
}

// class items and methods
class Object {
  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  describe() {
    return (
      "You have found " +
      this._name +
      ", the " +
      this._name +
      " is " +
      this._description
    );
  }
}

// creating "4 rooms"

const MainRoad = new ForestArea("Main road<br>");
MainRoad._description =
  "trees along the road, squirrels chattering, colourful butterflies.";

const Meadow = new ForestArea("Meadow<br>");
Meadow._description =
  "wildflowers full of colours,birds chirping everywere, insects humming.";

const DarkForest = new ForestArea("Dark forest<br>");
DarkForest._description =
  "dark tall trees, which were masked by shadows, bushes everywere, all is silent, no bird chirp, no howl of the wind.";

const House = new ForestArea("Grandma's House<br>");
House._description =
  "a meadow where grandma lives in a tiny house, surrounded by trees.You enter the house and....";

// linking "rooms"
MainRoad.linkRoom("west", Meadow);
Meadow.linkRoom("east", MainRoad);

Meadow.linkRoom("north", DarkForest);
DarkForest.linkRoom("south", Meadow);

DarkForest.linkRoom("east", House);
House.linkRoom("west", DarkForest);

House.linkRoom("south", MainRoad);
MainRoad.linkRoom("north", House);

// create characters and objects
const Grandmother = new Character("Grandma");
Grandmother._description = "gray hair and wrinkled hands.";

const Wolf = new Boss("the wolf");
Wolf._description = "bushy tail and large angry eyes.";
Wolf._weakness = "Knife";

const Knife = new Object("knife");
Knife._description = "great for carving meat and filleting fish. ";

// link characters and objects
Meadow.linkObject("knife");
DarkForest.linkCharacter("the wolf");
House.linkCharacter("Grandma");

// display info about each "room"
function displayInfo(forestArea) {
  console.log(forestArea);
  displayedText = forestArea._name + "" + forestArea.describe();

  document.getElementById("text").innerHTML = displayedText;
}

// start game function

function startGame() {
  let current = MainRoad;
  displayInfo(current);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      command = document.getElementById("direction").value;
      const directions = ["north", "south", "east", "west"];
      if (directions.includes(command.toLowerCase())) {
        current = current.move(command);
        displayInfo(current);
      }
    }
  });
}
