import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  inject,
  input,
} from '@angular/core';
import { NgStyle, TitleCasePipe } from '@angular/common';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
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

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
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
    TitleCasePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModalComponent implements OnInit {
  @Input({required:true}) languages: any;

  modalCtrl = inject(ModalController);


  flagIcon(lang:string) {
    return getUnicodeFlagIcon('US');
  }

  constructor() {}

  ngOnInit() {
    console.log('translation', getUnicodeFlagIcon('🇺🇸'));
  }


  selectLanguage(language: any) {
    console.log('Selected language:', language);
    this.modalCtrl.dismiss(language);
  }
}
