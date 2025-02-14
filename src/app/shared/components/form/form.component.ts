import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, viewChild } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import intlTelInput, { Iti } from 'intl-tel-input';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { NgxPhoneField } from 'ngx-phone-field';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class FormComponent implements AfterViewInit {
  // @viewChild("Contact") contact
  public countries = intlTelInput.getCountryData();
  public filteredAddresses: string[] = [];
  public params = {
    initialCountry: 'us',
    countryOrder: ["us","gb","in"],
    allowDropdown: true,
    formatAsYouType: true,
    strictMode: true,
    // isValidNumber: true,
    // validationNumberType: "Mobile",
    // showFlags:false,
    // separateDialCode:true,
    // formatOnDisplay:false,
    // nationalMode: false,
    // @ts-ignore
    // load utils script for formatting and validation
    loadUtilsOnInit: async () => import('intl-tel-input/utils'), 
  };
  public postalCode: string = "";
  public phone: FormControl = new FormControl<Iti | string>("", [Validators.required,this.validateNumber()]);
  public selectedCountry: FormControl = new FormControl("", Validators.required);
  public selectedAddress: FormControl = new FormControl("", [this.validate()]);

  public testHidden = true;

  constructor(private http: HttpClient) {}

  public ngAfterViewInit(): void {
    this.setInputValue();
  }

  setInputValue() {
    this.phone.setValue("");
    if(this.testHidden) {
      setTimeout(() => {
        const input: any = document.querySelector("#phone");
        const telInstance = intlTelInput.getInstance(input); // get input Instance  
        telInstance?.setCountry("in") // set country
        telInstance?.setNumber("+919826098260") // set number

        input.addEventListener("countrychange", () => { // event receive on country change
          if(this.phone.value['defaultCountry']) {
            const telInstance = intlTelInput.getInstance(input);
            telInstance?.setNumber("") // set input value in null on every event if country change
          }
        });
      }, 500);
    }
      
  }

  public filterAddress(event: AutoCompleteCompleteEvent): void {
    const apiKey = "fd384f40-e31c-11ef-b04a-455a9eac6a12"
    const country = this.phone.value['defaultCountry'];
    console.log("filteredAddresses", this.filteredAddresses)
    if (this.selectedAddress.valid && country) {
      const postalCode = this.selectedAddress.value;
      const token = 'your-jwt-token';
      const headers = new HttpHeaders({
        // 'Authorization': `Bearer ${token}`
      });
      const url = `https://app.zipcodebase.com/api/v1/search?codes=${postalCode}&country=${country}&apikey=${apiKey}`;
      const responseData = this.http.get(url, { headers });
      responseData.subscribe({
        next: ((data: any)=> {
        let filtered: any[] = [];
        const addresses = data.results[this.selectedAddress.value];
        if(data.results[this.selectedAddress.value]) {
        for (let i = 0; i < addresses.length; i++) {
            let address = addresses[i];
            this.postalCode = address.postal_code;
            filtered.push(address.postal_code + ' - ' + address.city_en + ', ' + address.state_code + ', ' + address.country_code);
          }
        }
        this.filteredAddresses = filtered;
      }),
      error: ((error) =>{
        console.log("error", error)
      })});
    } else {
      this.postalCode = "";
      this.filteredAddresses = [];
    }
  }

  public onSubmit(): void {
    const iti: any  = intlTelInput.utils;
    const telInput =  this.phone.value;
    
    const number = telInput.getNumber(iti?.numberFormat.E164); // returns tel input value in simple number format with dial code
    iti.formatNumber(number, telInput?.defaultCountry) // returns tel input value with dial code
    iti.formatNumberAsYouType(number, telInput?.defaultCountry) // returns tel input value as iso formatd with dial code
    
    const telInputObject = {
      selectedCountryData: telInput.selectedCountryData, //returns selected country data
      // dialCode: telInput.getExtension(),
      number: telInput.getNumber(iti?.numberFormat.E164),
      formatNumber: iti.formatNumber(number, telInput?.defaultCountry),
      formatNumberAsYouType: iti.formatNumberAsYouType(number, telInput?.defaultCountry),
      defaultInput: telInput
    }
    console.log("telInputObject", telInputObject);
  }

  private validateNumber(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      if (!control) return null;
      const telInput: any = control?.value;
      if(telInput) {
        const iti: any  = intlTelInput.utils;
        const number = telInput.getNumber(iti?.numberFormat.E164);
        const isValidNumber = iti.isValidNumber(number, telInput?.defaultCountry)
        return !isValidNumber ? {isInvalidNumber: true} : null;   
      } else return null
    }             
  }

  private validate(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      if (!control) return null;
      const country = this.phone?.value?.['defaultCountry'] ? this.phone?.value?.['defaultCountry'].toUpperCase() : null;
      if (!country) return { isInvalidAddress: true };
      const address = this.selectedAddress?.value
      if (!address) return { isInvalidAddress: true };
      return !postcodeValidator(this.postalCode || control?.value, country) ? {isInvalidAddress: true} : null;
    }
  }

}

