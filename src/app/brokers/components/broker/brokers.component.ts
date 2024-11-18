import { Component, signal } from '@angular/core';
import {
  FormBuilder,
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
  dialogForm = this.fb.nonNullable.group({
    code: ['', [Validators.required]]
  });

  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private readonly dialogRef: MatDialogRef<BrokersComponent>,
    private readonly fb: FormBuilder,
    private readonly brokerService: BrokersService,
  ) {
    this.dialogRef.disableClose = true;
  }

  onSubmit(): void {
    if (this.dialogForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      const code = this.dialogForm.getRawValue().code;

      this.brokerService.selectBroker(code).subscribe({
        next: (response) => {
          this.dialogRef.close({
            success: true,
            code,
            data: response
          });
          localStorage.setItem('broker', code);
          this.isLoading.set(false);
        },
        error: (response) => {
          console.log(response)
          this.isLoading.set(false);
          this.errorMessage.set("Error, try again");
        }
      });
    }
  }
}