import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-comp',
  templateUrl: './game-comp.component.html',
  styleUrls: ['./game-comp.component.css']
})
export class GameCompComponent implements OnInit {
  title = "show";
  tmp: game[] = [];
  @Output() update = new EventEmitter<game[]>();
  updatetmp? : game;
  //List data
  List : any = [];

  constructor(private gsv: GameService) { }

  ngOnInit(): void {
    this.refreshlist();
  }

  updatefunc(tmp: game[]){
    this.tmp = tmp;
    this.gsv.getg().subscribe((result: game[]) => (
      this.tmp = result
    ));
  }

  init(){
    this.updatetmp = new game();
  }

  refreshlist(){
    this.gsv.getg().subscribe((result: game[]) => (
      this.tmp = result
    ));
  }

  sua(tmps: game){
    this.updatetmp = tmps;
  }
}
