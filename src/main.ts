import Animal from "./classes/Animal";
import EnclosureId from "./enums/EnclosureID";
import { createAnimal } from "./func/createAnimal";

// Elemente selektieren

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
) as HTMLButtonElement;

const allZooAnimals: Animal[] = [];
const savannahAnimals: Animal[] = [];
const jungleAnimals: Animal[] = [];
const reptileAnimals: Animal[] = [];
const aquariumAnimals: Animal[] = [];

createAnimalButton?.addEventListener("click", (event: Event) => {
  event.preventDefault();
  const type = selectAnimal.value;
  const name = nameOfAnimalInput.value;
  const yearOfBirth = Number(birthYearInput.value);
  const continent = Number(selectContinent.value);
  const specialNeeds = selectSpecialNeeds.value;
  const habitat = Number(selectHabitat.value);
  console.log(type, name, yearOfBirth, continent, specialNeeds, habitat);

  const animal = createAnimal(
    type,
    name,
    yearOfBirth,
    continent,
    specialNeeds,
    habitat
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
      // cer
      console.error("All fields are required");
    } else {
      allZooAnimals.push(animal);
      console.log(allZooAnimals);
    }
  }
});
