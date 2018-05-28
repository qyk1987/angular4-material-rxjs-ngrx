
import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h3 md-dialog-title>{{title}}</h3>
    <div md-dialog-content>
        {{content}}
    </div>
    <div md-dialog-actions>
      <button md-raised-button color='primary' type="button" (click)="onClick(true)">确定</button>
    </div>
  `,
  styles: []
})
export class MessageBoxComponent implements OnInit {
  title="";
  content="";
  constructor(@Inject(MD_DIALOG_DATA) private data,
    private dialogRef:MdDialogRef<MessageBoxComponent>) { }

  ngOnInit() {
    this.title=this.data.title;
    this.content=this.data.content;
  }
  
  onClick(result:boolean){
    this.dialogRef.close(result);
  }

}
