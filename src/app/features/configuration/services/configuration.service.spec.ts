import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {
  let configurationService: ConfigurationService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [ConfigurationService]
  }));

  beforeEach(() => {
    configurationService = TestBed.get(ConfigurationService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(configurationService).toBeTruthy();
  });
  it('check findEventFromEmail method is calling "GET"', () => {
    const email = 'email';
    const role = 'role'
    configurationService.findEventFromEmail(email, role).subscribe();
    const req = httpTestingController.expectOne(`${configurationService.endpoint.api.findEventFromEmail}/${email}/${role}`);
    expect(req.request.method).toEqual('GET');
  });
  it('check findEmployeesByRoleAndEvent method is calling "GET"', () => {
    const eventId = 'email';
    const role = 'role'
    configurationService.findEmployeesByRoleAndEvent(eventId, role).subscribe();
    const req = httpTestingController.expectOne(`${configurationService.endpoint.api.findEmployeesByRoleAndEvent}/${role}/${eventId}`);
    expect(req.request.method).toEqual('GET');
  });
  it('check addRole method is calling "POST"', () => {
    configurationService.addRole('').subscribe();
    const req = httpTestingController.expectOne(configurationService.endpoint.api.addRole);
    expect(req.request.method).toEqual('POST');
  });
  it('check deleteRole method is calling "POST"', () => {
    configurationService.deleteRole('').subscribe();
    const req = httpTestingController.expectOne(configurationService.endpoint.api.deleteRole);
    expect(req.request.method).toEqual('POST');
  });
  it('should be getPMODetails', () => {
    configurationService.getPMODetails();
    expect(configurationService.getPMODetails).toBeTruthy();
  });
  it('should be getPOCDetails', () => {
    configurationService.getPOCDetails();
    expect(configurationService.getPOCDetails).toBeTruthy();
  });
  it('should be getFeedBackQuestions', () => {
    configurationService.getFeedBackQuestions();
    expect(configurationService.getFeedBackQuestions).toBeTruthy();
  });
});
