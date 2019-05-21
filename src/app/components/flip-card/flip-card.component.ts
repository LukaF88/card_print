import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';
import { constructor } from 'q';

@Component({
  selector: 'flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss'],
  
})
export class FlipCardComponent{

  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;

  constructor() { }

  flipped : boolean;

  flip(event: Event){
    this.flipped = !this.flipped;
    event.preventDefault();
    event.stopPropagation();

  }

}