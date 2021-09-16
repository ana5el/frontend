import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GuppComponent } from './gupp.component';

describe('GuppComponent', () => {
  let component: GuppComponent;
  let fixture: ComponentFixture<GuppComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
