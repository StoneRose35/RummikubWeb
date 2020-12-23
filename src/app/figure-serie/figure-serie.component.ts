import { Component, Input, OnInit } from '@angular/core';
import { Figure } from './../figure';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-figure-serie',
  templateUrl: './figure-serie.component.html',
  styleUrls: ['./figure-serie.component.scss']
})
export class FigureSerieComponent implements OnInit {

  @Input()
  figures: Array<Figure>;

  @Input()
  disabled: Boolean;

  constructor() { 
    this.figures=[];
  }

  ngOnInit(): void {
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

}
