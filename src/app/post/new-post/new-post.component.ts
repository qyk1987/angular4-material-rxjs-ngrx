import { Component, OnInit,Inject ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { District, Role,Campus, Post, Spot } from '../../domain';
import * as fromRoot from '../../reducers';
import * as drtActions from '../../actions/district.action';
import * as camActions from '../../actions/campus.action';
import {Store} from '@ngrx/store';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NewPostComponent implements OnInit {
  title="";
  form:FormGroup;
  roles$:Observable<Role[]>;
  posts$:Observable<Post[]>;
  tempposts:Post[];
  districts$:Observable<District[]>;
  campus$:Observable<Campus[]>;
  spots$:Observable<Spot[]>;
  constructor(
    @Inject(MD_DIALOG_DATA) public data,
    private dialogRef:MdDialogRef<NewPostComponent>,
    private fb:FormBuilder,
    private store$:Store<fromRoot.State>,
    private cd:ChangeDetectorRef, 
  ) { 
    this.roles$=this.store$.select(fromRoot.getRoles);
    this.districts$=this.store$.select(fromRoot.getDistricts);
    this.posts$=this.store$.select(fromRoot.getPosts);
    //console.log(this.data.post);
  }

  ngOnInit() {
    if(this.data.post){//对表单进行初始化
      //console.log(this.data.post);
      this.form=this.fb.group({
       
        PostName:[this.data.post.PostName,Validators.required],
        RoleId:[this.data.post.RoleId,Validators.required],
        SupperId:[this.data.post.SupperId],
        DistrictId:[this.data.post.DistrictId,Validators.required],
        CampusId:[this.data.post.CampusId],
        users:[this.data.post.users,Validators.required],
        SpotId:[this.data.post.SpotId],
        State:[this.data.post.State],
      });
      this.changePost(this.data.post.RoleId);
      if(this.data.post.CampusId){
        this.campus$=this.store$.select(fromRoot.getCampuses).map(c=>c.filter(cm=>cm.DistrictID===this.data.post.DistrictId))
      }else{
        this.campus$=null;
      }
      if(this.data.post.SpotId){
        this.spots$=this.store$.select(fromRoot.getSpots).map(c=>c.filter(cm=>cm.CampusID===this.data.post.CampusId))
      }else{
        this.spots$=null;
      }
      
      this.title="编辑岗位";
    }else{
      this.form=this.fb.group({
        
         PostName:['',Validators.required],
         RoleId:['',Validators.required],
         SupperId:[],
         DistrictId:['',Validators.required],
         users:['',Validators.required],
         CampusId:[],
         SpotId:[],
       });
       this.changePost("11");
      //this.campus$=this.store$.select(fromRoot.getCampuses).map(c=>c.filter(cm=>cm.DistrictID===this.data.post.DistrictId))
      this.title="新增岗位";
    } 
    const role=this.form.get('RoleId');
    const district=this.form.get('DistrictId');
    const campus=this.form.get('CampusId');
    const spot=this.form.get('SpotId');

    role.valueChanges
    .subscribe(val=>{
      this.changePost(val);
    })
    district.valueChanges
    .subscribe(val=>{
      this.campus$=this.store$.select(fromRoot.getCampuses).map(c=>c.filter(cm=>cm.DistrictID===val))
    })
    campus.valueChanges
    .subscribe(val=>{
      this.spots$=this.store$.select(fromRoot.getSpots).map(c=>c.filter(cm=>cm.CampusID===val))
    })
  }
  onSubmit({value,valid},ev:Event){
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }
  changePost(val){
    this.posts$.take(1)
    .subscribe(posts=>{
      switch(val){
        case '00f76f26-ab8d-4e03-9cfd-23d706f4060f':{
          this.tempposts=posts.filter(p=>p.RoleId==='173c0c90-c96b-45d7-9f6e-a1d3300e3f5e');
        }break;
        case '12fd21b9-4eac-4ae9-a6f8-d8c085f8ddd4':{
          this.tempposts=posts.filter(p=>p.RoleId==='38694238-0dd0-44b6-8fe9-e83d310a4f59');
        }break;
        case '30894d59-fd10-466d-88ad-7bc9e1772c4f':case '38694238-0dd0-44b6-8fe9-e83d310a4f59':case 'BB2B2A55-2B3B-42CC-A299-11DF62BEE19A':{
          this.tempposts=posts.filter(p=>p.RoleId==='00f76f26-ab8d-4e03-9cfd-23d706f4060f');
        }break;
        case '88305d4e-4ca1-45c7-a2cb-a9b9896b17d2':{
          this.tempposts=posts.filter(p=>p.RoleId==='00f76f26-ab8d-4e03-9cfd-23d706f4060f'||p.RoleId==='173c0c90-c96b-45d7-9f6e-a1d3300e3f5e');
        }break;
        default:this.tempposts=posts;
      }
      //console.log(val);
      //console.log(this.tempposts);
      this.cd.markForCheck();
      
    })
  }
}
