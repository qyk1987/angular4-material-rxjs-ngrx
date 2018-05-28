import { Component, OnInit,Inject,ChangeDetectionStrategy } from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { Campus } from '../../domain';
@Component({
  selector: 'app-invite-campus',
  templateUrl: './invite-campus.component.html',
  styleUrls: ['./invite-campus.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InviteCampusComponent implements OnInit {
  members:Campus[]=[];
  constructor(@Inject(MD_DIALOG_DATA) public data,
  private dialogRef:MdDialogRef<InviteCampusComponent>) { }

  ngOnInit() {
    this.members=[...this.data.members];
  }
  onClick(){
    this.dialogRef.close("l'm closing");
  }
  displayUser(user:{id:string;name:string}){
    return user?user.name:"";
  }

  onSubmit(ev:Event,{valid,value}){
    ev.preventDefault();
    if(!valid){
      return;
    }
    this.dialogRef.close(this.members);
  }

}


