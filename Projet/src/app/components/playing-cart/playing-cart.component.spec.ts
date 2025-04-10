import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingCartComponent } from './playing-cart.component';

describe('PlayingCartComponent', () => {
  let component: PlayingCartComponent;
  let fixture: ComponentFixture<PlayingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
