import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Input() data;

  myFormCategory: FormGroup;

  categories

  loading: boolean = false;

  constructor(
    private global: GlobalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public BsModalRef: BsModalRef

  ) { }

  ngOnInit(): void {

    /* login */
    this.myFormCategory = this.fb.group({
      nombre: ['', Validators.required],
      image: [''],
      subCategoria: ['']
    });

    if (this.data == 'subcategory'){
      this.getCategories()
    }
  }



  onSubmitCategory() {
    this.loading = true;
    console.log(this.myFormCategory.value)
    if (!this.myFormCategory.invalid) {

      let data;

      if (this.data == 'category'){
        data = {
          userId: this.global.getUser()._id,
          categoria: this.myFormCategory.value.nombre,
          imagen: this.myFormCategory.value.image,
          token: this.global.getUser().token,
        }
      }

      if (this.data == 'subcategory'){
        data = {
          userId: this.global.getUser()._id,
          subCategoria: this.myFormCategory.value.nombre,
          imagen: this.myFormCategory.value.image,
          token: this.global.getUser().token,
          categoryId: this.myFormCategory.value.subCategoria
        }
      }
      

     const pathUrl = this.data == 'category' ? 'categories/createCategory' : (this.data == 'subcategory' ? 'subcategories/createSubcategory': null)
      const message  = this.data == 'category' ? 'Category created successfully' : (this.data == 'subcategory' ? 'Sub Category created successfully': null)
      this.global.postService(pathUrl, data, 1).subscribe(res => {
        this.loading = false;
        if (res['status'] == 'success') {
          this.toastr.success(message);
          this.closeModal(data.categoryId);
        }
      })
    }
  }

  getCategories() {

    const data = {
      userId: this.global.getUser()._id
    }

    this.global.postService('categories/getAllCategoryByUser', data, 1).subscribe(res => {
      if (res['status'] === 'success') {
        this.categories = res['data']
      }
    })

  }

  changeImage(event) {
    this.myFormCategory.get('image').setValue(event[0]);
  }

  closeModal(idCategory = null) {
    this.myFormCategory.reset();
    this.global.publish({ closeModal: true, update: true, idCategory: idCategory });
  }

}
