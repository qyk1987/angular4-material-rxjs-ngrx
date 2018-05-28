import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material";
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import {Store} from '@ngrx/store';
import { RoleList, Duty ,dis,cam,spt} from '../../domain';
@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss']
})
export class ChangeRoleComponent implements OnInit {

  title="切换角色";
  list:RoleList;
  select:Duty;
  filterList:RoleList;
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef:MdDialogRef<ChangeRoleComponent>,
    private store$:Store<fromRoot.State>,
    private cd:ChangeDetectorRef
  ) { 
   
      
  }

  ngOnInit() {
    this.store$.select(fromRoot.getRoleList)
    .withLatestFrom(this.store$.select(fromRoot.getSelectedPost))
    .take(1)
    .subscribe(([list,duty])=>{
      this.list=list;
      this.select={...duty};
      this.filterList=checkSelected(list,duty)});
   
  }

  onClickDistrict(id){
    if(this.select.DistrictId!==id){
      this.select.DistrictId=id;
      this.select.CampusId=null;
      this.select.SpotId=null;
      this.select.Id=null;
    }
   this.filterList= checkSelected(this.list,this.select);
  }

  onClickCampus(id){
    //console.log(this.select);
    if(this.select.CampusId!==id){
      this.select.CampusId=id;
      this.select.SpotId=null;
      this.select.Id=null;
    }else{
      this.select.CampusId=null;
      this.select.SpotId=null;
      this.select.Id=null;
    }
   this.filterList= checkSelected(this.list,this.select);
  }

  onClickSpot(id){
    if(this.select.SpotId!==id){
      this.select.SpotId=id;
      this.select.Id=null;
    }else{
      this.select.SpotId=null;
      this.select.Id=null;
    }
   this.filterList= checkSelected(this.list,this.select);
  }
  

  onClickPost(id){
    if(this.select.Id!==id){
      this.select.Id=id;
    }
   this.filterList= checkSelected(this.list,this.select);
  }

  launchSelectRole(){
    this.store$.select(fromRoot.getAuth)
      .take(1)
      .subscribe(auth=>{
        if(auth.currentDutyId!==this.select.Id){
          this.store$.dispatch(new actions.SelectRoleAction(this.select));
          this.dialogRef.close(true);
        }else{
          this.dialogRef.close(false);
        }
      })
    
    
  }
}


function checkSelected(list:RoleList,duty:Duty):RoleList {
  const filterList:RoleList={
    districts:[],
    campus:[],
    spots:[],
    posts:[] 
  };
  filterList.districts=list.districts;
  filterList.districts.forEach(r=>{
       if(r.id===duty.DistrictId){
         r.selected=true;
       }else{
         r.selected=false;
       }
  });
  filterList.campus=list.campus.filter(c=>c.disId===duty.DistrictId);
  filterList.campus.forEach(r=>{
   if(r.id===duty.CampusId){
     r.selected=true;
   }else{
    r.selected=false;
  }
  });
 filterList.spots=list.spots.filter(c=>c.camId===duty.CampusId);
 filterList.spots.forEach(r=>{
     if(r.id===duty.SpotId){
       r.selected=true;
     }else{
      r.selected=false;
    }
    });
 filterList.posts=list.posts.filter(p=>p.DistrictId===duty.DistrictId&&p.CampusId===duty.CampusId&&p.SpotId===duty.SpotId);
 filterList.posts.forEach(p=>{
                         if(p.Id===duty.Id){
                           p.selected=true;
                         }else{
                          p.selected=false;
                        }
                       });
 return filterList;
}


