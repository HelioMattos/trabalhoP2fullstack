import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fotosveiculos } from './fotosveiculos';

describe('Fotosveiculos', () => {
  let component: Fotosveiculos;
  let fixture: ComponentFixture<Fotosveiculos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fotosveiculos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fotosveiculos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
