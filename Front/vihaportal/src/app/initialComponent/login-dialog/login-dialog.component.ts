import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnChanges, OnInit {

  loginForm: FormGroup;
  registerMobno: FormGroup;
  forgotAllLoginCred: FormGroup;
  user = false;
  OTPresendTime = 60;
  OTPinterval = 1000;
  forgottenMemberid = new FormControl(null, [Validators.required]);
  registeredEmailid = new FormControl(null, [Validators.required, Validators.email]);

  toggleInputs = {
    "memberId": false,
    "registerMob": false,
    "updateRegMob": false,
    "forgotAll": false
  };

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _snackBar: MatSnackBar,
    private router: Router) {

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
    // =============Login form=====================
    this.loginForm = this.
      formBuilder
      .group({
        memberId: [null, Validators.required],
        OTP: [null, Validators.required]
      })

    // =========Change Register Mobile Number Form=========
    this.registerMobno = this.
      formBuilder.
      group({
        newMobileNo: [null, Validators.required],
        oldMobileNo: [null, Validators.required],
        memberId: [null, Validators.required],
        name: [null, Validators.required],
        dob: [null, Validators.required],
        emailId: [null, [Validators.email, Validators.required]]
      })

    // ===========Forgot all login credentials Form=================
    this.forgotAllLoginCred = this.
      formBuilder.
      group({
        firstName: [null, Validators.required],
        middleName: [null, Validators.required],
        lastName: [null, Validators.required],
        dob: [null, Validators.required],
        newMobile: [null, Validators.required]
      })
  }

  // =================get OTP========================
  getOTP() {
    this.user = true;
    this.startTimer();
  }

  // ===============OTP timer=======================
  startTimer() {
    setInterval(() => {
      if (this.OTPresendTime > 0) this.OTPresendTime--;
      else this.OTPresendTime = 60;
    }, this.OTPinterval)
  };

  // ==============Login=========================
  login() {
  }

  // ==============Help Login==================== 
  loginProblem() {
    let problem = { "id": 1, "msg": "Login Problem" };
    this.dialogRef.close(problem);
  }

  // ==============Sign Up=====================
  SignUp() {
    this.dialogRef.close();
    this.router.navigate(['user'])
  }

  // ===============Close Dialog======================
  close() {
    clearInterval(this.OTPinterval);
    this.dialogRef.close();
  }

  // ==============open inputs of login Problem===================
  openInput(id) {
    if (id.id === 1) this.toggleInputs.memberId = !this.toggleInputs.memberId;
    if (id.id === 2) this.toggleInputs.registerMob = !this.toggleInputs.registerMob;
    if (id.id === 3) this.toggleInputs.updateRegMob = !this.toggleInputs.updateRegMob;
    if (id.id === 4) this.toggleInputs.forgotAll = !this.toggleInputs.forgotAll;
  }

  // ============All data submit for login problem(1,2,3,4)===============
  submit(id) {
    if (id === 1) {
      if (this.forgottenMemberid.valid) {
        this.dialogRef.close({ "id": 1, "data": this.forgottenMemberid.value });
      } else {
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['red-snackbar']
        this._snackBar.open("Member ID is required", 'Close', config);
      }

    } else if (id === 2) {
      if(this.registeredEmailid.valid){
        this.dialogRef.close({ "id": 2, "data": this.registeredEmailid });
      }else{
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['red-snackbar']
        this._snackBar.open("Please enter valid email ID", 'Close', config);
      }
    } else if (id === 3) {
      if (!this.registerMobno.valid) {
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['red-snackbar']
        this._snackBar.open("Please check the form once again!!", 'Close', config);
      } else {
        console.log(this.registerMobno.value);
        this.dialogRef.close({ "id": 3, "data": this.registerMobno.value });
      }
    } else {
      if (this.forgotAllLoginCred.valid) {
        this.dialogRef.close({ "id": 3, "data": this.forgotAllLoginCred.value });
      } else {
        let config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['red-snackbar'];
        this._snackBar.open("Please check the form once again!!", 'Close', config);
      }
    }
  }

  // ===============check wether input value is valid or not================= 
  isvalid(controlName) {
    return this.registerMobno.get(controlName).invalid && this.registerMobno.get(controlName).touched;
  }

}
