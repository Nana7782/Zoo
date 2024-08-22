import Continent from "../enums/Continent";
import EnclosureId from "../enums/EnclosureID";
import IAnimal from "../interface/IAnimal";

class Animal implements IAnimal {
  _emoji: string;
  _type: string;
  _name: string;
  _yearOfBirth: number;
  _continent: Continent;
  _specialNeeds: string;
  _enclosureId: EnclosureId;

  constructor(
    emoji: string,
    type: string,
    name: string,
    yearOfBirth: number,
    continent: Continent,
    specialNeeds: string,
    enclosureId: EnclosureId
  ) {
    this._emoji = emoji;
    this._type = type;
    this._name = name;
    this._yearOfBirth = yearOfBirth;
    this._continent = continent;
    this._specialNeeds = specialNeeds;
    this._enclosureId = enclosureId;
  }
}

export default Animal;
