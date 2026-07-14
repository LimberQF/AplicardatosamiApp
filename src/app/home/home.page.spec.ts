import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomePage } from './home.page';

describe('Pruebas Unitarias - HomePage (Terminal Logística)', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],

      imports: [IonicModule.forRoot(), HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1. Debe crear la página del terminal logístico correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('2. Debe inicializar la lista de personal (usuarios) como un arreglo vacío', () => {
    expect(component.usuarios.length).toEqual(0);
  });
});
