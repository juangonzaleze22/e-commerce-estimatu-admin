import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSpinerComponent } from './btn-spiner.component';

describe('BtnSpinerComponent', () => {
  let component: BtnSpinerComponent;
  let fixture: ComponentFixture<BtnSpinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnSpinerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSpinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
