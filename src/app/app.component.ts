import { Component,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from './Interfaces/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from './Services/product.service';

//?Dialogs
import { DialogAddEditComponent } from './Dialogs/dialog-add-edit/dialog-add-edit.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Supermarket';
  displayedColumns:string[]= ['IdItem','Code', 'Name', 'Description', 'Quantity', 'Actions']
  dataProduct = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _snackbar: MatSnackBar,
    private _productService: ProductService,
    private dialog: MatDialog
  ){

  }

  applyFilter(event:Event){

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataProduct.filter = filterValue.trim().toLowerCase();

  }

  showProducts(){
    this._productService.getList().subscribe({
      next:(data)=>{
        if(data.status){
          this.dataProduct.data = data.value;
        }
      },
      error:(e)=>{}
    });
  }

  ngOnInit(): void {
      
    this.showProducts();
  }

  ngAfterViewInit(): void {
      this.dataProduct.paginator = this.paginator;
  }

  addNewProduct(){
    this.dialog.open(DialogAddEditComponent,{
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(result=>{
      if(result === "Product Created"){
        this.showProducts();
      }
    })
  }
  


}
