import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IMessage } from '../shared/domains/IMessage';
import { CustomTableComponent } from '../shared/components/customTable/components/customTable/customTable.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [CommonModule, MatDialogModule, CustomTableComponent],
})
export class MessagesComponent {

  columnsDefinitions = [
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'partition', header: 'Partición' },
    { key: 'offset', header: 'Offset' },
    { key: 'value', header: 'Valor' }
  ];

  

  constructor(
    public dialogRef: MatDialogRef<MessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { topicName: string, messages: IMessage[] }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  formatValue(value: string): string {
    try {
      const parsed = JSON.parse(value);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return value;
    }
  }
}
