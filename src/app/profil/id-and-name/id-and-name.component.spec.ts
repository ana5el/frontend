import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdAndNameComponent } from './id-and-name.component';

describe('IdAndNameComponent', () => {
  let component: IdAndNameComponent;
  let fixture: ComponentFixture<IdAndNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdAndNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdAndNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
