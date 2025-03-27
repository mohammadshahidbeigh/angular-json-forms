import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormsAngularService, JsonFormsModule } from '@jsonforms/angular';
import { JsonSchema, VerticalLayout, RuleEffect, ControlElement } from '@jsonforms/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    JsonFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule
  ],
  template: `
    <div class="form-container">
      <div class="form-content">
        <mat-card class="form-card">
          <mat-card-header>
            <div class="header-content">
              <h1 class="form-title">Registration Form</h1>
              <p class="form-subtitle">Please fill in your details below</p>
            </div>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content>
            <jsonforms
              [data]="data"
              [schema]="schema"
              [uischema]="uischema"
              [renderers]="renderers"
              (dataChange)="onDataChange($event)">
            </jsonforms>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 2rem;
    }

    .form-content {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }

    .form-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      overflow: hidden;
    }

    .header-content {
      width: 100%;
      text-align: center;
      padding: 2rem 1rem;
    }

    .form-title {
      font-size: 2rem;
      font-weight: 600;
      color: #1a237e;
      margin: 0;
      margin-bottom: 0.5rem;
    }

    .form-subtitle {
      color: #666;
      margin: 0;
      font-size: 1rem;
    }

    mat-card-content {
      padding: 2rem !important;
    }

    ::ng-deep {
      .mat-mdc-form-field {
        width: 100%;
        margin-bottom: 1.5rem;
      }

      .mat-mdc-form-field-appearance-fill .mat-mdc-form-field-flex {
        background-color: #f8f9fa;
        border-radius: 8px 8px 0 0;
      }

      .mat-mdc-text-field-wrapper {
        background-color: #f8f9fa !important;
      }

      .mat-mdc-form-field-label {
        color: #555;
      }

      .mat-mdc-select-value {
        color: #333;
      }

      .validation-error {
        color: #d32f2f;
        font-size: 0.75rem;
        margin-top: 4px;
        display: flex;
        align-items: center;
      }

      .mat-mdc-form-field-error {
        color: #d32f2f;
      }

      .mat-mdc-select-panel {
        border-radius: 8px !important;
      }

      .mat-mdc-option {
        font-size: 0.9rem;
      }

      .mat-mdc-form-field-subscript-wrapper {
        padding: 0 !important;
      }
    }
  `],
  providers: [JsonFormsAngularService]
})
export class DynamicFormComponent implements OnInit {
  data = {};
  
  renderers = [
    ...angularMaterialRenderers
  ];
  
  schema: JsonSchema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        title: 'Full Name',
        description: 'Enter your full name as it appears on official documents'
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email Address',
        description: 'Enter a valid email address'
      },
      role: {
        type: 'string',
        enum: ['Student', 'Teacher', 'Administrator'],
        title: 'Role',
        description: 'Select your role in the institution'
      },
      school: {
        type: 'string',
        title: 'School Name',
        description: 'Enter the name of your school'
      },
      grade: {
        type: 'string',
        enum: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
        title: 'Grade Level',
        description: 'Select your current grade level'
      }
    },
    required: ['name', 'email', 'role']
  };

  uischema: VerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/name',
        options: {
          showUnfocusedDescription: true
        }
      } as ControlElement,
      {
        type: 'Control',
        scope: '#/properties/email',
        options: {
          showUnfocusedDescription: true
        }
      } as ControlElement,
      {
        type: 'Control',
        scope: '#/properties/role',
        options: {
          showUnfocusedDescription: true
        }
      } as ControlElement,
      {
        type: 'Control',
        scope: '#/properties/school',
        rule: {
          effect: RuleEffect.SHOW,
          condition: {
            scope: '#/properties/role',
            schema: { enum: ['Student', 'Teacher'] }
          }
        },
        options: {
          showUnfocusedDescription: true
        }
      } as ControlElement,
      {
        type: 'Control',
        scope: '#/properties/grade',
        rule: {
          effect: RuleEffect.SHOW,
          condition: {
            scope: '#/properties/role',
            schema: { enum: ['Student'] }
          }
        },
        options: {
          showUnfocusedDescription: true
        }
      } as ControlElement
    ]
  };

  ngOnInit(): void {
    this.data = {
      name: '',
      email: '',
      role: '',
      school: '',
      grade: ''
    };
  }

  onDataChange(data: any) {
    this.data = data;
    console.log('Form data:', data);
  }
}