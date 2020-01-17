import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { takeWhile, finalize } from 'rxjs/operators';
import { ConfigurationService } from '../services/configuration.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Component({
  selector: 'app-config-poc',
  templateUrl: './config-poc.component.html',
  styleUrls: ['./config-poc.component.scss']
})
export class ConfigPocComponent implements OnInit {
  columns: string[];
  columnMap: string[];
  canSubscribe: boolean;
  roleDetails: any[];
  configRoleForm: FormGroup;
  eventId: string;
  email: string;
  role: string;
  searchRoleForm: FormGroup;
  page: number = 1;
  total: number;
  config: any;
  @ViewChild('downloadExcel', { static: false }) downloadExcel: ElementRef

  constructor(private formBuilder: FormBuilder, private configurationService: ConfigurationService, private readonly changeDetector: ChangeDetectorRef,
    private readonly router: Router, private readonly activatedRoute: ActivatedRoute, private readonly ngxSpinnerService: NgxSpinnerService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.total
    };
  }
  ngOnInit() {
    this.canSubscribe = true;
    this.columns = ["EMPLOYEE ID",
      "NAME",
      "CONTACT NUMBER"];
    this.columnMap = ["employeeID", "firstName", "contactNumber"]


    this.role = this.activatedRoute.url['value'][1].path;



    this.configRoleForm = this.formBuilder.group({
      eventId: ['', Validators.required],
      email: ['', Validators.required]

    });
    this.searchRoleForm = this.formBuilder.group({
      eventIdSearch: ['', Validators.required]
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  findEventFromEmail(action: string) {
    this.ngxSpinnerService.show();
    this.email = this.configRoleForm.controls.email.value;
    this.eventId = this.configRoleForm.controls.eventId.value;

    this.configurationService.findEventFromEmail(this.email, this.role)
      .pipe(takeWhile(() => this.canSubscribe), finalize(() => {
        this.changeDetector.detectChanges();
      })).subscribe((data: any) => {
        if (data) {
          this.ngxSpinnerService.hide();
          this.eventId = data;
        }
      }, (error: Error) => {
        this.ngxSpinnerService.hide();
      });


  }
  onClearFilters() {
    this.searchRoleForm.controls.eventIdSearch.reset();
    this.roleDetails = [];
  }
  findEmployeesByRoleAndEvent() {
    this.ngxSpinnerService.show();
    this.configurationService.findEmployeesByRoleAndEvent(this.searchRoleForm.controls.eventIdSearch.value, this.role)
      .pipe(takeWhile(() => this.canSubscribe), finalize(() => {
        this.changeDetector.detectChanges();
      })).subscribe((data: any) => {
        if (data) {
          this.ngxSpinnerService.hide();
          this.roleDetails = data;
        }
      }, (error: Error) => {
        this.ngxSpinnerService.hide();
      });
    return this.roleDetails;
  }
  addRole() {

    this.ngxSpinnerService.show();
    this.email = this.configRoleForm.controls.email.value;
    this.eventId = this.configRoleForm.controls.eventId.value;
    const configureRoleRequest = {
      'role': this.role,
      'emailAddress': this.email,
      'eventId': this.eventId
    };
    this.configurationService.addRole(configureRoleRequest).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    }))
      .subscribe((data: any) => {
        this.ngxSpinnerService.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.response,
          showConfirmButton: false,
          timer: 1500,
          width: 400,
        });
      }, (error: Error) => {
        this.ngxSpinnerService.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Failed to add ${this.role}`,
          showConfirmButton: false,
          timer: 1500,
          width: 400,
        });
      });
  }

  deleteRole() {
    this.ngxSpinnerService.show();
    this.email = this.configRoleForm.controls.email.value;
    this.eventId = this.configRoleForm.controls.eventId.value;
    const configureRoleRequest = {
      'role': this.role,
      'emailAddress': this.email,
      'eventId': this.eventId
    };
    this.configurationService.deleteRole(configureRoleRequest).pipe(takeWhile(() => this.canSubscribe), finalize(() => {
      this.changeDetector.detectChanges();
    }))
      .subscribe((data: any) => {
        this.ngxSpinnerService.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.response,
          showConfirmButton: false,
          timer: 1500,
          width: 400,
        });
      }, (error: Error) => {
        this.ngxSpinnerService.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Failed to delete ${this.role}`,
          showConfirmButton: false,
          timer: 1500,
          width: 400,
        });
      });
  }


  exportToExcel() {
    this.ngxSpinnerService.show();
    if (this.roleDetails.length > 0) {
      this.ngxSpinnerService.hide();
      this.getxlsx(this.roleDetails);
    } else {
      this.ngxSpinnerService.hide();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `No records to download. Enter eventId to search records.`,
        showConfirmButton: false,
        timer: 1500,
        width: 400,
      });
    }
  }
  downloadFile(data: any) {
    const fileName = `${this.role} Users ${moment().format('YYYY-MM-DD')} at ${moment().format('hh.mm.ss A')}.xlsx`;
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
}
