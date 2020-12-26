import { Injectable } from '@angular/core';
import { Observable, of, timer, Subject } from 'rxjs';
import {map,takeUntil} from 'rxjs/operators';
import {Figure} from './figure';
import { RKColor } from './rkcolor';


export interface Game {
  message: String;
  tableFigures: Array<Array<Figure>>;
  error: String; 
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

  constructor() { 
    this.activityChangedSubject=new Subject<boolean>();
  }


  public startGame(gameId: String): Observable<Game>
  {
    let data = {message: "Game Started", tableFigures: [[{color: {name: "red", rgb: [255,0,0], code: 0}, instance: 0, number: 12}]], error: ""}
    return of(data);
  }

  public registerPlayer(playerName: String): Observable<Response>
  {
    this.p = {name: playerName, active: true};
    return of({message: "Player registered successfully", error: null});
  }

  public shelfFigures(): Observable<Array<Figure>>
  {
    return of([{color: {name: "red", rgb: [255,0,0], code: 0}, instance: 0, number: 12}]);
  }

  public initGame(name: String): Observable<Response> 
  {
    this.gameId = "AABBCC";
    return of({message: "Game " + name + " successfully created", error: null});
  }

  public pollPlayers(): Observable<Array<Player>> 
  {
    const act_old = this.p.active;
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
