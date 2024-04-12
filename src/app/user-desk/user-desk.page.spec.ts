import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserDeskPage } from './user-desk.page';

describe('UserDeskPage', () => {
  let component: UserDeskPage;
  let fixture: ComponentFixture<UserDeskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDeskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
