import { Component, Input, inject } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

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
];

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports,
})
export class ModalComponent {
  @Input({ required: true }) languages: any;

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
