import { Component, Input, inject, viewChild, signal} from '@angular/core';
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
  `],
  standalone: true,
  imports,
})
export class ModalComponent {
  @Input({ required: true }) languages: any;

  searchBar = viewChild<IonSearchbar>(IonSearchbar);

  list = signal<LanguagesList>([]);
  language = signal<Language | undefined>;

  search(text: string | null | undefined) {
    if (!text) {
      return this.languages.set(this.list());
    } else {
      const list = this.list().filter((items) => items.language.includes(text));
      return this.languages.set(list);
    }
  }

  search2() {
    const text = this.searchBar()?.value;

    if (!text) {
      return this.languages.set(this.list());
    } else {
      const list = this.list().filter((items) => items.language.includes(text));
      return this.languages.set(list);
    }
  }

  modalCtrl = inject(ModalController);

  flagIcon(lang: string) {
    return getUnicodeFlagIcon(lang);
  }

  constructor() {
    addIcons({ close });
  }

  selectLanguage(language: string) {
    this.modalCtrl.dismiss(language);
  }
}
