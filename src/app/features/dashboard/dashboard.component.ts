import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { takeWhile, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  canSubscribe: boolean;
  eventStatistics: any;
  constructor(private readonly dashboardService: DashboardService, private changeDetector: ChangeDetectorRef, private ngxSpinner: NgxSpinnerService,
    private readonly router: Router) { }

  ngOnInit() {
    this.canSubscribe = true;
    this.ngxSpinner.show();
    this.getFeedbackStatistics();
  }

  getFeedbackStatistics() {

    this.ngxSpinner.show();
    this.dashboardService.getFeedbackStatistics()
      .pipe(takeWhile(() => this.canSubscribe),
        finalize(() => {
          this.changeDetector.detectChanges();
        })).subscribe((data: any) => {

          if (data) {
            this.ngxSpinner.hide();
            this.eventStatistics = data;
          }
        },
          (error: Error) => {
            this.ngxSpinner.hide();
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: `Error fetching statistics.`,
              showConfirmButton: false,
              timer: 1500,
              width: 400,
            });
          });
  }
  onViewDetail() {
    this.router.navigate(['events']);
  }
}


