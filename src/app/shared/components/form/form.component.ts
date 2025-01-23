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
    nationalMode:false,
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
    // https://app.zipcodebase.com/api/v1/search?apikey=YOUR-APIKEY&codes=10005%2C51503
    const data: any = {
      "results": {
        "73001": [
          {
            "postal_code": "73001",
            "country_code": "US",
            "latitude": "35.20320000",
            "longitude": "-98.35740000",
            "city": "Albert",
            "state": "Oklahoma",
            "city_en": "Albert",
            "state_en": "Oklahoma",
            "state_code": "OK",
            "province": "Caddo",
            "province_code": "015"
        }],
      "452001": [
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
        },
        {
          "postal_code": "452001",
          "country_code": "IN",
          "latitude": "22.72330000",
          "longitude": "75.87000000",
          "city": "Indore G.P.O.",
          "state": "Madhya Pradesh",
          "city_en": "Indore G.P.O.",
          "state_en": "Madhya Pradesh",
          "state_code": "MP",
          "province": "Indore",
          "province_code": "IN"
        },
        {
          "postal_code": "452001",
          "country_code": "IN",
          "latitude": "22.72330000",
          "longitude": "75.87000000",
          "city": "Indore Uchchanyayalay",
          "state": "Madhya Pradesh",
          "city_en": "Indore Uchchanyayalay",
          "state_en": "Madhya Pradesh",
          "state_code": "MP",
          "province": "Indore",
          "province_code": "IN"
        },
        {
          "postal_code": "452001",
          "country_code": "IN",
          "latitude": "22.72330000",
          "longitude": "75.87000000",
          "city": "Indore CGO Complex",
          "state": "Madhya Pradesh",
          "city_en": "Indore CGO Complex",
          "state_en": "Madhya Pradesh",
          "state_code": "MP",
          "province": "Indore",
          "province_code": "IN"
        },
        {
          "postal_code": "452001",
          "country_code": "IN",
          "latitude": "22.72330000",
          "longitude": "75.87000000",
          "city": "Indore Takshashila",
          "state": "Madhya Pradesh",
          "city_en": "Indore Takshashila",
          "state_en": "Madhya Pradesh",
          "state_code": "MP",
          "province": "Indore",
          "province_code": "IN"
        },
        {
          "postal_code": "452001",
          "country_code": "IN",
          "latitude": "22.72330000",
          "longitude": "75.87000000",
          "city": "Indore Manorama Ganj",
          "state": "Madhya Pradesh",
          "city_en": "Indore Manorama Ganj",
          "state_en": "Madhya Pradesh",
          "state_code": "MP",
          "province": "Indore",
          "province_code": "IN"
        },
        {
          "postal_code": "452001",
          "country_code": "IN",
          "latitude": "22.72330000",
          "longitude": "75.87000000",
          "city": "Indore Tukoganj",
          "state": "Madhya Pradesh",
          "city_en": "Indore Tukoganj",
          "state_en": "Madhya Pradesh",
          "state_code": "MP",
          "province": "Indore",
          "province_code": "IN"
        }
        ]
      }
    };

    let filtered: any[] = [];
    let query = event.query;
    const addresses = data.results[this.selectedAddress.value];
    console.log("addresses", addresses);
    if(data.results[this.selectedAddress.value]) {
    for (let i = 0; i < addresses.length; i++) {
        let address = addresses[i];
        console.log("address", address, address.city_en.toLowerCase().match(query.toLowerCase()))
        filtered.push(address.city_en + ' ' + address.state_code + ' ' + address.country_code);
      }
    }
    this.filteredAddresses = filtered;
  }

}
