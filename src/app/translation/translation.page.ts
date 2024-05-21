import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,  IonButtons, IonButton, IonBackButton, IonTextarea, IonNote, IonAccordion, IonAccordionGroup, IonItem, IonLabel} from '@ionic/angular/standalone';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-translation',
  template: `
  <ion-header>
    <ion-toolbar>
    <ion-buttons slot="start">
    <ion-back-button/>
  </ion-buttons>
      <ion-title>Translation</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-accordion-group #accordionGroup>
      <ion-accordion value="first">
        <ion-item slot="header" color="light">
          <ion-label>First Accordion</ion-label>
        </ion-item>
    <div class="ion-padding" slot="content">
 <ion-label>Label</ion-label>
    </div>
      </ion-accordion>
    </ion-accordion-group>
      <ion-textarea #textArea rows="4"></ion-textarea>
      <ion-button (click)="translation(textArea.value)" expand="block" shape="round">
        Translation
      </ion-button>
      <ion-note>
        {{ translationText() }}
      </ion-note>

  </ion-content>
  `,
  styles: [``],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonBackButton, IonTextarea, IonNote, IonAccordion, IonAccordionGroup, IonItem, IonLabel]
})
export class TranslationPage implements OnInit{

  translationText = signal<string | undefined>(undefined)

  translationService = inject(TranslationService);

  constructor() { }


  ngOnInit(): void {
this.getLanguages()
  }


  async getLanguages() {
    try {
      const response = await this.translationService.languages();
      console.log('response', response);
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


}
