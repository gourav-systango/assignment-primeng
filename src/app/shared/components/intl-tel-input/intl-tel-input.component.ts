import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import intlTelInput, { SomeOptions } from 'intl-tel-input';

@Component({
  selector: 'app-intl-tel-input',
  imports: [ReactiveFormsModule],
  templateUrl: './intl-tel-input.component.html',
  styleUrl: './intl-tel-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IntlTelInputComponent,
      multi: true,
    },
  ],
})
export class IntlTelInputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  phoneForm: FormGroup;

  phoneFieldParams = {
    initialCountry: 'us',
    strictMode: true,
    allowDropdown: true,
    // @ts-ignore
    utilsScript: async () => import('intl-tel-input/utils'),
  }

  // Configuration for intl-tel-input
  private defaultOptions: SomeOptions = {
    initialCountry: '',
    allowDropdown: true,
    autoPlaceholder: 'polite',
    containerClass: '',
    countryOrder: [],
    countrySearch: true,
    customPlaceholder: null,
    dropdownContainer: null,
    excludeCountries: [],
    fixDropdownWidth: true,
    formatAsYouType: true,
    formatOnDisplay: true,
    geoIpLookup: null,
    hiddenInput: null,
    i18n: {},
    // loadUtilsOnInit: '',
    nationalMode: true,
    onlyCountries: [],
    placeholderNumberType: 'MOBILE',
    showFlags: true,
    separateDialCode: false,
    strictMode: false,
    useFullscreenPopup: /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 500 || false,
    // utilsScript: '',
    // validationNumberTypes: ['MOBILE'],
  };

  private instance!: {
    getSelectedCountryData(): unknown;
    setNumber(value: any): unknown;
    getNumber(): unknown; 
    destroy: () => void;
};
  private inputListener!: EventListener;

  private onTouched: () => void = () => {};
  private onChange: (value: any) => void = () => {};

  constructor(private fb: FormBuilder, private el: ElementRef) {
    this.phoneForm = this.fb.group({
      phone: [''],  // This will bind to the phone input field
    });
  }
 

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const phoneInput = this.el.nativeElement.querySelector('input[type="tel"]');
    this.instance = intlTelInput(phoneInput, {
      ...this.defaultOptions,
      ...this.phoneFieldParams
    });

     // Listen for country change events to update the placeholder dynamically
     phoneInput.addEventListener('countrychange', () => {
      const countryData: any = this.instance.getSelectedCountryData();
      console.log("countryData", countryData);
    });

    // Listen for input changes and propagate to the form
    this.inputListener = () => {
      const phoneNumber = this.instance.getNumber();
      this.onChange(phoneNumber);
    };

    phoneInput.addEventListener('input', this.inputListener);
  }

  ngOnDestroy(): void {
    const phoneInput = this.el.nativeElement.querySelector('input[type="tel"]');
    phoneInput.removeEventListener('input', this.inputListener);

    if (this.instance) {
      this.instance.destroy();
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    const phoneInput = this.el.nativeElement.querySelector('input[type="tel"]');
    if (value) {
      phoneInput.value = value;
      if (this.instance) {
        this.instance.setNumber(value);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const phoneInput = this.el.nativeElement.querySelector('input[type="tel"]');
    phoneInput.disabled = isDisabled;
  }
}
