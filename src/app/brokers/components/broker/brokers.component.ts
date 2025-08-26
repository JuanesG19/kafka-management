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
    private dialogRef: MatDialogRef<BrokersComponent> 
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
            console.log('Broker conectado con éxito', res);
            this.dialogRef.close(code); 
          
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