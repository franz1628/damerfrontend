import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocioComponent } from './negocio.component';

describe('NegocioComponent', () => {
  let component: NegocioComponent;
  let fixture: ComponentFixture<NegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NegocioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
