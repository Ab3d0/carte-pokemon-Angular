import { Component, computed, inject, model, signal } from '@angular/core';
import { Monster } from '../../Models/Monter.models';
import { MonsterService } from '../../services/monster/monster.service';
import { CommonModule } from '@angular/common';
import { PlayingCartComponent } from '../../components/playing-cart/playing-cart.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-list',
  imports: [CommonModule, PlayingCartComponent, SearchBarComponent],
  templateUrl: './monster-list.component.html',
  styleUrl: './monster-list.component.css'
})
export class MonsterListComponent {


  private monsterService = inject(MonsterService);
  private router = inject(Router);
 
  monsters = signal<Monster[]>([]);
  search = model('');

  filteredMonsters = computed(() =>{
    return this.monsters().filter(monster => monster.name.includes(this.search()));
  })

 

  constructor(){
  this.monsters.set( this.monsterService.getAll());
    

    
    
  }

  addMonster(){
    this.router.navigate(["monster"]);
    /*
    const generic = new Monster();
    this.monsterService.add(generic);
    this.monsters.set(this.monsterService.getAll());
    */
  }

  openMonster(monster: Monster){
      this.router.navigate(["monster" , monster.id]);
  }

 

  resetMonsters() {
    this.monsterService.reset();
    this.monsters.set(this.monsterService.getAll());
  }
}
