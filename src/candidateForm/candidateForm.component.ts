import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FetchDataService } from 'src/service/fetch-data.service';

@Component({
  selector: 'app-candidateForm',
  templateUrl: './candidateForm.component.html',
  styleUrls: ['./candidateForm.component.css']
})
export class CandidateInfoComponent implements OnInit {
  title = 'candidateInfo';
  candidateForm: FormGroup;
  countries;
  skillsCounter: Array<number> = [1];
  constructor(private fB: FormBuilder, private fetchService: FetchDataService){}
  ngOnInit(){
    this.candidateForm = this.fB.group({

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
}
