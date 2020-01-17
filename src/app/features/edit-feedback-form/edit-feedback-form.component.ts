
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CreateFeedbackFormService } from '../create-feedback-forms/services/create-feedback-form.service';
import { takeWhile, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ConfirmationDialogService } from 'src/app/shared/confirmation-dialog.service';


@Component({
  selector: 'app-edit-feedback-form',
  templateUrl: './edit-feedback-form.component.html',
  styleUrls: ['./edit-feedback-form.component.scss']
})
export class EditFeedbackFormComponent implements OnInit {
  isUpdating: boolean = false;
  editForm: FormGroup;
  canSubscribe: boolean;
  rows: FormArray;
  itemForm: FormGroup;
  rowToEdit: any;
  question: string;
  feedbackType: string
  answers: string[] = [];
  questionType: string;
  constructor(private fb: FormBuilder, private readonly changeDetector: ChangeDetectorRef, private createFeedbackFormService: CreateFeedbackFormService,
    private router: Router, private readonly ngxSpinnerService: NgxSpinnerService, private readonly confirmationDialogService: ConfirmationDialogService) {

    this.editForm = this.fb.group({
      allowMultipleQuestion: [],
      freeTextAnswer: [],
      customQuestion: [],
      participatedOpt: [],
      notparticipatedOpt: [],
      unregisteredOpt: [],
      question: []

    });
    const navigation = this.router.getCurrentNavigation();

    const state = navigation.extras.state as {
      rowToEdit: string
    };
    if (state) {
      this.rowToEdit = state.rowToEdit;
    }
    if (this.rowToEdit) {
      this.feedbackType = this.rowToEdit.feedbackType;
    }

    this.rows = this.fb.array([]);
  }

  ngOnInit() {
    this.canSubscribe = true;
    this.editForm.addControl('rows', this.rows);
    this.populateEditForm(this.rowToEdit);
  }

  onAddRow(i, answer) {
    this.editForm.controls.rows.markAsDirty();
    this.rows.push(this.createItemFormGroup(i, answer));
  }

  onRemoveRow(rowIndex: number) {
    this.editForm.controls.rows.markAsDirty();
    this.rows.removeAt(rowIndex);
  }

  createItemFormGroup(i, answer): FormGroup {
    return this.fb.group({
      name: `answer${i}`,
      answer: answer
    });
  }
  onCheck(event: any) {
    this.questionType = event.target.value;
  }
  editFeedbackForm() {
    this.isUpdating = true;
    this.ngxSpinnerService.show();
    this.answers = [];
    if (this.rows.controls.length > 0) {
      this.rows.controls.forEach(element => {
        this.answers.push(element.value.answer);
      });
    }
    this.question = this.editForm.controls.question.value;
    const requestBody = {
      'eventId': this.rowToEdit.eventId,
      'feedbackType': this.rowToEdit.feedbackType,
      'questionAnswer': {
        'question': this.question,
        'answers': this.answers
      },
      'questionType': this.questionType

    };
    this.createFeedbackFormService.editFeedbackForm(requestBody)
      .pipe(takeWhile(() => this.canSubscribe),
        finalize(() => {
          this.changeDetector.detectChanges();
        })).subscribe((data: any) => {
          if ((data)) {
            this.ngxSpinnerService.hide();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Feedback Form updated successfully.`,
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
              title: `Error creating feedback form.`,
              showConfirmButton: false,
              timer: 1500,
              width: 400,
            });
          });
    this.router.navigate(['get/questions']);
  }

  onCancel() {
    this.router.navigate(['get/questions'])
  }

  populateEditForm(rowToEdit: any) {
    this.question = rowToEdit.question;
    for (var i = 0; i < rowToEdit.answers.length; i++) {
      this.onAddRow(i, rowToEdit.answers[i]);
    }
  }
  deleteQuestion() {
    this.ngxSpinnerService.show();
    this.answers = [];
    if (this.rows.controls.length > 0) {
      this.rows.controls.forEach(element => {
        this.answers.push(element.value.answer);
      });
    }
    this.question = this.editForm.controls.question.value;
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
    if (!this.isUpdating && this.editForm.dirty) {

      return this.confirmationDialogService.confirm();
    }
    return true;
  }
 
}
