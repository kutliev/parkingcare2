import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotcardeditComponent } from './spotcardedit.component';

describe('SpotcardeditComponent', () => {
  let component: SpotcardeditComponent;
  let fixture: ComponentFixture<SpotcardeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotcardeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotcardeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
