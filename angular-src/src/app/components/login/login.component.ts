import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    const userData = {
      username: this.username,
      password: this.password
    }
    //Required Fields
    if (!this.validateService.validateLogin(userData)) {
      this.flashMessagesService.show('Fill in all fields', { cssClass: 'error', timeout: 3000 });
      return false;
    }

    //Validate email
    if (!this.validateService.validateUsername(userData.username)) {
      this.flashMessagesService.show('Please provide us with a valid email', { cssClass: 'error', timeout: 3000 });
      return false;
    }
    this.authService.authenticateUser(userData).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessagesService.show('Logged in successfully!', { cssClass: 'success', timeout: 3000 });
        this.router.navigate(['wizard']);
      } else {
        this.flashMessagesService.show(data.msg, { cssClass: 'error', timeout: 3000 });
        this.router.navigate(['login']);
      }
    });
  }
}
