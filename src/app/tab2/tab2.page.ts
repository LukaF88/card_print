import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardpageService } from '../cardpage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page implements OnInit{

  isToggled : boolean;
  isDisabled : boolean;
  

  ngOnInit(): void {

    this.isToggled = false;

    const togglingObserver = {
      next: sides => { console.log('Observer got a next value: ' + sides); this.isToggled = (Math.abs(sides) > 1)},
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
     
    // Execute with the observer object
    this.cardService.sidesObs.subscribe(togglingObserver);

  }

  //@Input() cardService.data

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error("Method not implemented.");
  }

  constructor(public cardService : CardpageService){

    //this.cardService.data.subscribe((value) => { 
      
   // })
          
  }

 // ;


  getPdf = () => {
    var sides = this.isToggled ? 2 : 1
    var urlDownload = this.cardService.getPdfUrl(sides);
    window.open(urlDownload);
  }

  emptyCardPage = () => {
    this.cardService.data.cardPages = []
    this.cardService.data.cardBacks = []
    this.cardService.updateSides(1)
  }


  // POST
  getPdf2 = () => {
    this.cardService.getFile()
  }


 




}
