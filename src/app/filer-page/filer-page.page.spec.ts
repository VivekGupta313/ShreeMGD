import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilerPagePage } from './filer-page.page';

describe('FilerPagePage', () => {
  let component: FilerPagePage;
  let fixture: ComponentFixture<FilerPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilerPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilerPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
