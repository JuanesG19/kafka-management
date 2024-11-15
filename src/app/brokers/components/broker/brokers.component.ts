import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { BrokersService } from '../../application/services/brokers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinner,
  ],
})
export class BrokersComponent {
  
  dialogForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<BrokersComponent>,
    private readonly fb: FormBuilder,
    private readonly brokerService: BrokersService,
    private readonly _snackBar: MatSnackBar
  ) {
    this.dialogRef.disableClose = true;
    this.dialogForm = this.fb.group({
      code: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.dialogForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';
      const code = this.dialogForm.value.code;

      this.brokerService.selectBroker(code).subscribe({
        next: (response) => {
          this.dialogRef.close({
            success: true,
            code: code,
            data: response,
          });
          localStorage.setItem('broker', code);
          location.reload();
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this._snackBar.open('Error selecting broker, try again', 'Close', { duration: 3000 }); // Snackbar no se cierra automáticamente
          console.log('Error', error);
        },
      });
    }
  }
}
