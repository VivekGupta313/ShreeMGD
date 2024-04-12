import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, Platform } from '@ionic/angular';

import { ShreeMGDServiceService } from '../shree-mgdservice.service';

@Component({
  selector: 'app-job-done',
  templateUrl: './job-done.page.html',
  styleUrls: ['./job-done.page.scss'],
})
export class JobDonePage implements OnInit {
  segmentModel = "top";
  title:string;
  access:any;
  job : any;
  selected:any = Array();
  selectedBottom = Array();
  selectedTray = Array();
  selectedAll = Array();
  single:any ={
    id:'',
    jobName :'',
    parameter:''
  }
  constructor(private service : ShreeMGDServiceService,private menu:MenuController,private alertController:AlertController,private platform:Platform,public loadingController: LoadingController) {

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
   valuechange(){
    this.selected = Array();
   this.selectedBottom = Array();
   this.selectedTray = Array();
   this.selectedAll = Array();
   this.job.forEach(ele=>{
     console.log("top",ele.topNext);
     console.log("bottom",ele.bottomNext);
     console.log("tray",ele.trayNext);
    if(ele.topNext=='finished'){
      let sing= {
        'id' : ele.id,
        'jobName': ele.jobName,
        'jobNo':ele.jobNo,
        'PartName':ele.PartyName,
      
      }
     
      this.selected.push(sing);
     }
     if(ele.bottomNext=='finished'){
      let sing= {
        'id' : ele.id,
        'jobName': ele.jobName,
        'jobNo':ele.jobNo,
        'PartName':ele.PartyName,
      
      }
     
      this.selectedBottom.push(sing);
     }
     if(ele.trayNext=='finished'){
      let sing= {
        'id' : ele.id,
        'jobName': ele.jobName,
        'jobNo':ele.jobNo,
        'PartName':ele.PartyName,
      
      }
     
      this.selectedTray.push(sing);
     }
     if(ele.topNext=="finished" && ele.bottomNext=="finished" && ele.trayNext=="finished"){
      let sing= {
        'id' : ele.id,
        'jobName': ele.jobName,
        'jobNo':ele.jobNo,
        'PartName':ele.PartyName,
      
      }
      this.selectedAll.push(sing);
     }
    });
   console.log("selected : ",this.selected);
   console.log("selected bottom : ",this.selectedBottom);
   console.log("selected tray : ",this.selectedTray);
   console.log("selected All",this.selectedAll);
  }

  segmentChanged(event){
    console.log(this.segmentModel);
    this.segmentModel = event.detail.value; 
    console.log(event.detail.value);
  }
  ngOnInit() {
  }

}
