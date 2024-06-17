import { NgModule } from '@angular/core';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';


@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 5000,
        horizontalPosition: 'center',
      }
    },
    NotificationService
  ],
})
export class NotificationModule { }