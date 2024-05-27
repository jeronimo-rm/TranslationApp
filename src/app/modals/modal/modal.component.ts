import { Component, Input, inject, viewChild, signal, OnInit, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  IonSearchbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { Language, LanguagesList } from 'src/app/interface/languages';

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
];

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [`
  ion-search{
    margin-bottom: -50px;
  }
  .txt-ctr{
    text-align: center;
  }
  `],
  standalone: true,
  imports,
})
export class ModalComponent implements OnInit {
  @Input({ required: true }) languages: LanguagesList | undefined;

  searchBar = viewChild<IonSearchbar>(IonSearchbar);

  list: LanguagesList | undefined = [];
  language = signal<Language | undefined>;

  constructor() {
    addIcons({ close });
  }

  ngOnInit(): void {
    if (this.languages) {
      this.list = this.languages;
    }
  }

  search() {
    const text = this.searchBar()?.value;

    if (!text) {
      return this.list = this.languages;
    } else {
      const list = this.languages?.filter((items) => items.language.includes(text));
      return this.list = list;
    }
  }

  modalCtrl = inject(ModalController);

  flagIcon(lang: string) {
    return getUnicodeFlagIcon(lang);
  }

  selectLanguage(language: string) {
    this.modalCtrl.dismiss(language);
  }
}
