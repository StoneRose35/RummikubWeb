import { Injectable } from '@angular/core';
import { Observable, of, timer, Subject } from 'rxjs';
import {map,switchMap,takeUntil} from 'rxjs/operators';
import {Figure} from './figure';
import { RKColor } from './rkcolor';
import { HttpClient,HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';  


export interface Game {
  message: String;
  tableFigures: Array<Array<Figure>>;
  error: String; 

}

export interface GameOverview {
  players: Array<String>;
  name: String;
}

export interface GameState {
  tableFigures: Array<Array<Figure>>;
  shelfFigures: Array<Figure>;
  roundNr: number;
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

export interface ResponsePlayer {
  message: String;
  error: String;
  player: Player;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  p: Player;
  gameId: String;
  activityChangedSubject: Subject<boolean>;
  roundNr: number;

  constructor(private http: HttpClient) { 
    this.activityChangedSubject=new Subject<boolean>();
    this.p = {name: null, active: false};
  }

  public getGames(): Observable<Array<GameOverview>>
  {
      return this.http.get<Array<GameOverview>>("http://localhost:8080/games");
  }


  public startGame(gameId: String): Observable<Game>
  {
    let data = {message: "Game Started", tableFigures: [[{color: {name: "red", rgb: [255,0,0], code: 0}, instance: 0, number: 12}]], error: ""}
    return of(data);
  }

  public registerPlayer(playerName: String, gameName: String): Observable<ResponsePlayer>
  {
    return this.http.get<ResponsePlayer>("http://localhost:8080/registerPlayer",{params: {name: playerName.toString(),gameId: gameName.toString() },withCredentials: true})
  }

  public shelfFigures(): Observable<Array<Figure>>
  {
    return this.http.get<Array<Figure>>("http://localhost:8080/shelfFigures",{withCredentials: true});
  }

  public initGame(gameName: String): Observable<Response> 
  {
    this.gameId = gameName;
    return this.http.get<Response>("http://localhost:8080/newgame",{params: {name: gameName.toString()}});
  }

  public pollPlayers(): Observable<Array<Player>> 
  {
    const act_old = this.p.active;
    return timer(1,5000).pipe(switchMap(() => this.http.get<Array<Player>>("http://localhost:8080/players",{withCredentials: true})));
  }

  activityChanged(): Observable<boolean> {
    return this.activityChangedSubject;
  }

  pollTable(): Observable<Array<Array<Figure>>>
  {  
    return this.http.get<Array<Array<Figure>>>("http://localhost:8080/tableFigures",{withCredentials: true});
    /*
    const data: Array<Array<Figure>> =[[{color: new RKColor(3),instance:0, number:12}]]; 
    return of(data);
    */
  }

  public connectToGame(gameId: String): Observable<Response>
  {
    this.gameId=gameId;
    const resp={message: "Successfully attached game", error: null};
    return of(resp);
  }

  public drawFigure(): Observable<Figure>
  {
    return this.http.get<Figure>("http://localhost:8080/draw",{withCredentials: true});
  }

  public submitMove(stateOld: GameState): Observable<GameState>
  {
    return this.http.post<GameState>("http://localhost:8080/submitMove",stateOld,{withCredentials: true});
    /*stateOld.accepted = false;
    this.p.active = false;
    return of(stateOld);
    */
  }

}
