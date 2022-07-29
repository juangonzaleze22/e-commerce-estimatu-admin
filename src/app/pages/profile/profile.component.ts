import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  tabPanel = 0;
  isEditProfile: boolean = false;
  loading: boolean = false;

  myFormProfile: FormGroup;
  dataUser;
  validateEmail;

  loadingImage: boolean = false;


  constructor(
    public global: GlobalService,
    private fb: FormBuilder,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.validateEmail = 0;
    this.dataUser = this.global.getUser();
    const date = this.dataUser.fecha_nacimiento ? new Date(this.dataUser.fecha_nacimiento) : null
    this.myFormProfile = this.fb.group({
      nombre: [this.dataUser.nombre],
      apellido: [this.dataUser.apellido],
      nombre_empresa: [this.dataUser.nombre_empresa],
      email: [this.dataUser.email, [Validators.required, Validators.email], this.validateEmail == 2],
      pais: [this.dataUser.locacion?.isoCodePais],
      estado: [this.dataUser.locacion?.isoCodeEstado],
      ciudad: [this.dataUser.locacion?.ciudad],
      telefono: [this.dataUser.telefono],
      sexo: [this.dataUser.sexo, new FormControl(true)],
      fecha_nacimiento: [date]
    });

  }


  editProfile() {
    this.isEditProfile = !this.isEditProfile;
  }

  onSubmitProfile() {

    this.loading = true;

    if (!this.myFormProfile.invalid) {

      let data = {
        idUser: this.global.getUser()._id,
        nombre: this.myFormProfile.value.nombre,
        apellido: this.myFormProfile.value.apellido,
        email: this.myFormProfile.value.email,
        fecha_nacimiento: this.global.formatDate(this.myFormProfile.value.fecha_nacimiento),
        pais: this.myFormProfile.value.pais,
        estado: this.myFormProfile.value.estado,
        ciudad: this.myFormProfile.value.ciudad,
        sexo: this.myFormProfile.value.sexo,
        telefono: this.myFormProfile.value.telefono,
        nombre_empresa: this.myFormProfile.value.nombre_empresa,
      }


      this.global.postService('users/updateUser', data).subscribe(resp => {
        this.loading = false;
        if (resp['status'] == 'success'){
          this.global.updateDataUser(resp['data']);
          this.toastr.show("profile updated successfully")
          this.dataUser = this.global.getUser();
        }

      })
    }


  }

  validEmail() {

    let data = { 
      email : this.myFormProfile.value.email
    }

    this.validateEmail = 0;
    if (!this.myFormProfile.controls.email.errors && this.myFormProfile.value.email != this.dataUser.email) {
      this.global.postService('users/validateEmail', data).subscribe(resp => {
        if (resp['status'] == 'success'){
          this.validateEmail = 1;
          this.myFormProfile.controls.email.setErrors(null)
        }
        if (resp['status'] == 'EmailExist'){
          this.myFormProfile.controls.email.setErrors({ emailExist: true})
        }
      })
    }
  }

  changeImage(image){
    this.loadingImage = true
    const dataImage = image[0];

    let data = { 
      idUser: this.global.getUser()._id,
      image: dataImage
    }

    this.global.postService('users/updateProfileImage', data).subscribe(resp => {
    this.loadingImage = false
      if (resp['status'] == 'success'){
        this.global.updateDataUser(resp['data']);
        this.toastr.show("Image profile is updated successfully")
        this.dataUser = this.global.getUser();
      }

      if (resp['status'] == 'error'){

      }

    })
  }

}
