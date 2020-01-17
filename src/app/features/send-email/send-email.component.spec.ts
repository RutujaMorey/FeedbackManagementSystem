import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailComponent } from './send-email.component';
import { SendEmailService } from './services/send-email.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { configureTestSuite } from 'ng-bullet';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('SendEmailComponent', () => {
  let component: SendEmailComponent;
  let fixture: ComponentFixture<SendEmailComponent>;
  let sendEmailService: SendEmailService;
  let ngxSpinnerService: NgxSpinnerService;


  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, NgxSpinnerModule, BrowserAnimationsModule, FormsModule
      ],
      providers: [SendEmailService
      ],
      declarations: [SendEmailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


