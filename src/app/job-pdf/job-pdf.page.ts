import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, Platform } from '@ionic/angular';

import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-job-pdf',
  templateUrl: './job-pdf.page.html',
  styleUrls: ['./job-pdf.page.scss'],
})
export class JobPdfPage implements OnInit {
  job:any;
  loading: any;
  from="vivek";
  to="nitin"
  text="this is testing for ShreeMGD pdf generation i am sending pdf to nitin jain for the testing perpose";
  pdfObj=null;
  constructor(public router : Router,private route: ActivatedRoute,public loadingCtrl: LoadingController,
    private file: File,
    private fileOpener: FileOpener,private plfm : Platform) { 
    this.route.queryParams.subscribe(param=>{
      if (param && param.special) {
        this.job = JSON.parse(param.special);
        console.log("param : ",this.job);
        this.createPDF();
      }
    });

  }
  async presentLoading(msg) {
    const loading = await this.loadingCtrl.create({
      message: msg
    });
    return await loading.present();
  }
  createPDF(){


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
            [this.job.FinalQtyTop,this.job.FinalQtyBottom,this.job.FinalQtyTray]
          ]
        },
        layout:'noBorders'
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
    this.pdfObj = pdfMake.createPdf(docDefination);
    this.downloadPDF();
    // this.loading.dismiss();
  }
  downloadPDF(){
    if(this.plfm.is('cordova')){
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
  // exportPdf() {
  //
  //   const div = document.getElementById("printable-area");
  //   const options = { background: "white", height: div.clientWidth, width: div.clientHeight };
  //   domtoimage.toPng(div, options).then((dataUrl)=> {
  //     //Initialize JSPDF
  //     var doc = new jsPDF("p","mm","a4");
  //     //Add image Url to PDF
  //     doc.addImage(dataUrl, 'PNG', 20, 20, 240, 180);
  
  //     let pdfOutput = doc.output();
  //     // using ArrayBuffer will allow you to put image inside PDF
  //     let buffer = new ArrayBuffer(pdfOutput.length);
  //     let array = new Uint8Array(buffer);
  //     for (var i = 0; i < pdfOutput.length; i++) {
  //         array[i] = pdfOutput.charCodeAt(i);
  //     }
  
  
  //     //This is where the PDF file will stored , you can change it as you like
  //     // for more information please visit https://ionicframework.com/docs/native/file/
  //     const directory = this.file.dataDirectory ;
  //     const fileName = "invoice.pdf";
  //     let options: IWriteOptions = { replace: true };
  
  //     this.file.checkFile(directory, fileName).then((success)=> {
  //       //Writing File to Device
  //       this.file.writeFile(directory,fileName,buffer, options)
  //       .then((success)=> {
  //         this.loading.dismiss();
  //         console.log("File created Succesfully" + JSON.stringify(success));
  //         this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
  //           .then(() => console.log('File is opened'))
  //           .catch(e => console.log('Error opening file', e));
  //       })
  //       .catch((error)=> {
  //         this.loading.dismiss();
  //         console.log("Cannot Create File " +JSON.stringify(error));
  //       });
  //     })
  //     .catch((error)=> {
  //       //Writing File to Device
  //       this.file.writeFile(directory,fileName,buffer)
  //       .then((success)=> {
  //         this.loading.dismiss();
  //         console.log("File created Succesfully" + JSON.stringify(success));
  //         this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
  //           .then(() => console.log('File is opened'))
  //           .catch(e => console.log('Error opening file', e));
  //       })
  //       .catch((error)=> {
  //         this.loading.dismiss();
  //         console.log("Cannot Create File " +JSON.stringify(error));
  //       });
  //     });
  //   })
  //   .catch(function (error) {
  //     this.loading.dismiss();
  //     console.error('oops, something went wrong!', error);
  //   });
  // }
  ngOnInit() {
  }

}
