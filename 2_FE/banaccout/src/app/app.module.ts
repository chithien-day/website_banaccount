import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GameCompComponent } from './components/game-comp/game-comp.component';
import { AccountCompComponent } from './components/account-comp/account-comp.component';
import { EditGameComponent } from './components/game-comp/edit-game/edit-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameCompComponent,
    AccountCompComponent,
    EditGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
