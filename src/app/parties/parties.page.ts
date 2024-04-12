import { Component, OnInit } from '@angular/core';
import {  NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, Platform } from '@ionic/angular';
import { ShreeMGDServiceService } from '../shree-mgdservice.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.page.html',
  styleUrls: ['./parties.page.scss'],
})
export class PartiesPage implements OnInit {
  paries:any;
  searchResult:any;
  searchKey='';
  constructor(private router: Router,private service :ShreeMGDServiceService,private menu:MenuController,private alertController:AlertController,private platform:Platform,public loadingController: LoadingController) { 
    this.platform.backButton.subscribeWithPriority(0,()=>{
      this.appExit();
    })
   // this.presentLoading();
    this.service.getAllParties().subscribe(d=>{
     this.paries = d;
      this.searchResult=d;
     console.log("parties: ",d);
 //     this.dismiss();
    })
   }

   async appExit(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Are You Sure! you want to exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           
          }
        }, {
          text: 'Okay',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
  
    });
  
   await alert.present();
  }

  ngOnInit() {
  }
  add(){
    this.router.navigate(['/add-parties']);
  }
  view(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(data)
      }
    };
    this.router.navigate(['/edit-parties'],navigationExtras);
   }
   filter(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: data.name
      }
    };
    this.router.navigate(['/filer-page'],navigationExtras);
   }
   async delete(id){
     console.log("delete id",id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are You Sure! you want to Delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
           
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.service.deleteParties(id);
          }
        }
      ]
  
    });
  
   await alert.present();
    
  
   }

   search(data){
    //console.log("search key",this.searchKey);
    this.searchResult = [];
    this.paries.forEach(element => {
      console.log("ele",element);
      if(this.searchKey==''){
        this.searchResult=this.paries;
      }else{
        console.log("in else",this.searchKey);
        if(element.name.toLowerCase().includes(this.searchKey.toLowerCase()) ){
        
          this.searchResult.push(element)
          console.log("search result",element.name);
        }
      }
      
    });
  }
}
