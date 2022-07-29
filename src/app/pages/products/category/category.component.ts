import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: Array<any>;
  myFormUpdate: FormGroup;
  imageChanged: string;

  modalRef?: BsModalRef;
  subscription: Subscription

  loading: boolean = false;


  /* pagination */
  paginationData;
  page: number = 1;
  limit: number = 15;



  constructor(
    public global: GlobalService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.subscription = this.global.observable().subscribe(data => {
      console.log(data);
      if (data["closeModal"] == true) {
        console.log("closeModal");
        this.modalRef.hide();
      }

      if(data['update'] == true){
        this.getCategories();
      }
    });

    this.myFormUpdate = this.fb.group({
      categoria: ['', Validators.required],
      image: ['', Validators.required],
      categoryId: ['']
    });

    this.getCategories();
    
  }

  modalAddCategory(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCategories() {
    this.loading = true;
    let data = {
      userId: this.global.getUser()._id,
      page: this.page,
      limit: this.limit
    }
    this.global.postService('categories/getCategories',  data ).subscribe(res => {
      if (res['status'] == 'success') {
        this.loading = false;
        this.categories = res['data'].map(item => { 
          return {
            ...item, 
            edit: false
          }
        }); 
        this.paginationData = res;
        console.log( this.categories.length)
      }
    })
  }


  changeImage(event) {
    this.imageChanged = event[0].base64;
    this.myFormUpdate.get('image').setValue(event[0]);
  }

  openEdit(category){
    this.imageChanged = category.pathUrl != '' ? this.global.urlImage + category.pathUrl : '../assets/images/pro3/34.jpg';
    this.myFormUpdate.get('categoria').setValue(category.categoria);
    this.myFormUpdate.get('image').setValue(category.pathUrl);
    this.myFormUpdate.get('categoryId').setValue(category._id);

    this.categories.map(cat => { 
      cat.edit = false;
      if (category._id == cat._id){
        return cat.edit = true;
      }
    })
  }

  cancelEdit(){
    this.categories.map(cat => { 
      cat.edit = false;
    })
    this.myFormUpdate.reset();
  }

  updateCategory(){
    if (!this.myFormUpdate.invalid) {
      let data = {
        userId: this.global.getUser()._id,
        token: this.global.getUser().token,
        categoria: this.myFormUpdate.value.categoria,
        image: this.myFormUpdate.value.image,
        idCategory: this.myFormUpdate.value.categoryId
      }

      this.global.postService('categories/updateCategory', data, 1).subscribe(res => {
        if (res['status'] == 'success') {
          this.toastr.show("Category update correctly");
          this.getCategories();
          this.myFormUpdate.reset();
        }
      })
    }

  }

  /* pagination */

  updatePage(page) {
    this.page = page;
    this.getCategories();
  }

  /* delete */

  sureDelete(item){
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to delete this category?",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMember(item._id)
      }
    })
  }

  deleteMember(id: string){
    console.log("delete", id)

    let data = { 
      idCategory: id
    }

    this.global.postService('categories/deleteCategory', data, 1).subscribe(res => { 
      console.log(res)
      if (res['status'] == 'success'){
        this.toastr.show('Category delete correctly');
        this.categories = this.categories.filter(category => { 
          return category._id != data.idCategory;
        })
        this.getCategories();
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
