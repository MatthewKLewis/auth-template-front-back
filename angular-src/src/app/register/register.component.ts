import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        password2: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      },
      { validator: passwordMatchValidator }
    );

    function passwordMatchValidator(g: FormGroup) {
      return g.get('password')?.value === g.get('password2')?.value
        ? null
        : { mismatch: true };
    }
  }

  ngOnInit(): void {}

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }

  onSubmit() {
    console.log(this.registerForm);
  }
}
