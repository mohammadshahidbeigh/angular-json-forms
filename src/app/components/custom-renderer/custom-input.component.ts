import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, rankWith, isStringControl } from '@jsonforms/core';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="jsonforms-control">
      <label [for]="id" class="block text-sm font-medium text-gray-700">
        {{ label }}
        <span class="text-red-500" *ngIf="isRequired">*</span>
      </label>
      <input
        [id]="id"
        type="text"
        [value]="data || ''"
        (input)="onChange($event)"
        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        [class.border-red-500]="!isValid"
      />
      <div *ngIf="!isValid" class="validation-error">
        {{ errorMessage }}
      </div>
    </div>
  `
})
export class CustomInputComponent extends JsonFormsControl {
  override onChange(event: any) {
    this.data = event.target.value;
  }

  get isValid(): boolean {
    return !this.error;
  }

  get isRequired(): boolean {
    return this.schema?.required?.includes(this.path) || false;
  }

  get errorMessage(): string {
    return this.error || '';
  }
}

export const customInputTester: RankedTester = rankWith(
  3,
  isStringControl
);