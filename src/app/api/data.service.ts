import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  load(page : number){
    return this.http.get('http://compiletime.it/apps/card_print/model/dist/cards_0.json', this.httpOptions)
    //return this.http.get('http://compiletime.it/apps/card_print/model/dist/demo.json', this.httpOptions)
	}
}
