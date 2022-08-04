import { Component, ElementRef, OnInit, TemplateRef, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
import { v4 as uuidv4 } from 'uuid';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('.25s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class AddProductComponent implements OnInit {

  isEdit: boolean;

  subscription: Subscription;

  loading: boolean = false;
  tabPanel = 1;

  myFormProducts: FormGroup;
  formMeta: FormGroup;
  formSize: FormGroup;
  formSocial: FormGroup;
  modalRef?: BsModalRef;

  categories = [];
  subcategories = [];


  valuesMeta = [];
  valuesSize = [];
  valuesImageProducts = [];
  valuesSocial;
  filesImages = [];

  selectedPrice;

  customOptions = {
    loop: false,
    dots: true,
    navText: ["", ""],
    responsive: {
      940: {
        items: 2
      },
      1200: {
        items: 6
      }
    },
    nav: false,
    mouseDrag : true
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Lato, sans-serif',
    toolbarHiddenButtons: [
      [
      'fontSize',
      'textColor',
      'backgroundColor',
      'customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule',
      'toggleEditorMode',
      'fontName',
      'heading',
      'indent',
      'outdent',
      'subscript',
      'superscript',
    ]
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

 /*  customOptions = {
    loop: false,
    dots: true,
    navText: ["", ""],
    items: 1,
    nav: false
  }
 */
  files: File[] = [];
  valueVideo = {};

  constructor(
    private fb: FormBuilder,
    public global: GlobalService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService
  ) { }

   ngOnInit(): void {

    this.myFormProducts = this.fb.group({
      titulo: ["", Validators.required],
      sku: ["", Validators.required],
      categoria: ["", Validators.required],
      subcategoria: [""],
      resumen: [""],
      status: ["active", new FormControl(true, Validators.required)],
      descripcion: [""],
      urlVideo: [""],
      envio: ['false', new FormControl(false, Validators.required)],
      textEnvio: [''],
      size: []

    });

    this.isEdit = this.route.snapshot.queryParamMap.get('idProduct') ? true : false;
    
    this.getCategories();
    

    /* Form general */
    if (this.isEdit) {  
      const idProduct  = this.route.snapshot.queryParamMap.get('idProduct');
      const data = {
        idProduct: idProduct
      }
  
      this.global.postService('products/getProductById', data, 1).subscribe(res => {
        if (res['status'] === 'success') {

          const product = res['data'];

          console.log(product);

          this.myFormProducts = this.fb.group({
            titulo: [product.titulo, Validators.required],
            sku: [product.sku, Validators.required],
            categoria: [product.categoria, Validators.required],
            subcategoria: [product.subcategoria],
            resumen: [product.resumen],
            status: [product.status, new FormControl(product.status, Validators.required)],
            descripcion: [product.descripcion],
            urlVideo: [product.urlVideo],
            envio: [product.envio.toString(), new FormControl(product.envio)],
            textEnvio: [product.textEnvio],
            size: [product.size]
          });

          this.valuesMeta = product.metas;
          this.valuesSize = product.sizes;
          this.valuesImageProducts = product.imagenes;
          this.valueVideo = product.video;
          this.valuesSocial = product.social;

          this.selectedPrice = this.valuesSize[0]

          this.getSubCategories(product.categoria)

        }
      })

    } 

    /* Form sizes */

    this.formSize = this.fb.group({
        size: ["", Validators.required],
        price: ["", Validators.required],
        discount: [null]
    });


    /* Form Metas */

    this.formMeta = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
    });

    /* form Social */

    this.formSocial = this.fb.group({
      facebook:   [""],
      google:     [""],
      twitter:    [""],
      instagram:  [""],
    });

    this.subscription = this.global.observable().subscribe(data => {
      console.log("data", data);
      if (data["closeModal"] == true) {
        this.modalRef.hide();
        
      }

      if(data['update'] == true){
        this.getCategories();
        const idCategory = data['idCategory'] || null;
        
        if (idCategory){
          this.getSubCategories(idCategory)
        }
      }
    });

  }

  get sizeControls(){ 
    return (<FormArray>this.formSize.get('value')) as FormArray
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

  getSubCategories(idCategory) {

    const data = {
      userId: this.global.getUser()._id,
      idCategory
    }

    this.global.postService('subcategories/getAllSubCategoryByCategory', data, 1).subscribe(res => {
      console.log(res['data'])
      if (res['status'] === 'success') {
        this.subcategories = res['data']
      }
      if (res['status'] === 'noData') {
        this.myFormProducts.controls['subcategoria'].setValue('')
        this.subcategories = [];
      }
    })

  }

  removeValues(type, i) {
    if (type == 'sizes') { this.valuesSize.splice(i, 1) };
    if (type == 'metas') this.valuesMeta.splice(i, 1);
    if (type == 'input'){
      (<FormArray>this.formSize.get('size')).removeAt(i)
    };
  }

  removeImage(i) {
    this.valuesImageProducts.splice(i, 1);
  }


  onSubmitList(type) {

    console.log(this.formSize)

    if (type == 'sizes') {
      
      const values = this.formSize.value;
      values.id = uuidv4()

      if (this.valuesSize.length == 0) {
        this.selectedPrice = values;
        this.onSelectedPrice(values)
      }

      console.log(values)

      this.valuesSize.push(values)

      this.formSize.reset();
    }

    if (type == 'metas') {
      const values = this.formMeta.value;
      values._id = uuidv4();
      this.valuesMeta.push(values)
      this.formMeta.reset();
    }

  }

  onSubmitSocial() { 
    this.valuesSocial = this.formSocial.value;
    this.modalRef.hide();
    console.log(this.valuesSocial);
  }


  changeImage($event) {
    const files = $event.target.files[0]
    

    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result 

      let data = { 
        base64: base64,
        fileImage: files
      }
      this.valuesImageProducts.push(data);
      console.log(this.valuesImageProducts)
    }
    reader.readAsDataURL(files);

  }

  onSubmitLogin() {
    this.loading = true;

    if (!this.myFormProducts.invalid) {

      let data: any = {
        idUser: this.global.getUser()._id,
        /* imagenes: this.valuesImageProducts, */
        titulo: this.myFormProducts.value.titulo,
        sku: this.myFormProducts.value.sku,
        categoria: this.myFormProducts.value.categoria,
        subcategoria: this.myFormProducts.value.subcategoria,
        resumen: this.myFormProducts.value.resumen,
        status: this.myFormProducts.value.status,
        descripcion: this.myFormProducts.value.descripcion,
        sizes: this.valuesSize,
        metas: this.valuesMeta,
        video: this.valueVideo,
        idProduct: this.isEdit ? this.route.snapshot.queryParamMap.get('idProduct'): null,
        urlVideo: this.myFormProducts.value.urlVideo,
        envio: this.myFormProducts.value.envio,
        textEnvio: this.myFormProducts.value.textEnvio,
        social: this.valuesSocial,
      }

      let form = new FormData();
  
      form.append("product", JSON.stringify(data));
      this.valuesImageProducts.map(img => {
        form.append("imagenes", img.fileImage || img);
      })

      let textMessage = this.isEdit ? "Product update successfully" : "Product not created successfull";
      console.log(data);
      this.global.postServiceFile(this.isEdit? 'products/updateProduct' : 'products/createProduct', form, 1).subscribe(response => {
        this.loading = false;
        if (response['status'] === "success") {
          this.toastr.show(textMessage);
          this.clearDataForm();
          if (this.isEdit){ 
            this.router.navigate(['/list-products'])
          }
        }
      }, err => {
        this.toastr.show("An error has occurred", err);
      }) 
    }
  }

  onSelect(event) {
    if (event.addedFiles.length != 0){
       const sizeVideo = Number((event.addedFiles[0].size / 1024 / 1024)) 
       if (this.files && this.files.length >= 1) {
        this.onRemove(this.files[0]);
      }
  
      if (sizeVideo > 50) {
        this.toastr.show("The video video is too big");
      } else {
        this.handleVideoUpload(event);
        this.files.push(...event.addedFiles);
      }
    }else{ 
      this.toastr.show("Please select only video");
    }

  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  handleVideoUpload(event) {
    const { name, size, type } = event.addedFiles[0]
    const file = event.addedFiles[0];

    let reader = new FileReader();
    reader.onloadend = () => {
      const dataVideo = { name, size, type }
      this.valueVideo = { ...dataVideo, base64: reader.result }
    }
    reader.readAsDataURL(file);
  }

  changePanel(number) {
    this.tabPanel = number;
  }

  addCategory(value, template: TemplateRef<any>){ 
    this.myFormProducts.controls['subcategoria'].setValue('')
    if (value == 'new-category'){
      this.myFormProducts.controls['categoria'].setValue('')
      this.modalRef = this.modalService.show(template);
    }

    this.getSubCategories(value)
  }

  SubCategory(value, template: TemplateRef<any>){ 
    if (value == 'new-subcategory'){
      this.myFormProducts.controls['subcategoria'].setValue('')
      this.modalRef = this.modalService.show(template);
    }
  }

  openModal(template: TemplateRef<any>, event: Event) {
    event.preventDefault();
    this.modalRef = this.modalService.show( template,
      { class: 'modal-dialog-centered',
      });
  }

  calcDiscount(price, discount){
    if (discount == ''){
      return false;
    }
    const result = parseInt(price) - (parseInt(price) * (parseInt(discount) / 100));
    return result
  }

  onSelectedPrice($event){
    this.selectedPrice = $event
    this.myFormProducts.controls['size'].setValue($event);
  }

  clearDataForm() {
    
    this.valuesMeta = [];
    this.valuesSize = [];
    this.subcategories = []
    this.valuesImageProducts = [];
    this.valueVideo = {};
    this.files = [];
    this.formSize.reset();
    this.formMeta.reset();
    this.myFormProducts.reset();
    this.valuesSocial = {}
    this.selectedPrice = {}
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
