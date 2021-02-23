import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ViewChild
} from "@angular/core";
import { TodoService } from './todo.service';
import { DataSourceChangedEventArgs, DialogEditEventArgs, DataStateChangeEventArgs, EditSettingsModel, GridComponent,ExcelExportService,PdfExportService, IEditCell} from "@syncfusion/ej2-angular-grids";
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import {formatDate} from '@angular/common';

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"],
})
export class AppComponent {
  public parentData: Object[];
  public childGrid: any;
  public toDoList: any;
  public toolbar: string[];
  public editSettings: EditSettingsModel;
  public numericParams: IEditCell;
  public dpParams: IEditCell;
  public TextRules: object;
  public DateRules: object;
  @ViewChild('grid', {static: true})
  public grid:GridComponent;

  constructor(public service: TodoService) {

  }

  ngOnInit(): void {
    this.editSettings = {allowAdding: true, allowDeleting:true, allowEditing: true,  mode: 'Dialog'};
    this.toolbar = ['Add','Edit', 'Update','Delete','Cancel', 'ExcelExport', 'PdfExport','Search'];
    const state = { skip: 0, take: 10 };
    this.service.getTodoList(state).subscribe(customers => {
      let result: Object[] = [];
      customers.forEach((e) => {
        let obj1: Object = e.payload.val();
        (<{key: string}>obj1).key = e.payload.key;
        result.push(obj1)
      })
      this.toDoList = {result: result.slice(state.skip,state.take), count: result.length};
    });
    this.TextRules = { required: true };
    //this.DateRules = { required: true};
    this.numericParams = { params: { decimals: 2 } };
    this.dpParams = { params: {value: formatDate(new Date(), 'yyyy/MM/dd', 'en') } };


  }

  public dataStateChange(state: DataStateChangeEventArgs): void {
    this.service.getTodoList(state);
}

public actionComplete(args) {
  if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      const dialog = args.dialog;
      const CustomerID = 'FirstNme';
      // change the header of the dialog
      dialog.header = args.requestType === 'beginEdit' ? 'Record of ' + args.rowData[CustomerID] : 'New Order';
  }
}

public toolbarClick(args: ClickEventArgs): void {
  if (args.item.id === 'Grid_excelexport') { // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
      this.grid.excelExport();
  } else if (args.item.id === 'Grid_pdfexport') { // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
  this.grid.pdfExport();
  } else if (args.item.id === 'Grid_search') {

  }
}

public dataSourceChanged(state: DataSourceChangedEventArgs): void {
    if (state.action === 'add') {
      console.log(state)
      this.service.inserTodo(state);
      this.grid.refresh();
      console.log(state.data)
    } else if (state.action === 'edit') {
      console.log(state)
        this.service.updateTodo(state);
        this.grid.refresh();
    } else if (state.requestType === 'delete') {
      this.service.deleteTodoList(state)
      this.grid.refresh();
    }
  }
}


