import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FetchDataService } from 'src/service/fetch-data.service';

@Component({
  selector: 'app-candidateForm',
  templateUrl: './candidateForm.component.html',
  styleUrls: ['./candidateForm.component.css']
})
export class CandidateInfoComponent implements OnInit {
  title = 'candidateInfo';
  candidateForm: FormGroup;
  countries: any;
  cities:any ;
  states: any;
  stateDisable: boolean = true;
  cityDisable: boolean = true;
  expYearDisable: boolean = true;
  formInvalid: boolean = true;
  constructor(private fB: FormBuilder, private fetchService: FetchDataService){}
  ngOnInit(){
    this.candidateForm = this.fB.group({
      candidateName: ['', Validators.required],
      candidateEmail: ['', validateEmail],
      candidateAddress: [''],
      candidateCountry: [''],
      candidateState: [''],
      candidateCity: [''],
      locBangalore: [false],
      locChennai: [false],
      locMumbai: [true],
      locDelhi: [false],
      candidateExp: ["No"],
      candidateExpYears: [{value:'', disabled:true}, Validators.required],
      skills: this.fB.array([])
    })
    this.fetchService.fetchCountries().subscribe(
      data=> this.countries = data
    );
  }
  skills() : FormArray {
    return this.candidateForm.get("skills") as FormArray;
  }

  sendDetails(){
    var res = confirm("Are you sure you want to submit the employee data?");
    if(res === true){
      console.log(this.candidateForm.value);
      this.candidateForm.reset();
    }
  }

  checkValidity(){
    if(this.candidateForm.status === "VALID")
      this.formInvalid = false;
    else if(this.candidateForm.status === "INVALID")
      this.formInvalid = true;
  }
  newSkill(): FormGroup {
    return this.fB.group({
      skillName: '',
      skillDescription: '',
      skillLevel:''
    })
  }

  addSkill() {
    this.skills().push(this.newSkill());
  }

  countryChanged(){
    this.states = [];
    this.cities = [];
    document.getElementById("stateSelect").nodeValue = "";
    document.getElementById("citySelect").nodeValue = "";
    this.cityDisable = true;
    var selectedCountry = this.candidateForm.get('candidateCountry').value;
    this.fetchService.fetchStates(selectedCountry).subscribe(
      data => {
        this.states = data;
        this.stateDisable = false;
      }
    )
  }

  stateChanged(){
    this.cities = [];
    document.getElementById("citySelect").nodeValue = "";
    var selectedState = this.candidateForm.get('candidateState').value;
    this.fetchService.fetchCities(selectedState).subscribe(
      data => {
        this.cities = data;
        this.cityDisable = false;
      }
    )
  }

  expChanged(){
    var expValue = this.candidateForm.controls.candidateExp.value;
    if(expValue === "Yes"){
      this.candidateForm.controls['candidateExpYears'].enable();
      this.candidateForm.controls.candidateExpYears.setValue('');
    }
    else{
      this.candidateForm.controls['candidateExpYears'].disable();
      this.candidateForm.controls.candidateExpYears.setValue('');
    }
    this.checkValidity();
  }
}

function validateEmail(c: FormControl){
  let emailExp = /^([a-zA-Z0-9_\_\.]+)@([a-zA-Z0-9_\_\.]+)\.([a-zA-Z]{2,5})$/;
  return emailExp.test(c.value)?null:{
    emailError:{
      message: "Please enter a valid email"
    }
  }
}


