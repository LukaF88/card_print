import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


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
    //return this.http.get( environment.modelUrl +'/'+ page + '.json', this.httpOptions);
    return this.http.get( environment.modelUrl +'?page='+ page, this.httpOptions);
    }
}
