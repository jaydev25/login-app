import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

import { ApiService } from './api.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _token: any;

  constructor(public api: ApiService, public storage: StorageService, public menu: MenuService) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  // login(accountInfo: any) {
  //   let seq = this.api.post('login', accountInfo).share();
  //
  //   seq.subscribe((res: any) => {
  //     // If the API returned a successful response, mark the user as logged in
  //     if (res.success) {
  //       return this._loggedIn(res);
  //     } else {
  //     }
  //   }, err => {
  //     console.error('ERROR', err);
  //   });
  //
  //   return seq;
  // }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    return this.api.post('signup', accountInfo);

    // seq.subscribe((res: any) => {
    //   // If the API returned a successful response, mark the user as logged in
    //   if (res.success) {
    //     this.storage.set('_email', res.email);
    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });

    // return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  // logout() {
  //   this._token = null;
  //   this.menu.logout();
  //   this.storage.remove('_token');
  //   return this.api.setAPIHeaders();
  // }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    console.log(resp);
    this.menu.login();
    this._token = resp.token;
    this.storage.set('_token', resp.token);
    return this.api.setAPIHeaders();
  }
}
