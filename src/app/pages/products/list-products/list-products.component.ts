import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products = [];
  loading: boolean = false;

  paginationData;
  page: number = 1;
  limit: number = 15;

  selectedPrice;



  constructor(
    public global: GlobalService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getProducts()
  }

  getProducts(){
    this.loading = true;
    const data = { 
      idUser: this.global.getUser()._id,
      page: this.page,
      limit: this.limit
    }

    this.global.postService("products/getAllProductsByUser", data, 1).subscribe(response => {
      this.loading = false;
      if (response['status'] === 'success') {
        this.products = response['data']
        this.paginationData = response;
        console.log(response)
      }
    }, err => {
      this.toastr.show("Error", err)
    })

  }


  /* delete */

  sureDelete(idProduct){
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to delete this product?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(idProduct)
      }
    })
  }

  deleteProduct(id: string){

    let data = { 
      idProduct: id
    }

    this.global.postService('products/deleteProduct', data, 1).subscribe(res => { 
      if (res['status'] == 'success'){
        this.toastr.show('This products has been delete correctly');
        this.products = this.products.filter(product => { 
          return product._id != data.idProduct;
        })
      }
    })
  }

  updatePage(page) {
    this.page = page;
    this.getProducts();
  }

}
