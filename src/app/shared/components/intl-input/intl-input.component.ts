import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Iti } from 'intl-tel-input';
import { NgxPhoneField } from 'ngx-phone-field';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-intl-input',
  imports: [ReactiveFormsModule, InputTextModule, NgxPhoneField],
  templateUrl: './intl-input.component.html',
  styleUrl: './intl-input.component.sass'
})
export class IntlInputComponent {

  public phoneForm = new FormGroup({
    phone: new FormControl<Iti | null>(null),
  });
  
  params = {
    initialCountry: 'us',
    allowDropdown: true,
    formatAsYouType: true,
    // @ts-ignore
    // load utils script for formatting and validation
    loadUtilsOnInit: async () => import('intl-tel-input/utils'), 
  };


}
