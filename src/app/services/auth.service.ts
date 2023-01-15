import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private http: HttpClient) {}

    // public login(email: string, password: string): Observable<any> {
    //     return this.http.post('http://localhost:5000/auth/login/password', {
    //         username: email, 
    //         password
    //     })
    // }

    // public signUp(email: string, password: string) {
    //     return this.http.post('http://localhost:5000/auth/signup', {
    //         email, 
    //         password
    //     })
    // }
   
    public login(email: string, password: string): Observable<any> {
        return this.http.post<any>('http://localhost:5000/auth/login/jwt', {
            username: email, 
            password
        }).pipe(
            tap(res => this.storeToken(res.token))
        )
    }

    public signUp(email: string, password: string) {
        return this.http.post('http://localhost:5000/auth/register', {
            username: email, 
            password
        })
    }

    private storeToken(token: string) {
        localStorage.setItem('token', token)
    }
}
