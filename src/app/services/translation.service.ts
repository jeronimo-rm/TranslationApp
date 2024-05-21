import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  url = 'https://google-translate1.p.rapidapi.com/language/translate/v2/';


  httpClient = inject(HttpClient);

  constructor() { }


  translation(text: string, target: string, source:string) {

    const headers = {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'b99f983d5emsh0802dc7f87c0846p17b2fdjsn0446ad90fdca',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    };

    const body = new URLSearchParams({
      q: text,
      target,
      source,
    });

  return firstValueFrom(this.httpClient.post(this.url, body,{headers}));
};


languages() {

  const url = `${this.url}languages/`
  const headers = {
    'X-RapidAPI-Key': 'b99f983d5emsh0802dc7f87c0846p17b2fdjsn0446ad90fdca',
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  };


  return firstValueFrom(this.httpClient.get(url,{ headers }));
};

}
