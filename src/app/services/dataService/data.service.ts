import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private drawerState = new BehaviorSubject(false);
  currDrawerState = this.drawerState.asObservable();

  constructor() { }

  toggleDrawerState(value: boolean) {
    this.drawerState.next(value)
  }}
