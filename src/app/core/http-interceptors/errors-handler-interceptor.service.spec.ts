import { TestBed } from '@angular/core/testing';

import { ErrorsHandlerInterceptorService } from './errors-handler-interceptor.service';

describe('ErrorsHandlerInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorsHandlerInterceptorService = TestBed.get(ErrorsHandlerInterceptorService);
    expect(service).toBeTruthy();
  });
});
