import { Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RequestOptions, ResponseContentType, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

type CardLinks = Array<string>;
type DataCarta = {cardPages: Array<CardLinks>, cardBacks: Array<CardLinks>, sides: number}

@Injectable({
  providedIn: 'root'
})
export class CardpageService implements OnInit {

  ngOnInit(): void {
  }

  constructor(private http: HttpClient){}

   public data: DataCarta = {
    cardPages : [],
    cardBacks : [],
    sides : 1
   };

   public sidesObs = new BehaviorSubject<number>(this.data.sides);

   public updateSides(newValue: number): void {
    this.data.sides = newValue;
    this.sidesObs.next(newValue);
  }

  getPdfUrl(sides:number){
    var args = this.data.cardPages.join('|')
    var backUrlPart = ''
    if (this.data.cardBacks.length > 0) {
      backUrlPart = '&d-cards=' + btoa(''+this.data.cardBacks.join('|'))
    }
   return environment.pdfUrl + btoa(args) + '&sides=' + btoa(''+Math.abs(sides)) + backUrlPart;    
  }
  
  // POST
  /*DownloadFile(sides:number):void
  {
    this.getFile("http://compiletime.it/apps/card_print/pdf/TCPDF-master/examples/image_v3.php")
    .subscribe(fileData => 
      {
      let b:any = new Blob([fileData], { type: 'application/zip' });
      var url= window.URL.createObjectURL(b);
        window.open(url);
      }
    );
  }
*/
  public getFile():void{

    let model : {
      cards : "ProvaCarte",
      sides : "belli"
    }

   let httpOptions = {
      headers: new HttpHeaders({
        'responseType': 'application/pdf',
        'Content-Type' : 'application/x-www-form-urlencoded',
        'cards': 'provaCARTE',
        'sides':'2'
      })
    };

    this.http.post("http://compiletime.it/apps/card_print/pdf/TCPDF-master/examples/image_v3.php", {cards:"provaCARTE",
    sides:"2"}, httpOptions)
  .subscribe(
      response => { // download file
         // var blob = new Blob(response, {type: 'application/pdf'});
          //var filename = 'fileFigo.pdf';
         // this._FileSaverService.save(blob, filename);
         var url= window.URL.createObjectURL(response);
        window.open(url);
      },
      error => {
          console.error(`Error: ${error.message}`);
      }
  );
  }


}
