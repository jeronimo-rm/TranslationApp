import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonBackButton,
  IonTextarea,
  IonNote,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonImg,
  ModalController,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/angular/standalone';
import { TranslationService } from '../services/translation.service';
import { ModalComponent } from '../modals/modal/modal.component';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { addIcons } from 'ionicons';
import { chevronDownOutline } from 'ionicons/icons';

type LangType = 'target' | 'source';

@Component({
  selector: 'app-translation',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
          <ion-img src="assets/img/trln.png" class="size-img" />
        </ion-buttons>
        <ion-title> Translation </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid fixed>
        <ion-row>
          <ion-col size="6" (click)="openModal('source')">
            <ion-text style="color: #ccc;">
              <h1>Input <ion-icon name="chevron-down-outline" /></h1>
            </ion-text>
            <ion-label>
              {{ flagIcon(source()) }} {{ (source() | titlecase) || '--' }}
            </ion-label>
          </ion-col>
          <ion-col size="6" (click)="openModal('target')">
            <ion-text style="color: #ccc;">
              <h1>Output <ion-icon name="chevron-down-outline" /></h1>
            </ion-text>
            <ion-label>
              {{ flagIcon(target()) }} {{ (target() | titlecase) || '--' }}
            </ion-label>
          </ion-col>
        </ion-row>
        <ion-textarea #textArea rows="4" />
        <ion-button
          (click)="translation(textArea.value)"
          expand="block"
          shape="round"
        >
          Translation
        </ion-button>

        <ion-textarea rows="4" [value]="translationText()" readonly="true" />
      </ion-grid>
    </ion-content>
  `,
  styles: [
    `
      ion-toolbar {
        display: flex;
        --background: #353839;
        ion-title {
          font-size: 20px;
          font-weight: 800;
        }
      }
      .txt-ctr {
        text-align: center;
      }
      .size-img {
        width: 15vw;
      }
      ion-content {
        --background: #353839;

        ion-grid {
          display: grid;
          gap: 20px;
          padding-left: 20px;
          padding-right: 20px;

          ion-button {
            --background: #003355;
            --color: white;
            font-size: 20px;
            font-weight: 600;
            border-radius: 5px;
            padding: 10px 20px;
            text-transform: none;
          }
          ion-textarea {
            box-sizing: border-box;
            width: 100%;
            border-radius: 20px;
            padding: 10px;
            border: 2.5px solid #ccc;
            background-color: #f9f9f9;
            color: #353839;
            text-align: center;
          }
        }
      }
    `,
  ],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonBackButton,
    IonTextarea,
    IonNote,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonImg,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
  ],
})
export class TranslationPage implements OnInit {
  languages = signal<any | undefined>(undefined);
  target = signal<string>('');
  source = signal<string>('');
  translationText = signal<string | undefined>(undefined);

  translationService = inject(TranslationService);
  modalCtrl = inject(ModalController);

  constructor() {
    addIcons({ chevronDownOutline });
  }

  ngOnInit(): void {
    this.getLanguages();
  }

  async getLanguages() {
    try {
      const response: any = await this.translationService.languages();
      this.languages.set(response.data.languages);
    } catch (error) {
      console.log('error', error);
    }
  }

  async translation(text: string | null | undefined) {
    try {
      const response: any = await this.translationService.translation(
        text ? text : '',
        this.target(),
        this.source()
      );

      this.translationText.set(response.data?.translations[0].translatedText);
    } catch (error) {
      console.log('error', error);
    }
  }

  async openModal(type: LangType) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: { languages: this.languages() },
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    this[type].set(data);
  }

  flagIcon(lang: string) {
    if (!lang) {
      return;
    }
    return getUnicodeFlagIcon(lang);
  }
}
