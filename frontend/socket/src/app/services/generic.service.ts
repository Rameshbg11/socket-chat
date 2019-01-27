import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  constructor(public snackBar: MatSnackBar) { }

  openSnackbar(message: string, action?: string, duration?: number) {
    if (duration == undefined)
      duration = 3000;
    if (action == undefined)
      action = 'Close'
    this.snackBar.open(message, action, { duration: duration })
  }
}
