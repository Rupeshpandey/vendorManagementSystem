import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { VendorRegistrationComponent } from './vendor-registration.component';
import { VendorService } from 'src/app/services/vendor.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('VendorRegistrationComponent', () => {
  let component: VendorRegistrationComponent;
  let fixture: ComponentFixture<VendorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorRegistrationComponent ],
      imports: [ FormsModule,
         HttpClientTestingModule,
        RouterTestingModule
       ],
      providers: [ VendorService,
        { 
          provide: ActivatedRoute, 
          useValue: { 
            paramMap: of(new Map([['id', '1'], ['mode', 'add']])) // Provide mock ActivatedRoute
          } 
        }
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
