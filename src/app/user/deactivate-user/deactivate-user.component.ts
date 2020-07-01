import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../_services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/models/app-state';
import { ResetFavoriteAction } from '../../_store/actions/favourite.actions';

@Component({
  selector: 'app-deactivate-user',
  templateUrl: './deactivate-user.component.html',
  styleUrls: ['./deactivate-user.component.scss']
})
export class DeactivateUserComponent {

  constructor(
    public dialogRef: MatDialogRef<DeactivateUserComponent>,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: Data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.userService.deleteUser().subscribe(
      res => {
        this.router.navigateByUrl('home');
        this.userService.resetUser(); 
        this.openSnackBar(res.message);
        this.resetFavStore();
      },
      err => this.openSnackBar(err.error)
    );

    this.dialogRef.close();
  }

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  resetFavStore(): void {
    // reset store
    this.store.dispatch(new ResetFavoriteAction());
  }


}
export interface Data {
  title: string;
  icon: string;
  message: string;
  confirm: string;
}