import { Component, OnInit, inject, signal, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,  IonButtons, IonButton, IonBackButton, IonTextarea, IonNote, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonImg, ModalController,} from '@ionic/angular/standalone';
import { TranslationService } from '../services/translation.service';
import { ModalComponent } from '../modals/modal/modal.component';

@Component({
  selector: 'app-translation',
  template: `
  <ion-header>
    <ion-toolbar>
    <ion-buttons slot="start">
    <ion-back-button/>
  </ion-buttons>
      <ion-title>Translation</ion-title>
      <ion-img src="assets/img/trln.png" class="right-img"></ion-img>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <br><br>
      <ion-textarea #textArea rows="4"></ion-textarea>
      <ion-card
              button
              id="{{ 'open-modal' + languages }}"
              (click)="openModal()"
            ><ion-button>aqui</ion-button></ion-card>
      <ion-button (click)="translation(textArea.value)" expand="block" shape="round">
        Translation
      </ion-button>
      <ion-note>
        {{ translationText() }}
      </ion-note>

  </ion-content>
  `,
  styles: [`


  ion-toolbar{
    display: flex;
    --background: #353839;
    ion-title{
      font-size: 20px;
      font-weight: 800;
    }
  }
  .right-img {
    width: 60px;
  }
  ion-content{
    --background: #353839;
    ion-button{
      --background: #003355;
      --color: white;
      font-size: 20px;
      font-weight: 600;
      border-radius: 5px;
      padding: 10px 20px;
      text-transform: none;
    }
    ion-textarea{
      box-sizing: border-box;
      width: 100%;
      border-radius: 20px;
      padding: 10px;
      border: 2.5px solid #ccc;
      background-color: #f9f9f9;
      color: #353839;
      text-align: center;
    }
    ion-note{
      box-sizing: border-box;
      width: 100%;
      height: 18%;
      text-align: center;
      border-radius: 20px;
      padding: 10px;
      border: 2.5px solid #ccc;
      background-color: #f9f9f9;
      color: #353839;
      text-align: center;
      display: block;
    }
  }
  `],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonBackButton, IonTextarea, IonNote, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonImg],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TranslationPage implements OnInit{
  languages = signal<any | undefined>(undefined);

  translationText = signal<string | undefined>(undefined)

  translationService = inject(TranslationService);
  modalCtrl = inject(ModalController);

  constructor() { }



  ngOnInit(): void {
    this.getLanguages()
  }


  async getLanguages() {
    try {
      const response: any = await this.translationService.languages();
      console.log('response', response);

      this.languages.set(response.data.languages);

    } catch (error) {
      console.log('error', error);
    }
  }

async translation(text:string | null | undefined) {

  try {

    const response: any = await this.translationService.translation(text ? text : '', 'en', 'pt');

    this.translationText.set(response.data?.translations[0].translatedText)

  } catch (error) {
    console.log('error', error);
  }

}
 async openModal() {
    const modal = await this.modalCtrl.create({
    component: ModalComponent,
    componentProps: { languages: this.languages()},
    breakpoints: [0, 0.5, 0.9],
    initialBreakpoint: 0.9,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();
  console.log(`MSA 🔊 data:`, data);

  if (role === 'confirm') {
  }
}


}
