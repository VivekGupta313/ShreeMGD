import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
import { Router, RouterEvent,ActivatedRoute } from '@angular/router';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.page.html',
  styleUrls: ['./add-job.page.scss'],
})
export class AddJobPage implements OnInit {
  userForm : FormGroup;
  segmentModel = "top";
  process:any;
  parties:any;
  isUnique=true;
  isTopSelected = false;
  isBottomSelected = false;
  isTraySelected = false;
  selectedTop :any;
  selectedBottom:any;
  selectedTray: any;
  isSubmitted = false;
  selectedImage = "";
  isImage = false;
  itemName='';
  isItemSearch=false;
  searchResultItem:any=Array();
  constructor(public formBuilder: FormBuilder,public service:ShreeMGDServiceService,public router : Router,private filepath :FilePath,private fileChooser:FileChooser,private base64 : Base64,private photoViewer :PhotoViewer,private camera:Camera) {
    this.service.getAllprocesses().subscribe(d=>{
      this.process = d;
      console.log(this.process);
      this.userForm = this.formBuilder.group({
        name: ['',[Validators.required]],
        jobNo:['',[Validators.required]],
        date:['',[Validators.required]],
        jobName : ['',[Validators.required]],
        jobid : ['',[Validators.required]],
       // qty : ['',[Validators.required]],
        qtyTop:['',[Validators.required]],
        qtyBottom:['',[Validators.required]],
        qtyTray:['',[Validators.required]],
        size : ['',[Validators.required]],
        processTop:['',[Validators.required]],
        processBottom:['',[Validators.required]],
        processTray:['',[Validators.required]],
        dieNo:[''],
        dieSizeTop:[''],
        dieSizeBottom:[''],
        dieSizeTray:[''],
        specialInstructionTop : [''],
        specialInstructionBottom : [''],
        specialInstructionTray : [''],
        paperSizeTop : [''],
        paperSizeBottom : [''],
        paperSizeTray : [''],
        tempoNoTop : [''],
        tempoNoBottom: [''],
        tempoNoTray : [''],
        DeliveryDateTop:[''],
        DeliveryDateBottom:[''],
        DeliveryDateTray :[''],
        DeliveryChNoTop:[''],
        DeliveryChNoBottom:[''],
        DeliveryChNoTray:[''],
        FinalQtyTop:[''],
        FinalQtyBottom:[''],
        FinalQtyTray:[''],
        image:[''],
      })
    })
    this.service.getAllParties().subscribe(d=>{
      this.parties = d;
      console.log("parties",this.parties);
    })
   
   }
   SelectProcess(event){
     const proc =event.detail.value;
     console.log("proc : ",proc.length);
    this.selectedTop = proc;
     for(var i=0;i<proc.length ;i++){
       //   console.log(proc[i]);
        this.userForm.addControl(this.selectedTop[i]+'top',new FormControl('',Validators.required)) 
        this.userForm.addControl("top"+this.selectedTop[i]+'index',new FormControl('',Validators.required)); 
        if(i==proc.length -1)
        {
          this.isTopSelected=true;
        }
     }
   }
   SelectProcessBottom(event){
    const proc =event.detail.value;
    console.log("proc : ",proc.length);
   this.selectedBottom = proc;
    for(var i=0;i<proc.length ;i++){
      //   console.log(proc[i]);
       this.userForm.addControl(this.selectedBottom[i]+'bottom',new FormControl('',Validators.required)) 
       this.userForm.addControl("bottom"+this.selectedBottom[i]+'index',new FormControl('',Validators.required)); 
       if(i==proc.length -1)
       {
         this.isBottomSelected=true;
       }
    }
  }
  SelectProcessTray(event){
    const proc =event.detail.value;
    console.log("proc : ",proc.length);
   this.selectedTray = proc;
    for(var i=0;i<proc.length ;i++){
      //   console.log(proc[i]);
       this.userForm.addControl(this.selectedTray[i]+'tray',new FormControl('',Validators.required)) 
       this.userForm.addControl("tray"+this.selectedTray[i]+'index',new FormControl('',Validators.required)); 
       if(i==proc.length -1)
       {
         this.isTraySelected=true;
       }
    }
  }
   segmentChanged(event){
    console.log(this.segmentModel);
    this.segmentModel = event.detail.value; 
    console.log(event.detail.value);
  }
  viewImage(){
    console.log("image views");
    this.photoViewer.show(this.selectedImage);
  }
  pickFile(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(data=>{
      this.isImage = true;
      this.selectedImage = "data:image/jpeg;base64," + data;
      
    }).catch(err=>{
      alert("error"+err);
    })
    // this.fileChooser.open().then((fileuri)=>{
    //   this.filepath.resolveNativePath(fileuri).then((nativePath)=>{
    //     alert(nativePath);
    //     this.base64.encodeFile(nativePath).then((base64String)=>{
          
    //       this.selectedImage= "data:image/jpeg;base64,"+base64String;
    //       alert(this.selectedImage);
    //     })
    //   })
    // })
  }
  searchItem(){
 
    let index= 0;
    this.searchResultItem = [];
    this.parties.forEach(element => {
      if(this.itemName ==''){
        let selector = document.getElementById('searchCardItem');
        console.log(selector);
        selector.style.display = 'none';
      }else{
        console.log("element : ",element.name,"search :",this.itemName);
        if(element.name.toLowerCase().includes(this.itemName.toLowerCase())){
          let selector = document.getElementById('searchCardItem');
          console.log(selector);
          selector.style.display = 'block';
          this.searchResultItem.push(element)
          console.log("searchItem",this.searchResultItem)
          this.isItemSearch = true;
          index++;
        }
      }
      
    });
  }
  SelectItem(data){
    console.log("selected Item",data);
     this.itemName=data.name;
    let selector = document.getElementById('searchCardItem');
    selector.style.display = 'none';
   // this.isCustomerSelected = true;
    // this.rate = data.rate;
    // this.gst = data.gst;
  
  }
   Add(form){
    this.isSubmitted = true;
    let ids = JSON.parse(window.localStorage.getItem('ids'));
    console.log("ids",ids);
    let formData = this.userForm.value;
    if(ids.includes(formData.jobNo)){
      this.isUnique=false;
    }else{
      this.isUnique = true;
       let formData = this.userForm.value;
    console.log("original form : ",formData)
    let key =Object.keys(formData);
    let value = Object.values(formData);
    console.log("key : ",key);
    console.log("value : ",value);
    let dataAraay = new Array();
    for(let i = 0;i<key.length;i++){
     dataAraay[key[i]] = value[i]; 
    
    }
    //console.log("array form :",dataAraay);
    let processTopArray = [];
    if(this.selectedTop !=undefined){
      for(let j = 0;j<this.selectedTop.length ; j++){
     let processTopJson = {
       processName : this.selectedTop[j],
       parameter : dataAraay[this.selectedTop[j]+"top"],
       index :dataAraay["top"+this.selectedTop[j]+"index"],
       status: 'pending'
     }
     processTopArray[j]=processTopJson
      }
    }
    console.log("before :",processTopArray);
    let processBottomArray = [];
    if(this.selectedBottom !=undefined){
      for(let j = 0;j<this.selectedBottom.length ; j++){
        let processTopJson = {
          processName : this.selectedBottom[j],
          parameter : dataAraay[this.selectedBottom[j]+"bottom"],
          index :dataAraay["bottom"+this.selectedBottom[j]+"index"],
          status: 'pending'
        }
        processBottomArray[j]=processTopJson
       }
    }
  

    console.log("before :",processBottomArray);

    let processTrayArray = [];
    if(this.selectedTray != undefined){
      for(let j = 0;j<this.selectedTray.length ; j++){
        let processTopJson = {
          processName : this.selectedTray[j],
          parameter : dataAraay[this.selectedTray[j]+"tray"],
          index :dataAraay["tray"+this.selectedTray[j]+"index"],
          status: 'pending'
        }
        processTrayArray[j]=processTopJson
       }
    }
    
    console.log("this.selectedBottom",this.selectedBottom);
    //console.log("processTrayArray[0]['processName'] !=''",processTrayArray[0]['processName']);
    console.log("before :",processTrayArray);
    processTopArray.sort(this.sortProcess);
    console.log("after :",processTopArray);
    processBottomArray.sort(this.sortProcess);
    console.log("after :",processBottomArray);
    processTrayArray.sort(this.sortProcess);
    console.log("after :",processTrayArray);
    let job = {
     PartyName : formData.name,
     DeliveryDate : formData.date,
     jobName : formData.jobName,
     jobid:formData.jobid,
     jobNo : formData.jobNo,
     paperSize: formData.size,
     topCurrent:this.selectedTop !=undefined || processTopArray.length > 1 ? processTopArray[0]['processName'] : '',
     topNext:this.selectedTop !=undefined  && (processTopArray.length >1)? processTopArray[1]['processName'] : '',
     topProcess:JSON.stringify(processTopArray),
     
     bottomCurrent :this.selectedBottom !=undefined || processBottomArray.length > 1? processBottomArray[0]['processName'] : '',
     bottomNext : this.selectedBottom !=undefined && (processBottomArray.length >1)? processBottomArray[1]['processName'] : '',
     bottomProcess : JSON.stringify(processBottomArray),
     trayCurrent:this.selectedTray !=undefined || processTrayArray.length > 1? processTrayArray[0]['processName'] : '',
     trayNext : this.selectedTray !=undefined  && (processTrayArray.length >1) ? processTrayArray[1]['processName'] : '',
     trayProcess : JSON.stringify(processTrayArray),
     dieNo:formData.dieNo,
     qtyTop:formData.qtyTop,
     qtyBottom:formData.qtyBottom,
     qtyTray:formData.qtyTray,
     dieSizeTop:formData.dieSizeTop,
       dieSizeBottom:formData.dieSizeBottom,
       dieSizeTray:formData.dieSizeTray,
       specialInstructionTop : formData.specialInstructionTop,
       specialInstructionBottom :formData.specialInstructionBottom,
       specialInstructionTray : formData.specialInstructionTray,
       paperSizeTop : formData.paperSizeTop,
       paperSizeBottom :formData.paperSizeBottom,
       paperSizeTray : formData.paperSizeTray,
       tempoNoTop : formData.tempoNoTop,
       tempoNoBottom: formData.tempoNoBottom,
       tempoNoTray : formData.tempoNoTray,
       DeliveryDateTop:formData.DeliveryDateTop,
       DeliveryDateBottom:formData.DeliveryDateBottom,
       DeliveryDateTray :formData.DeliveryDateTray,
       DeliveryChNoTop:formData.DeliveryChNoTop,
       DeliveryChNoBottom:formData.DeliveryChNoBottom,
       DeliveryChNoTray:formData.DeliveryChNoTray,
       FinalQtyTop:formData.FinalQtyTop,
       FinalQtyBottom:formData.FinalQtyBottom,
       FinalQtyTray:formData.FinalQtyTray,
       image:this.selectedImage
    }
    console.log("final data", job);
    this.service.addJob(job);
    this.router.navigate(['/job-list']);
    if (!this.userForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
   
    }
    }
   
   }
   sortProcess(a,b){
    if ( a.index < b.index ){
      return -1;
    }
    if ( a.index > b.index ){
      return 1;
    }
    return 0;
   }
   get errorControl() {
    return this.userForm.controls;
  }
  ngOnInit() {
  }
  back(){
    this.router.navigate(['/job-list']);
  }
}
