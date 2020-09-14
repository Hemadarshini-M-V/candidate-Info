import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private http: HttpClient) { }

  fetchCountries(){
    return this.http.get("https://recruit.cormsquare.com/api/test/countries");
  }

  fetchStates(countryId){
    return this.http.get("https://recruit.cormsquare.com/api/test/states/"+countryId);
  }

  fetchCities(stateId){
    return this.http.get("https://recruit.cormsquare.com/api/test/cities/"+stateId);
  }
}

