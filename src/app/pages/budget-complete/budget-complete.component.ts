import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-budget-complete',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './budget-complete.component.html',
  styleUrl: './budget-complete.component.css',
})
export class BudgetCompleteComponent implements OnInit {
  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationsService
      .newBudgetPushNotification()
      .subscribe(({ success }) => {
        if (success) {
          console.info('✅ Push notification sent');
        } else {
          console.error('❌ Push notification failed');
        }
      });
  }
}
