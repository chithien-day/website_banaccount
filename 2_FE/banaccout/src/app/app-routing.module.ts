import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCompComponent } from './components/account-comp/account-comp.component';
import { GameCompComponent } from './components/game-comp/game-comp.component';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', component: GameCompComponent},
  { path: 'accounts', component: AccountCompComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
