import { Subscription } from 'rxjs';
import { DataService } from './../../services/dataService/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ARCHIVE_ICON, BRUSH_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, EDIT_ICON, IMG_ICON, LIST_VIEW_ICON, MORE_ICON, NOTE_ICON, PIN_ICON, REMINDER_ICON, TRASH_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  host:{
    class:"app-sidenav-cnt"
  }
})
export class SideNavComponent implements OnInit , OnDestroy {

  isDrawerOpen : boolean=false;
  Subscription!:Subscription;
  display:string="flex";

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ,private DataService:DataService) {
    iconRegistry.addSvgIconLiteral("note-icon", sanitizer.bypassSecurityTrustHtml(NOTE_ICON)),
    iconRegistry.addSvgIconLiteral("edit-icon", sanitizer.bypassSecurityTrustHtml(EDIT_ICON)),
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON))
  }
  ngOnInit(): void {
    this.Subscription=this.DataService.currDrawerState.subscribe(res => {
      this.isDrawerOpen=res
      this. isDrawerOpen ? this.display="none" : this.display="flex" 

    })
  }
  ngOnDestroy(): void {
      this.Subscription.unsubscribe;
  }

}
