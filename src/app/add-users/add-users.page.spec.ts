import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUsersPage } from './add-users.page';

describe('AddUsersPage', () => {
  let component: AddUsersPage;
  let fixture: ComponentFixture<AddUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
