import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { BrokersService } from '../../application/services/brokers.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-brokers',
  standalone: true,
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.css'],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
  ]
})
export class BrokersComponent {
  brokerForm = this.fb.nonNullable.group({
    code: ['', [Validators.required]],
  });

  isLoading = signal(false);
  errorMessage = signal('');


  constructor(
    private readonly fb: FormBuilder,
    private readonly brokerService: BrokersService,
    private dialogRef: MatDialogRef<BrokersComponent>,
    private readonly _snackBar: MatSnackBar
  ) {
  }

  onSubmit(): void {
    if (this.brokerForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const code = this.brokerForm.getRawValue().code;

      this.brokerService.selectBroker(code).subscribe({
        next: (response) => {
          const res = JSON.parse(response);

          if (res.status === 'error') {
            this.errorMessage.set('Error, try again');
          } else {
            localStorage.setItem('broker', code);
            this._snackBar.open(
              'Connected to broker ' + code,
              "Close",
              {
                duration: 5000,
                panelClass: ['snackbar-success'],
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              }
            );
            this.dialogRef.close({ success: true, code });
          }

          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage.set('Error, try again');
          this.isLoading.set(false);
        },
      });
    }
  }
}