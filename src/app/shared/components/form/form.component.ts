import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import intlTelInput, { Iti } from 'intl-tel-input';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgxPhoneField } from 'ngx-phone-field';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';


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
export class FormComponent implements OnInit {
  countries = intlTelInput.getCountryData();
  filteredCountries: any[] = [];
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
  phone: FormControl = new FormControl<Iti | null>(null);
  selectedCountry: FormControl = new FormControl("");
  selectedAddress: FormControl = new FormControl("");

  ngOnInit(): void {
    console.log("Countries", this.countries);
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }

  filterAddress(event: AutoCompleteCompleteEvent) {
    const addresses: any[] = [{
      "postal_code": "CR2 6XH",
      "country_code": "GB",
      "latitude": "51.34670000",
      "longitude": "-0.10340000",
      "city": "London",
      "state": "England",
      "city_en": "London",
      "state_en": "England",
      "state_code": "ENG",
      "province": "Greater London",
      "province_code": "GLA"
    },
    {
      "postal_code": "452001",
      "country_code": "IN",
      "latitude": "22.72330000",
      "longitude": "75.87000000",
      "city": "Radio Colony Indore",
      "state": "Madhya Pradesh",
      "city_en": "Radio Colony Indore",
      "state_en": "Madhya Pradesh",
      "state_code": "MP",
      "province": "Indore",
      "province_code": "IN"
    }];

    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < addresses.length; i++) {
      let address = addresses[i];
      console.log("address", address, address.city_en.toLowerCase().match(query.toLowerCase()))
      if (address.city_en.toLowerCase().match(query.toLowerCase())) {
        filtered.push(address.city_en + ' ' + address.state_code + ' ' + address.province_code);
      }
    }

    this.filteredAddresses = filtered;
  }
}
