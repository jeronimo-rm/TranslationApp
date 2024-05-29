import { Component, OnChanges, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonLabel,
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { Observable, Subscription } from 'rxjs';

interface Coords {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitudeAccuracy: number | null | undefined;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
}

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonCardContent,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class GeolocationPage implements OnInit {
  coords = signal<Coords | undefined>(undefined);

  constructor() {}

  ngOnInit(): void {
    // this.printCurrentPosition();
    this.watchPosition();
  }

  async watchPosition() {
    try {
      await Geolocation.watchPosition({}, (position, err) => {
        this.coords.set(position?.coords);
      });
    } catch (error) {
      console.log('Error', error);
    }
  }

  async printCurrentPosition() {
    try {
      const { coords } = await Geolocation.getCurrentPosition();
      this.coords.set(coords);
    } catch (error) {
      console.log('Error', error);
    }
  }
}
