import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('_token');
    if (!token) {
      this.router.navigate(['/signin']);
    }
  }

  logout() {
    localStorage.removeItem('_token');
    this.router.navigate(['signin']);
  }

}
