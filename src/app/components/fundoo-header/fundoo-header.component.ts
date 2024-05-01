import { DataService } from './../../services/dataService/data.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { LIST_VIEW_ICON, MENU_ICON, OTHER_MENU_ICON, REFRESH_ICON, SEARCH_ICON, SETTING_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-fundoo-header',
  templateUrl: './fundoo-header.component.html',
  styleUrls: ['./fundoo-header.component.scss']
})
export class FundooHeaderComponent implements OnInit, OnDestroy {

  isDrawerOpen:boolean=false;
  subscription!:Subscription;
  searchString:string=''

  constructor(private domSanitizer: DomSanitizer, 
              private matIconRegistry: MatIconRegistry,
              private dataService: DataService) { 
    this.matIconRegistry.addSvgIconLiteral("menu-icon", this.domSanitizer.bypassSecurityTrustHtml(MENU_ICON));
    this.matIconRegistry.addSvgIconLiteral("search-icon", this.domSanitizer.bypassSecurityTrustHtml(SEARCH_ICON));
    this.matIconRegistry.addSvgIconLiteral("refresh-icon", this.domSanitizer.bypassSecurityTrustHtml(REFRESH_ICON));
    this.matIconRegistry.addSvgIconLiteral("setting-icon", this.domSanitizer.bypassSecurityTrustHtml(SETTING_ICON));
    this.matIconRegistry.addSvgIconLiteral("list-view-icon", this.domSanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON));
    this.matIconRegistry.addSvgIconLiteral("other-icon", this.domSanitizer.bypassSecurityTrustHtml(OTHER_MENU_ICON));
   }
  ngOnInit(): void {
    this.subscription = this.dataService.currDrawerState.subscribe(result => {
      this.isDrawerOpen = result;
    })
  }

  HandelToggleDrawer(){
    console.log("toggle drawer");
    this.dataService.toggleDrawerState(!this.isDrawerOpen);
  }

  handleSearchString(){
    this.dataService.updateSearchString(this.searchString)
 }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
