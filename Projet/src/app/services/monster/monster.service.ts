import { Injectable } from '@angular/core';
import { Monster } from '../../Models/Monter.models';
import { MonsterType } from '../../utils/monster.utils';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  monsters: Monster[] = [];
  currentIndex = 1;



  constructor() {
    this.load();
  
  }

  private save(){
    localStorage.setItem('monster' , JSON.stringify(this.monsters));
  }

  private load(){
    const monsterData = localStorage.getItem('monster');
    if(monsterData){
      this.monsters = JSON.parse(monsterData).map((monsterJSON : any) => Object.assign(new Monster( ), monsterJSON));
      this.currentIndex = Math.max(...this.monsters.map(monster => monster.id));
    } else {
      this.init();
      this.save();


    }
  }

  
    private init(){
      this.monsters = [];
      this.currentIndex = 1; 
    
      const monster1 = new Monster();
      monster1.id = this.currentIndex++;
      monster1.name = "Salameche";
      monster1.hp = 40;
      monster1.image = "assets/Salameche.jpg";
      monster1.type = MonsterType.FIRE;
      monster1.figureCaption = "N*002";
      this.monsters.push(monster1);
    
      const monster2 = new Monster();
      monster2.id = this.currentIndex++;
      monster2.name = "Carapuce";
      monster2.hp = 70;
      monster2.image = "assets/Carapuce.jpg";
      monster2.type = MonsterType.WATER;
      monster2.figureCaption = "N*003";
      this.monsters.push(monster2);
    
      const monster3 = new Monster();
      monster3.id = this.currentIndex++;
      monster3.name = "Bulbizarre";
      monster3.hp = 90;
      monster3.image = "assets/Bulbizarre.jpg";
      monster3.type = MonsterType.PLANT;
      monster3.figureCaption = "N*004";
      this.monsters.push(monster3);
    
      const monster4 = new Monster();
      monster4.id = this.currentIndex++;
      monster4.name = "Minidraco";
      monster4.hp = 50;
      monster4.image = "assets/minidraco.jpg";
      monster4.type = MonsterType.WATER;
      monster4.figureCaption = "N*005";
      this.monsters.push(monster4);
    }
    
  

  getAll():Monster[] {
    return this.monsters.map(monster => monster.copy());
  }

  get(id: number): Monster | undefined{
    const monster = this.monsters.find(monster => monster.id === id);
    return monster ? monster.copy() : undefined;
  }

  add(monster : Monster) : Monster {
    const monsterCopy = monster.copy();

    monsterCopy.id = this.currentIndex;
    this.monsters.push(monsterCopy.copy());
    this.currentIndex++;
    this.save();

    return monsterCopy;
  }


  update(monster : Monster): Monster {
      const monsterCopy = monster.copy();

      const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === monster.id);
      if(monsterIndex != -1){
        this.monsters[monsterIndex] = monsterCopy.copy();
        this.save();

      }

      return monsterCopy;


  }

  delete(id: number){
    const monsterIndex = this.monsters.findIndex(originalMonster => originalMonster.id === id);
      if(monsterIndex != -1){
        this.monsters.splice(monsterIndex, 1);
        this.save();
      }
    }

    reset(){
      localStorage.removeItem('monster');
      this.init();
      this.save();
    }
    
}

  

