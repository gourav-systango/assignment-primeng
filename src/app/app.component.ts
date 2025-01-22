import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { IntlTelInputComponent } from './shared/components/intl-tel-input/intl-tel-input.component';
import { IntlInputComponent } from './shared/components/intl-input/intl-input.component';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    FormsModule,
    // IntlTelInputComponent,
    // IntlInputComponent,
    RouterOutlet,
    // ToggleSwitch,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  checked1: boolean = true;

  checked2: boolean = true;

  /* amberSwitch = {
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
  }; */
}
