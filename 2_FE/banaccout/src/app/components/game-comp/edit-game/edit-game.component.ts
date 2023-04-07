import { GameService } from './../../../services/game.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { game } from 'src/app/models/game';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  @Input() tmp?: game;
  @Output() updatetmp = new EventEmitter<game[]>();
  tmps: game[] = [];

  constructor(private sv: GameService) { }

  ngOnInit(): void {
    this.refresh();
  }

  add(tmpp:game){
    this.sv.themg(tmpp).subscribe((tmps: game[]) => this.updatetmp.emit(tmps));
  }

  update(tmpp: game){
    this.sv.suag(tmpp).subscribe((tmps: game[]) => this.updatetmp.emit(tmps));
  }

  deleteg(tmpp: game){
    if (confirm('Bạn chắc chắn muốn xóa?')){
      this.sv.xoag(tmpp).subscribe((tmps: game[]) => this.updatetmp.emit(tmps));
    }
  }

  refresh(){
    this.sv.getg().subscribe((result: game[]) => (this.tmps = result));
  }
}
