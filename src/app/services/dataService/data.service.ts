import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private drawerState = new BehaviorSubject(false);
  currDrawerState = this.drawerState.asObservable();

  private searchString = new BehaviorSubject('');
  currSearchString = this.searchString.asObservable();

  constructor() { }

  toggleDrawerState(value: boolean) {
    this.drawerState.next(value)
  }
  updateSearchString(state:string){
    this.searchString.next(state)
   }

}
