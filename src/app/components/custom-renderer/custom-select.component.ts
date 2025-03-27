import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, rankWith, isEnumControl } from '@jsonforms/core';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="jsonforms-control">
      <label [for]="id" class="block text-sm font-medium text-gray-700">
        {{ label }}
        <span class="text-red-500" *ngIf="isRequired">*</span>
      </label>
      <select
        [id]="id"
        [value]="data || ''"
        (change)="onChange($event)"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        [class.border-red-500]="!isValid"
      >
        <option value="">Select {{ label }}</option>
        <option *ngFor="let option of options" [value]="option">
          {{ option }}
        </option>
      </select>
      <div *ngIf="!isValid" class="validation-error">
        {{ errorMessage }}
      </div>
    </div>
  `
})
export class CustomSelectComponent extends JsonFormsControl {
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

  get options(): string[] {
    return this.schema?.enum || [];
  }
}

export const customSelectTester: RankedTester = rankWith(
  3,
  isEnumControl
); 