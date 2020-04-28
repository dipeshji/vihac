import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnChanges, OnInit {

  loginForm: FormGroup;
  user = false;
  OTPresendTime = 60;
  OTPinterval = 1000;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

  }

  ngOnChanges() {
    this.loginForm
      .get('memberId')
      .valueChanges
      .subscribe(value => {
        //
      })
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      memberId: [null, Validators.required],
      OTP: [null, Validators.required]
    })
  }

  getOTP() {
    this.user = true;
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      if (this.OTPresendTime > 0) this.OTPresendTime--;
      else this.OTPresendTime = 60;
    }, this.OTPinterval)
  };

  login() {
  }

  onNoClick(): void {
    clearInterval(this.OTPinterval);
    this.dialogRef.close();
  }

  close() {
    clearInterval(this.OTPinterval);
    this.dialogRef.close();
  }

}
