import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  sendPushNotification() {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Accept-encoding', 'gzip, deflate');
    headers.append('Content-Type', 'application/json');

    const message = {
      to: environment.expoNotificationToken,
      sound: 'default',
      title: 'Você tem um novo orçamento!',
      body: 'Clique para saber mais',
    };

    return this.http.post('https://exp.host/--/api/v2/push/send', message, {
      headers,
    });
  }
}
