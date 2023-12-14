import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar';


import { CdkMenuModule } from '@angular/cdk/menu';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';

const materialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatSnackBarModule,
  MatIconModule,
  MatRippleModule,
  MatMenuModule,
  MatToolbarModule,
  CdkMenuModule,
  CdkDrag,
  CdkDragHandle
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialComponents
  ],
  exports: [
    materialComponents
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 6500} }
  ]
})
export class MaterialModule { }
