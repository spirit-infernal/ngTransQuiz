import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgBarComponent } from './prog-bar.component';

describe('ProgBarComponent', () => {
  let component: ProgBarComponent;
  let fixture: ComponentFixture<ProgBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
