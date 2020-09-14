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
}
