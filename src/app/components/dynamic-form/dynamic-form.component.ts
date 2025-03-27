import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormsAngularService, JsonFormsModule } from '@jsonforms/angular';
import { JsonSchema, VerticalLayout, RuleEffect, ControlElement, GroupLayout } from '@jsonforms/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatDividerModule,
    MatIconModule,
    MatProgressBarModule
  ],
  template: `
    <div class="page-container">
      <div class="form-container">
        <div class="form-content">
          <mat-card class="form-card">
            <div class="card-background"></div>
            <mat-card-header>
              <div class="header-content">
                <div class="title-section">
                  <mat-icon class="title-icon">how_to_reg</mat-icon>
                  <h1 class="form-title">Registration</h1>
                </div>
                <p class="form-subtitle">Please fill in your details</p>
                <mat-progress-bar mode="determinate" [value]="formProgress" class="progress-bar"></mat-progress-bar>
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
              <div class="form-actions">
                <button mat-raised-button color="primary" class="submit-button" (click)="onSubmit()">
                  <mat-icon>check_circle</mat-icon>
                  Submit Registration
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }

    .page-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff10" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
      background-repeat: no-repeat;
      background-position: bottom;
      background-size: cover;
      opacity: 0.1;
      pointer-events: none;
    }

    .form-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      position: relative;
      z-index: 1;
    }

    .form-content {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      perspective: 1000px;
    }

    .form-card {
      background: rgba(255, 255, 255, 0.98);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      position: relative;
      backdrop-filter: blur(10px);
      transform-style: preserve-3d;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .form-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    }

    .card-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 140px;
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      opacity: 0.1;
      z-index: 0;
    }

    .header-content {
      width: 100%;
      text-align: center;
      padding: 1.75rem 1.25rem;
      position: relative;
      z-index: 1;
    }

    .title-section {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.75rem;
    }

    .title-icon {
      font-size: 2.25rem;
      width: 2.25rem;
      height: 2.25rem;
      margin-right: 0.75rem;
      color: #667eea;
      animation: float 3s ease-in-out infinite;
    }

    .form-title {
      font-size: 1.875rem;
      font-weight: 700;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .form-subtitle {
      color: #6b7280;
      margin: 0 0 1rem 0;
      font-size: 1rem;
      font-weight: 400;
    }

    .progress-bar {
      height: 4px;
      border-radius: 2px;
      margin-top: 1rem;
    }

    mat-card-content {
      padding: 2rem !important;
      position: relative;
      z-index: 1;
    }

    ::ng-deep {
      .mat-mdc-form-field {
        width: 100%;
        margin-bottom: 1.25rem;
      }

      .mat-mdc-form-field-appearance-fill .mat-mdc-form-field-flex {
        background-color: rgba(243, 244, 246, 0.8);
        border-radius: 12px 12px 0 0;
        padding: 0.75rem 0.75rem 0 !important;
        transition: all 0.3s ease;
      }

      .mat-mdc-form-field-appearance-fill.mat-focused .mat-mdc-form-field-flex {
        background-color: rgba(102, 126, 234, 0.05);
      }

      .mat-mdc-text-field-wrapper {
        background-color: transparent !important;
      }

      .mat-mdc-form-field-label {
        color: #4b5563;
        font-weight: 500;
      }

      .mat-mdc-select-value {
        color: #1f2937;
      }

      .validation-error {
        color: #ef4444;
        font-size: 0.75rem;
        margin-top: 4px;
        display: flex;
        align-items: center;
        animation: slideIn 0.3s ease-out;
      }

      .validation-error::before {
        content: "⚠";
        margin-right: 4px;
      }

      .mat-mdc-form-field-error {
        color: #ef4444;
      }

      .mat-mdc-select-panel {
        border-radius: 12px !important;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .mat-mdc-option {
        font-size: 0.95rem;
        height: 3rem !important;
        padding: 0 1rem;
      }

      .mat-mdc-option:hover:not(.mdc-list-item--disabled) {
        background-color: rgba(102, 126, 234, 0.05) !important;
      }

      .mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled) {
        background-color: rgba(102, 126, 234, 0.1) !important;
      }

      .mat-mdc-form-field-subscript-wrapper {
        padding: 0 !important;
      }

      .mat-mdc-form-field-infix {
        padding: 0.75em 0 !important;
      }

      /* Form Layout Enhancements */
      .jsonforms-control {
        margin-bottom: 1.25rem;
        padding: 1rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
        border: 1px solid rgba(102, 126, 234, 0.1);
      }

      .jsonforms-control:hover {
        background: rgba(255, 255, 255, 0.8);
        transform: translateY(-2px);
        border-color: rgba(102, 126, 234, 0.2);
      }

      .jsonforms-control .description {
        color: #6b7280;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }

      .jsonforms-control label {
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }

      /* Form Groups */
      .form-group {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 16px;
        border: 1px solid rgba(102, 126, 234, 0.1);
        transition: all 0.3s ease;
      }

      .form-group:hover {
        background: rgba(255, 255, 255, 0.8);
        border-color: rgba(102, 126, 234, 0.2);
      }

      .form-group-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        padding-bottom: 0.75rem;
        border-bottom: 2px solid rgba(102, 126, 234, 0.1);
      }

      .form-group-title mat-icon {
        margin-right: 0.75rem;
        color: #667eea;
        font-size: 1.5rem;
      }
    }

    .form-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
    }

    .submit-button {
      padding: 0.75rem 2rem;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .submit-button mat-icon {
      margin-right: 0.5rem;
    }

    .submit-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 640px) {
      .form-container {
        padding: 1rem;
      }

      .form-card {
        border-radius: 16px;
      }

      .form-title {
        font-size: 1.5rem;
      }

      .title-icon {
        font-size: 1.75rem;
        width: 1.75rem;
        height: 1.75rem;
      }

      .form-subtitle {
        font-size: 0.9rem;
      }

      .header-content {
        padding: 1.5rem 1rem;
      }

      mat-card-content {
        padding: 1.5rem !important;
      }

      .form-group {
        padding: 1rem;
      }

      .submit-button {
        width: 100%;
        padding: 0.875rem;
      }
    }
  `],
  providers: [JsonFormsAngularService]
})
export class DynamicFormComponent implements OnInit {
  data: Record<string, string> = {};
  formProgress = 0;
  
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
        description: 'Enter your full name'
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email Address',
        description: 'Enter a valid email'
      },
      role: {
        type: 'string',
        enum: ['Student', 'Teacher', 'Administrator'],
        title: 'Role',
        description: 'Select your role'
      },
      school: {
        type: 'string',
        title: 'School Name',
        description: 'Enter school name'
      },
      grade: {
        type: 'string',
        enum: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
        title: 'Grade Level',
        description: 'Select your grade'
      }
    },
    required: ['name', 'email', 'role']
  };

  uischema: VerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Group',
        label: 'Personal Information',
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
          } as ControlElement
        ]
      } as GroupLayout,
      {
        type: 'Group',
        label: 'Role & Institution',
        elements: [
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
      } as GroupLayout
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
    this.updateFormProgress();
    console.log('Form data:', data);
  }

  updateFormProgress() {
    const requiredFields = ['name', 'email', 'role'];
    const filledFields = requiredFields.filter(field => this.data[field]);
    this.formProgress = (filledFields.length / requiredFields.length) * 100;
  }

  onSubmit() {
    // Handle form submission
    console.log('Form submitted:', this.data);
  }
}