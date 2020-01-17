import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { NgxPaginationModule } from 'ngx-pagination';

import { ConfigPocComponent } from './config-poc.component';
import { ConfigurationService } from '../services/configuration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { configureTestSuite } from 'ng-bullet';
import { NgxSpinnerService } from 'ngx-spinner';
import { throwError } from 'rxjs';

describe('ConfiPocComponent', () => {
  let component: ConfigPocComponent;
  let fixture: ComponentFixture<ConfigPocComponent>;
  let configurationService: ConfigurationService;
  let ngxSpinnerService: NgxSpinnerService;
  const formBuilder = new FormBuilder();
  let searchRoleForm: FormGroup;
  let configRoleForm: FormGroup;
  configRoleForm = formBuilder.group({
    eventId: ['', Validators.required],
    email: ['', Validators.required]
  });
  searchRoleForm = formBuilder.group({
    eventIdSearch: ['', Validators.required]
  });

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, NgxPaginationModule, RouterTestingModule
      ],
      providers: [ConfigurationService
      ],
      declarations: [ConfigPocComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPocComponent);
    component = fixture.componentInstance;
    TestBed.get(ActivatedRoute).url = {
      value: {
        1: {
          path: ''
        }
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should pageChanged', () => {
    component.pageChanged({});
    expect(component.config.currentPage).toEqual({});
  });
  it('should findEventFromEmail', () => {
    component.configRoleForm = configRoleForm;
    component.configRoleForm.controls.eventId.setValue('test');
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    configurationService = TestBed.get(ConfigurationService);
    spyOn(configurationService, 'findEventFromEmail').and.returnValue(of('test'));
    component.findEventFromEmail('');
    expect(component.eventId).toEqual('test');
  });
  it('should findEventFromEmail', () => {
    component.configRoleForm = configRoleForm;
    component.configRoleForm.controls.eventId.setValue('test');
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    configurationService = TestBed.get(ConfigurationService);
    spyOn(configurationService, 'findEventFromEmail').and.returnValue(throwError(Error));
    component.findEventFromEmail('');
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should onClearFilters', () => {
    component.searchRoleForm = searchRoleForm;
    component.searchRoleForm.controls.eventIdSearch.setValue('test');
    component.onClearFilters();
    expect(component.roleDetails).toEqual([]);
    expect(component.searchRoleForm.controls.eventIdSearch.value).toBe(null);
  });
  it('should findEmployeesByRoleAndEvent', () => {
    component.configRoleForm = configRoleForm;
    component.configRoleForm.controls.eventId.setValue('test');
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    configurationService = TestBed.get(ConfigurationService);
    spyOn(configurationService, 'findEmployeesByRoleAndEvent').and.returnValue(of(['test']));
    component.findEmployeesByRoleAndEvent();
    expect(component.roleDetails).toEqual(['test']);
  });
  it('should findEmployeesByRoleAndEvent else', () => {
    component.configRoleForm = configRoleForm;
    component.configRoleForm.controls.eventId.setValue('test');
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    configurationService = TestBed.get(ConfigurationService);
    spyOn(configurationService, 'findEmployeesByRoleAndEvent').and.returnValue(throwError(Error));
    component.findEmployeesByRoleAndEvent();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should addRole', () => {
    component.configRoleForm = configRoleForm;
    component.configRoleForm.controls.email.setValue('testing');
    component.configRoleForm.controls.eventId.setValue('test');
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    configurationService = TestBed.get(ConfigurationService);
    spyOn(configurationService, 'addRole').and.returnValue(of('test'));
    component.addRole();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should addRole else', () => {
    component.configRoleForm = configRoleForm;
    component.configRoleForm.controls.email.setValue('testing');
    component.configRoleForm.controls.eventId.setValue('test');
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    configurationService = TestBed.get(ConfigurationService);
    spyOn(configurationService, 'addRole').and.returnValue(throwError(Error));
    component.addRole();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should deleteRole', () => {
    component.configRoleForm = configRoleForm;
    component.configRoleForm.controls.email.setValue('testing');
    component.configRoleForm.controls.eventId.setValue('test');
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    configurationService = TestBed.get(ConfigurationService);
    spyOn(configurationService, 'deleteRole').and.returnValue(of('test'));
    component.deleteRole();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should deleteRole else', () => {
    component.configRoleForm = configRoleForm;
    component.configRoleForm.controls.email.setValue('testing');
    component.configRoleForm.controls.eventId.setValue('test');
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    configurationService = TestBed.get(ConfigurationService);
    spyOn(configurationService, 'deleteRole').and.returnValue(throwError(Error));
    component.deleteRole();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should exportToExcel', () => {
    component.roleDetails = ['test', 'list'];
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    spyOn(component, 'getxlsx');
    component.exportToExcel();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
  it('should exportToExcel else', () => {
    component.roleDetails = [];
    ngxSpinnerService = TestBed.get(NgxSpinnerService);
    spyOn(ngxSpinnerService, 'show');
    spyOn(ngxSpinnerService, 'hide');
    spyOn(component, 'getxlsx');
    component.exportToExcel();
    expect(ngxSpinnerService.hide).toHaveBeenCalled();
  });
});
