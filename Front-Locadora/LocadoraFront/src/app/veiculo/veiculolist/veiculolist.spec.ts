import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Veiculolist } from './veiculolist';

describe('Veiculolist', () => {
  let component: Veiculolist;
  let fixture: ComponentFixture<Veiculolist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Veiculolist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Veiculolist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
