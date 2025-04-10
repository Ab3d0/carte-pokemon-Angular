export enum MonsterType{
    PLANT = "plant",
    ELECTRIC = "electric",
    FIRE = "fire",
    WATER = 'water',

}
/*Avoir les propriété */
export interface IMonsterProperties {
    imageUrl: string;
    color: string;
}

export const MonsterTypeProperties : {[key : string]: IMonsterProperties} = {
    [MonsterType.PLANT]: {
        imageUrl: 'assets/plante.png' ,
        color: 'rgba(11,151,13)'
    },

    [MonsterType.FIRE]: {
        imageUrl: 'assets/Fire.png' ,
        color: 'rgba(202, 38, 22)'
    },

    [MonsterType.ELECTRIC]: {
        imageUrl: 'assets/electric.png' ,
        color: 'rgba(135, 255, 124)'
    },

    [MonsterType.WATER]: {
        imageUrl: 'assets/eau.png' ,
        color: 'rgba(10, 156, 229)'
    }


}


