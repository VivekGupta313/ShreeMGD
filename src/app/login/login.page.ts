import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { from } from 'rxjs';
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userId:any="";
  Pass : any = "";
  constructor( private menu: MenuController,private service : ShreeMGDServiceService,private r : Router) { }

  ngOnInit() {
    this.menu.enable(false);
  }
  CheckLogin(form){
    const data =this.service.login(form.value);

    data.then(d=>{
      console.log(" Login data : ",d);
      if(d.length >0){
       if(d[0].role==0){
         window.localStorage.setItem("UserAccess",d[0].access);
        this.r.navigate(['/user-desk'])
       }else{
        this.r.navigate(['/Home'])
       }
        //
      }else{
        alert("invalid cridentials! please try again");
      }
    })
  }
}
