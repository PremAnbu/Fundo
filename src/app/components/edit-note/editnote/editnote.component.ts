import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.scss']
})
export class EditnoteComponent implements OnInit {
  title:string=""
  description:string=""
  colour:string=""
  reminder:string= "2024-05-01T05:31:09.213Z"
  isArchived:boolean= true
  isPinned:boolean= true
  isDeleted:boolean= true

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,public dialogRef: MatDialogRef<EditnoteComponent>) { 
    this.title=data.title
    this.description=data.description
    this.colour=data.color
    
  }

  ngOnInit(): void {
  }
  handleEditNote(){
    this.dialogRef.close({...this.data,title:this.title,description:this.description,colour:this.colour,})
  }

  handleNoteIconsClick(color:string){
     this.colour=color
  }

}
