import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  MenuController,
  IonMenu,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

const imports = [
  RouterLink,
  RouterLinkActive,
  CommonModule,
  IonApp,
  IonSplitPane,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonMenu,
];

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports,
})
export class AppComponent {
  menuToggle = inject(MenuController);

  constructor() {
    addIcons({ close });
  }
}
