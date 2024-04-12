import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShreeMGDServiceService } from '../shree-mgdservice.service';

@Component({
  selector: 'app-edit-parties',
  templateUrl: './edit-parties.page.html',
  styleUrls: ['./edit-parties.page.scss'],
})
export class EditPartiesPage implements OnInit {
  party:any;
  errName=false;
  errMobile=false;
  errAddress=false;
  errGst=false;
  userForm : FormGroup;
  isSubmitted=false;
  partyId:any;
  constructor(private router: Router,private route: ActivatedRoute,public formBuilder: FormBuilder,private service :ShreeMGDServiceService) { 
    this.route.queryParams.subscribe(param=>{
      if (param && param.special) {
        this.party = JSON.parse(param.special);
        console.log("param : ",this.party);
        this.userForm = this.formBuilder.group({
          name: [this.party.name],
          mobile:[this.party.mobile],
          address:[this.party.address],
          gstNo : [this.party.gstnO]
        })
        console.log("edit data",this.userForm.value);
      }});
  }
  Add(){
    this.isSubmitted = true;
    console.log(this.userForm.value)
    this.errName=false;
    this.errMobile=false;
    this.errAddress = false;
    this.errGst = false;
    let isvalied=true;
    //[Validators.required,Validators.pattern('[0-9]{10}')]
    //,[Validators.required,Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]
    let validMobile = /^\d{10}$/;
    let validGst =  /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;
    if (this.userForm.value.name =='') {
      this.errName=true;
      isvalied = false;
      console.log('Please provide all the required values!',this.userForm.valid);
     // return false;
    } 
    if(!this.userForm.value.mobile.match(validMobile)){
      isvalied = false;
      this.errMobile=true;
      //return false; 
    }
    if(this.userForm.value.address== ''){
      isvalied = false;
      this.errAddress = true;
      //return false;
    }
    console.log("valid ",validGst);
    if(!this.userForm.value.gstNo.match(validGst)){
      isvalied = false;
      this.errGst = true;
      //return false;
    }
    if(isvalied) {
      console.log(this.userForm.value)
      console.log("id",this.party)
      let user = {
       
        name : this.userForm.value.name,
        mobile: this.userForm.value.mobile,
        address: this.userForm.value.address,
        gstnO: this.userForm.value.gstNo
      }
      console.log("user form data",user);
      console.log("party id",this.party.id);
      this.service.updateParties(user,this.party.id);
      this.router.navigate(['/parties']);
    }
  }
  back(){
    this.router.navigate(['/parties']);
  }
  filter(data){
    console.log("data",data);
  }
  ngOnInit() {
  }

}
