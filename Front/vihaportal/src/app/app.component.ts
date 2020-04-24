import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'vihaportal';
  navOpen = false;
  searchedUser: any;
  matchedUser = [];
  match=false;

  fakeUser = {
    'user1': 'Dipesh',
    'user2': 'Pesh',
    'user3': 'Dipak',
    'user4': 'Pepak',
    'user5': 'Lucku',
    'user6': 'Lumpy',
    'user7': 'Palak',
    'user8': 'Pachak',
    'user9': 'Mahesh',
    'user10': 'Mahak'
  }

  Users = new Observable(observer => {
    let value = Object.values(this.fakeUser)
    value.map((user) => {
      user.includes(this.searchedUser) ? this.matchedUser.push(user) : null;
    })
    return this.matchedUser.length !== null ? observer.next(this.matchedUser) : null;
  })

  ngOnInit() { }

  toggleNavbar() {
    this.navOpen = !this.navOpen;
  }
  searchUser(user) {
    this.matchedUser = [];
    this.Users.subscribe(value => {
      if (value[0] !== null) this.match = true;
    });
  }
}
