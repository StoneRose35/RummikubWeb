import { Component, OnInit } from '@angular/core';
import { GameService, GameOverview } from './../game.service';
import { NewPlayerDialogComponent } from './../new-player-dialog/new-player-dialog.component';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.scss']
})
export class GamesOverviewComponent implements OnInit {

  games: Array<GameOverview>;

  constructor(private snackBar: MatSnackBar,
              private sbConfig: MatSnackBarConfig,
              private gs: GameService,
              private dialog: MatDialog,
              private router: Router){ }

  ngOnInit(): void {
    this.updateGameList();
  }

  updateGameList()
  {
    this.gs.getGames().subscribe(games => this.games = games);
  }

  registerGame(name: String)
  {
    this.gs.initGame(name).subscribe(() => this.updateGameList());
  }

  joinGame(gameName: String)
  {
    const dialogRef = this.dialog.open(NewPlayerDialogComponent);
        dialogRef.afterClosed().subscribe(s => {
          this.gs.registerPlayer(s,gameName).subscribe(r => {
            if (r.error != null)
            {
                this.snackBar.open(`Player registration failed: ${r.error}`,null,this.sbConfig);
            }
            else
            {
                this.router.navigateByUrl("/game-management");
            }
          });
        });
  }

}
