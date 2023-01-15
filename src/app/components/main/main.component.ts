import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/cards/list', {
      headers: {
        'Authorization': this.getToken()
      }
    }).pipe(
      // map(res => {
      //   console.log('111 res map', res);
      //   return res
      // }),
      // catchError(err => {
      //   console.warn(err);
      //   throw err;
      // })
    ).subscribe(res => {
      console.log('111 main onInit', res);
    }, err => {
      console.log('111 error', err);
      if (err.status === 401) {
        this.router.navigateByUrl('/login')
      }
    })
  }

  private getToken(): string {
    return localStorage.getItem('token') || ''
  }
}
