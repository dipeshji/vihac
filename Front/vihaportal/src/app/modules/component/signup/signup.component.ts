import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
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
export class SignupComponent implements OnInit, OnChanges {

  userRegisterationForm = new FormArray([]);
  personalDetails: FormGroup;
  residentialDetails: FormGroup;
  eductaionalOccuptionalDetails: FormGroup;
  uploadPhoto: FormGroup;
  imageURL: string;
  allValid = false;
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
    "uploadPhoto": false
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges() { }

  ngOnInit(): void {
    this.personalDetails = this
      .formBuilder
      .group({
        firstName: [null, [Validators.required]],
        middleName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        popularame: [null],
        dob: [null, [Validators.required]],
        birthTime: [null],
        birthPlace: [null],
        gender: [null, [Validators.required]],
        status: [null, [Validators.required]],
        mobileNumber: [null, [Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10)]],
        emailId: [null, [Validators.required,
        Validators.email]],
        bloodGroup: [null, [Validators.required]],
        height: [null],
      })

    this.residentialDetails = this
      .formBuilder
      .group({
        country: [null, [Validators.required]],
        state: [null, [Validators.required]],
        nameOfctw: [null, [Validators.required]],
        address: [null, [Validators.required]],
        pinCode: [null, Validators.required]
      })

    this.eductaionalOccuptionalDetails = this
      .formBuilder
      .group({
        highestEducation: [null, [Validators.required]],
        occupation: [null, [Validators.required]],
        pleaseAddDetails: [null, [Validators.required]],
        income: [null, [Validators.required]]
      })

    this.uploadPhoto = this
      .formBuilder
      .group({
        userImage: ['', [Validators.required]]
      })
  }


  activateForm(id) {
    if (id === 1) {
      this.setStatus('personalDetails');
    } else if (id === 2) {
      this.setStatus('residentialDetails');
    } else if (id === 3) {
      this.setStatus('educationalOccupational');
    } else if (id === 4) {
      this.setStatus('uploadPhoto')
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
      this.personalDetails.value.dob =
        moment(this.personalDetails.value.dob, 'DD/MM/YYYY')
          .format('DD/MM/YYYY');
      this.userRegisterationForm.push(this.personalDetails);
    } else if (id === 2) {
      this.userRegisterationForm.push(this.residentialDetails);
    } else if (id === 3) {
      this.userRegisterationForm.push(this.eductaionalOccuptionalDetails);
    } else if (id === 4) {
      this.allFormsValid();
      if(this.allValid){
        this.userRegisterationForm.push(this.personalDetails);
      }
    }
    if (id < 4) this.activateForm(id + 1);

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
    this.personalDetails.valid && this.eductaionalOccuptionalDetails
      ? this.allValid = false
      : this.allValid = true;
      setTimeout(()=>{
        this.allValid = false;
      },5000)
  }

  closeError(){
    this.allValid = false;
  }
}
