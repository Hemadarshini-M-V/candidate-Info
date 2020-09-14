import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  skillsCounter: Array<number> = [1];
  stateDisable: boolean = true;
  cityDisable: boolean = true;
  expYearDisable: boolean = true;
  constructor(private fB: FormBuilder, private fetchService: FetchDataService){}
  ngOnInit(){
    this.candidateForm = this.fB.group({
      candidateName: ['', Validators.required],
      candidateEmail: ['', validateEmail],
      candidateAddress: [''],
      candidateCountry: ['', Validators.required],
      candidateState: [''],
      candidateCity: [''],
      locBangalore: [false],
      locChennai: [false],
      locMumbai: [true],
      locDelhi: [false],
      candidateExp: ["No"],
      candidateExpYears: [0]
    })
    this.fetchService.fetchCountries().subscribe(
      data=> this.countries = data
    );
  }
  sendDetails(){

  }

  addSkill(){
    var lastCount = this.skillsCounter[this.skillsCounter.length - 1];
    var nextCount = lastCount + 1;
    this.skillsCounter.push(nextCount);
  }

  countryChanged(){
    this.states = [];
    document.getElementById("stateSelect").nodeValue = "";
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
}

function validateEmail(c: FormControl){
  let emailExp = /  ^  ([a-zA-Z0-9_\_\.]+)@([a-zA-Z0-9_\_\.]+)\.([a-zA-Z]{2,5})$/;
  return emailExp.test(c.value)?null:{
    emailError:{
      message: "Please enter a valid email"
    }
  }
}


