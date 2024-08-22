import Animal from "./classes/Animal";
import EnclosureId from "./enums/EnclosureID";
import { createAnimal } from "./func/createAnimal";

//* Elemente holen

const selectAnimal = document.getElementById(
  "select-animal"
) as HTMLSelectElement;
const nameOfAnimalInput = document.getElementById(
  "nameInput"
) as HTMLInputElement;
const birthYearInput = document.getElementById(
  "birthYearInput"
) as HTMLInputElement;
const selectContinent = document.getElementById(
  "select-continent"
) as HTMLSelectElement;
const selectSpecialNeeds = document.getElementById(
  "select-specialNeeds"
) as HTMLSelectElement;
const selectHabitat = document.getElementById(
  "select-enclosure"
) as HTMLSelectElement;
const savannahEnclosure = document.getElementById("savannah") as HTMLElement;
const jungleEnclosure = document.getElementById("jungle") as HTMLElement;
const reptileEnclosure = document.getElementById("reptileHouse") as HTMLElement;
const aquariumEnclosure = document.getElementById("aquarium") as HTMLElement;

const createAnimalButton = document.getElementById(
  "button"
) as HTMLInputElement;

const allZooAnimals: Animal[] = [];
const savannahAnimals: Animal[] = [];
const jungleAnimals: Animal[] = [];
const reptileHouseAnimals: Animal[] = [];
const aquariumAnimals: Animal[] = [];

createAnimalButton?.addEventListener("click", (event: Event) => {
  event.preventDefault();

  const type = selectAnimal.value;
  const name = nameOfAnimalInput.value;
  const yearOfBirth = Number(birthYearInput.value);
  const continent = selectContinent.value;
  const specialNeeds = selectSpecialNeeds.value;
  const habitat = selectHabitat.value;

  const animal = createAnimal(
    type,
    name,
    yearOfBirth,
    Number(continent),
    specialNeeds,
    Number(habitat)
  );

  console.log(animal);

  if (animal) {
    if (
      !type ||
      !name ||
      !yearOfBirth ||
      !continent ||
      !specialNeeds ||
      !habitat
    ) {
      console.error("All Fields are required");
    } else {
      allZooAnimals.push(animal);
      console.log(allZooAnimals);
    }

    function chooseHabitat() {
      if (type && name && yearOfBirth && continent && specialNeeds && habitat) {
        if (animal?._enclosureId === EnclosureId.SavannahHabitat) {
          savannahAnimals.push(animal);
          console.log("Savannah Habitat", savannahAnimals);
        }
        if (animal?._enclosureId === EnclosureId.JungleHabitat) {
          jungleAnimals.push(animal);
          console.log("Jungle Habitat", jungleAnimals);
        }
        if (animal?._enclosureId === EnclosureId.ReptileHouse) {
          reptileHouseAnimals.push(animal);
          console.log("Reptile Habitat", reptileHouseAnimals);
        }
        if (animal?._enclosureId === EnclosureId.AquaticHabitat) {
          aquariumAnimals.push(animal);
          console.log("aquarium Habitat", aquariumAnimals);
        }
      }
    }

    chooseHabitat();
    displayAnimalInEnclosure();
  }
});

function showAllAnimals() {
  const output = document.createElement("div");
  output.className = "output";

  allZooAnimals.forEach((animal) => {
    const card = document.createElement("div");
    card.className = "card";
    const emoji = document.createElement("div");
    emoji.innerHTML = animal._emoji;
    card.appendChild(emoji);
    const name = document.createElement("div");
    name.innerHTML = `Name: ${animal._name}`;
    card.appendChild(name);
    const currentYear = new Date().getFullYear();
    const age = currentYear - animal._yearOfBirth;
    const ageDiv = document.createElement("div");
    ageDiv.innerHTML = `Age: ${age.toString()}`;
    card.appendChild(ageDiv);
    const origin = document.createElement("div");
    const continent = animal._continent;
    if (continent) {
      switch (continent.toString()) {
        case "0":
          origin.innerHTML = "Origin: Antartica";
          break;
        case "1":
          origin.innerHTML = "Origin: Australia";
          break;
        case "2":
          origin.innerHTML = "Origin: Asia";
          break;
        case "3":
          origin.innerHTML = "Origin: Africa";
          break;
        case "4":
          origin.innerHTML = "Origin: Europe";
          break;
        case "5":
          origin.innerHTML = "Origin: North America";
          break;
        case "6":
          origin.innerHTML = "Origin: South America";
          break;
        default:
          break;
      }
    }
    // origin.innerHTML = `Origin: ${animal.continent}`;
    card.appendChild(origin);
    const enclosure = document.createElement("div");
    const enclosureNumber = animal._enclosureId.toString();
    if (enclosureNumber) {
      switch (enclosureNumber) {
        case "0":
          enclosure.innerHTML = "Enclosure: SavannahHabitat";
          break;
        case "1":
          enclosure.innerHTML = "Enclosure: JungleHabitat";
          break;
        case "2":
          enclosure.innerHTML = "Enclosure: AquaticHabitat";
          break;
        case "3":
          enclosure.innerHTML = "Enclosure: ReptileHouse";
          break;

        default:
          break;
      }
    }

    // enclosure.innerHTML = `Enclosure: ${animal.enclosureId.toString()}`;
    card.appendChild(enclosure);
    const changeButton = document.createElement("Button");
    changeButton.className = "changeBtn";
    changeButton.innerHTML = " Change Animal Data";
    card.appendChild(changeButton);
    const deleteButton = document.createElement("Button");
    deleteButton.className = "deleteBtn";
    deleteButton.innerHTML = " Delete Animal";

    card.appendChild(deleteButton);
    output.appendChild(card);

    deleteButton.addEventListener("click", () => {
      const cardIndex = Array.from(output.children).indexOf(card);
      allZooAnimals.splice(cardIndex, 1);
      switch (animal._enclosureId) {
        case 0:
          savannahAnimals.splice(cardIndex, 1);
          break;
        case 1:
          jungleAnimals.splice(cardIndex, 1);
          break;
        case 2:
          aquariumAnimals.splice(cardIndex, 1);
          break;
        case 3:
          reptileHouseAnimals.splice(cardIndex, 1);
          break;
        default:
          break;
      }
      output.removeChild(card);

      displayAnimalInEnclosure();
      console.log("Habitat after delete: ", allZooAnimals);
    });
  });
}

showAllAnimals();

function displayAnimalInEnclosure(): void {
  if (savannahEnclosure && savannahAnimals) {
    savannahEnclosure.innerHTML = "";
    savannahAnimals.forEach((animal: Animal, index) => {
      const emojiDiv = document.createElement("div");
      emojiDiv.className = "Emoji tooltip";
      const emoji = document.createElement("div");
      emoji.innerHTML = animal._emoji;
      const currentYear = new Date().getFullYear();
      const age = currentYear - animal._yearOfBirth;
      //* Tooltipp
      const tooltip = document.createElement("div");
      tooltip.className = "savannahtooltip tooltiptext";
      tooltip.innerHTML = `
            Name: ${animal._name}<br>
           Age: ${age}<br>
            Origin: ${animal._continent}<br>
           Special Needs: ${animal._specialNeeds}
           `;

      emojiDiv.appendChild(emoji);
      emojiDiv.appendChild(tooltip);

      savannahEnclosure.appendChild(emojiDiv);
      //* delete by dblclick
      emojiDiv.addEventListener("dblclick", () => {
        savannahAnimals.splice(index, 1);
        displayAnimalInEnclosure();
        console.log("SavannahHabitat after delete: ", savannahAnimals);
      });
    });
  }

  if (jungleEnclosure && jungleAnimals) {
    jungleEnclosure.innerHTML = "";
    jungleAnimals.forEach((animal: Animal, index) => {
      const emojiDiv = document.createElement("div");
      emojiDiv.className = "Emoji tooltip";
      const emoji = document.createElement("div");
      emoji.innerHTML = animal._emoji;
      const currentYear = new Date().getFullYear();
      const age = currentYear - animal._yearOfBirth;
      //* Tooltipp
      const tooltip = document.createElement("div");
      tooltip.className = "jungletooltip  tooltiptext";
      tooltip.innerHTML = `
            Name: ${animal._name}<br>
           Age: ${age}<br>
            Origin: ${animal._continent}<br>
           Special Needs: ${animal._specialNeeds}
           `;

      emojiDiv.appendChild(emoji);
      emojiDiv.appendChild(tooltip);

      jungleEnclosure.appendChild(emojiDiv);
      //* delete by dblclick
      emojiDiv.addEventListener("dblclick", () => {
        jungleAnimals.splice(index, 1);
        displayAnimalInEnclosure();
        console.log("JungleHabitat after delete: ", jungleAnimals);
      });
    });
  }

  if (reptileEnclosure && reptileHouseAnimals) {
    reptileEnclosure.innerHTML = "";
    reptileHouseAnimals.forEach((animal: Animal, index) => {
      const emojiDiv = document.createElement("div");
      emojiDiv.className = "Emoji tooltip";
      const emoji = document.createElement("div");
      emoji.innerHTML = animal._emoji;
      const currentYear = new Date().getFullYear();
      const age = currentYear - animal._yearOfBirth;
      //* Tooltipp
      const tooltip = document.createElement("div");
      tooltip.className = "reptiletooltip  tooltiptext";
      tooltip.innerHTML = `
            Name: ${animal._name}<br>
           Age: ${age}<br>
            Origin: ${animal._continent}<br>
           Special Needs: ${animal._specialNeeds}
           `;

      emojiDiv.appendChild(emoji);
      emojiDiv.appendChild(tooltip);

      reptileEnclosure.appendChild(emojiDiv);
      //* delete by dblclick
      emojiDiv.addEventListener("dblclick", () => {
        reptileHouseAnimals.splice(index, 1);
        displayAnimalInEnclosure();
        console.log("ReptileHabitat after delete: ", reptileHouseAnimals);
      });
    });
  }

  if (aquariumEnclosure && aquariumAnimals) {
    aquariumEnclosure.innerHTML = "";

    aquariumAnimals.forEach((animal: Animal, index) => {
      const emojiDiv = document.createElement("div");
      emojiDiv.className = "Emoji tooltip";
      const emoji = document.createElement("div");
      emoji.innerHTML = animal._emoji;
      emojiDiv.appendChild(emoji);
      const currentYear = new Date().getFullYear();
      const age = currentYear - animal._yearOfBirth;
      //* Tooltipp
      const tooltip = document.createElement("div");
      tooltip.className = "aquariumtooltip tooltiptext";
      tooltip.innerHTML = `
            Name: ${animal._name}<br>
           Age: ${age}<br>
            Origin: ${animal._continent}<br>
           Special Needs: ${animal._specialNeeds}
           `;

      emojiDiv.appendChild(tooltip);

      aquariumEnclosure.appendChild(emojiDiv);
      //* delete by dblclick
      emojiDiv.addEventListener("dblclick", () => {
        aquariumAnimals.splice(index, 1);
        displayAnimalInEnclosure();
        console.log("AquariumHabitat after delete: ", aquariumAnimals);
      });
    });
  }
}
