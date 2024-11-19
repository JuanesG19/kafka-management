import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { IMessage } from '../../../shared/domains/IMessage';
import { CustomTableComponent } from '../../../shared/components/customTable/components/customTable/customTable.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../application/services/messages.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [
    CommonModule,
    MatDialogModule,
    CustomTableComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class MessagesComponent {
  currentPagination: { pageIndex: number; pageSize: number } = {
    pageIndex: 0,
    pageSize: 10,
  };

  onPageChanged(event: PageEvent) {
    this.currentPagination.pageIndex = event.pageIndex;
    this.currentPagination.pageSize = event.pageSize;
  }

  columnsDefinitions = [
    { key: 'timestamp', header: 'Timestamp' },
    { key: 'partition', header: 'Partición' },
    { key: 'offset', header: 'Offset' },
    { key: 'value', header: 'Valor' },
  ];

  public actions = [
    {
      label: 'Reenviar',
      icon: 'send',
      class: 'text-primary',
      handler: (element: IMessage) => this.handleSearch(element),
    },
  ];

  formGroup!: FormGroup;

  @ViewChild('replyDialog')
  replyDialog!: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<MessagesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { messages: IMessage[]; topicName: string },
    private readonly dialog: MatDialog,
    private readonly messageService: MessageService
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

  handleSearch(element: IMessage) {
    console.log('Selected element:', element);
    this.openReplyDialog(element);
  }

  openReplyDialog(element: IMessage) {
    this.dialog.open(this.replyDialog, {
      data: element,
      width: '1080px',
      height: '700px',
    });

    this.formGroup = new FormGroup({
      timestamp: new FormControl({ value: element.timestamp, disabled: true }),
      partition: new FormControl({ value: element.partition, disabled: true }),
      offset: new FormControl({ value: element.offset, disabled: true }),
      value: new FormControl({ value: element.value, disabled: true }),
      key: new FormControl({ value: element.key, disabled: true }),
      nuevoValor: new FormControl(),
    });
  }

  enviarDatos() {
    if (this.formGroup.valid) {
      const datos = {
        topic: 'topic_test',
        partition: this.formGroup.get('partition')?.value,
        previousMessage: this.formGroup.get('value')?.value,
        idMessagePrevious: this.formGroup.get('key')?.value,
        userDomain: 'userDomain',
        newMessage: this.formGroup.get('value')?.value,
      };

      console.log(datos);

      this.messageService.retryMessage(datos).subscribe({
        next: (response: string) => {
          console.log('Mensaje reenviado con éxito:', response);
          alert('Mensaje reenviado con éxito.');
          this.dialogRef.close();
          location.reload();
        },
        error: (error) => {
          console.error('Error al reenviar el mensaje:', error);
        },
      });
    } else {
      console.error('Formulario no válido');
    }
  }
}
