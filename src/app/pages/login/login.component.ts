import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import  * as Feather from 'feather-icons'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tabPanel = 0;
  myFormLogin: FormGroup;
  loading: boolean = false;

  showPassword: boolean = true;
  showRegisterPassword: boolean = true;
  showConfirmRegisterPassword: boolean = true;


  myFormRegister: FormGroup;


  constructor(
    private fb: FormBuilder,
    private global: GlobalService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const dataLocal = JSON.parse(localStorage.getItem("dataLogin"));
    console.log('local', dataLocal);

    /* login */
    this.myFormLogin = this.fb.group({
      email: [dataLocal?.correo, [Validators.required, Validators.email]],
      password: [dataLocal?.contrasena, Validators.required],
      remember: [dataLocal?.remember]
    });

    /* register */
    this.myFormRegister = this.fb.group({
      nombre_empresa: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    }, { validator: this.passwordConfirming });
  }

  onSubmitLogin() {
    Feather.replace();
    this.loading = true;
    if (!this.myFormLogin.invalid) {
      let data = {
        email: this.myFormLogin.value.email,
        password: this.myFormLogin.value.password,
        remember: this.myFormLogin.value.remember
      }
      if (this.myFormLogin.value.remember) {
        localStorage.setItem("dataLogin", JSON.stringify(data));
      }
      else {
        localStorage.removeItem("dataLogin");
      }


      this.global.postService("auth/login", data).subscribe(response => {
        this.loading = false;

        if (response["status"] == "EmailNotFound") {
          this.toastr.show("Email not found")
        }
        else if (response["status"] == "PasswordNotMatch") {
          this.toastr.show("Password is incorrect");
        }
        else if (response["status"] == "success") {
          this.global.logIn(response["token"], response["data"]);
          
          this.global.dataUser = response["data"];
          /* this.app.getJson(parseInt(user.idioma)); */
          /* this._firebase.getToken() */
          if (response["data"]["status"]) {
            this.global.isLoggedIn$.emit(false);
          }
        }
        else {
          this.toastr.show("Error to init sesion");
        }
      })

    }
  }

  onSubmitRegister() {
    this.loading = true;

    if (!this.myFormRegister.invalid) {

      let data = {
        nombre_empresa: this.myFormRegister.value.nombre_empresa,
        email: this.myFormRegister.value.email,
        password: this.myFormRegister.value.password,
        rol: 'admin',
      }
      console.log("response", this.loading)

      this.global.postService("auth/register", data).subscribe(response => {
        this.loading = false;
        if (response["status"] == "EmailExist") {

          this.myFormRegister.controls['email'].setErrors({ 'emailExist': true });
          this.toastr.show("Email already exists")
        }
        else if (response["status"] == "success") {
          this.toastr.show("User created successfully");
          this.myFormLogin.controls['email'].setValue(this.myFormRegister.value.email);
          this.myFormLogin.controls['password'].setValue(this.myFormRegister.value.password);
          this.onSubmitLogin();
        }
      })
    }
  }

  passwordConfirming(c: AbstractControl): { invalid__password: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
      return { invalid__password: true };
    }
  }

  changePanel(number) {
    this.tabPanel = number;
    this.myFormLogin.reset();
    this.myFormRegister.reset();
  }

}
