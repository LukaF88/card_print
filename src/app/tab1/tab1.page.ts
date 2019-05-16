
import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { ToastController } from '@ionic/angular';
import { CardpageService } from '../cardpage.service';

type CardsRaw = Array<{name: string, url: string}>;
type CardLinks = Array<string>;
type Deck = {name: string, urls: CardLinks};

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  toast: Promise<void>;

  constructor(public dataservice : DataService, public toastController : ToastController, public cardService : CardpageService){
  }

  private cardsRaw: CardsRaw = [];
  public cards  = {};
  public names = [];
  public namesShow = [];
    
  public selectedCard : string;
  public searchName : string;

  ngOnInit(): void {
    
   for (var i = 0; i < 5; i++){
    this.dataservice.load(i).subscribe((response:CardsRaw) => this.arrangeCards(response))
   }
    
  }

  private compare( a, b ) {
    if ( a.nome < b.nome ){
      return -1;
    }
    if ( a.nome > b.nome ){
      return 1;
    }
    return 0;
  }
  
  arrangeCards (response:CardsRaw) {
    this.cardsRaw = response;
    // riarrangio le carte raw

    for (let entry of this.cardsRaw) {
      if (!this.cards[entry.name]) {
        this.names.push(entry.name);
        this.cards[entry.name] = [];
      }
      this.cards[entry.name].push(entry.url);
    }

    this.names.sort();

    for (var i = 0; i < 20; i++){
      this.namesShow.push({name : this.names[i], expanded: false});
    }
  }

  filterItems(searchTerm : string) {
    return this.names.filter(name => {
      return name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

    setFilteredItems() {
      this.namesShow = this.filterItems(this.searchName).slice(0, 20).map(listItem => {
       
        return {
          name : listItem,
          expanded : false
      }
      });
    }

    setCard(name) {
      this.selectedCard = name || this.names[0];
    }
  
    showToast(msg) {
      this.toast = this.toastController.create({
        message: msg,
        duration: 500
      }).then((toastData)=>{
        console.log(toastData);
        toastData.present();
      });
    }
    /*HideToast(){
      this.toast = this.toastController.dismiss();
    }*/

    addCardToPage(link : string){
      var msg = 'Carta aggiunta';

      if (this.cardService.cardPages.length == 9) {
        msg = 'Pagina completa'
      }

      else if (this.cardService.cardPages.indexOf(link) != -1){
        msg = 'Carta gia presente'
      }
      else {
        this.cardService.cardPages.push(link);
      }
      this.showToast(msg);
    }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.namesShow.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  doInfinite(infiniteScroll) {
    var i = 0;
    setTimeout(() => {
      var initalLength = this.namesShow.length;
      for (var i = initalLength; i < Math.min(initalLength + 5, this.names.length); i++) {
      this.namesShow.push({name : this.names[i], expanded : false})
      }
      console.log('Async operation has ended');
      infiniteScroll.target.complete();
    }, 100);
  }
}
