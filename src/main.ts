import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { JsonFormsModule } from '@jsonforms/angular';
import { DynamicFormComponent } from './app/components/dynamic-form/dynamic-form.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <app-dynamic-form></app-dynamic-form>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(MatNativeDateModule)
  ]
}).catch(err => console.error(err));