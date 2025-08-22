import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './customModal.component.html',
  styleUrls: ['./customModal.component.css'],
  imports: [
        MatDialogModule,
        MatButtonModule
    ]
})
export class CustomModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onAccept(): void {
    this.dialogRef.close(true);
  }
}