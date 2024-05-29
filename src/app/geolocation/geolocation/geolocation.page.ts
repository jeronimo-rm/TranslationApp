import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class GeolocationPage implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.printCurrentPosition();
  }

  async printCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
    } catch (erro) {
      console.log('Erro', erro);
    }
  }
}
