import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcardeditComponent } from './eventcardedit.component';

describe('EventcardeditComponent', () => {
  let component: EventcardeditComponent;
  let fixture: ComponentFixture<EventcardeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventcardeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventcardeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
