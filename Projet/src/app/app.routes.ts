import { Routes } from '@angular/router';
import { MonsterListComponent } from './pages/monster-list/monster-list.component';
import { MonsterComponent } from './pages/monster/monster.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [{
    /*Faire une redirection */
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' 

},
    
    
    
    
    {
    path: 'home',
    component: MonsterListComponent

},{
    path: 'login',
    component: LoginComponent
},



{
    path: "monster/:id",
    component: MonsterComponent
    

},{
    path: "**",
    component: NotFoundComponent
}];
