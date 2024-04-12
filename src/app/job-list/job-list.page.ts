import { Component, OnInit } from '@angular/core';
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
import {NavigationExtras, Router} from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit {
  proccess : any;
  job:any;
  loading: any;
  jobNo:any= Array();
  searchKey='';
  searchResult:any = Array();
  from="vivek";
  to="nitin"
  text="this is testing for ShreeMGD pdf generation i am sending pdf to nitin jain for the testing perpose";
  pdfObj=null;
  
  constructor(private service :ShreeMGDServiceService,private router:Router,private platform : Platform,public Alertcontroller :AlertController,private file: File,
    private fileOpener: FileOpener,public loadingController: LoadingController) {
   this.platform.backButton.subscribeWithPriority(0,()=>{
    this.appExit();
  })
  
 //this.presentLoading();
  this.service.getAllJobs().subscribe((d=>{
      console.log("folder data : ",d);
      this.proccess = d;
      this.searchResult = d;
      console.log("search result",this.searchResult);
      d.forEach(element=>{
        this.jobNo.push(element.jobNo);
        console.log("jobNo",this.jobNo);
      })
     // this.dismiss();
      console.log("job : ",this.proccess)
    }));
    this.service.getAllJobsWhere('BHAGYALAXMI').subscribe(data=>{
      console.log("where",data);
    })
  }
  
  // async dismiss() {
   
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
    const alert = await this.Alertcontroller.create({
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
    this.proccess.forEach(element => {
      console.log("ele",element.PartyName);
      if(this.searchKey==''){
        this.searchResult=this.proccess;
      }else{
        console.log("in else",this.searchKey);
        if(element.jobName.toLowerCase().includes(this.searchKey.toLowerCase()) || element.jobNo.toLowerCase().includes(this.searchKey.toLowerCase()) || element.PartyName.toLowerCase().includes(this.searchKey.toLowerCase())){
          this.searchResult.push(element)
          console.log("search result",element.PartyName);
        }
      }
      
    });
  }
add(){
this.router.navigate(['/add-job']);
}
async delete(id){
  const alert = await this.Alertcontroller.create({
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
          this.service.deleteJob(id);
        }
      }
    ]

  });

 await alert.present();
  
 
}
view(data){
  // let url = {
  //   data: data,
  //   ids: this.jobNo
  // };
  window.localStorage.setItem('ids',JSON.stringify(this.jobNo));
  let navigationExtras: NavigationExtras = {
    queryParams: {
      special: JSON.stringify(data),
    }
  };
  this.router.navigate(['/edit-job'],navigationExtras);
  console.log("edit data : ",data);
}
generatePdf(data){
  // let navigationExtras: NavigationExtras = {
  //   queryParams: {
  //     special: JSON.stringify(data)
  //   }
  // };
  // this.router.navigate(['/job-pdf'],navigationExtras);
 
  this.job = data;
  this.createPDF();
}
  ngOnInit() {
  }

  createPDF(){

   // alert("called");
    //this.presentLoading('Creating PDF file...');
    let processTop = JSON.parse(this.job.topProcess);
    let olpt = [];
    processTop.forEach(element => {
      olpt.push(element.processName +" : "+ element.parameter); 
    });
    console.log("olpt",olpt);

    let proceeBottom = JSON.parse(this.job.bottomProcess);
    let olpb= [];
    proceeBottom.forEach(element => {
      olpb.push(element.processName +" : "+ element.parameter); 
    });
    let processTray = JSON.parse(this.job.trayProcess);
    let olptr = [];
    processTray.forEach(element => {
      olptr.push(element.processName +" : "+ element.parameter); 
    });
    let   docDefination ={
      content:[
        {text:'Shree MDG Print Solution',style:'header'},
        {text : "Job No.: "+this.job.jobNo ,alignment:'right'},
       {
        table:{
          widths:[175,175,175],
          border:[false,false,false,false],
          body:[
            
            ['','',''],
            ['','',''],
            ['Party Name : '+this.job.PartyName,'Party Job NO :'+this.job.jobid,'Date : '+this.job.DeliveryDate],
            ['Job Name : '+this.job.jobName,'Quantity :'+this.job.qty,'Size : '+this.job.paperSize],
            ['','',''],
            ['','Jobs To Be Perform',''],
            ['','',''],
            ['Top','Bottom','Tray'],
            ['','',''],
            [
              {
                ol:olpt
              },
              {
                ol:olpb           
              },{
                ol:olptr
              }
            ],
            ['','',''],
            ['','Die No : '+this.job.dieNo,''],
            ['','',''],
            ['Die Size Top','Die Size Bottom','Die Size Tray'],
            ['','',''],
            [this.job.dieSizeTop,this.job.dieSizeBottom,this.job.dieSizeTray],
            ['','',''],
            ['','Special Instruction',''],
            ['','',''],
            ['Top','Bottom','Tray'],
            ['','',''],
            [this.job.specialInstructionTop,this.job.specialInstructionBottom,this.job.specialInstructionTray],
            ['','',''],
            ['','Paper Size',''],
            ['','',''],
            ['Top','Bottom','Tray'],
            ['','',''],
            [this.job.paperSizeTop,this.job.paperSizeBottom,this.job.paperSizeTray],
            ['','',''],
            ['','Delivery Details',''],
            ['','',''],
            ['Top','Bottom','Tray'],
            ['','',''],
            ['Tempo No.: '+this.job.tempoNoTop,'Tempo No.: '+this.job.tempoNoBottom,'Tempo No.: '+this.job.tempoNoTray],
            ['Delivery Date :'+this.job.DeliveryDateTop,'Delivery Date :'+this.job.DeliveryDateBottom,'Delivery Date :'+this.job.DeliveryDateTray],
            ['Delivery Ch No.:'+this.job.DeliveryChNoTop,'Delivery Ch No.:'+this.job.DeliveryChNoBottom,'Delivery Ch No.:'+this.job.DeliveryChNoTray],
            ['','',''],
            ['','Final Quantity',''],
            ['','',''],
            ['Top','Bottom','Tray'],
            ['','',''],
            [this.job.FinalQtyTop,this.job.FinalQtyBottom,this.job.FinalQtyTray],
            ['','Print Image',''],
          ]
        },
        
        layout:'noBorders'
       },
       {
        // if you specify both width and height - image will be stretched
        image: this.job.image,
        width: 150,
        height: 150
      }
        
        // {text:'From',style:'Subheader'},
        // {text:this.from},
        // {text:'to',style:'Subheader'},
        // {text:this.to},
        // {text:this.text,style:'story',margin:[0,20,0,20]},
        // {
        //   ul:[
        //     'Vivek',
        //     'Gupta',
        //     'Hello'
        //   ]
        // }

      ],
      styles:{
        header:{
          fontSize:25,
          bold:true,
          alignment:'center',
        },
        subheader:{
          fontSize:14,
          bold:true,
          margin:[0,15,0,0]
        },
        story:{
          italic:true,
          alignment:'center',
          width:'50%'
        }
      }
    }
    //alert(JSON.stringify(docDefination));
    this.pdfObj = pdfMake.createPdf(docDefination);
    this.downloadPDF();
    // this.loading.dismiss();
  }
  downloadPDF(){
    //alert("download pdf");
    if(this.platform.is('cordova')){
     
      this.pdfObj.getBuffer((buffer)=>{
        var utf8 = new Uint8Array(buffer);
        var binaryArray = utf8.buffer;
       
        var blob= new Blob([binaryArray],{type:'application/pdf'});
        this.file.writeFile(this.file.dataDirectory,'myletter.pdf',blob,{replace:true}).then(fileEntry=>{
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf','application/pdf');
        }).catch(err=>{
          alert("error : "+err);
        })
      });
    }else{
      this.pdfObj.download();
    }
  }

}
