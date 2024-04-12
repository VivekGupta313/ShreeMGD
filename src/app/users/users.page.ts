import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterEvent } from '@angular/router';
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
import { MenuController ,AlertController,Platform, LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users:any;
  searchKey = '';
  searchResult:any;
  constructor(private router: Router,private service :ShreeMGDServiceService,private menu:MenuController,private alertController:AlertController,private platform:Platform,public loadingController: LoadingController) {
    this.platform.backButton.subscribeWithPriority(0,()=>{
      this.appExit();
    })
   // this.presentLoading();
    this.service.getAllUsers().subscribe(d=>{
     this.users = d;
      this.searchResult=d;
     console.log("users: ",d);
 //     this.dismiss();
    })
   }
  //  async dismiss() {
   
  //   const loader = this.loadingController.getTop();
  //   (await loader).parentNode.removeChild(await loader);
  // }
  // async presentLoading() {
  //    const loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Please wait...',
    
  //   });
  //   return await loading.present();
  // }
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
  search(data){
    //console.log("search key",this.searchKey);
    this.searchResult = [];
    this.users.forEach(element => {
    //  console.log("ele",element);
      if(this.searchKey==''){
        this.searchResult=this.users;
      }else{
        console.log("in else");
        if(element.name.toLowerCase().includes(this.searchKey.toLowerCase())){
          this.searchResult.push(element)
          //console.log("search result",element.name);
        }
      }
      
    });
  }
   add(){
     this.router.navigate(['/add-users']);
   }
   view(data){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(data)
      }
    };
    this.router.navigate(['/edit-userd'],navigationExtras);
   }
   async delete(id){
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
            this.service.deleteUser(id);
          }
        }
      ]
  
    });
  
   await alert.present();
    
  
   }
  ngOnInit() {
  }

}
