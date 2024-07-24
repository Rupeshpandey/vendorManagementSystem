import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BasicDetailsComponent } from './basic-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DistrictsService } from 'src/app/services/districts.service';
import { BlocksService } from 'src/app/services/blocks.service';
import { PanverificationService } from 'src/app/services/panverification.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('BasicDetailsComponent', () => {
  let component: BasicDetailsComponent;
  let fixture: ComponentFixture<BasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDetailsComponent ],
      imports: [ FormsModule, HttpClientTestingModule, RouterTestingModule, MatCheckboxModule ], // Import necessary modules here
      providers: [ DistrictsService, BlocksService, PanverificationService ] // Provide services here
 
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
