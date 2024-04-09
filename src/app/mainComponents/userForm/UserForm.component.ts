import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: 'app-User-Form',
  templateUrl: './UserForm.component.html',
  styleUrls: ['./UserForm.component.css'],
})
export class UserFormComponent implements OnInit {
  constructor(public route: ActivatedRoute, private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  Test: string = 'Test';

  UserPrompt: string | any;
  GptResponse: string | any;
  IsLoading: boolean = false;

  startsWithHttps(text: string | undefined): boolean {
    return text?.startsWith('https') ?? false;
  }

  onSendPrompt(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.IsLoading = true;
    this.UserPrompt = form.value.UserPrompt;

    if (!this.UserPrompt || this.UserPrompt.length < 5) {
      alert('אנא הקש פרומט תקין ונסה שוב.');
      this.IsLoading = false;
      return;
    }
    console.log(this.UserPrompt);

    const payload = { UserPrompt: this.UserPrompt };

    this.http
      .post<{ answer: string; message: string }>(
        'http://localhost:3000/api/requests',
        payload
      )
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          this.IsLoading = false;
          // Handle the error accordingly
          // You might want to display an error message or perform other actions
          return of({ answer: 'Error occurred', message: error.message });
        })
      )
      .subscribe((responseData) => {
        console.log(responseData);
        this.GptResponse = responseData.answer;
        console.log(responseData.answer);
        console.log(responseData.message);
        console.log(this.startsWithHttps(this.GptResponse));
        this.IsLoading = false;
      });
  }
}
