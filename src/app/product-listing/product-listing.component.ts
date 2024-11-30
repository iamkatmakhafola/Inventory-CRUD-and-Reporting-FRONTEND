import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductListing } from '../shared/product-listing';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from '../services/backend.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../shared/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['image', 'name', 'price','brand', 'productTypeName', 'description'];
  dataSource = new MatTableDataSource<ProductListing>();
  constructor(private backendService: BackendService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.backendService.getProducts().subscribe((products:any) => {this.dataSource.data = products});
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
