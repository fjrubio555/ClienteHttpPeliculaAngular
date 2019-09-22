import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyadirComponent } from './anyadir.component';

describe('AnyadirComponent', () => {
  let component: AnyadirComponent;
  let fixture: ComponentFixture<AnyadirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnyadirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyadirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
