import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  @Input()dato?:any = null
  @Output()cerrar = new EventEmitter;

  close(){
    this.cerrar.emit()
    console.log("nose")
    // setTimeout(() => {
    //   this.cerrar.emit()
    // }, 800);
  }

}
