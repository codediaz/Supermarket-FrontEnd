import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/app/Interfaces/product';



@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {

  constructor(
    private dialogReference: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public productDelete: Product


  ) { }

  ngOnInit(): void {
  }

  confirmDelete(){
    if(this.productDelete){
      this,this.dialogReference.close("delete");
    }
  }

}
