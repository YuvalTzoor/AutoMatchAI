import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UserService } from 'src/app/services/user.service';

// Custom validator function
function dateValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = control.value;
  const currentDate = new Date();
  const userService = new UserService();

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

  // user: User = {
  //   firstName: '',
  //   lastName: '',
  //   gender: '',
  //   email: '',
  //   birthday: '',
  //   address: '',
  //   city: '',
  //   country: '',
  //   hobbies: [],
  //   favoriteColor: this.defaultColor,
  //   seats: '',
  //   motorType: '',
  // };
  user: User = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    email: 'john.doe@example.com',
    birthday: new Date('1990-05-15') as unknown as string,
    address: '123 Main St',
    city: 'New York',
    country: 'USA',
    hobbies: ['reading', 'painting', 'hiking'],
    favoriteColor: this.defaultColor,
    seats: '4',
    motorType: 'electric',
  };

  hobbies: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);

  removehobbie(hobbies: string) {
    const index = this.hobbies.indexOf(hobbies);
    console.log('index:', index);
    if (index >= 0) {
      this.hobbies.splice(index, 1);
      this.userForm.get('hobbies')?.patchValue(this.hobbies);

      this.announcer.announce(`removed ${hobbies}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.hobbies.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }
  @ViewChild('chipList', { static: true }) chipList: MatChipsModule | undefined;
  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
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
      hobbies: [this.user.hobbies, Validators.required],
      favoriteColor: [this.user.favoriteColor, Validators.required],
      seats: [
        this.user.seats,
        [Validators.required, Validators.min(2), Validators.max(7)],
      ],
      motorType: [this.user.motorType, Validators.required],
    });
  }

  ngOnInit() {
    let TotalVisitors: number = parseInt(
      localStorage.getItem('TotalVisitors') || '0'
    );
    if (TotalVisitors) {
      TotalVisitors = TotalVisitors + 1;
    } else {
      TotalVisitors = 1;
    }

    localStorage.setItem('TotalVisitors', TotalVisitors.toString());
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  onSave() {
    console.log('Form submitted');
    console.log('Form validity:', this.userForm.valid);
    console.log('Form value:', this.userForm.value);

    if (this.userForm.valid) {
      console.log('Form is valid');

      this.user = this.userForm.value;
      console.log('Saving user:', this.user);

      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(this.user);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      console.log('Form is invalid');

      this.markFormGroupTouched(this.userForm);
    }


    let SubmitterCount: number = parseInt(
      localStorage.getItem('SubmitterCount') || '0'
    );
    if (SubmitterCount) {
      SubmitterCount = SubmitterCount + 1;
    } else {
      SubmitterCount = 1;
    }
    localStorage.setItem('SubmitterCount', SubmitterCount.toString());

    this.openSnackBar(
      'User saved successfully and a confirmation Email will sent to you soon!',
      'Close'
    );
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
