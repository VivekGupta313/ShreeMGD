import { Component, OnInit } from '@angular/core';
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
import { MenuController ,AlertController,Platform, LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-process-status',
  templateUrl: './process-status.page.html',
  styleUrls: ['./process-status.page.scss'],
})
export class ProcessStatusPage implements OnInit {

  segmentModel = "top";
  title:string;
  access:any;
  job : any;
  selected:any = Array();
  selectedBottom = Array();
  selectedTray = Array();
  single:any ={
    id:'',
    jobName :'',
    parameter:''
  }
  constructor(private service : ShreeMGDServiceService,private menu:MenuController,private alertController:AlertController,private platform:Platform,public loadingController: LoadingController) {
    //this.access = JSON.parse(window.localStorage.getItem('UserAccess'));
    this.platform.backButton.subscribeWithPriority(0,()=>{
      this.appExit();
    })
    this.service.getAllprocesses().subscribe(p=>{
      this.access = p;
      this.title =  p[0].name;
      console.log("title : ",this.title);
     // this.presentLoading();
      this.service.getAllJobs().subscribe(d=>{
        this.job = d;
        this.valuechange();
      //  this.dismiss();
      });
      console.log("process : ",p);
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
   valuechange(){
     this.selected = Array();
    this.selectedBottom = Array();
    this.selectedTray = Array();
    this.job.forEach(ele=>{
      console.log("ele : ",ele);
    // if(ele.topCurrent == this.title){
        let p = JSON.parse(ele.topProcess);
      
        console.log("single",this.single);
        p.forEach(proc => {
         console.log("proc top",proc.processName);
         if(proc.processName == this.title && proc.status =='pending'){
          let sing= {
            'id' : ele.id,
            'jobName': ele.jobName,
            'jobNo':ele.jobNo,
            'PartName':ele.PartyName,
            'parameter' : proc.parameter,
            'qty' : ele.qtyTop,
             'paperSize' : ele.paperSizeTop,
            'process' : p,
            'image' : ele.image
          }
         
          this.selected.push(sing);
         }
       });
        // this.single.parameter = 
         //
    // }
     //if(ele.bottomCurrent == this.title){
      
      let pb = JSON.parse(ele.bottomProcess);
      console.log('pb : ',pb);
      pb.forEach(proc => {
        console.log("proc bottom",proc.processName);
        if(proc.processName == this.title && proc.status =='pending'){
          let sing= {
            'id' : ele.id,
            'jobName': ele.jobName,
            'jobNo':ele.jobNo,
            'PartName':ele.PartyName,
            'parameter' : proc.parameter,
            'qty' : ele.qtyBottom,
             'paperSize' : ele.paperSizeTop,
            'process' : pb,
            'image' : ele.image
          }
        
         this.selectedBottom.push(sing);
        }
      });
     
     //}
    //if(ele.trayCurrent == this.title){
      let pt = JSON.parse(ele.trayProcess);
      console.log('pt : ',pt);
      pt.forEach(proc => {
        console.log("proc tray",proc.processName);
        if(proc.processName == this.title && proc.status =='pending'){
          let sing= {
            'id' : ele.id,
            'jobName': ele.jobName,
            'jobNo':ele.jobNo,
            'PartName':ele.PartyName,
            'parameter' : proc.parameter,
            'qty' : ele.qtyTray,
             'paperSize' : ele.paperSizeTop,
            'process' : pt,
            'image' : ele.image
          }        
         this.selectedTray.push(sing);
        }
      });
     //}
    })
    console.log("selected : ",this.selected);
    console.log("selected bottom : ",this.selectedBottom);
    console.log("selected tray : ",this.selectedTray);
   }
   async viewImage(image){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Image',
      message:  `<img src=`+image+` alt="g-maps" style="border-radius: 2px">`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            //this.updateJob(id);
          }
        }
      ]
    });

    await alert.present();

   }
   changeData(data){
     this.title = data.detail.value;
     this.valuechange();
     console.log("change",data.detail.value);
   }
   done(id){
    console.log("selected id : ",id);
    for(let j = 0 ; j<this.job.length;j++){
      if(this.job[j].id == id){
        let proc = JSON.parse(this.job[j].topProcess);
        console.log("selected  ele : ",proc);
       
        for(let i=0;i<proc.length;i++){
          console.log(" proc :",proc[i]);
          if(this.job[j].topCurrent == proc[i].processName && proc[i].status=='pending'){
            console.log("in if");
            console.log("match proc :",proc[i].status);
            proc[i].status ="done";
            if(i<proc.length-1){
              this.job[j].topCurrent = proc[i+1].processName;
            }else {
              this.job[j].topNext = "finished";
            }
            break;
          }
        }
        console.log("after loop",proc);
       this.job[j].topProcess = JSON.stringify(proc);
       this.service.updateJob(this.job[j],id);
      
      }
    }
    console.log("after job",this.job);

   }
   segmentChanged(event){
    console.log(this.segmentModel);
    this.segmentModel = event.detail.value; 
    console.log(event.detail.value);
  }
  ngOnInit() {
  }
}
