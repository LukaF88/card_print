import { Injectable } from '@angular/core';
type CardLinks = Array<string>;

@Injectable({
  providedIn: 'root'
})
export class CardpageService {

  constructor() { }

  public cardPages: CardLinks = [];

  public getPdfUrl(){
    var args = this.cardPages.join('|')
    return 'http://compiletime.it/apps/card_print/pdf/TCPDF-master/examples/image.php?cards=' + btoa(args);
  }
  
}
