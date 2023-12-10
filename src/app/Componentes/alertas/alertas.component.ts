import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css'],
})
export class AlertasComponent {
  @Input() message: string = '';
  @Output() closeParentFunction: EventEmitter<void> = new EventEmitter<void>();

  closeAlert(action: any) {
    this.closeParentFunction.emit(action);
  }
}
