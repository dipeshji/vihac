import { Component, OnInit, OnChanges, DoCheck, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { RegisterService } from '../../services/register.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class SignupComponent implements OnInit, OnChanges, DoCheck, OnDestroy {

  private unsubscribe: Subject<boolean> = new Subject();
  userRegisterationForm = new FormArray([]);
  personalDetails: FormGroup;
  residentialDetails: FormGroup;
  eductaionalOccuptionalDetails: FormGroup;
  uploadPhoto: FormGroup;
  imageURL: string;
  allValid = true;
  pinCodePattern = "[0-9]{6}";
  town = [];
  state = [];
  spinner = false;
  edit = false;
  bloodGroups = ["A-positive", "A-negative", "B-positive", "B-negative", "AB-positive", "AB-negative", "O-positive", "O-negative"];
  occupations = ["Job", "Bussiness", "House Wife", "Student"];
  incomeRange = ["1 to 2", "2 to 4", "4 to 10", "10 to 20", "Above 20"];

  listactiveStatus = {
    'background-color': '#01abf8',
    'margin-left': '-1rem',
    'display': 'block',
    'margin-right': '-1rem'
  }
  spanactiveStatus = {
    'font-size': '17px !important',
    'color': 'black',
    'padding-left': '1.5rem',
    'padding-right': '1.5rem'
  }


  loadForm = {
    "personalDetails": true,
    "residentialDetails": false,
    "educationalOccupational": false,
    "uploadPhoto": false,
    "previewDetails": false
  }

  constructor(private formBuilder: FormBuilder, private register: RegisterService, private _snackBar: MatSnackBar, ) { }



  ngOnInit(): void {
    this.personalDetails = this
      .formBuilder
      .group({
        formId: [1],
        firstName: [null, [Validators.compose([Validators.required, Validators.pattern("[A-Z][a-z]{1,32}")])]],
        middleName: [null, [Validators.compose([Validators.required, Validators.required, Validators.pattern("[A-Z][a-z]{1,32}")])]],
        lastName: [null, [Validators.compose([Validators.required, Validators.pattern("[A-Z][a-z]{1,32}")])]],
        popularName: [null],
        dob: [null, Validators.compose([Validators.required])],
        birthTime: [null, Validators.compose([Validators.pattern("((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))")])],
        birthPlace: [null],
        gender: [null, [Validators.required]],
        status: [null, [Validators.required]],
        mobileNumber: [null, [Validators.compose([Validators.required,
        Validators.pattern("[0-9]{10}")])]],
        emailId: [null, [Validators.required,
        Validators.email]],
        bloodGroup: [null, [Validators.required]],
        height: [null],
      })

    this.residentialDetails = this
      .formBuilder
      .group({
        formId: [2],
        pinCode: [null, [Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.required, Validators.pattern(this.pinCodePattern)])]],
        state: [{ value: null, disabled: true }, [Validators.required]],
        nameOfctv: [{ value: null, disabled: true }, [Validators.required]],
        address: [null, [Validators.required, Validators.minLength(10)]],
      })

    this.eductaionalOccuptionalDetails = this
      .formBuilder
      .group({
        formId: [3],
        highestEducation: [null, [Validators.required]],
        occupation: [null, [Validators.required]],
        pleaseAddDetails: [{ value: null, disabled: true }, [Validators.required]],
        income: [{ value: null, disabled: true }, [Validators.required]]
      })

    this.uploadPhoto = this
      .formBuilder
      .group({
        formId: [4],
        userImage: [null, [Validators.required]]
      })
  }

  ngOnChanges() { }
  ngDoCheck() {
    let value = this.eductaionalOccuptionalDetails.value.occupation;
    if (value === "Job" || value === "Bussiness") {
      this.eductaionalOccuptionalDetails.controls['pleaseAddDetails'].enable();
      this.eductaionalOccuptionalDetails.controls['income'].enable();
    } else {
      this.eductaionalOccuptionalDetails.controls['pleaseAddDetails'].disable();
      this.eductaionalOccuptionalDetails.controls['income'].disable();
    }
    this.personalDetails.value.dob =
      moment(this.personalDetails.value.dob, 'YYYY-MM-DD')
        .format('YYYY-MM-DD');
  }

  activateForm(id) {
    if (id === 1) {
      this.setStatus('personalDetails');
    } else if (id === 2) {
      this.setStatus('residentialDetails');
    } else if (id === 3) {
      this.setStatus('educationalOccupational');
    } else if (id === 4) {
      this.setStatus('uploadPhoto');
    } else {
      this.setStatus('previewDetails');
    }
  }

  radioChange(event) {
    if (event.value === 'Male') {
      this
        .personalDetails
        .controls['gender']
        .setValue(event.value);
    } else if (event.value === 'Female') {
      this
        .personalDetails
        .controls['gender']
        .setValue(event.value);
    } else if (event.value === 'Single') {
      this
        .personalDetails
        .controls['status']
        .setValue(event.value);
    } else if (event.value === "Married") {
      this
        .personalDetails
        .controls['status']
        .setValue(event.value);
    }
  }

  onSubmit(id) {
    if (id === 1) {
      if (this.edit) {
        let index = this.formContolIndex(1);
        this.userRegisterationForm.removeAt(index);
        this.userRegisterationForm.insert(index, this.personalDetails);
      } else this.userRegisterationForm.push(this.personalDetails);
    } else if (id === 2) {
      if (this.edit) {
        let index = this.formContolIndex(2);
        this.userRegisterationForm.removeAt(index);
        this.userRegisterationForm.insert(index, this.residentialDetails);
      } else this.userRegisterationForm.push(this.residentialDetails);
      // this.residentialDetails.controls['pinCode'].valid

    } else if (id === 3) {
      if (this.edit) {
        let index = this.formContolIndex(3);
        this.userRegisterationForm.removeAt(index);
        this.userRegisterationForm.insert(index, this.eductaionalOccuptionalDetails);
      } else this.userRegisterationForm.push(this.eductaionalOccuptionalDetails);
    } else {
      if (this.edit) {
        let index = this.formContolIndex(4);
        this.userRegisterationForm.removeAt(index);
        this.userRegisterationForm.insert(index, this.uploadPhoto);
        this.previewForm(id + 1);
      } else {
        if (this.allFormsValid()) {
          this.userRegisterationForm.push(this.uploadPhoto);
          this.previewForm(id + 1);
        }
      }

    }
    if (id < 4) this.activateForm(id + 1);

  }

  idControlEnable(formField) {
    if (this.eductaionalOccuptionalDetails.controls[formField].enabled)
      return true;
    else
      return false;
  }

  editDetails() {
    this.loadForm.previewDetails = false;
    this.loadForm.personalDetails = true;
    this.edit = true;
  }

  previewForm(id) {
    window.scrollTo(0, 0);
    // user image preview
    const file = this.uploadPhoto.controls['userImage'].value;
    this.uploadPhoto.patchValue({
      userImage: file
    });
    this.uploadPhoto.get('userImage').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)

    this.activateForm(id + 1);
  }

  setStatus(form) {
    let map = new Map(Object.entries(this.loadForm))
    map.forEach((value, key) => {
      if (key === form) this.loadForm[key] = true;
      else this.loadForm[key] = false;
    })
  }

  // Profile Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadPhoto.patchValue({
      userImage: file
    });
    this.uploadPhoto.get('userImage').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  allFormsValid() {
    this.personalDetails.valid && this.residentialDetails.valid && this.eductaionalOccuptionalDetails.valid
      ? this.allValid = true
      : this.allValid = false;

    if (this.allValid) {
      return true;
    } else {
      return false;
    }
  }

  closeError() {
    this.allValid = !this.allValid;
  }

  isValid(controlName, id) {
    if (id === 2) {
      return this.residentialDetails.get(controlName).invalid && this.residentialDetails.get(controlName).touched;
    } else if (id === 1) {
      return this.personalDetails.get(controlName).invalid && this.personalDetails.get(controlName).touched;
    }
  }

  formContolIndex(id) {
    let index = 0;
    for (let control of this.userRegisterationForm.controls) {
      if (control.value.formId === id) {
        return index;
      } else index++;
    }
  }

  getAddress(event) {
    if ((this.residentialDetails.controls['pinCode'].valid)) {
      this.spinner = true;
      this.state = [];
      this.town = [];
      let pinCode = this.residentialDetails.controls['pinCode'].value;
      this
        .register
        .getUserAddress(pinCode)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(address => {
          if (address.status === 200) {
            this.spinner = false;
            this.residentialDetails.controls['state'].enable();
            this.residentialDetails.controls['nameOfctv'].enable();
            address.address.state.filter(element => {
              this.state.push(element);
            })
            address.address.town.filter(element => {
              this.town.push(element);
            })

          } else {
            this.spinner = false;
            let config = new MatSnackBarConfig();
            config.duration = 5000;
            config.panelClass = ['red-snackbar'];
            var msg = address.msg;
            if (msg === undefined) msg = "Some error occured, please try again."
            this._snackBar.open(msg, 'Close', config);
          }
        })
    }
  }

  submitForm() {
    let fd = new FormData;

    for (let control of this.userRegisterationForm.controls) {
      if (control.value.formId !== 4) {
        for (let [key, value] of Object.entries(control.value)) {
          fd.append(`${key}`, `${value}`);
        }
      }
    }
    fd.append('userImage', this.uploadPhoto.value.userImage);

    console.log(this.userRegisterationForm);

    this
      .register
      .registerUser(fd)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        console.log("data");
      })
  }

  // unsubscribe service
  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }
}