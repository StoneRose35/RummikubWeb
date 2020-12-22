import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import {map,takeUntil} from 'rxjs/operators';
import {Figure} from './figure';

export interface Game {
  message: String;
  tableFigures: Array<Array<Figure>>;
  error: String; 
}

export interface GameState {
  player: Player;
  tableFigures: Array<Array<Figure>>;
  stackFigures: Array<Figure>;
  accepted: boolean;
}

export interface Player {
  name: String;
  active: boolean;
}

export interface Response {
  message: String;
  error: String;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  p: Player;
  constructor() { }

  public startGame(gameId: String): Observable<Game>
  {
    let data = {message: "Game Started", tableFigures: [[{color: {name: "red", rgb: [255,0,0], code: 0}, instance: 0, value: 12}]], error: ""}
    return of(data);
  }

  public pollTableFigures(): Observable<Array<Figure>> 
  {
    return of(null);
  }

  public registerPlayer(playerName: String, gameId: String): Observable<Response>
  {
    this.p = {name: playerName, active: true};
    return of({message: "Player registered successfully", error: null});
  }

  public initGame(): Observable<String> 
  {
    return of("AABBCC");
  }

  public pollPlayers(gameId: String): Observable<Array<Player>> 
  {
    if (gameId=="")
    {
      let data = [{name: "void", active: false}];
      return timer(1,2000).pipe(map(t => data));
    }
    else
    {
      let data = [this.p, {name: "Finni", active: false}];
      return timer(1,2000).pipe(map(t => {
        this.p.active=t%2==0;
        return data;
      }));
    }
    
    
  }

  public submitMove(stateOld: GameState): Observable<GameState>
  {
    stateOld.accepted = false;
    stateOld.player.active = false;
    return of(stateOld);
  }

}
