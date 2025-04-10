import { MonsterType } from "../utils/monster.utils";

export class Monster{
    id: number = -1;
    name: string = "Monter";
    image: string = "assets/Pikachu.jpg";
    type: MonsterType = MonsterType.ELECTRIC;
    hp: number = 60;
    figureCaption: string = "N*001";
    attackName: string="Standart ....";
    attackStrength: number = 10;
    attackDescription : string = "This is a long description";

    copy(): Monster{
        return Object.assign(new Monster(), this);
    }
}