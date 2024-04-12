import { Component, OnInit } from '@angular/core';
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
import {Router} from '@angular/router'
import { from } from 'rxjs';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.page.html',
  styleUrls: ['./add-users.page.scss'],
})
export class AddUsersPage implements OnInit {
  selectProcess:any;
  process:any;
  filters: any = Array();
  constructor(private service :ShreeMGDServiceService,private router:Router) { 
    this.service.getAllprocesses().subscribe(d=>{
      this.process = d;
      for(var i = 0;i<d.length;i++){
        this.filters[i]=false;
      }
      console.log("filter : ",this.filters);
      console.log("process : ",d);
    })
  }
  Add(form){
   // console.log("user form",form.value);
    let access = form.value.process;
   // console.log("access : ",JSON.stringify(access));
    let user = {
      access:JSON.stringify(access),
      name : form.value.name,
      password: form.value.pass,
      role:0,
      userId: form.value.userId
    }
    console.log("user form data",user);
    this.service.addUser(user);
    this.back();
  }
  back(){
    this.router.navigate(['/users']);
  }
  
  ngOnInit() {
  //  this.userForm =  this.formBuilder.group({
  //    name :['',[]]
  //  })
  }

}
