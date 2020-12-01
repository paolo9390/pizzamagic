import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Address } from '../../_interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-configure-address',
  templateUrl: './configure-address.component.html',
  styleUrls: ['./configure-address.component.scss']
})
export class ConfigureAddressComponent implements OnInit {


  addressForm: FormGroup;
  postcodeRegEx: RegExp = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;
  phoneRegEx: RegExp = /^\(?0( *\d\)?){9,10}$/;

  constructor(
    public dialogRef: MatDialogRef<ConfigureAddressComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: AddressData) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    const address = this.data.addressBook ? this.data.addressBook.address : '';
    const postcode = this.data.addressBook ? this.data.addressBook.postcode : '';
    const phone = this.data.addressBook ? this.data.addressBook.phone : '';
    const notes = this.data.addressBook ? this.data.addressBook.notes : '';

    const address_line1 = address ? address.split(',')[0] : '';
    const address_line2 = address ? this.trim(address.split(',')[1]) : '';
    this.addressForm = this.formBuilder.group({
      address_line1: [{value: address_line1, disabled: this.data.mode === 'edit' ? true : false}, Validators.required],
      address_line2: [{value: address_line2, disabled: this.data.mode === 'edit' ? true : false}, Validators.required],
      postcode: [{value: postcode, disabled: this.data.mode === 'edit' ? true : false}, [Validators.required, Validators.pattern(this.postcodeRegEx)]],
      phone: [phone, [Validators.required, Validators.pattern(this.phoneRegEx)]],
      notes: [notes]
    });
  }

  trim(val: string): string {
    return val.replace(/\ /g, '');
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onAddClick(): void {
    if (this.addressForm.valid) {
      const address: Address = {
        address: `${this.addressForm.controls.address_line1.value}, ${this.addressForm.controls.address_line2.value}`,
        postcode: this.addressForm.controls.postcode.value.toUpperCase(),
        phone: this.addressForm.controls.phone.value,
        notes: this.addressForm.controls.notes.value
      }
      if (this.data.mode === 'add') {
        this.userService.addAddress(address).subscribe(() => 
        this.openSnackBar(`Address ${this.data.mode}ed successfully.`, 'ok')
        , () => this.openSnackBar('Your address could not be added at this time.', 'ok'));
      } else if (this.data.mode === 'edit') {
        const address_id: string = this.data.addressBook._id;
        this.userService.updateAddress(address, address_id).subscribe(() =>
        this.openSnackBar(`Address ${this.data.mode}ed successfully.`, 'ok'),
        () => this.openSnackBar('Your address could not be added at this time.', 'ok'));
      }
      this.dialogRef.close(true);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }
}

export interface AddressData {
  mode: 'edit' | 'add';
  addressBook?: Address;
}
