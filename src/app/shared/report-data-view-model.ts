import { Product } from "./product";

export class ReportViewModel {
    label!: string;
    data!: number;
  }
  
  export class ReportBrandProduct {
    brand!: string;
    products!: Product[];
  }
  
  export class ReportDataViewModel {
    ProductCountByBrand: ReportViewModel[] = [];
    ProductCountByProductType: ReportViewModel[] = [];
    ActiveProductReport: ReportBrandProduct[] = [];
  }