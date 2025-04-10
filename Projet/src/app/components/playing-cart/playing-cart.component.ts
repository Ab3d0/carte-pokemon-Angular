import { Component, Input, InputSignal, OnChanges, SimpleChanges } from '@angular/core';
import { Monster } from '../../Models/Monter.models';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-cart',
  imports: [],
  templateUrl: './playing-cart.component.html',
  styleUrl: './playing-cart.component.css'
})
export class PlayingCartComponent implements OnChanges {
     
     @Input() monster = new Monster();

     monsterTypeIcon: string = "assets/electric.png";
     backgroundColor: string = "rgb(255,255,104)";
     
     ngOnChanges(changes: SimpleChanges): void {
      if(changes["monster"]){
        if(changes["monster"].previousValue?.type != changes["monster"].currentValue.type){
          this.monsterTypeIcon = MonsterTypeProperties[this.monster.type].imageUrl;
          this.backgroundColor = MonsterTypeProperties[this.monster.type].color;
        }
      }
    }



}