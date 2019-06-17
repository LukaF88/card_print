import { Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
type CardLinks = Array<string>;
type DataCarta = {cardPages: Array<CardLinks>, cardBacks: Array<CardLinks>, sides: number}

@Injectable({
  providedIn: 'root'
})
export class CardpageService implements OnInit {

  ngOnInit(): void {
  }

   constructor() {}

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
    return 'http://compiletime.it/apps/card_print/pdf/TCPDF-master/examples/image_v2.php?cards=' + btoa(args) + '&sides=' + btoa(''+Math.abs(sides)) + backUrlPart;
  }
  
}
