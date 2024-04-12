import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditUserdPage } from './edit-userd.page';

describe('EditUserdPage', () => {
  let component: EditUserdPage;
  let fixture: ComponentFixture<EditUserdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
