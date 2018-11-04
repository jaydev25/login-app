import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    url: string = 'http://localhost:5000/';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        public http: HttpClient
        // private apiService: ApiService
      ) {
      }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            contact: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        return this.http.post(this.url + 'signup', this.registerForm.value).subscribe((data) => {
          this.loading = false;
          if (data['success']) {
            window.alert(data['message']);
            this.router.navigate(['/signin']);
          } else {
            window.alert(data['message']);
          }
        }, error => {
          this.loading = false;
        });

        // this.apiService.post('signup', this.registerForm.value)
        //     .subscribe(
        //         data => {
        //             // this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             // this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}
