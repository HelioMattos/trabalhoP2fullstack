import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Veiculoform } from './veiculoform';

describe('Veiculoform', () => {
  let component: Veiculoform;
  let fixture: ComponentFixture<Veiculoform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Veiculoform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Veiculoform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
