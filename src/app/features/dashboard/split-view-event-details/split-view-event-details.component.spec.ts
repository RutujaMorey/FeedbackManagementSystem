import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SplitViewEventDetailsComponent } from './split-view-event-details.component';

describe('SplitViewEventDetailsComponent', () => {
  let component: SplitViewEventDetailsComponent;
  let fixture: ComponentFixture<SplitViewEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule
      ],
      declarations: [SplitViewEventDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitViewEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('sendRowData have been called', () => {
    const eventRowDetails = 'load';
    component.sendRowData = eventRowDetails;
    expect(component.eventDetails).toBe(eventRowDetails);
  });
});
