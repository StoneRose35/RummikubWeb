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
  stackFigures: Array<Figure>;
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

@Injectable({
  providedIn: 'root'
})
export class GameService {

  p: Player;
  gameId: String;
  activityChangedSubject: Subject<boolean>;

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

  public registerPlayer(playerName: String, gameName: String): Observable<Response>
  {
    this.p.name=playerName;
    return this.http.get<Response>("http://localhost:8080/registerPlayer",{params: {name: playerName.toString(),gameId: gameName.toString() },withCredentials: true});
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
    //return timer(1,200).pipe(switchMap(() => this.http.get<Array<Player>>("http://localhost:8080/players",{withCredentials: true})));
    
    if (this.gameId=="")
    {
      let data = [{name: "void", active: false}];
      return timer(1,2000).pipe(map(t => data));
    }
    else
    {
      let data = [this.p, {name: "Finni", active: false}];
      return timer(1,5000).pipe(map(t => {
        this.p.active=t%2==0;
        data[1].active=t%2==1;
        if (this.p.active != act_old)
        {
          this.activityChangedSubject.next(this.p.active);
        }
        return data;
      }));
    }
  }

  activityChanged(): Observable<boolean> {
    return this.activityChangedSubject;
  }

  pollTable(): Observable<Array<Array<Figure>>>{
    const data: Array<Array<Figure>> =[[{color: new RKColor(3),instance:0, number:12}]]; 
    return of(data);
  }

  public connectToGame(gameId: String): Observable<Response>
  {
    this.gameId=gameId;
    const resp={message: "Successfully attached game", error: null};
    return of(resp);
  }

  public drawFigure(): Observable<Figure>
  {
    const f = new Figure(new RKColor(1),0,4);
    this.p.active=false;
    return of(f);
  }

  public submitMove(stateOld: GameState): Observable<GameState>
  {
    stateOld.accepted = false;
    this.p.active = false;
    return of(stateOld);
  }

}
