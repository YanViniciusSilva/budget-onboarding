import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface NotificationResponseModel {
  data: {
    id: string;
    status: string;
  };
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  newBudgetPushNotification(): Observable<NotificationResponseModel> {
    return this.http.post<NotificationResponseModel>(
      `${environment.notificationApiUrl}/sendNewBudgetNotification`,
      {},
    );
  }
}
