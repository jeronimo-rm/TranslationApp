import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonCard,
  IonImg,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-camera',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button />
        </ion-buttons>
        <ion-title>Camera</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-button
        class="button-print"
        (click)="takePicture()"
        expand="block"
        shape="round"
      >
        TAKE PICTURE
      </ion-button>

      <ion-card>
        <ion-img [src]="image()" />
      </ion-card>
    </ion-content>
  `,
  styles: [
    `
      ion-card {
        height: 50%;
      }

      ion-img {
        object-fit: cover;
        height: -webkit-fill-available;
      }

      .button-print {
        --background: #003355;
        color: #ccc;
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
    IonBackButton,
    IonButton,
    IonCard,
    IonImg,
  ],
})
export class CameraPage {
  image = signal<any | undefined>(undefined);

  constructor() {}

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        saveToGallery: true,
      });
      this.image.set(image.webPath);
    } catch (error) {
      console.log(error);
    }
  }
}
