import { TestBed } from '@angular/core/testing';
import { BrokersService } from './brokers.service';
import { BrokersHttpService } from '../../infrastructure/brokers-http.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BrokersComponent } from '../../components/broker/brokers.component';
import { of } from 'rxjs';

interface MockLocalStorage {
    getItem: jest.Mock<string | null>;
    setItem: jest.Mock<void>;
    removeItem: jest.Mock<void>;
  }

describe('BrokersService', () => {
  let service: BrokersService;
  let mockBrokersHttpService: jest.Mocked<BrokersHttpService>;
  let mockDialog: jest.Mocked<MatDialog>;
  let mockLocalStorage: MockLocalStorage;

  beforeEach(() => {
    // Mock BrokersHttpService
    mockBrokersHttpService = {
      selectBroker: jest.fn()
    } as any;

    // Mock MatDialog
    mockDialog = {
      open: jest.fn()
    } as any;

    // Mock localStorage
    mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn()
    } as any;

    Object.defineProperty(window, 'localStorage', { 
      value: mockLocalStorage 
    });

    TestBed.configureTestingModule({
      providers: [
        BrokersService,
        { provide: BrokersHttpService, useValue: mockBrokersHttpService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    });

    service = TestBed.inject(BrokersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('selectBroker', () => {
    it('should delegate to brokersHttpService', () => {
      const mockTerm = 'test-broker';
      const mockResponse = 'broker-response';
      mockBrokersHttpService.selectBroker.mockReturnValue(of(mockResponse));

      service.selectBroker(mockTerm).subscribe(response => {
        expect(response).toBe(mockResponse);
        expect(mockBrokersHttpService.selectBroker).toHaveBeenCalledWith(mockTerm);
      });
    });
  });

  describe('checkBroker', () => {
    it('should open dialog when no broker is set in localStorage', () => {
      // Simulate no broker in localStorage
      mockLocalStorage.getItem.mockReturnValue(null);

      // Mock dialog open
      const mockDialogRef = {
        afterClosed: jest.fn()
      } as any;
      mockDialog.open.mockReturnValue(mockDialogRef);

      // Configure afterClosed observable
      mockDialogRef.afterClosed.mockReturnValue(of(null));

      // Spy on console log and setTimeout
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const setTimeoutSpy = jest.spyOn(window, 'setTimeout');

      // Call the method
      service.checkBroker();

      // Assertions
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('broker');
      expect(mockDialog.open).toHaveBeenCalledWith(BrokersComponent, {
        width: '400px',
        disableClose: true,
        hasBackdrop: true
      });
      expect(setTimeoutSpy).toHaveBeenCalled();

      // Cleanup
      consoleLogSpy.mockRestore();
      setTimeoutSpy.mockRestore();
    });

    it('should not open dialog when broker is set in localStorage', () => {
      // Simulate broker exists in localStorage
      mockLocalStorage.getItem.mockReturnValue('existing-broker');

      // Mock dialog open
      const mockDialogRef = {
        afterClosed: jest.fn()
      } as any;
      mockDialog.open.mockReturnValue(mockDialogRef);

      // Call the method
      service.checkBroker();

      // Assertions
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('broker');
      expect(mockDialog.open).not.toHaveBeenCalled();
    });

    it('should reopen dialog if dialog result is not successful', () => {
      // Simulate no broker in localStorage
      mockLocalStorage.getItem.mockReturnValue(null);

      // Mock dialog open
      const mockDialogRef = {
        afterClosed: jest.fn()
      } as any;
      mockDialog.open.mockReturnValue(mockDialogRef);

      // Configure afterClosed observable with unsuccessful result
      mockDialogRef.afterClosed.mockReturnValue(of({ success: false }));

      // Spy on setTimeout
      const setTimeoutSpy = jest.spyOn(window, 'setTimeout');

      // Call the method
      service.checkBroker();

      // Assertions
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('broker');
      expect(mockDialog.open).toHaveBeenCalledTimes(1);
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100);

      // Cleanup
      setTimeoutSpy.mockRestore();
    });
  });
});