import { Component, Input, OnInit } from '@angular/core';
import {RKColor} from './../rkcolor'
import {Figure} from './../figure'

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.scss']
})
export class FigureComponent implements OnInit {

  @Input()
  figure: Figure;

  constructor() { }

  ngOnInit(): void {
  }

}
