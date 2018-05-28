import { Component, OnInit,Inject,ChangeDetectionStrategy } from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { Product } from '../../domain';
@Component({
  selector: 'app-invite-product',
  templateUrl: './invite-product.component.html',
  styleUrls: ['./invite-product.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InviteProductComponent implements OnInit {
  members:Product[]=[];
  constructor(@Inject(MD_DIALOG_DATA) public data,
  private dialogRef:MdDialogRef<InviteProductComponent>) { }

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


