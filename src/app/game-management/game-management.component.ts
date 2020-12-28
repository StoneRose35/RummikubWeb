import { Component, OnInit } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Figure} from './../figure';
import {RKColor} from '../rkcolor';
import {MatDialog} from '@angular/material/dialog';
import { NewPlayerDialogComponent } from '../new-player-dialog/new-player-dialog.component';
import { GameService, Player } from './../game.service';
import { JokerProcessor } from './../joker-processor'

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {

  tableFigures: Array<Array<Figure>>;
  stackFigures: Array<Figure>;
  players: Array<Player>;
  message: String;
  playing: Boolean;
  gameState: String;
  activePlayer: Player;
  stackFiguresOld: Array<Figure>;
  tableFiguresOld: Array<Array<Figure>>;
  playerPollSubscription: any;
  tablePollSubscription: any;
  activityChangeSubscription: any;
 

  constructor(private snackBar: MatSnackBar
              ,private sbConfig: MatSnackBarConfig
              ,private dialog: MatDialog
              ,public gs: GameService
              ) { 
    this.sbConfig.duration=2000;
    this.stackFigures = [];
    this.players=[];
    this.gameState = "New Game";
  }

  ngOnInit(): void {

    this.activePlayer = this.gs.p;
    this.gameState="Start Game";
    this.snackBar.open(`New Game ${this.gs.gameId} Initialized`,null,this.sbConfig);
    this.message=`Running Game ${this.gs.gameId}`;
    this.stackFigures = [];
    this.tableFigures=[];
    this.gs.pollTable().subscribe(t => {
      this.tableFigures=t;
      this.gs.shelfFigures().subscribe(f => {
        this.stackFigures=f;
        this.onTurn();
      });
    });
    if (this.playerPollSubscription == null)
    {
      this.playerPollSubscription = this.gs.pollPlayers().subscribe(ps => {
        this.players=ps;
        this.gs.p.active = ps.filter(p => p.name === this.gs.p.name)[0].active;
        if (this.playing===true && this.gs.p.active===false)
        {
          // switch from active to inactive
          this.playing=this.gs.p.active;
        }
        else if (this.playing===false && this.gs.p.active===true)
        {
          // switch from passive to active
          this.gs.pollTable().subscribe(t => {
            this.tableFigures=t; 
            this.onTurn();
            this.playing=this.gs.p.active;
          });
        }
        else
        {
          this.playing = this.gs.p.active;
        }
      });
    }
  }

  drawFigure() {
    this.gs.drawFigure().subscribe(fig => this.stackFigures.push(fig));
  }

  submitMove() {
    const gameState={tableFigures: this.tableFigures, shelfFigures: this.stackFigures, accepted: false, roundNr: 13 };
    this.gs.submitMove(gameState).subscribe(r => {
      if (r.accepted == false) // game state submitted is invalid
      {
        this.snackBar.open("Invalid Move, resetting",null,this.sbConfig);
        this.resetMove();
      }
      else 
      {
        this.stackFigures = r.shelfFigures;
        this.tableFigures = r.tableFigures;
      }
    });
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

  drop(event: CdkDragDrop<Figure[]>) {
    let jp = new JokerProcessor();
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      jp.reset(event.container.data);
    }
  }

  dropNewSeries(event: CdkDragDrop<Figure[]>) {
    this.tableFigures.push([]);
    transferArrayItem(event.previousContainer.data,
                      this.tableFigures[this.tableFigures.length-1],
                      event.previousIndex,
                      0);
  }

}
