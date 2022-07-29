import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AsideComponent } from './components/aside/aside.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { IconFeatherComponent } from './components/icon-feather/icon-feather.component';
import { CategoryComponent } from './pages/products/category/category.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { AddCategoryComponent } from './modals/add-category/add-category.component';

import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from './components/pagination/pagination.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { ListProductsComponent } from './pages/products/list-products/list-products.component';
import { DetailsProductComponent } from './pages/products/details-product/details-product.component';
import { SubCategoryComponent } from './pages/products/sub-category/sub-category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './pages/sales/orders/orders.component';
import { TransactionsComponent } from './pages/sales/transactions/transactions.component';
import { BtnSpinerComponent } from './components/btn-spiner/btn-spiner.component';
import { LoadingContentComponent } from './components/loading-content/loading-content.component';
import { ListCouponsComponent } from './pages/coupons/list-coupons/list-coupons.component';
import { CreateCouponsComponent } from './pages/coupons/create-coupons/create-coupons.component';
import { ListPagesComponent } from './pages/pages/list-pages/list-pages.component';
import { CreatePagesComponent } from './pages/pages/create-pages/create-pages.component';
import { MediaComponent } from './pages/media/media.component';
import { ListMenuComponent } from './pages/menu/list-menu/list-menu.component';
import { CreateMenuComponent } from './pages/menu/create-menu/create-menu.component';
import { ListUsersComponent } from './pages/users/list-users/list-users.component';
import { CreateUserComponent } from './pages/users/create-user/create-user.component';
import { ListVendorComponent } from './pages/vendor/list-vendor/list-vendor.component';
import { CreateVendorComponent } from './pages/vendor/create-vendor/create-vendor.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { SelectCountryComponent } from './components/select-country/select-country.component';
import { SelectStateComponent } from './components/select-state/select-state.component';
import { ValidImageDirective } from './directives/valid-image.directive';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AsideComponent,
    NavbarComponent,
    FooterComponent,
    IconFeatherComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    AddCategoryComponent,
    PaginationComponent,
    AddProductComponent,
    ListProductsComponent,
    DetailsProductComponent,
    SubCategoryComponent,
    NotFoundComponent,
    OrdersComponent,
    TransactionsComponent,
    BtnSpinerComponent,
    LoadingContentComponent,
    ListCouponsComponent,
    CreateCouponsComponent,
    ListPagesComponent,
    CreatePagesComponent,
    MediaComponent,
    ListMenuComponent,
    CreateMenuComponent,
    ListUsersComponent,
    CreateUserComponent,
    ListVendorComponent,
    CreateVendorComponent,
    ProfileComponent,
    InvoiceComponent,
    SelectCountryComponent,
    SelectStateComponent,
    ValidImageDirective,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    ModalModule.forRoot(),
    AlifeFileToBase64Module,
    NgSelectModule,
    CarouselModule,
    NgxMaskModule.forRoot(),
    NgxDropzoneModule,
    NgxImageZoomModule,
    BsDatepickerModule.forRoot(),

  ],
  providers: [BsModalRef],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
