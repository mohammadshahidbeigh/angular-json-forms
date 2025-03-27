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
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
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
                  <h1 class="form-title">Registration Form</h1>
                </div>
                <p class="form-subtitle">Join our community by filling out the form below</p>
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
      padding: 2rem;
      position: relative;
      z-index: 1;
    }

    .form-content {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      perspective: 1000px;
    }

    .form-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 24px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      position: relative;
      backdrop-filter: blur(10px);
      transform-style: preserve-3d;
      transition: all 0.3s ease;
    }

    .form-card:hover {
      transform: translateY(-5px) rotateX(2deg);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .card-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 200px;
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      opacity: 0.1;
      z-index: 0;
    }

    .header-content {
      width: 100%;
      text-align: center;
      padding: 2.5rem 1.5rem 2rem;
      position: relative;
      z-index: 1;
    }

    .title-section {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .title-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 1rem;
      color: #667eea;
      animation: float 3s ease-in-out infinite;
    }

    .form-title {
      font-size: 2.25rem;
      font-weight: 700;
      background: linear-gradient(45deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
    }

    .form-subtitle {
      color: #6b7280;
      margin: 0;
      font-size: 1.1rem;
      font-weight: 400;
    }

    mat-card-content {
      padding: 2rem !important;
      position: relative;
      z-index: 1;
    }

    ::ng-deep {
      .mat-mdc-form-field {
        width: 100%;
        margin-bottom: 1.5rem;
      }

      .mat-mdc-form-field-appearance-fill .mat-mdc-form-field-flex {
        background-color: rgba(243, 244, 246, 0.8);
        border-radius: 12px 12px 0 0;
        padding: 0.75rem 0.75rem 0 !important;
      }

      .mat-mdc-text-field-wrapper {
        background-color: transparent !important;
      }

      .mat-mdc-form-field-label {
        color: #4b5563;
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

      .mat-mdc-form-field-error {
        color: #ef4444;
      }

      .mat-mdc-select-panel {
        border-radius: 12px !important;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
      }

      .mat-mdc-option {
        font-size: 0.95rem;
        height: 3rem !important;
      }

      .mat-mdc-form-field-subscript-wrapper {
        padding: 0 !important;
      }

      .mat-mdc-form-field-infix {
        padding: 0.5em 0 !important;
      }
    }

    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0px);
      }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
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
        font-size: 1.75rem;
      }

      .title-icon {
        font-size: 2rem;
        width: 2rem;
        height: 2rem;
      }

      .form-subtitle {
        font-size: 1rem;
      }

      .header-content {
        padding: 2rem 1rem 1.5rem;
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
        description: 'Enter a valid email address for communication'
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
        description: 'Enter the full name of your educational institution'
      },
      grade: {
        type: 'string',
        enum: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'],
        title: 'Grade Level',
        description: 'Select your current academic grade'
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