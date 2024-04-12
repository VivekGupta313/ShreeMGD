import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPartiesPage } from './add-parties.page';

describe('AddPartiesPage', () => {
  let component: AddPartiesPage;
  let fixture: ComponentFixture<AddPartiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPartiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
