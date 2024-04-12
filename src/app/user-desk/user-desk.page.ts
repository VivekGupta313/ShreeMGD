import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-desk',
  templateUrl: './user-desk.page.html',
  styleUrls: ['./user-desk.page.scss'],
})
export class UserDeskPage implements OnInit {
  segmentModel = "top";
  title:string;
  access:any;
  job : any;
  selected:any = Array();
  selectedBottom = Array();
  selectedTray = Array();
  processTop = Array()
  processBottom = Array();
  processTray = Array();
  single:any ={
    id:'',
    jobName :'',
    parameter:''
  }
  constructor(private menu: MenuController,private service : ShreeMGDServiceService,public alertController: AlertController) {
    this.access = JSON.parse(window.localStorage.getItem('UserAccess'));
    console.log(this.access);
    this.title = this.access[0];
    this.service.getAllJobs().subscribe(d=>{
      this.job = d;
      this.valuechange();
    });
   }
   
   valuechange(){
     this.selected = Array();
    this.selectedBottom = Array();
    this.selectedTray = Array();
    console.log("job",this.job);
    this.job.forEach(ele=>{
      console.log("ele : ",ele);
     if(ele.topCurrent == this.title){
        let p = JSON.parse(ele.topProcess);
        this.processTop = p;
        console.log("single",this.single);
        p.forEach(proc => {
         console.log("proc",proc.parameter);
         if(proc.processName == this.title && proc.status =='pending'){
           let sing= {
             'id' : ele.id,
             'jobName': ele.jobName,
             'jobNo':ele.jobNo,
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
     }
     if(ele.bottomCurrent == this.title){
      
      let pb = JSON.parse(ele.bottomProcess);
      console.log('pb : ',pb);
      this.processBottom = pb;
      pb.forEach(proc => {
        console.log("proc",proc.parameter);
        if(proc.processName == this.title && proc.status =='pending'){
          let sing= {
            'id' : ele.id,
            'jobName': ele.jobName,
            'jobNo':ele.jobNo,
            'parameter' : proc.parameter,
            'qty' : ele.qtyBottom,
             'paperSize' : ele.paperSizeTop,
            'process' : pb,
            'image' : ele.image
          }
        
         this.selectedBottom.push(sing);
        }
      });
     
     }
     if(ele.trayCurrent == this.title){
      let pt = JSON.parse(ele.trayProcess);
      console.log('pt : ',pt);
      this.processTray = pt;
      pt.forEach(proc => {
        console.log("proc",proc.parameter);
        if(proc.processName == this.title && proc.status =='pending'){
          let sing= {
            'id' : ele.id,
            'jobName': ele.jobName,
            'jobNo':ele.jobNo,
            'parameter' : proc.parameter,
            'qty' : ele.qtyTray,
             'paperSize' : ele.paperSizeTop,
            'process' : pt,
            'image' : ele.image
          }
          console.log(sing);
         this.selectedTray.push(sing);
        }
      });
     }
    })
    console.log("selected : ",this.selected);
    console.log("selected bottom : ",this.selectedBottom);
    console.log("selected tray : ",this.selectedTray);
   }
   changeData(data){
     this.title = data.detail.value;
     this.valuechange();
     console.log("change",data.detail.value);
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
   async done(id,type){
    console.log("selected id : ",id);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure?',
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
            this.updateJob(id,type);
          }
        }
      ]
    });

    await alert.present();

   }
   updateJob(id,type){
     
    for(let j = 0 ; j<this.job.length;j++){
      if(this.job[j].id == id){
        let proc:any;
        if(type=='top'){
           proc = JSON.parse(this.job[j].topProcess);
        console.log("selected  ele : ",proc);
        }else if(type== 'bottom'){
          proc = JSON.parse(this.job[j].bottomProcess)
        } else if (type=='tray'){
          proc = JSON.parse(this.job[j].trayProcess)
        }       
        for(let i=0;i<proc.length;i++){
          console.log(" proc :",proc[i]);
          if(type=='top'){
            console.log("in top");
            if(this.job[j].topCurrent == proc[i].processName && proc[i].status=='pending'){
              
              console.log("match proc :",proc[i].status);
              proc[i].status ="done";
              if(i<proc.length-1){
                this.job[j].topCurrent = proc[i+1].processName;
              }else {
                this.job[j].topNext = "finished";
              }
              this.job[j].topProcess = JSON.stringify(proc);
              break;
            }
          }else if(type=='bottom'){
            console.log("in botoom",this.job);
            if(this.job[j].bottomCurrent == proc[i].processName && proc[i].status=='pending'){
              
              console.log("match proc :",proc[i].status);
              proc[i].status ="done";
              if(i<proc.length-1){
                this.job[j].bottomCurrent = proc[i+1].processName;
              }else {
                this.job[j].bottomNext = "finished";
              }
              this.job[j].bottomProcess = JSON.stringify(proc);
              break;
            }
          }else if(type=='tray'){
            console.log("in tray");
            console.log("in tray proc",proc[i].processName);
            console.log("in tray current",this.job[j].trayCurrent);
            if(this.job[j].trayCurrent == proc[i].processName && proc[i].status=='pending'){
              
              console.log("match proc :",proc[i].status);
              proc[i].status ="done";
              if(i<proc.length-1){
                this.job[j].trayCurrent = proc[i+1].processName;
              }else {
                this.job[j].trayNext = "finished";
              }
              this.job[j].trayProcess = JSON.stringify(proc);
              break;
            }
          }
          
        }
        console.log("after loop",proc);
        console.log("final job",this.job[j]);
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
    
    this.menu.enable(false);
  }
  
}
