import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
import { MenuController ,AlertController,Platform} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  proccess : any;
  searchResult:any;
  editId:string;
  loading:any;
  searchKey='';
  constructor(private activatedRoute: ActivatedRoute,private service :ShreeMGDServiceService,private menu:MenuController,private alertController:AlertController,private platform:Platform,public loadingController: LoadingController) { 
    this.platform.backButton.subscribeWithPriority(0,()=>{
      this.appExit();
    })
    this.menu.enable(true);
 //   let load = this.presentLoading();
     this.service.getAllprocesses().subscribe((d=>{
      console.log("folder data : ",d);
      this.proccess = d;
      this.searchResult = d;
      //this.dismiss();
      
    }));
  }
  // async dismiss() {
   
  //   const loader = this.loadingController.getTop();
  //   console.log(loader);
  //   (await loader).parentNode.removeChild(await loader);
  // }
  // async presentLoading() {
  //    this.loading = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Please wait...',
    
  //   });
  //   return await this.loading.present();
  // }
  async appExit(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'exit App',
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
  async view(data){
    this.editId = data.id;
    console.log(data.id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit Process',
      inputs: [
        {
          name: 'process',
          type: 'text',
          placeholder: 'enter process name',
          value : data.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.editProcess(alertData.process,this.editId);
          }
        }
      ]
    });
    await alert.present();
  }
  editProcess(name,id){
   let data = {
      name : name,
      parameter : '{}',
      subProcess :'{}'
    }
    this.service.updateProcess(data,id);
  }
  async delete(id){
    //console.log("delete",id);
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
            this.service.deleteProcess(id);
          }
        }
      ]
  
    });
  
   await alert.present();
    
  }
  search(data){
    //console.log("search key",this.searchKey);
    this.searchResult = [];
    this.proccess.forEach(element => {
    //  console.log("ele",element);
      if(this.searchKey==''){
        this.searchResult=this.proccess;
      }else{
        console.log("in else");
        if(element.name.toLowerCase().includes(this.searchKey.toLowerCase())){
         // alert("match :"+JSON.stringify(element));
          this.searchResult.push(element)
          //console.log("search result",element.name);
        }
      }
      
    });
  }
  async addProcess(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add Process',
      inputs: [
        {
          name: 'process',
          type: 'text',
          placeholder: 'enter process name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.insertProcess(alertData.process)
           // console.log('Confirm Ok',);
          }
        }
      ]
    });

    await alert.present();
  }
  insertProcess(nm){
    let data = {
      name : nm,
      parameter : '{}',
      subProcess :'{}'
    }
    this.service.addProcess(data);
  }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
