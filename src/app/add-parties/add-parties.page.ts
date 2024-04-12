import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShreeMGDServiceService } from '../shree-mgdservice.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-add-parties',
  templateUrl: './add-parties.page.html',
  styleUrls: ['./add-parties.page.scss'],
})
export class AddPartiesPage implements OnInit {

  constructor(private service :ShreeMGDServiceService,private router:Router) { }
  Add(form){
     console.log("PARTY form",form.value);
    // let access = form.value.process;
     //console.log("access : ",JSON.stringify(access));
     let user = {
      
       name : form.value.name,
       mobile: form.value.mobile,
       address:form.value.address,
       gstnO: form.value.gst
     }
      console.log("party form data",user);
     this.service.addParties(user);
     this.back();
   }
  ngOnInit() {
  }
  back(){
    this.router.navigate(['/parties']);
  }
}
