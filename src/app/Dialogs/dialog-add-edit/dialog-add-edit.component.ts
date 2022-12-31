import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product } from 'src/app/Interfaces/product';
import { ProductService } from 'src/app/Services/product.service';
import { ThisReceiver } from '@angular/compiler';
import { inject } from '@angular/core/testing';



@Component({
  selector: 'app-dialog-add-edit',
  templateUrl: './dialog-add-edit.component.html',
  styleUrls: ['./dialog-add-edit.component.css'],
})
export class DialogAddEditComponent implements OnInit {

  formProduct:FormGroup;
  action:string ="Agregar"
  actionButton:string="Guardar"
 
  constructor(
    private dialogReference: MatDialogRef<DialogAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public productData:Product,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _productService: ProductService
  ) { 

    this.formProduct = this.fb.group({
      code:['',Validators.required],
      name:['',Validators.required],
      description:['',Validators.required],
      quantity:['',Validators.required],


     });

  }

  ngOnInit(): void {
    if(this.productData){
      this.formProduct.patchValue({
        code: this.productData.code,
        name: this.productData.name,
        description: this.productData.description,
        quantity: this.productData.quantity
      })

      this.action = "Editar"
      this.actionButton = "Actualizar"
    }
  }

  showAlert(msg:string, title:string){
    this._snackBar.open(msg,title,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    })
  }

  addEditProduct(){
    const model:Product={
      idItem: this.productData == null?0: this.productData.idItem,
      code: this.formProduct.value.code,
      name: this.formProduct.value.name,
      description: this.formProduct.value.description,
      quantity: this.formProduct.value.quantity
    }

    if(this.productData== null){

      this._productService.add(model).subscribe({
        next:(data)=>{
          if(data.status){
            this.showAlert("Producto agregado!", "success");
            this.dialogReference.close('created');
            location.reload()
           
          }else{
            this.showAlert("Error al agregar el producto", "Error")
          }
        },
        error:(e)=>{}
      })

    }else{
      this._productService.update(model).subscribe({
        next:(data)=>{
          if(data.status){
            this.showAlert("Producto actualizado!", "success");
            this.dialogReference.close('Edited succesfully');
            
          }else{
            this.showAlert("Error al actualizar el producto", "Error")
          }
        },
        error:(e)=>{}
      })
    }

    
  }

}
