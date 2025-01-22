import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import intlTelInput, { Iti } from 'intl-tel-input';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgxPhoneField } from 'ngx-phone-field';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-form',
  imports: [ButtonModule, CommonModule, DatePickerModule, FloatLabelModule, InputTextModule, NgxPhoneField, ReactiveFormsModule, SelectModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.sass'
})
export class FormComponent implements OnInit {
  countries = intlTelInput.getCountryData();
  params = {
    initialCountry: 'us',
    allowDropdown: true,
    formatAsYouType: true,
    // @ts-ignore
    // load utils script for formatting and validation
    loadUtilsOnInit: async () => import('intl-tel-input/utils'), 
  };
  phone: FormControl = new FormControl<Iti | null>(null);
  selectedCountry: FormControl = new FormControl("");
  ngOnInit(): void {
    console.log("Countries", this.countries);
  }
}
