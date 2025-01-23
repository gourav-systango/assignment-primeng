import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import intlTelInput, { Iti } from 'intl-tel-input';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgxPhoneField } from 'ngx-phone-field';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { HttpClient } from '@angular/common/http';
import { postcodeValidator } from 'postcode-validator';


@Component({
  selector: 'app-form',
  imports: [
    AutoCompleteModule,
    ButtonModule,
    CommonModule,
    DatePickerModule,
    FloatLabelModule,
    InputTextModule,
    NgxPhoneField,
    ReactiveFormsModule,
    SelectModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  countries = intlTelInput.getCountryData();
  filteredAddresses: any[] = [];
  params = {
    initialCountry: 'us',
    countryOrder: ["us","gb","in"],
    allowDropdown: true,
    formatAsYouType: true,
    // @ts-ignore
    // load utils script for formatting and validation
    loadUtilsOnInit: async () => import('intl-tel-input/utils'), 
  };
  phone: FormControl = new FormControl<Iti | string>("", [Validators.required]);
  selectedCountry: FormControl = new FormControl("", Validators.required);
  selectedAddress: FormControl = new FormControl("", [this.validate()]);

  constructor(private http: HttpClient) {}

  filterAddress(event: AutoCompleteCompleteEvent) {
    const country = this.phone.value['defaultCountry'];
    if (this.selectedAddress.valid && country) {
      console.log("country", country);
      const postalCode = this.selectedAddress.value;
      const url = `https://app.zipcodebase.com/landing_demo/?codes=${postalCode}&country=${country}`;
      const responseData = this.http.get(url);
      responseData.subscribe({
        next: ((data: any)=> {
      console.log("data", data);
        let filtered: any[] = [];
        const addresses = data.results[this.selectedAddress.value];
        if(data.results[this.selectedAddress.value]) {
        for (let i = 0; i < addresses.length; i++) {
            let address = addresses[i];
            filtered.push(address.postal_code + ' - ' + address.city_en + ', ' + address.state_code + ', ' + address.country_code);
          }
        }
        console.log("filteredAddresses", filtered);
        this.filteredAddresses = filtered;
      }),
      error: ((error) =>{
        console.log("error", error)
      })});
    }
  }

  private validate(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      if (!control) return null;
      const country = this.phone?.value?.['defaultCountry'] ? this.phone?.value?.['defaultCountry'].toUpperCase() : null;
      if (!country) return { isInvalidAddress: true };
      const address = this.selectedAddress?.value
      if (!address) { isInvalidAddress: true };
      return !postcodeValidator(control?.value, country) ? {isInvalidAddress: true} : null;
    }
  }

}
