import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CreateFeedbackFormService } from './services/create-feedback-form.service';
import { takeWhile, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CreateFeedbackForm } from './model/create-feedback-form.interface';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';

@Component({
  selector: 'app-create-feedback-forms',
  templateUrl: './create-feedback-forms.component.html',
  styleUrls: ['./create-feedback-forms.component.scss']
})
export class CreateFeedbackFormsComponent implements OnInit {

  title = 'my-app';
  addForm: FormGroup;
  canSubscribe: boolean;
  isCreating: boolean = false;
  rows: FormArray;
  itemForm: FormGroup;
  columns: string[];
  columnMap: string[];
  feedbackQuestions: CreateFeedbackForm[];
  page: number = 1;
  total: number;
  config: any;
  rowToEdit: any;
  answerRow = 0;
  question: string;
  feedbackType: string
  answers: string[] = [];
  questionType: string;
  eventId: string;
  constructor(private fb: FormBuilder, private router: Router, private readonly ngxSpinnerService: NgxSpinnerService, private readonly changeDetector: ChangeDetectorRef,
    private createFeedbackFormService: CreateFeedbackFormService, private readonly confirmationDialogService: ConfirmationDialogService) {

    this.addForm = this.fb.group({
      eventId: [],
      allowMultipleQuestion: [],
      freeTextAnswer: [],
      customQuestion: [],
      participatedOpt: [],
      notparticipatedOpt: [],
      unregisteredOpt: [],
      question: [Validators.required]
    });


    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.total
    };

    this.rows = this.fb.array([]);

  }


  ngOnInit() {
    this.columns = ["Question",
      "Total Answers",
      "Feedback Type"];
    this.columnMap = ["question", "answerCount", "feedbackType"]
    this.canSubscribe = true;
    this.addForm.addControl('rows', this.rows);
    this.feedbackQuestions = [];

  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
  onAddRow() {
    this.rows.push(this.createItemFormGroup(this.answerRow));
    this.answerRow += 1;
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
    this.answerRow -= 1;
  }
  onOptionChange(event: any) {
    this.feedbackType = event.target.value;
  }

  createItemFormGroup(i): FormGroup {
    return this.fb.group({
      name: `answer${i}`,
      answer: []
    });
  }
  onCheck(event: any) {
    this.questionType = event.target.value;
  }
  createFeedbackForm() {
    this.isCreating = true;
    this.ngxSpinnerService.show();
    this.answers = [];
    if (this.rows.controls.length > 0) {
      this.rows.controls.forEach(element => {
        this.answers.push(element.value.answer);
      });
    }
    this.question = this.addForm.controls.question.value;
    const requestBody = {
      'eventId': this.eventId,
      'feedbackType': this.feedbackType,
      'questionAnswer': {
        'question': this.question,
        'answers': this.answers
      },
      'questionType': this.questionType

    };
    this.createFeedbackFormService.createFeedbackForm(requestBody)
      .pipe(takeWhile(() => this.canSubscribe),
        finalize(() => {
          this.changeDetector.detectChanges();
        })).subscribe((data: any) => {
          if ((data)) {
            this.ngxSpinnerService.hide();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Feedback Form created successfully.`,
              showConfirmButton: false,
              timer: 1500,
              width: 400,
            });
            this.router.navigate(['get/questions'])
          }
        },
          (error: Error) => {
            this.ngxSpinnerService.hide();
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: `Error creating feedback form.`,
              showConfirmButton: false,
              timer: 1500,
              width: 400,
            });
          });
    this.router.navigate(['get/questions'])
  }
  onCancel() {
    this.router.navigate(['get/questions'])
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
            this.rowToEdit = data[0];
            data.forEach(element => {
              const feedbackQuestion = {
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
    const navigationExtras: NavigationExtras = {
      state: {
        rowToEdit: this.rowToEdit
      }
    };
    this.router.navigate(['edit/forms'], navigationExtras);
  }
  deleteQuestion() {
    this.ngxSpinnerService.show();
    this.answers = [];
    if (this.rows.controls.length > 0) {
      this.rows.controls.forEach(element => {
        this.answers.push(element.value.answer);
      });
    }
    this.question = this.addForm.controls.question.value;
    const requestBody = {
      'eventId': this.rowToEdit.eventId,
      'feedbackType': this.rowToEdit.feedbackType,
      'questionAnswer': {
        'question': this.question,
        'answers': this.answers
      },
      'questionType': this.questionType

    };
    this.createFeedbackFormService.deleteFeedbackForm(requestBody)
      .pipe(takeWhile(() => this.canSubscribe),
        finalize(() => {
          this.changeDetector.detectChanges();
        })).subscribe((data: any) => {
          if ((data)) {
            this.ngxSpinnerService.hide();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Feedback question deleted successfully.`,
              showConfirmButton: false,
              timer: 1500,
              width: 400,
            });
          }
        },
          (error: Error) => {
            this.ngxSpinnerService.hide();
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: `Error deleting feedback question.`,
              showConfirmButton: false,
              timer: 1500,
              width: 400,
            });
          });
    this.router.navigate(['get/questions']);
  }
  canDeactivate(): Observable<boolean> | boolean {
    if (!this.isCreating && this.addForm.dirty) {
      return this.confirmationDialogService.confirm();
    }
    return true;
  }
}
