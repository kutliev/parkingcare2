import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotcardComponent } from './spotcard.component';

describe('SpotcardComponent', () => {
  let component: SpotcardComponent;
  let fixture: ComponentFixture<SpotcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
