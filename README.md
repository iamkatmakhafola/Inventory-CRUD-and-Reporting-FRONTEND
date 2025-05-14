# Inventory Management Dashboard 📈🛍️  
**Angular admin interface for product inventory with data visualization**

🔹 **Description**:  
Feature-rich admin portal for managing inventory products, featuring secure authentication, dynamic data tables, and interactive charts. Built with Angular Material for a professional UI experience.

🔹 **Key Features**:  
- **Auth Flow**: JWT-powered login/registration  
- **Smart Product Tables**:  
  - Sortable columns (name, price, brand, etc.)  
  - Filter-as-you-type search  
  - Pagination (3/5/10 items per page)  
- **Data Visualization**:  
  - Brand/Type distribution charts  
  - Accordion-style active products report  
- **Form Management**:  
  - Product creation with image upload  
  - Reactive forms with validation  

🔹 **Tech Stack**:  
- **Framework**: Angular 15+  
- **UI Library**: Angular Material + CDK  
- **State Management**: RxJS + NgRx (optional)  
- **Charting**: Chart.js/NGX-Charts  
- **Routing**: Angular Router with auth guards  

🔹 **Core Modules**:  
| Module | Components | Services |  
|--------|------------|----------|  
| `Auth` | Login, Register | AuthService |  
| `Products` | Listing, Add | ProductService |  
| `Reports` | Charts, Accordion | ReportService |  
| `Shared` | Sidebar, Loader | LocalStorage |  
