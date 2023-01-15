import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	public form: FormGroup;
	public signUpForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.form = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});

		this.signUpForm = fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
			passwordRepeat: ['', Validators.required],
		})
	}

    public login() {
        const { email, password } = this.form.value;

		if (this.form.valid) {
			this.authService.login(email, password).subscribe(() => {
				console.log('User is logged in');
				this.form.reset()
				// this.router.navigateByUrl('/');
			});
		}
    }

	public signUp() {
		const { email, password, passwordRepeat } = this.signUpForm.value

		if (password === passwordRepeat) {
			this.authService.signUp(email, password).subscribe(() => {
				console.log('User is signed up!');
			})
		}
		else {
			console.log('Passwords are not equal');
		}
	}
}
