import {
  Component,
  Input,
  inject,
  viewChild,
  signal,
  OnInit,
} from '@angular/core';
import { NgStyle, TitleCasePipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonImg,
  IonModal,
  IonIcon,
  ModalController,
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { Language, LanguagesList } from 'src/app/interface/languages';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

const imports = [
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonImg,
  IonModal,
  IonIcon,
  NgStyle,
  TitleCasePipe,
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
];

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
    `
      ion-search {
        margin-bottom: -50px;
      }
      .txt-ctr {
        text-align: center;
      }
    `,
  ],
  standalone: true,
  imports,
})
export class ModalComponent implements OnInit {
  @Input({ required: true }) languages: LanguagesList | undefined;
  list: LanguagesList = [];
  language = signal<Language>;
  index = signal<number>(0);
  searchBar = viewChild<IonSearchbar>(IonSearchbar);
  modalCtrl = inject(ModalController);

  constructor() {
    addIcons({ close });
  }

  ngOnInit(): void {
    for (let index = 0; index < 20; index++) {
      this.list?.push(this.languages![index]);
      this.index.update((value) => value + index);
    }
  }

  search() {
    const text = this.searchBar()?.value;

    if (!text) {
      return (this.list = this.languages!);
    } else {
      const list = this.languages?.filter((items) =>
        items.language.includes(text)
      );
      return (this.list = list!);
    }
  }

  flagIcon(lang: string) {
    return getUnicodeFlagIcon(lang);
  }

  selectLanguage(language: string) {
    this.modalCtrl.dismiss(language);
  }

  private generateItems(numberOfItems: number) {
    if (this.list?.length >= this.languages!.length) {
      return;
    }
    const count = this.list.length + 1;
    const totalOfNewItems = count + numberOfItems;
    for (let i = count; i < totalOfNewItems; i++) {
      if (totalOfNewItems < this.languages!.length) {
        this.list.push(this.languages![i]);
      }
      return;
    }
  }

  onIonInfinite(event: any) {
    this.generateItems(10);
    (event as InfiniteScrollCustomEvent).target.complete();
  }
}
