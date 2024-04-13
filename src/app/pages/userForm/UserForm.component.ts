import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';

// Custom validator function
function dateValidator(control: AbstractControl): ValidationErrors | null {
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

@Component({
  selector: 'app-User-Form',
  templateUrl: './UserForm.component.html',
  styleUrls: ['./UserForm.component.css'],
})
export class UserFormComponent implements OnInit {
  maxDate: Date;
  userForm: FormGroup;

  defaultColor: string = '#000000';
  user: User = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    birthday: '',
    address: '',
    city: '',
    country: '',
    hobbies: [],
    favoriteColor: this.defaultColor,
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
        this.user.firstName,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      lastName: [
        this.user.lastName,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      gender: [this.user.gender, Validators.required],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      birthday: [this.user.birthday, [Validators.required, dateValidator]],
      address: [
        this.user.address,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      city: [
        this.user.city,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      country: [
        this.user.country,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      hobbies: [
        this.user.hobbies,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      favoriteColor: [this.user.favoriteColor, Validators.required],
      seats: [
        this.user.seats,
        [Validators.required, Validators.min(2), Validators.max(7)],
      ],
      motorType: [this.user.motorType, Validators.required],
    });
  }

  ngOnInit() {

    // Component initialization logic
  }

  onSave() {
    console.log('Form submitted');
    console.log('Form validity:', this.userForm.valid);
    console.log('Form value:', this.userForm.value);

    if (this.userForm.valid) {
      console.log('Form is valid');
      // Update the user object with the form values
      this.user = this.userForm.value;
      console.log('Saving user:', this.user);
    } else {
      console.log('Form is invalid');
      // Mark all form controls as touched to trigger validation messages
      this.markFormGroupTouched(this.userForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
