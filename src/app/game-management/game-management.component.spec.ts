import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameManagementComponent } from './game-management.component';
import {MatSnackBarModule, MatSnackBarConfig} from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';


describe('GameManagementComponent', () => {
  let component: GameManagementComponent;
  let fixture: ComponentFixture<GameManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameManagementComponent ],
      imports: [MatSnackBarModule, MatDialogModule, DragDropModule],
      providers: [MatSnackBarConfig]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
