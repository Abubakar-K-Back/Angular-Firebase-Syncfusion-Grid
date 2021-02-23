import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase,AngularFireList,AngularFireObject } from '@angular/fire/database';
import { stderr } from 'process';
import {formatDate} from '@angular/common';

// import { AuthService } from "../../shared/services/auth.service";
//import { DatePipe } from '@angular/common';


@Injectable()
export class TodoService {

  constructor(public firebase: AngularFireDatabase) {

  }
  todoList: AngularFireList<any>;



  getTodoList(state) {
    // const userData = this.authService.getUserId;
    var initialLocation = 'orders/' + "LndgC7VdGdcM0Xzah9gnLhlppFR2";
    this.todoList = this.firebase.list(initialLocation);
    return this.todoList.snapshotChanges();
  }
  inserTodo(state) {
    var inventoryLocation = "/orders/" + "LndgC7VdGdcM0Xzah9gnLhlppFR2";
    if (state.data.Notes === undefined) {
      var std

      std=formatDate(state.data.OrderDate, 'yyyy/MM/dd', 'en');

      this.firebase.list(inventoryLocation).push({FirstName: state.data.FirstName, LastName: state.data.LastName, Email: state.data.Email, Phone: state.data.Phone, Order: state.data.Order, OrderTotal: state.data.OrderTotal, ShippingMethod: state.data.ShippingMethod, Address: state.data.Address, OrderDate: std, Notes: ""});
      //state.endEdit();
      //state.refresh();

    } else {
      this.firebase.list(inventoryLocation).push({FirstName: state.data.FirstName, LastName: state.data.LastName, Email: state.data.Email, Phone: state.data.Phone, Order: state.data.Order, OrderTotal: state.data.OrderTotal, ShippingMethod: state.data.ShippingMethod, Address: state.data.Address, OrderDate: std, Notes: state.data.Notes});
    }
    state.endEdit();
    state.data.refresh();
    }

  updateTodo(state) {
    // const userData = this.authService.getUserId;
    var inventoryLocation = "/orders/" + "LndgC7VdGdcM0Xzah9gnLhlppFR2";
    if (state.data.Notes === undefined) {

      var spd=formatDate(state.data.OrderDate, 'yyyy/MM/dd', 'en');

      this.firebase.list(inventoryLocation).update(state.data.key, {FirstName: state.data.FirstName, LastName: state.data.LastName, Email: state.data.Email, Phone: state.data.Phone, Order: state.data.Order, OrderTotal: state.data.OrderTotal, ShippingMethod: state.data.ShippingMethod, Address: state.data.Address, OrderDate: spd, Notes: ""});

    } else {
      this.firebase.list(inventoryLocation).update(state.data.key, {FirstName: state.data.FirstName, LastName: state.data.LastName, Email: state.data.Email, Phone: state.data.Phone, Order: state.data.Order, OrderTotal: state.data.OrderTotal, ShippingMethod: state.data.ShippingMethod, Address: state.data.Address, OrderDate: spd, Notes: state.data.Notes});
    }
    state.endEdit();
    // state.closeEdit();
    state.refresh();

  }

  deleteTodoList(state) {
    // const userData = this.authService.getUserId;
    var inventoryLocation = "/orders/" + "LndgC7VdGdcM0Xzah9gnLhlppFR2";
    this.firebase.list(inventoryLocation).remove(state.data[0].key);
    state.endEdit();

  }

 /* date
  getdate()
  {
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd')
    return latest_date
  }*/
 /* getdate()
  {
    return 2
  }*/
}

