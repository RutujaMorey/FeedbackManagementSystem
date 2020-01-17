import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ViewEventReportsService } from '../services/view-event-reports.service';
import { takeWhile, finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { EventDetails } from '../model/event.model';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-event-details',
  templateUrl: './view-event-details.component.html',
  styleUrls: ['./view-event-details.component.scss']
})
export class ViewEventDetailsComponent implements OnInit {
  canSubscribe: boolean;
  volunteeringStatistics: any[];
  statisticsColumns: string[] = ["AVERAGE RATING",
    "VOLUNTEERS",
    "VOLUNTEERS HOURS",
    "OVERALL HOURS",
    "TRAVEL  HOURS",
    "LIVES IMPACTED"];
  statisticsKeys: string[] = ["averageRating",
    "totalNoVolunteers",
    "totalVolunteersHours",
    "overallVolunteeringHours",
    "totalTravelHours",
    "livesImpacted"];
  unregisteredReasons: any[];
  pocColumns: any[] = ["EMPLOYEE ID",
    "NAME",
    "CONTACT NUMBER"];
  notParticipatedReasons: any[];
  participatedRatings: any[];
  eventFeedbackDetails: any[];
  unregisteredColumns: string[] = ["reason"];
  unregisteredKeys: string[] = ["unregisteredReason"];
  notParticipatedKeys: string[] = ["notParticipatedReason"];
  particpatedRatingColumns: string[] = ["Ratings", "Likes", "DisLikes"];
  particpatedRatingKeys: string[] = ["rating", "likes", "dislikes"];
  pocKeys: string[] = ["pocId", "pocName", "pocContactNumber"];
  eventId: string;
  eventDetails: EventDetails;
  constructor(private readonly viewEventReportsService: ViewEventReportsService, private readonly ngxSpinnerService: NgxSpinnerService
    , private readonly changeDetector: ChangeDetectorRef, private readonly route: Router, private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.ngxSpinnerService.show();
    this.activatedRoute.queryParams.subscribe((routeParams) => {
      this.eventId = routeParams.eventId;
    });
    this.canSubscribe = true;


    this.getEventDetailedInfo(this.eventId);
    this.getEventFeedbackDetails(this.eventId);
  }

  getEventDetailedInfo(eventId: string): EventDetails {
    this.ngxSpinnerService.show();
    this.viewEventReportsService.getEventDetailedInfo(eventId).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    })).subscribe((data: any) => {
      if (data) {
        this.ngxSpinnerService.hide();
        this.eventDetails = data;
      }
    }, (error: Error) => { this.ngxSpinnerService.hide(); });
    return this.eventDetails;
  }

  getEventFeedbackDetails(eventId: string) {
    this.ngxSpinnerService.show();
    this.viewEventReportsService.getEventFeedbackDetails(eventId).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    })).subscribe((data: any) => {
      if (data) {
        this.ngxSpinnerService.hide();
        this.participatedRatings = _.filter(data, { 'feedbackType': 'Participated' });
        this.notParticipatedReasons = _.filter(data, { 'feedbackType': 'NotParticipated' });
        this.unregisteredReasons = _.filter(data, { 'feedbackType': 'Unregistered' });
      }
    }, (error: Error) => { this.ngxSpinnerService.hide(); });
  }

}


