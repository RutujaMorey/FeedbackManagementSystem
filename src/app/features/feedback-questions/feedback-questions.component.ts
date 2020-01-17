import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CreateFeedbackForm } from '../create-feedback-forms/model/create-feedback-form.model';
import { Router, NavigationExtras } from '@angular/router';
import { CreateFeedbackFormService } from '../create-feedback-forms/services/create-feedback-form.service';
import { takeWhile, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-feedback-questions',
  templateUrl: './feedback-questions.component.html',
  styleUrls: ['./feedback-questions.component.scss']
})
export class FeedbackQuestionsComponent implements OnInit {

  title = 'my-app';
  addForm: FormGroup;
  canSubscribe: boolean;
  rows: FormArray;
  itemForm: FormGroup;
  columns: string[];
  columnMap: string[];
  feedbackQuestions: CreateFeedbackForm[];
  page: number = 1;
  total: number;
  config: any;
  rowToEdit: any;

  constructor(private fb: FormBuilder, private readonly ngxSpinnerService: NgxSpinnerService, private router: Router, private readonly changeDetector: ChangeDetectorRef, private createFeedbackFormService: CreateFeedbackFormService) {

    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.total
    };

    this.rows = this.fb.array([]);

  }


  ngOnInit() {
    this.columns = ["Question", "EventID",
      "Total Answers",
      "Feedback Type"];
    this.columnMap = ["question", "eventId", "answerCount", "feedbackType"]
    this.canSubscribe = true;
    this.addForm.addControl('rows', this.rows);
    this.feedbackQuestions = [];
    this.getFeedbackForm();
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  onAddQuestion() {
    this.router.navigate(['create/forms']);
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      name: null,
      description: null
    });
  }


  getFeedbackForm() {
    this.ngxSpinnerService.show();
    const requestBody = {};
    this.createFeedbackFormService.getAllFormQuestions()
      .pipe(takeWhile(() => this.canSubscribe),
        finalize(() => {
          this.changeDetector.detectChanges();
        })).subscribe((data: any) => {

          if ((data)) {
            this.ngxSpinnerService.hide();
            data.forEach(element => {
              event
              const feedbackQuestion = {
                'eventId': element.eventId,
                'question': element.questionAnswers.question,
                'answers': element.questionAnswers.answers,
                'answerCount': element.questionAnswers.answers.length,
                'feedbackType': element.feedbackType
              };
              this.feedbackQuestions.push(feedbackQuestion);
            });
          }
        },
          (error: Error) => {
            this.ngxSpinnerService.hide();
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: `Error fetching feedback form.`,
              showConfirmButton: false,
              timer: 1500,
              width: 400,
            });
          });
  }


  fetchFormToEdit(data: any) {
    this.rowToEdit = data;
    const navigationExtras: NavigationExtras = {
      state: {
        rowToEdit: this.rowToEdit
      }
    };
    this.router.navigate(['edit/forms'], navigationExtras);
  }
}


