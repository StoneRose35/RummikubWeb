import { Component, Input, OnInit } from '@angular/core';
import { Figure } from './../figure'

@Component({
  selector: 'app-figure-serie',
  templateUrl: './figure-serie.component.html',
  styleUrls: ['./figure-serie.component.scss']
})
export class FigureSerieComponent implements OnInit {

  @Input()
  figures: Array<Figure>;

  constructor() { 
    this.figures=[];
  }

  ngOnInit(): void {
  }

}
