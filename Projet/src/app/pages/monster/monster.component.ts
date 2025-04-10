import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCartComponent } from "../../components/playing-cart/playing-cart.component";
import { Monster } from '../../Models/Monter.models';
import { MonsterService } from '../../services/monster/monster.service';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  imports: [ReactiveFormsModule, PlayingCartComponent, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy{
     
      
      private route = inject(ActivatedRoute);
      private router = inject(Router);
      private monsterService = inject(MonsterService);
      private fb = inject(FormBuilder);
      private readonly dialog = inject(MatDialog);

      /*monsterId = signal<number | undefined>(undefined);*/
      routeSubscription: Subscription | null = null ;
      formValueSubscription:Subscription | null = null; /* recuperer subscribe et le stocke */

      formGroup = this.fb.group({
        name: ['', Validators.required],
        image: ['', Validators.required],
        type: [MonsterType.ELECTRIC, Validators.required],
        hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
        figureCaption: ['', Validators.required],
        attackName: ['', Validators.required],
        attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
        attackDescription: ['', Validators.required]
      });

      monsterTypes = Object.values(MonsterType);
      monster: Monster = Object.assign(new Monster(), this.formGroup.value);
      monsterId = -1;
      
      ngOnInit(): void {
        this.formValueSubscription = this.formGroup.valueChanges.subscribe(data => {
          this.monster = Object.assign(new Monster(), data);
        });
       /*Lire parametre */
       this.routeSubscription = this.route.params.subscribe(params => {
    

        if(params['id']){
          this.monsterId = parseInt(params['id']);
          const monsterFound = this.monsterService.get(this.monsterId);
          if(monsterFound){
            this.monster = monsterFound;
            this.formGroup.patchValue(this.monster);
            console.log(this.monster);
            

          }
        }
       });
       
      }
      navigateBack(){
        this.router.navigate(["/home"]);
      }

      ngOnDestroy(): void {
        this.formValueSubscription?.unsubscribe();
        this.routeSubscription?.unsubscribe();
      }

      /*

      next(){
        let nextId = this.monsterId() || 0;
        nextId++;

        this.router.navigate(['/monster/' + nextId]);
      }
      */

      submit(event: Event){
        event.preventDefault();
        if (this.monsterId === -1){
          this.monsterService.add(this.monster);
        }else{
          this.monster.id = this.monsterId;
          this.monsterService.update(this.monster);
        }
        this.navigateBack();
        
      }

      /*
      setChange(){
        this.name.setValue('Changed');
      }
        */

      isFieldValid(name: string){
        const formControl = this.formGroup.get(name);
        return formControl?.invalid && (formControl?.dirty || formControl.touched);
      }

      onFileChange(event: any){
        const reader = new FileReader();
        if(event.target.files && event.target.files.length){
          const [file] = event.target.files;
          reader.readAsDataURL(file);
          reader.onload = () => {
              this.formGroup.patchValue({
                image: reader.result as string
              });
          };
        }
      }

      /*Marche */

      deleteMonster(){
        
        const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialogComponent);
        dialogRef.afterClosed().subscribe(confirm => {
          if(confirm){
            this.monsterService.delete(this.monsterId);
            this.navigateBack();
          }
        })
      }
}
