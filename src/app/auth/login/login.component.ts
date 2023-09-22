import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSubs!: Subscription;

  constructor(public authSerivce: AuthService) {}

  ngOnInit(): void {
    this.authStatusSubs = this.authSerivce
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authSerivce.login(form.value.email, form.value.password);
  }
  ngOnDestroy(): void {
    this.authStatusSubs.unsubscribe();
  }
}
