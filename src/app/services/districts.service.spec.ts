import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DistrictsService } from './districts.service';

describe('DistrictsService', () => {
  let service: DistrictsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DistrictsService]
    });
    service = TestBed.inject(DistrictsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
