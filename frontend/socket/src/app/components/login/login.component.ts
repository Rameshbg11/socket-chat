import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../services/generic.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public genService: GenericService,
    public authService: AuthService,
    private form: FormBuilder,
    private router: Router) {
    this.buildForm();
  }

  ngOnInit() {

  }
  buildForm() {
    this.loginForm = this.form.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  loginUser(obj) {
    if (this.loginForm.valid) {
      let userObj;
      if (this.loginForm.value.username.includes('@') && this.loginForm.value.username.includes('.')) {
        userObj = {
          email: this.loginForm.value.username,
          password: this.loginForm.value.password
        }
      } else {
        userObj = {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password
        }
      }
      this.authService.authenticateUser(userObj).subscribe(res => {
        if (res['success']) {
          this.authService.storeToken(res['token'], res['user'], res['expVal']);
          this.router.navigate(['/home']);
          this.genService.openSnackbar('Login Success', 'Ok');
        } else
          this.genService.openSnackbar(res['msg'])
      });
    } else
      this.genService.openSnackbar('Please fill all the details');
  }

}
