import {
  Component,
  OnInit,
  inject,
  signal,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
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
} from '@ionic/angular/standalone';
import { TranslationService } from '../services/translation.service';
import { ModalComponent } from '../modals/modal/modal.component';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

type LangType = 'target' | 'source';

@Component({
  selector: 'app-translation',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title class="txt-ctr">Translation</ion-title>
        <ion-img src="assets/img/trln.png" class="right-img"></ion-img>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <br /><br />

      <ion-grid fixed>
        <ion-row>
          <ion-col size="6" (click)="openModal('source')">
            <ion-text style="color: #ccc;">
              <h1>Input ⌄</h1>
            </ion-text>
            <ion-label>
              {{ flagIcon(source()) }} {{ (source() | titlecase) || '--' }}
            </ion-label>
          </ion-col>
          <ion-col size="6" (click)="openModal('target')">
            <ion-text style="color: #ccc;">
              <h1>Output ⌄</h1>
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
      .txt-ctr{
        text-align: center;
      }
      .right-img {
        width: 60px;
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TranslationPage implements OnInit {
  languages = signal<any | undefined>(undefined);
  target = signal<string>('');
  source = signal<string>('');
  translationText = signal<string | undefined>(undefined);

  translationService = inject(TranslationService);
  modalCtrl = inject(ModalController);

  constructor() {}

  ngOnInit(): void {
    this.getLanguages();
  }

  async getLanguages() {
    try {
      const response: any = await this.translationService.languages();
      console.log('Languages fetched:', response.data.languages);
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
