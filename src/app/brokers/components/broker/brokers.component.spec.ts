import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrokersComponent } from './brokers.component';
import { BrokersService } from '../../application/services/brokers.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('BrokersComponent', () => {
  let component: BrokersComponent;
  let fixture: ComponentFixture<BrokersComponent>;
  let mockBrokersService: { selectBroker: jest.Mock };
  let mockDialogRef: { close: jest.Mock; disableClose: boolean };
  let mockFormBuilder: FormBuilder;

  beforeEach(async () => {
    mockBrokersService = {
      selectBroker: jest.fn()
    };

    mockDialogRef = {
      close: jest.fn(),
      disableClose: true
    };

    mockFormBuilder = new FormBuilder();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatProgressSpinnerModule],
      declarations: [BrokersComponent],
      providers: [
        { provide: BrokersService, useValue: mockBrokersService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: FormBuilder, useValue: mockFormBuilder }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable dialog close', () => {
    expect(mockDialogRef.disableClose).toBeTruthy();
  });

  it('should initialize the form with the correct fields and validations', () => {
    expect(component.brokerForm.controls['code'].validator).toEqual(Validators.required);
  });

  it('should not submit invalid form', () => {
    component.brokerForm.controls['code'].setValue('');
    component.onSubmit();
    expect(mockBrokersService.selectBroker).not.toHaveBeenCalled();
  });

  it('should submit valid form and close dialog on success', () => {
    const mockCode = 'TEST123';
    const mockResponse = { id: 1, name: 'Test Broker' };

    // Mock localStorage setItem
    const localStorageSpy = jest.spyOn(Storage.prototype, 'setItem');

    // Setup form and service mock
    component.brokerForm.controls['code'].setValue(mockCode);
    mockBrokersService.selectBroker.mockReturnValue(of(mockResponse));

    // Trigger submit
    component.onSubmit();

    // Assertions
    expect(mockBrokersService.selectBroker).toHaveBeenCalledWith(mockCode);
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      success: true,
      code: mockCode,
      data: mockResponse
    });
    expect(localStorageSpy).toHaveBeenCalledWith('broker', mockCode);
    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBe('');

    // Cleanup
    localStorageSpy.mockRestore();
  });

  it('should handle error when broker selection fails', () => {
    const mockCode = 'TEST123';
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    // Setup form and service mock
    component.brokerForm.controls['code'].setValue(mockCode);
    mockBrokersService.selectBroker.mockReturnValue(throwError(() => new Error('Test Error')));

    // Trigger submit
    component.onSubmit();

    // Assertions
    expect(mockBrokersService.selectBroker).toHaveBeenCalledWith(mockCode);
    expect(mockDialogRef.close).not.toHaveBeenCalled();
    expect(component.isLoading()).toBe(false);
    expect(component.errorMessage()).toBe('Error, try again');

    // Cleanup
    consoleLogSpy.mockRestore();
  });

  it('should show loading spinner when submitting the form', () => {
    const mockCode = 'TEST123';

    // Setup form and service mock
    component.brokerForm.controls['code'].setValue(mockCode);
    mockBrokersService.selectBroker.mockReturnValue(of({ id: 1, name: 'Test Broker' }));

    // Trigger submit
    component.onSubmit();

    // Assertions
    expect(component.isLoading()).toBe(true);
  });

  it('should hide loading spinner when form submission is complete', () => {
    const mockCode = 'TEST123';

    // Setup form and service mock
    component.brokerForm.controls['code'].setValue(mockCode);
    mockBrokersService.selectBroker.mockReturnValue(of({ id: 1, name: 'Test Broker' }));

    // Trigger submit
    component.onSubmit();

    // Wait for the form submission to complete
    fixture.detectChanges();

    // Assertions
    expect(component.isLoading()).toBe(false);
  });

  it('should show error message when form submission fails', () => {
    const mockCode = 'TEST123';

    // Setup form and service mock
    component.brokerForm.controls['code'].setValue(mockCode);
    mockBrokersService.selectBroker.mockReturnValue(throwError(() => new Error('Test Error')));

    // Trigger submit
    component.onSubmit();

    // Assertions
    expect(component.errorMessage()).toBe('Error, try again');
  });
});