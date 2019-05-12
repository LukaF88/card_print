import { Component, OnInit } from '@angular/core';
import { CardpageService } from '../cardpage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{

  cardNumber : number = this.cardService.cardPages.length;

  constructor(public cardService : CardpageService){}

  getPdf = () => {
    var urlDownload = this.cardService.getPdfUrl();
    window.open(urlDownload);
  }

  emptyCardPage = () => {
    this.cardService.cardPages = [];
  }


}
