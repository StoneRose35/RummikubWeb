import { Component, OnInit } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Figure} from './../figure'
import {RKColor} from '../rkcolor'
import {MatDialog} from '@angular/material/dialog';
import { NewPlayerDialogComponent } from '../new-player-dialog/new-player-dialog.component';

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {

  tableFigures: Array<Array<Figure>>;
  stackFigures: Array<Figure>;
  players: Array<String>;
  message: String;
  activeGame: String;
  playing: Boolean;
  gameState: String;
  activePlayer: String;
  stackFiguresOld: Array<Figure>;
  tableFiguresOld: Array<Array<Figure>>;
  constructor(private snackBar: MatSnackBar,private sbConfig: MatSnackBarConfig,private dialog: MatDialog) { 
    this.sbConfig.duration=2000;
    this.stackFigures = [];
    this.activeGame = "";
    this.players=[];
    this.gameState = "New Game";
  }

  ngOnInit(): void {
  }

  registerGame(gameId: String): void {

      this.snackBar.open("Game successfully registered",null,this.sbConfig);
      this.activeGame=gameId;
      this.playing=true;
      this.message="Running Game " + this.activeGame + ", Round 15";

  }

  newGame() : void {
    if (this.gameState=="New Game")
    {
      const dialogRef = this.dialog.open(NewPlayerDialogComponent);
      this.players=[];
      dialogRef.afterClosed().subscribe(res => {
        this.players.push(res);
        this.activePlayer = res;
      });
      this.gameState="Start Game";
      this.activeGame = "AC47DD2F6";
      this.playing = false;
      this.snackBar.open("New Game Initialized",null,this.sbConfig);
      this.stackFigures=[];
      this.tableFigures=[];
      this.message="Running Game AABBCC, Round 0";
    }
    else
    {
      this.gameState="New Game";
      this.stackFigures=[new Figure(new RKColor(0),0,12),new Figure(new RKColor(1),0,3)];
      this.tableFigures=[];
      this.onTurn();
    }

  }

  drawFigure() {

  }

  submitMove() {

  }

  resetMove() {
    this.stackFigures=[];
    this.tableFigures=[];
    this.stackFiguresOld.forEach(f => {
      this.stackFigures.push(f);
    });
    this.tableFiguresOld.forEach(tf => {
      this.tableFigures.push([]);
      tf.forEach(f => {
        this.tableFigures[this.tableFigures.length-1].push(f);
      });
    });

  }

  onTurn() {

    this.playing=true;
    this.stackFiguresOld=[];
    this.tableFiguresOld=[];
    this.stackFigures.forEach(f => {
      this.stackFiguresOld.push(f);
    });
    this.tableFigures.forEach(tf => {
      this.tableFiguresOld.push([]);
      tf.forEach(f => {
        this.tableFiguresOld[this.tableFiguresOld.length-1].push(f);
      });
    });

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  dropNewSeries(event: CdkDragDrop<Figure[]>) {
    let droppedFigure = event.previousContainer.data[event.previousIndex]
    this.tableFigures.push([]);
    transferArrayItem(event.previousContainer.data,
                      this.tableFigures[this.tableFigures.length-1],
                      event.previousIndex,
                      0);
  }

}
