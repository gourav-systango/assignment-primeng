import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { IntlTelInputComponent } from './shared/components/intl-tel-input/intl-tel-input.component';
import { IntlInputComponent } from './shared/components/intl-input/intl-input.component';
import { PFileUploadComponent } from './shared/components/p-file-upload/p-file-upload.component';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    // IntlTelInputComponent,
    // IntlInputComponent,
    RouterOutlet,
    // ToggleSwitch,
    PFileUploadComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  checked: boolean = true;

  checked2: boolean = true;
  router = inject(Router);

  fb= inject(FormBuilder);
  form = this.fb.group({
    imageFile: [null]
  });
  
  amberSwitch = {
    handle: {
      borderRadius: '4px'
    },
    colorScheme: {
      light: {
        root: {
          checkedBackground: '{amber.500}',
          checkedHoverBackground: '{amber.600}',
          borderRadius: '4px'
        },
        handle: {
          checkedBackground: '{amber.50}',
          checkedHoverBackground: '{amber.100}'
        }
      },
      dark: {
        root: {
          checkedBackground: '{amber.400}',
          checkedHoverBackground: '{amber.300}',
          borderRadius: '4px'
        },
        handle: {
          checkedBackground: '{amber.900}',
          checkedHoverBackground: '{amber.800}'
        }
      }
    }
  };

  eventHandler(checked: boolean) {
    this.router.navigateByUrl(checked ? "file-upload" : "manual-file-upload")      
  }

  getFile(event: any) {
    console.log("File Uploaded", event)
  }
  getError(event: any) {
    console.log("Uploaded Error", event)
  }
}
