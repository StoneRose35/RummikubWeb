import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameManagementComponent } from './game-management/game-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FigureComponent } from './figure/figure.component';

@NgModule({
  declarations: [
    AppComponent,
    GameManagementComponent,
    FigureComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [MatSnackBar, Overlay, MatSnackBarConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
