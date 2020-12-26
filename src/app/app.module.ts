import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameManagementComponent } from './game-management/game-management.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FigureComponent } from './figure/figure.component';
import { FigureSerieComponent } from './figure-serie/figure-serie.component';
import { MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NewPlayerDialogComponent } from './new-player-dialog/new-player-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GamesOverviewComponent } from './games-overview/games-overview.component';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GameManagementComponent,
    FigureComponent,
    FigureSerieComponent,
    NewPlayerDialogComponent,
    GamesOverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [MatSnackBar, Overlay, MatSnackBarConfig],
  bootstrap: [AppComponent],
  entryComponents: [NewPlayerDialogComponent]
})
export class AppModule { }
