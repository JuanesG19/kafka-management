import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IMessage } from '../../../shared/domains/IMessage';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [CommonModule, MatDialogModule, CustomTableComponent,
    MatFormFieldModule,MatInputModule,MatIconModule,MatGridListModule,MatCardModule,
    ReactiveFormsModule ],
})
export class MessagesComponent {

  columnsDefinitions = [
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'partition', header: 'Partición' },
    { key: 'offset', header: 'Offset' },
    { key: 'value', header: 'Valor' }
  ];

  public actions = [
    {
      label: 'Reply',
      icon: 'reply_all',
      class: 'text-primary',
      handler: (element: IMessage) => this.handleSearch(element),
    },
  ];

  formGroup!: FormGroup;
  
  @ViewChild('replyDialog')
  replyDialog!: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<MessagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { messages: IMessage[]; topicName: string },
    private dialog: MatDialog
  ) {
  }

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

  handleSearch(element: IMessage) {
    console.log('Selected element:', element);
    this.openReplyDialog(element);
  }

  openReplyDialog(element: IMessage) {
    const dialogRef = this.dialog.open(this.replyDialog, {
      data: element,
      width: '1080px',
      height: '500px'
    });

    this.formGroup = new FormGroup({
      timestamp: new FormControl({ value: element.timestamp, disabled: true }),
      partition: new FormControl({ value: element.partition, disabled: true }),
      offset: new FormControl({ value: element.offset, disabled: true }),
      value: new FormControl({ value: element.value, disabled: true }),
      key: new FormControl({ value: element.key, disabled: true }),
      nuevoValor: new FormControl()
    });

    dialogRef.componentInstance.formGroup = this.formGroup;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  enviarDatos() {
    const datos = {
      timestamp: this.formGroup.get('timestamp')?.value,
      partition: this.formGroup.get('partition')?.value,
      offset: this.formGroup.get('offset')?.value,
      value: this.formGroup.get('value')?.value,
      key: this.formGroup.get('key')?.value,
      nuevoValor: this.formGroup.get('nuevoValor')?.value
    };

    console.log(datos); 

    this.dialogRef.close();
  }

}
