// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';

// import { ConfigPmoComponent } from './config-pmo.component';
// import { ConfigurationService } from '../services/configuration.service';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of } from 'rxjs/internal/observable/of';
// import { configureTestSuite } from 'ng-bullet';

// describe('ConfigPmoComponent', () => {
//   let component: ConfigPmoComponent;
//   let fixture: ComponentFixture<ConfigPmoComponent>;
//   let configurationService: ConfigurationService;

//   configureTestSuite(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, ReactiveFormsModule
//       ],
//       providers: [ConfigurationService
//       ],
//       declarations: [ConfigPmoComponent]
//     })
//       .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ConfigPmoComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should getPMODetails', () => {
//     configurationService = TestBed.get(ConfigurationService);
//     spyOn(configurationService, 'getPMODetails').and.returnValue(of([1]));
//     component.getPMODetails();
//     expect(component.pmoDetailsData).toEqual([1]);
//   });
// });
