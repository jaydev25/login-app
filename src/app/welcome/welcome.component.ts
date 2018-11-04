import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  users: any = [];
  currentUser: any;
  url: string = 'http://localhost:5000/';

  constructor(
    private route: ActivatedRoute,
    public http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('_token');
    if (!token) {
      this.router.navigate(['/signin']);
    } else {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': token
        })
      };
      this.http.get(this.url + 'login/users', httpOptions).subscribe((data) => {
        this.loading = false;
        if (data['success']) {
          this.users = data['users'];
          this.currentUser = data['currentUser'];
        }
      }, error => {
      });
    }

  }

  logout() {
    localStorage.removeItem('_token');
    this.router.navigate(['signin']);
  }

}
