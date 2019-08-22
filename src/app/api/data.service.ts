import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'content-type': 'application/json'
    })
  };

   // return this.http.post(this.url, postParams, options).do( res =&gt; console.log(res));


  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  load(page: number) {
    const headers = {};
    return this.http.get('http://compiletime.it/apps/card_print/model-new/repo.php?page=' + page, this.httpOptions);
    // return this.http.get('http://compiletime.it/apps/card_print/model-new/dist/cards_' + page +'.json', this.httpOptions)
    }
}
