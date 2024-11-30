import { Component } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brands } from '../shared/brands';
import { ProductTypes } from '../shared/product-types';
import { MaterialModule } from '../shared/material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    HttpClientModule, 
    FlexLayoutModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  formData = new FormData();
  brandsData: Brands[] = [];
  productTypesData: ProductTypes[] = [];
  fileNameUploaded = '';

  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    file: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0.01)]],
    brand: [null, Validators.required],
    producttype: [null, Validators.required],
    description: ['', Validators.required]
  });

 constructor(private backendService: BackendService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

 ngOnInit(): void {
   this.GetBrands()
   this.GetProductTypes()
 }

 GetBrands() {
  this.backendService.getBrands().subscribe(result => {
    this.brandsData = result;
  });
  }

  GetProductTypes() {
    this.backendService.getProductTypes().subscribe(result => {
      this.productTypesData = result;
    });
  }

 uploadFile = (files: any) => {
   let fileToUpload = <File>files[0];
   this.formData.append('file', fileToUpload, fileToUpload.name);
   this.fileNameUploaded = fileToUpload.name
 }

 onSubmit() {
   if(this.productForm.valid)
   {
     this.formData.append('name', this.productForm.get('name')!.value);
     this.formData.append('price', this.productForm.get('price')!.value);
     this.formData.append('description', this.productForm.get('description')!.value);
     this.formData.append('brand', this.productForm.get('brand')!.value);
     this.formData.append('producttype', this.productForm.get('producttype')!.value);
     
     this.backendService.addProduct(this.formData).subscribe(() => {
       this.clearData()
       this.router.navigateByUrl('product-listing').then((navigated: boolean) => {
         if(navigated) {
           this.snackBar.open(this.productForm.get('name')!.value + ` created successfully`, 'X', {duration:2000});
         }
      });
     });
   }
 }

 clearData(){
   this.formData.delete("file");
   this.formData.delete("name");
   this.formData.delete("price");
   this.formData.delete("description");
   this.formData.delete("brand");
   this.formData.delete("producttype");
 }
}
