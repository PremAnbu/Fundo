import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ARCHIVE_ICON, BRUSH_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, LIST_VIEW_ICON, MORE_ICON, PIN_ICON, REMINDER_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input() notesData! : any [];
  @Output() updateList=new EventEmitter<any>()

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral("list-icon", sanitizer.bypassSecurityTrustHtml(LIST_VIEW_ICON)),
    iconRegistry.addSvgIconLiteral("brush-icon", sanitizer.bypassSecurityTrustHtml(BRUSH_ICON)),
    iconRegistry.addSvgIconLiteral("image-icon", sanitizer.bypassSecurityTrustHtml(IMG_ICON)),
    iconRegistry.addSvgIconLiteral("reminder-icon", sanitizer.bypassSecurityTrustHtml(REMINDER_ICON))
    iconRegistry.addSvgIconLiteral("collabrator-icon", sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON))
    iconRegistry.addSvgIconLiteral("color-icon", sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON))
    iconRegistry.addSvgIconLiteral("pin-icon", sanitizer.bypassSecurityTrustHtml(PIN_ICON))
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON))
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON))
  }

  ngOnInit(): void {
  }

  handleNoteIconsClick(action: string, note: any) {
    if(action=="archive"){
      this.updateList.emit({action:action, data:note});
    }
    else if(action=="trash"){
      this.updateList.emit({action:action,data:note})
    }
    // else if(action=="color"){
    //   this.updateList.emit((action:action,note:any))
    // }
  }

}