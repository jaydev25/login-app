import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
    pages: any[] = [
        // { title: 'Tutorial', component: 'TutorialPage' },
        // { title: 'Welcome', component: 'WelcomePage' },
        // { title: 'Tabs', component: 'TabsPage' },
        // { title: 'Ads', component: 'CardsPage' },
        // { title: 'Content', component: 'ContentPage' },
        // { title: 'Login', component: 'LoginPage' },
        // { title: 'Signup', component: 'SignupPage' },
        // { title: 'Master Detail', component: 'ListMasterPage' },
        // { title: 'Menu', component: 'MenuPage' },
        // { title: 'Settings', component: 'SettingsPage' },
        // { title: 'Search', component: 'SearchPage' }
      ];
    rootPage;
    constructor(public storage: StorageService) {
        this.storage.get('_token').then((value) => {
            if (value) {
                this.pages[0] = { title: 'Matches', component: 'CardsPage' };
                this.pages[1] = { title: 'Logout', component: 'WelcomePage' };
                this.pages[2] = { title: 'My Profile', component: 'ProfilePage' };
                this.rootPage = 'CardsPage';
            } else {
              this.rootPage = 'AppComponent';
            }
        });
    }

    logout() {
        this.pages = [];
        this.pages[0] = { title: 'Login', component: 'LoginPage' };
        this.pages[1] = { title: 'Signup', component: 'SignupPage' };
    }

    login() {
        this.pages[0] = { title: 'Matches', component: 'CardsPage' };
        this.pages[1] = { title: 'Logout', component: 'WelcomePage' };
        this.pages[2] = { title: 'My Profile', component: 'ProfilePage' };
    }
}
