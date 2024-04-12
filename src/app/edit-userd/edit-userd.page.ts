import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
@Component({
  selector: 'app-edit-userd',
  templateUrl: './edit-userd.page.html',
  styleUrls: ['./edit-userd.page.scss'],
})
export class EditUserdPage implements OnInit {
  user:any;
  userForm : FormGroup;
  selectedProcess:any;
  process:any=Array();
  isSubmitted = false;
  constructor(private router: Router,private route: ActivatedRoute,public formBuilder: FormBuilder,private service :ShreeMGDServiceService) { 
    this.route.queryParams.subscribe(param=>{
      if (param && param.special) {
        this.user = JSON.parse(param.special);
        console.log("param : ",this.user);
        
        console.log("access : ",this.selectedProcess);
        this.userForm = this.formBuilder.group({
          name: [this.user.name,[Validators.required]],
          userId:[this.user.userId,[Validators.required]],
          process:[JSON.parse(this.user.access),[Validators.required]],
          password : [this.user.password,[Validators.required]]
        })
      }
    })
    this.service.getAllprocesses().subscribe(d=>{
      d.forEach(e=>{
        console.log("process : ",e.name);
          this.process.push(e.name);
      })
      this.selectedProcess = JSON.parse(this.user.access);
      console.log("access : ",this.selectedProcess);
      console.log("process : ",this.process);
    })
   

   
  }
  get errorControl() {
    return this.userForm.controls;
  }
  Add(){
    this.isSubmitted = true;
    if (!this.userForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.userForm.value)
      console.log("id",this.user)
      let user = {
        access:JSON.stringify(this.userForm.value.process),
        name : this.userForm.value.name,
        password: this.userForm.value.password,
        role:0,
        userId: this.userForm.value.userId
      }
      console.log("user form data",user);
      this.service.updateUser(user,this.user.id);
      this.router.navigate(['/users']);
    }
  }
  ngOnInit() {
  }
  back(){
    this.router.navigate(['/users']);
  }
}
