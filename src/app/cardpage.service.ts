import { Injectable } from '@angular/core';
type CardLinks = Array<string>;

@Injectable({
  providedIn: 'root'
})
export class CardpageService {

  constructor() { }

  public cardPages: CardLinks = [];
  public cardBacks: CardLinks = [];

  public getPdfUrl(sides:number){
    var args = this.cardPages.join('|')
    var backUrlPart = ''
    //return 'http://compiletime.it/apps/card_print/pdf/TCPDF-master/examples/image.php?cards=' + btoa(args);
    if (this.cardBacks.length > 0) {
      backUrlPart = '&d-cards=' + btoa(''+this.cardBacks.join('|'))
    }
    return 'http://compiletime.it/apps/card_print/pdf/TCPDF-master/examples/image_v2.php?cards=' + btoa(args) + '&sides=' + btoa(''+sides) + backUrlPart;
  }
  
}
