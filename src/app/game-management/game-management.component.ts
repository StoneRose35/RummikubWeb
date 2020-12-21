import { Component, OnInit } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';
import {CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule} from '@angular/cdk/drag-drop';
import {Figure} from './../figure'
import {RKColor} from '../rkcolor'
import { FigureComponent } from '../figure/figure.component';

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrls: ['./game-management.component.scss']
})
export class GameManagementComponent implements OnInit {

  tableFigures: Array<Array<Figure>>;
  stackFigures: Array<Figure>;
  message: String;
  constructor(private snackBar: MatSnackBar,private sbConfig: MatSnackBarConfig) { 
    this.sbConfig.duration=2000;
    this.stackFigures = [];
  }

  ngOnInit(): void {
  }

  registerGame(gameId: String): void {

      this.snackBar.open("Game successfully registered",null,this.sbConfig);
      this.message="Running Game AABBCC, Round 15";

  }

  newGame() : void {

    this.snackBar.open("New Game Initialized",null,this.sbConfig);
    this.stackFigures=[];
    this.stackFigures.push(new Figure(new RKColor(0),0,12),new Figure(new RKColor(1),0,3));
    this.tableFigures=[];
    this.tableFigures.push([new Figure(new RKColor(0),0,3), new Figure(new RKColor(0),0,4),new Figure(new RKColor(0),0,5), new Figure(new RKColor(0),0,6)]);
    this.tableFigures.push([new Figure(new RKColor(1),0,9), new Figure(new RKColor(1),0,10),new Figure(new RKColor(1),0,11), new Figure(new RKColor(0),0,12)]);
    this.message="Running Game AABBCC, Round 0";

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

  dropInSeries(event: CdkDragDrop<FigureComponent>) {
  
  }

}
