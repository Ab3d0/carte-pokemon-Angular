/*
import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { PlayingCartComponent } from "./components/playing-cart/playing-cart.component";
import { Monster } from './Models/Monter.models';
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { MonsterType } from './utils/monster.utils';
import { CommonModule } from '@angular/common';
import { MonsterService } from './services/monster/monster.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PlayingCartComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {

  monsterService = inject(MonsterService);
 
  monsters = signal<Monster[]>([]);
  search = model('');

  filteredMonsters = computed(() =>{
    return this.monsters().filter(monster => monster.name.includes(this.search()));
  })

 

  constructor(){
  this.monsters.set( this.monsterService.getAll());
    

    
    
  }

  addMonster(){
    const generic = new Monster();
    this.monsterService.add(generic);
    this.monsters.set(this.monsterService.getAll());
  }

 

  resetMonsters() {
    this.monsterService.reset();
    this.monsters.set(this.monsterService.getAll());
  }
  
  

  
}

*/

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent{

}