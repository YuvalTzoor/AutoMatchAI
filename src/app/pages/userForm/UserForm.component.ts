import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-User-Form',
  templateUrl: './UserForm.component.html',
  styleUrls: ['./UserForm.component.css'],
})
export class UserFormComponent implements OnInit {
  maxDate: Date;
  userForm: FormGroup;
  user: User = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    birthday: '',
    address: '',
    city: '',
    country: '',
    hobbies: '',
    favoriteColor: '',
    seats: '',
    motorType: '',
  };

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.maxDate = new Date();
    this.userForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      gender: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      birthday: ['', [Validators.required, this.dateValidator.bind(this)]],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      country: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      hobbies: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      favoriteColor: ['', Validators.required],
      seats: ['', [Validators.required, Validators.min(2), Validators.max(7)]],
      motorType: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Component initialization logic
  }

  onSave() {
    console.log(this.user);
    if (this.userForm.valid) {
      // Form is valid, perform save operation
      console.log(this.userForm.value);
    }
  }

  dateValidator(control: AbstractControl) {
    console.log(control.value);
    const selectedDate = control.value;
    const currentDate = new Date();

    if (selectedDate && !isNaN(Date.parse(selectedDate))) {
      const parsedSelectedDate = new Date(selectedDate);
      console.log('Selected date:', parsedSelectedDate);
      console.log('Current date:', currentDate);

      if (parsedSelectedDate > currentDate) {
        console.log('Invalid date');
        return { invalidDate: true };
      }
    }

    return null;
  }
}
