
import { Component, OnInit } from '@angular/core';
import { DataService } from '../api/data.service';
import { ToastController } from '@ionic/angular';
import { CardpageService } from '../cardpage.service';

interface CardDetail {url: string; mana: string; }
type CardsRaw = Array<{name: string, details: Array<CardDetail>, flip: boolean}>;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  toast: Promise<void>;

  constructor(public dataservice: DataService, public toastController: ToastController, public cardService: CardpageService) {
  }

  private cardsRaw: CardsRaw = [];
  public cards  = {};
  public names = [];
  public namesShow = [];

  public selectedCard: string;
  public searchName: string;

  ngOnInit(): void {
   for (let i = 0; i < 5; i++) {
    // this.dataservice.load(i).subscribe((response:CardsRaw) => this.arrangeCards(response))
    this.dataservice.load(i).subscribe((response: CardsRaw) => this.arrangeCards(response));
   }
  }

  private compare( a, b ) {
    if ( a.nome < b.nome ) {
      return -1;
    }
    if ( a.nome > b.nome ) {
      return 1;
    }
    return 0;
  }

  arrangeCards(response: CardsRaw) {
    this.cardsRaw = response;
    // riarrangio le carte raw

    for (const entry of this.cardsRaw) {
      if (!this.cards[entry.name]) {

        this.names.push(entry.name);
        this.cards[entry.name] = [];
      }
      this.cards[entry.name] = {flippable: entry.flip, details: entry.details};
    }

    // carte da mostrare
    this.names.sort();
    for (let i = 0; i < 20; i++) {
      this.namesShow.push({name : this.names[i], expanded: false});
    }
  }

  filterItems(searchTerm: string) {
    return this.names.filter(name => {
      return name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

    setFilteredItems() {
      this.namesShow = this.filterItems(this.searchName).slice(0, 20).map(listItem => {
        return {
          name : listItem,
          expanded : false
        };
      });
    }

    setCard(name) {
      this.selectedCard = name || this.names[0];
    }

    showToast(msg) {
      this.toast = this.toastController.create({
        message: msg,
        duration: 500
      }).then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
    }
    /*HideToast(){
      this.toast = this.toastController.dismiss();
    }*/

    addCardToPage(card) {
      let msg = 'Carta aggiunta';

      if (this.cardService.data.cardPages.length === 9) {
        msg = 'Pagina completa';
      } else if (this.cardService.data.cardPages.indexOf(card.details[0].url) !== -1) {
        msg = 'Carta gia presente';
      } else if (card.flippable) {
        // devo aggiungere all-array in prima posizione
        this.cardService.data.cardPages.splice(0, 0, card.details[0].url);
        this.cardService.data.cardBacks.splice(0, 0, card.details[1].url);
        this.cardService.updateSides(-2); // negative numbers means locked
        msg = 'Aggiunta carta doppia';
      } else {
        this.cardService.data.cardPages.push(card.details[0].url);
      }
      this.showToast(msg);
    }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.namesShow.map(listItem => {
        if (item === listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      const initalLength = this.namesShow.length;
      for (let i = initalLength; i < Math.min(initalLength + 10, this.names.length); i++) {
      this.namesShow.push({name : this.names[i], expanded : false});
      }
      console.log('Async operation has ended');
      infiniteScroll.target.complete();
    }, 100);
  }
}
