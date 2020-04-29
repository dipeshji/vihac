import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  listactiveStatus = {
    'background-color': '#01abf8'
  }
  spanactiveStatus = {
    'font-size': 'larger',
    'color': 'black'
  }


  loadForm = {
    "persionalDetails": true,
    "residentialDetails": false,
    "educationalOccupational": false,
    "uploadPhoto": false
  }

  constructor() { }

  ngOnInit(): void {
  }

  activate(id) {
    if (id === 1) {
      this.setStatus('persionalDetails');
    } else if (id === 2) {
      this.setStatus('residentialDetails');
    } else if (id === 3) {
      this.setStatus('educationalOccupational');
    } else {
      this.setStatus('uploadPhoto')
    }
  }


  setStatus(form) {
    let map = new Map(Object.entries(this.loadForm))
    map.forEach((value, key) => {
      if(key === form) this.loadForm[key] = true;
      else this.loadForm[key] = false;
    })
    console.log(this.loadForm);
    
  }


}
