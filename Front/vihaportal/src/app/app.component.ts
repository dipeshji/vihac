import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoginDialogComponent } from './initialComponent/login-dialog/login-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'vihaportal';
  navOpen = false;
  searchedUser = null;
  matchedUser = [];
  match = false;

  constructor(public dialog: MatDialog) { }

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
    'user10': 'Mahak',
    'user11': 'Deepak'
  }

  Users = new Observable(observer => {
    let value = Object.values(this.fakeUser)
    value.map((user) => {
      user.includes(this.searchedUser)
        ? this.matchedUser.push(user)
        : null;
    })
    this.matchedUser.length !== null ? observer.next(this.matchedUser) : null;
  })

  ngOnInit() {
    this.matchedUser = []
  }

  toggleNavbar() {
    this.navOpen = !this.navOpen;
  }

  clear(event) {
    this.searchedUser = '';
    this.match = false;
    this.matchedUser = [];
  }
  searchUser(event) {
    this.matchedUser = [];
    if (event.key !== "Shift" && this.searchedUser !== '') {
      this.Users.subscribe(value => {
        if (value[0] !== null) this.match = true;
      });
    } else {
      this.match = false;
    }
  }

  loginsignupDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1
    };
    const dialogRef = this.dialog.open(LoginDialogComponent);
  }

  searchChange = {
    'border-radius': '0',
    'border-bottom': '0',
    'border-right': 'solid',
    'border-left': 'solid',
    'border-top': 'solid',
    'background-color': 'white'
  }
}
