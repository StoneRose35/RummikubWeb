import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { GameManagementComponent} from './../game-management/game-management.component'
import { GamesOverviewComponent } from './../games-overview/games-overview.component'


const routes: Routes = [
  { path: 'overview', component: GamesOverviewComponent },
  { path: 'game-management', component: GameManagementComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
