import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import {
  takeWhile, finalize, debounceTime, distinctUntilChanged
} from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

import { ViewEventReportsService } from './services/view-event-reports.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDetails } from './model/event.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
}) export class EventsComponent implements OnInit {
  queryString: any;
  composedEmailBody: string;
  searchText: any[];
  display = 'none';
  eventIdSearchString: string;
  monthSearchString: string;
  baseLocationSearchString: string;
  categorySearchString: string;
  beneficiaryNameSearchString: string;
  venueAddressSearchString: string;
  councilNameSearchString: string;
  projectSearchString: string;
  eventNameSearchString: string;
  eventDescriptionSearchString: string;
  eventDateSearchString: any;
  totalNoVolunteersSearchString: any;
  totalVolunteersHoursSearchString: any;
  totalTravelHoursSearchString: any;
  overallVolunteeringHoursSearchString: any;
  livesImpactedSearchString: any;
  activityTypeSearchString: any;
  statusSearchString: any;
  POCIDSearchString: any;
  POCNameSearchString: any;
  POCContactNumberSearchString: string;
  page: number = 1;
  total: number;
  config: any;
  eventName: string
  eventDate: string;
  eventDescription: string;
  isEmailPanelOpen: boolean;
  hide: boolean;
  constructor(private readonly viewEventReportsService: ViewEventReportsService, private readonly changeDetector: ChangeDetectorRef
    , private readonly router: Router, private readonly activatedRoute: ActivatedRoute, private readonly formBuilder: FormBuilder,
    private ngxSpinnerService: NgxSpinnerService) {
    this.userInputSearchSubject = new Subject<string>();

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.total
    };

  }
  emitData: any;
  @ViewChild('downloadExcel', { static: false }) downloadExcel: ElementRef
  elementRef: ElementRef;
  columns: string[];
  columnMap: string[];
  eventData: EventDetails[];
  filteredData: any[];
  userInputSearchSubject: Subject<string>;
  canSubscribe: boolean;
  searchString: string;
  rowData: any;
  isSplitPanelOpen: boolean;
  eventListForm: FormGroup;
  compsoseEmailForm: FormGroup;


  ngOnInit() {
    this.ngxSpinnerService.show();
    this.canSubscribe = true;
    this.isSplitPanelOpen = false;
    this.columnMap = ["eventId", "month", "baseLocation",
      "beneficiaryName",
      "venueAddress",
      "councilName",
      "project",
      "category",
      "eventName",
      "eventDescription",
      "eventDate",
      "totalNoVolunteers",
      "totalVolunteersHours",
      "totalTravelHours",
      "overallVolunteeringHours",
      "livesImpacted",
      "activityType",
      "status",
      "pocId",
      "pocName",
      "pocContactNumber"];

    this.columns = ["EventID", "Month", "BaseLocation",
      "BeneficiaryName",
      "VenueAddress",
      "CouncilName",
      "Project",
      "Category",
      "EventName",
      "EventDescription",
      "EventDate",
      "TotalNoVolunteers",
      "TotalVolunteersHours",
      "TotalTravelHours",
      "OverallVolunteeringHours",
      "LivesImpacted",
      "ActivityType",
      "Status",
      "POCID",
      "POCName",
      "POCContactNumber"];
    this.filteredData = this.getEventReports();
    this.eventListForm = this.formBuilder.group({
      eventIdSearch: [''],
      monthSearch: [''],
      baseLocationSearch: [''],
      beneficiaryNameSearch: [''],
      venueAddressSearch: [''],
      councilNameSearch: [''],
      projectSearch: [''],
      categorySearch: [''],
      eventNameSearch: [''],
      eventDescriptionSearch: [''],
      eventDateSearch: [''],
      totalNoVolunteersSearch: [''],
      totalVolunteersHoursSearch: [''],
      totalTravelHoursSearch: [''],
      overallVolunteeringHoursSearch: [''],
      livesImpactedSearch: [''],
      activityTypeSearch: [''],
      statusSearch: [''],
      POCIDSearch: [''],
      POCNameSearch: [''],
      POCContactNumberSearch: ['']
    });
    this.compsoseEmailForm = this.formBuilder.group({
      feedbackType: ['', Validators.required],
      recipientEmail: ['', Validators.required],
      eventId: ['', Validators.required]
    });


  }
  ngOnDestroy(): void {
    this.canSubscribe = false;
  }


  getEventReports(): EventDetails[] {


    this.ngxSpinnerService.show();
    this.viewEventReportsService.getEventReports()
      .pipe(takeWhile(() => this.canSubscribe),
        finalize(() => {
          this.changeDetector.detectChanges();
        })).subscribe((data: EventDetails[]) => {

          if ((data)) {

            this.ngxSpinnerService.hide();
            this.eventData = data;
            this.total = data.length;
          }
        },
          (error: Error) => {

            this.ngxSpinnerService.hide();

          });
    return this.eventData;
  }

  onSearchChange() {
    this.userInputSearchSubject.next(this.eventListForm.value);
    this.searchInputListener();
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }

  searchInputListener() {

    this.userInputSearchSubject.pipe(debounceTime(30), distinctUntilChanged(),
      takeWhile(() => this.canSubscribe),
      finalize(() => {
        this.changeDetector.detectChanges();
      }))
      .subscribe(() => {
        this.eventData = [];
        if (this.eventListForm.controls.eventIdSearch.value.length > 0) {
          this.eventIdSearchString = this.formattedSearchdetails(this.eventListForm.controls.eventIdSearch.value);
          this.filteredData.forEach((item) => {
            if (item.EventID.toLowerCase().includes(this.eventIdSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.monthSearch.value.length > 0) {
          this.monthSearchString = this.formattedSearchdetails(this.eventListForm.controls.monthSearch.value);
          this.filteredData.forEach((item) => {
            if (item.Month.toLowerCase().includes(this.monthSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.baseLocationSearch.value.length > 0) {
          this.baseLocationSearchString = this.formattedSearchdetails(this.eventListForm.controls.baseLocationSearch.value);
          this.filteredData.forEach((item) => {
            if (item.BaseLocation.toLowerCase().includes(this.baseLocationSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.beneficiaryNameSearch.value.length > 0) {
          this.beneficiaryNameSearchString = this.formattedSearchdetails(this.eventListForm.controls.beneficiaryNameSearch.value);
          this.filteredData.forEach((item) => {
            if (item.BeneficiaryName.toLowerCase().includes(this.beneficiaryNameSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.venueAddressSearch.value.length > 0) {
          this.venueAddressSearchString = this.formattedSearchdetails(this.eventListForm.controls.venueAddressSearch.value);
          this.filteredData.forEach((item) => {
            if (item.VenueAddress.toLowerCase().includes(this.venueAddressSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.councilNameSearch.value.length > 0) {
          this.councilNameSearchString = this.formattedSearchdetails(this.eventListForm.controls.councilNameSearch.value);
          this.filteredData.forEach((item) => {
            if (item.CouncilName.toLowerCase().includes(this.councilNameSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.projectSearch.value.length > 0) {
          this.projectSearchString = this.formattedSearchdetails(this.eventListForm.controls.projectSearch.value);
          this.filteredData.forEach((item) => {
            if (item.Project.toLowerCase().includes(this.projectSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.categorySearch.value.length > 0) {
          this.categorySearchString = this.formattedSearchdetails(this.eventListForm.controls.categorySearch.value);
          this.filteredData.forEach((item) => {
            if (item.Category.toLowerCase().includes(this.categorySearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.eventNameSearch.value.length > 0) {
          this.eventNameSearchString = this.formattedSearchdetails(this.eventListForm.controls.eventNameSearch.value);
          this.filteredData.forEach((item) => {
            if (item.EventName.toLowerCase().includes(this.eventNameSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.eventDescriptionSearch.value.length > 0) {
          this.eventDescriptionSearchString = this.formattedSearchdetails(this.eventListForm.controls.eventDescriptionSearch.value);
          this.filteredData.forEach((item) => {
            if (item.EventDescription.toLowerCase().includes(this.eventDescriptionSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.eventDateSearch.value.length > 0) {
          this.eventDateSearchString = this.formattedSearchdetails(this.eventListForm.controls.eventDateSearch.value);
          this.filteredData.forEach((item) => {
            if (item.EventDate.toLowerCase().includes(this.eventDateSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.totalNoVolunteersSearch.value.length > 0) {
          this.totalNoVolunteersSearchString = this.formattedSearchdetails(this.eventListForm.controls.totalNoVolunteersSearch.value);
          this.filteredData.forEach((item) => {
            if (item.TotalNoVolunteers.toLowerCase().includes(this.totalNoVolunteersSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.totalVolunteersHoursSearch.value.length > 0) {
          this.totalVolunteersHoursSearchString = this.formattedSearchdetails(this.eventListForm.controls.totalVolunteersHoursSearch.value);
          this.filteredData.forEach((item) => {
            if (item.TotalVolunteersHours.toLowerCase().includes(this.totalVolunteersHoursSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.totalTravelHoursSearch.value.length > 0) {
          this.totalTravelHoursSearchString = this.formattedSearchdetails(this.eventListForm.controls.totalTravelHoursSearch.value);
          this.filteredData.forEach((item) => {
            if (item.TotalTravelHours.toLowerCase().includes(this.totalTravelHoursSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.overallVolunteeringHoursSearch.value.length > 0) {
          this.overallVolunteeringHoursSearchString = this.formattedSearchdetails(this.eventListForm.controls.overallVolunteeringHoursSearch.value);
          this.filteredData.forEach((item) => {
            if (item.OverallVolunteeringHours.toLowerCase().includes(this.overallVolunteeringHoursSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.livesImpactedSearch.value.length > 0) {
          this.livesImpactedSearchString = this.formattedSearchdetails(this.eventListForm.controls.livesImpactedSearch.value);
          this.filteredData.forEach((item) => {
            if (item.LivesImpacted.toLowerCase().includes(this.livesImpactedSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.activityTypeSearch.value.length > 0) {
          this.activityTypeSearchString = this.formattedSearchdetails(this.eventListForm.controls.activityTypeSearch.value);
          this.filteredData.forEach((item) => {
            if (item.ActivityType.toLowerCase().includes(this.activityTypeSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.statusSearch.value.length > 0) {
          this.statusSearchString = this.formattedSearchdetails(this.eventListForm.controls.statusSearch.value);
          this.filteredData.forEach((item) => {
            if (item.Status.toLowerCase().includes(this.statusSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.POCIDSearch.value.length > 0) {
          this.POCIDSearchString = this.formattedSearchdetails(this.eventListForm.controls.POCIDSearch.value);
          this.filteredData.forEach((item) => {
            if (item.POCID.toLowerCase().includes(this.POCIDSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.POCNameSearch.value.length > 0) {
          this.POCNameSearchString = this.formattedSearchdetails(this.eventListForm.controls.POCNameSearch.value);
          this.filteredData.forEach((item) => {
            if (item.POCName.toLowerCase().includes(this.POCNameSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.controls.POCContactNumberSearch.value.length > 0) {
          this.POCContactNumberSearchString = this.formattedSearchdetails(this.eventListForm.controls.POCContactNumberSearch.value);
          this.filteredData.forEach((item) => {
            if (item.POCContactNumber.toLowerCase().includes(this.POCContactNumberSearchString)) {
              this.eventData.push(item);
            }
          });
        }
        if (this.eventListForm.value.length === 0) {
          this.getEventReports();
        }
      });

  }

  formattedSearchdetails(enteredValue: string) {
    const value = enteredValue.replace(/[[\]{}*:\-"~&!\/?\\^|]/g, '\\$&');
    const valueField = value.replace(/[(\))]/g, ' ');
    const valuePercent = valueField.replace(/[%]/g, ' \\%');
    return `${valuePercent.replace(/[\,$]/g, '')}`;
  }


  exportToExcel() {
    let eventData = this.getEventReports();
    this.getxlsx(eventData);
  }
  downloadFile(data: any) {
    const fileName = `Event Reports ${moment().format('YYYY-MM-DD')} at ${moment().format('hh.mm.ss A')}.xlsx`;
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(data, fileName);
    } else {
      this.downloadExcel.nativeElement.href = URL.createObjectURL(new Blob(data, { type: "application/xlsx" }));
      this.downloadExcel.nativeElement.download = fileName;
      this.downloadExcel.nativeElement.click();
    }
  }

  getxlsx(excelReport: any[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelReport);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileName = `Event Reports ${moment().format('YYYY-MM-DD')} at ${moment().format('hh.mm.ss A')}.xlsx`;
    const data: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName);
  }
  onRowSelect(event: any) {
    this.isSplitPanelOpen = true;
    this.router.navigate(['/events/viewdetails'],
      {
        queryParams: {
          eventId: event['eventId']
        }
      });

  }
  onSendMail() {
    const navigationExtras: NavigationExtras = {
      state: {
        body: this.composedEmailBody
      }
    };
    this.router.navigate(['send-email'], navigationExtras);
  }
  onClearFilters() {
    this.eventListForm.controls.eventIdSearch.reset();
    this.eventListForm.controls.monthSearch.reset();
    this.eventListForm.controls.baseLocationSearch.reset();
    this.eventListForm.controls.beneficiaryNameSearch.reset();
    this.eventListForm.controls.venueAddressSearch.reset();
    this.eventListForm.controls.councilNameSearch.reset();
    this.eventListForm.controls.projectSearch.reset();
    this.eventListForm.controls.categorySearch.reset();
    this.eventListForm.controls.eventNameSearch.reset();
    this.eventListForm.controls.eventDescriptionSearch.reset();
    this.eventListForm.controls.eventDateSearch.reset();
    this.eventListForm.controls.totalNoVolunteersSearch.reset();
    this.eventListForm.controls.totalVolunteersHoursSearch.reset();
    this.eventListForm.controls.totalTravelHoursSearch.reset();
    this.eventListForm.controls.overallVolunteeringHoursSearch.reset();
    this.eventListForm.controls.livesImpactedSearch.reset();
    this.eventListForm.controls.activityTypeSearch.reset();
    this.eventListForm.controls.statusSearch.reset();
    this.eventListForm.controls.POCIDSearch.reset();
    this.eventListForm.controls.POCNameSearch.reset();
    this.eventListForm.controls.POCContactNumberSearch.reset();
  }
  get f() { return this.compsoseEmailForm.controls; }

  getEmailBody() {
    const eventId = this.compsoseEmailForm.controls.eventId.value;
    this.enrichEventDetails(eventId);
  }
  enrichEventDetails(eventId: any) {
    let composeDetails;
    this.ngxSpinnerService.show();
    this.viewEventReportsService.getEventDetailedInfo(eventId).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    })).subscribe((data: any) => {
      if (data) {
        this.ngxSpinnerService.hide();
        this.eventName = data.eventName;
        this.eventDate = data.eventDate;
        this.eventDescription = data.eventDescription;
        composeDetails = {
          feedbackType: this.compsoseEmailForm.controls.feedbackType.value,
          eventId: this.compsoseEmailForm.controls.eventId.value,
          emailAddress: this.compsoseEmailForm.controls.recipientEmail.value,
          eventDescription: this.eventDescription,
          eventName: this.eventName,
          eventDate: this.eventDate,
          name: 'Participant'

        };
        const navigationExtras: NavigationExtras = {
          state: {
            composeDetails: composeDetails
          }
        };
        this.router.navigate(['send-email'], navigationExtras);
      }
    }, (error: Error) => {
      this.ngxSpinnerService.hide();
    });



  }
  openModalDialog() {
    this.router.navigate(['send-email']);
  }

  closeModalDialog() {
    this.display = 'none';
  }

}
