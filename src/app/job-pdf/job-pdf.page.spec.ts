import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JobPdfPage } from './job-pdf.page';

describe('JobPdfPage', () => {
  let component: JobPdfPage;
  let fixture: ComponentFixture<JobPdfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPdfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JobPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
