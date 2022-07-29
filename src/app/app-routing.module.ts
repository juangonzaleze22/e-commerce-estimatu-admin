import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/products/category/category.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';
import { OrdersComponent } from './pages/sales/orders/orders.component';
import { TransactionsComponent } from './pages/sales/transactions/transactions.component';
import { DetailsProductComponent } from './pages/products/details-product/details-product.component';
import { SubCategoryComponent } from './pages/products/sub-category/sub-category.component';
import { ListCouponsComponent } from './pages/coupons/list-coupons/list-coupons.component';
import { CreateCouponsComponent } from './pages/coupons/create-coupons/create-coupons.component';
import { CreatePagesComponent } from './pages/pages/create-pages/create-pages.component';
import { ListPagesComponent } from './pages/pages/list-pages/list-pages.component';
import { MediaComponent } from './pages/media/media.component';
import { ListMenuComponent } from './pages/menu/list-menu/list-menu.component';
import { CreateMenuComponent } from './pages/menu/create-menu/create-menu.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { ListVendorComponent } from './pages/vendor/list-vendor/list-vendor.component';
import { CreateVendorComponent } from './pages/vendor/create-vendor/create-vendor.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-product/:id', component: AddProductComponent },
  { path: 'list-products', component: ListProductsComponent },
  { path: 'details-product/:id', component: DetailsProductComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'sub-category', component: SubCategoryComponent },
  { path: 'list-coupons', component: ListCouponsComponent },
  { path: 'create-coupons', component: CreateCouponsComponent },
  { path: 'create-pages', component: CreatePagesComponent },
  { path: 'list-pages', component: ListPagesComponent },
  { path: 'media', component: MediaComponent },
  { path: 'list-menu', component: ListMenuComponent },
  { path: 'create-menu', component: CreateMenuComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'list-vendor', component: ListVendorComponent },
  { path: 'create-vendor', component: CreateVendorComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'invoice', component: InvoiceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
