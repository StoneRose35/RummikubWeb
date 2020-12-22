import { Component, OnInit } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Figure} from './../figure'
import {RKColor} from '../rkcolor'
import {MatDialog} from '@angular/material/dialog';
import { NewPlayerDialogComponent } from '../new-player-dialog/new-player-dialog.component';
import { GameService, Player } from './../game.service'

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
  activeGame: String;
  playing: Boolean;
  gameState: String;
  activePlayer: Player;
  stackFiguresOld: Array<Figure>;
  tableFiguresOld: Array<Array<Figure>>;
  playerPollSubscription: any;
  constructor(private snackBar: MatSnackBar,private sbConfig: MatSnackBarConfig,private dialog: MatDialog,public gs: GameService) { 
    this.sbConfig.duration=2000;
    this.stackFigures = [];
    this.activeGame = "";
    this.players=[];
    this.gameState = "New Game";
  }

  ngOnInit(): void {
    /*
    this.playerPollSubscription = this.gs.pollPlayers("").subscribe(ps => {
      this.players=ps;
    });*/
  }

  registerGame(gameId: String): void {

      this.snackBar.open("Game successfully registered",null,this.sbConfig);
      this.activeGame=gameId;
      this.message="Running Game " + this.activeGame + ", Round 15";

  }

  newGame() : void {
    if (this.gameState=="New Game")
    {
      this.gs.initGame().subscribe(res => {

        const dialogRef = this.dialog.open(NewPlayerDialogComponent);
        this.players=[];
        dialogRef.afterClosed().subscribe(playerName => {
          this.gs.registerPlayer(playerName,res).subscribe(resp => {
            if (resp.error == null)
            {
              let player = {name: playerName, active: false};
              this.players.push(player);
              this.activePlayer = player;
    
              this.gameState="Start Game";
              this.activeGame = res;
              this.playing = false;
              this.snackBar.open(`New Game ${res} Initialized`,null,this.sbConfig);
              this.message=`Running Game ${res}`;
              this.stackFigures=[];
              this.tableFigures=[];
              if (this.playerPollSubscription != null)
              {
                 this.playerPollSubscription.unsubscribe();
              }
              this.playerPollSubscription = this.gs.pollPlayers(this.activeGame).subscribe(ps => {
                this.players=ps;
                let isplaying=false;
                for (let p of this.players)
                {
                  if (p.active==true && p.name==this.activePlayer.name)
                  {
                    isplaying=true;
                  }
                }
                this.playing=isplaying;
              });
          }
          }); 

        });
      });
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
