import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProcessStatusPage } from './process-status.page';

describe('ProcessStatusPage', () => {
  let component: ProcessStatusPage;
  let fixture: ComponentFixture<ProcessStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessStatusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
