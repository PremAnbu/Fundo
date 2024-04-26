import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundooHeaderComponent } from './fundoo-header.component';

describe('FundooHeaderComponent', () => {
  let component: FundooHeaderComponent;
  let fixture: ComponentFixture<FundooHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundooHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundooHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
