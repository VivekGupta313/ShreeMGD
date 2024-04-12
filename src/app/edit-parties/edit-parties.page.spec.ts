import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPartiesPage } from './edit-parties.page';

describe('EditPartiesPage', () => {
  let component: EditPartiesPage;
  let fixture: ComponentFixture<EditPartiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartiesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPartiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
