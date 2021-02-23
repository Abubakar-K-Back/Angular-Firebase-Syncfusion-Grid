import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EditService, GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, SearchService, FilterService,ResizeService, GroupService, ColumnChooserService,ToolbarService, PdfExportService } from '@syncfusion/ej2-angular-grids';
import { AppComponent } from './app.component';
import {TooltipAllModule} from '@syncfusion/ej2-angular-popups'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AggregateService,ExcelExportService  } from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TodoService} from './todo.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GridModule,
    TooltipAllModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [SearchService, EditService, TodoService,ToolbarService, EditService,ExcelExportService,PdfExportService, CommonModule, GridAllModule, BrowserModule, ReactiveFormsModule, FormsModule, SortService],
  bootstrap: [AppComponent]
})
export class AppModule { }

