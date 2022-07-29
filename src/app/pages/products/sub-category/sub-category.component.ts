import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  subCategories: Array<any>;
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
      if (data["closeModal"] == true) {
        console.log("closeModal");
        this.modalRef.hide();
      }

      if(data['update'] == true){
        this.getSubCategories();
      }
    });

    this.myFormUpdate = this.fb.group({
      subCategoria: [''],
      image: [''],
      subCategoryId: ['']
    });

    this.getSubCategories();
    
  }

  modalAddSubCategory(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getSubCategories() {
    this.loading = true;
    let data = {
      userId: this.global.getUser()._id,
      page: this.page,
      limit: this.limit
    }
    this.global.postService('subcategories/getSubCategories',  data ).subscribe(res => {
      if (res['status'] == 'success') {
        this.loading = false;
        this.subCategories = res['data'].map(item => { 
          return {
            ...item, 
            edit: false
          }
        }); 
        this.paginationData = res;
      }
    })
  }


  changeImage(event) {
    this.imageChanged = event[0].base64;
    this.myFormUpdate.get('image').setValue(event[0]);
  }

  openEdit(subCategory){
    this.imageChanged = subCategory.pathUrl != ''? this.global.urlImage + subCategory.pathUrl : '../assets/images/pro3/34.jpg';
    this.myFormUpdate.get('subCategoria').setValue(subCategory.subCategoria);
    this.myFormUpdate.get('image').setValue(subCategory.pathUrl);
    this.myFormUpdate.get('subCategoryId').setValue(subCategory._id);

    this.subCategories.map(subcat => { 
      subcat.edit = false;
      if (subCategory._id == subcat._id){
        return subcat.edit = true;
      }
    })
  }

  cancelEdit(){
    this.subCategories.map(cat => { 
      cat.edit = false;
    })
    this.myFormUpdate.reset();
  }

  updateCategory(){
    if (!this.myFormUpdate.invalid) {
      let data = {
        userId: this.global.getUser()._id,
        subCategoria: this.myFormUpdate.value.subCategoria,
        image: this.myFormUpdate.value.image,
        subCategoryId: this.myFormUpdate.value.subCategoryId
      }

      this.global.postService('subcategories/updateSubCategory', data, 1).subscribe(res => {
        if (res['status'] == 'success') {
          this.toastr.show("Category update correctly");
          this.getSubCategories();
          this.myFormUpdate.reset();
        }
      })
    }

  }

  /* pagination */

  updatePage(page) {
    this.page = page;
    this.getSubCategories();
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
    let data = { 
      idSubCategory: id
    }

    this.global.postService('subcategories/deleteSubCategory', data, 1).subscribe(res => { 
      if (res['status'] == 'success'){
        this.toastr.show('Category delete correctly');
        this.subCategories = this.subCategories.filter(category => { 
          return category._id != data.idSubCategory;
        })
        this.getSubCategories();
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
