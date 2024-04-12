import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import {ShreeMGDServiceService} from '../shree-mgdservice.service';
import { Router, RouterEvent,ActivatedRoute } from '@angular/router';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.page.html',
  styleUrls: ['./edit-job.page.scss'],
})
export class EditJobPage implements OnInit {
  userForm : FormGroup;
  segmentModel = "top";
  process:any;
  disabled = true;
  isTopSelected = false;
  isBottomSelected = false;
  isTraySelected = false;
  selectedTop :any;
  selectedBottom:any;
  selectedTray: any;
  isSubmitted = false;
  preSelectedTop : any=Array();
  preSelectedBottom : any=Array();
  preSelectedTray : any=Array() ;
  job:any;
  SelectedImage = "";
  isImage = false;
  jobNO : any;
  itemName='';
  isItemSearch=false;
  searchResultItem:any=Array();
  parties:any;
  //selectedID :any;
  constructor(public formBuilder: FormBuilder,public service:ShreeMGDServiceService,public router : Router,private route: ActivatedRoute,private filepath :FilePath,private fileChooser:FileChooser,private base64 : Base64,private camera:Camera) {
    this.route.queryParams.subscribe(param=>{
      if (param && param.special) {
        this.job = JSON.parse(param.special);
        console.log("param : ",this.job);
      }
      if (param && param.JObNO) {
        
        this.jobNO = JSON.parse(param.JObNO);
        console.log("jobNO : ",this.jobNO);
      }
    });


    this.service.getAllprocesses().subscribe(d=>{
      this.process = d;
      console.log(this.process);
      
      this.selectedTop = JSON.parse(this.job.topProcess);
      for(var i=0;i<this.selectedTop.length;i++){
        console.log("test : ", this.selectedTop[i].processName);
        this.preSelectedTop[i] = this.selectedTop[i].processName;
      }
      this.isTopSelected = true;
      console.log("pre top : ",this.preSelectedTop);
      console.log("selectedProcess : ",this.selectedTop);

      this.selectedBottom = JSON.parse(this.job.bottomProcess);
      for(var i=0;i<this.selectedBottom.length;i++){
        console.log("test Bottom : ", this.selectedBottom[i].processName);
        this.preSelectedBottom[i] = this.selectedBottom[i].processName;
      }
      console.log("selectedProcessBottom : ",this.preSelectedBottom);
      this.isBottomSelected = true;
      this.selectedTray = JSON.parse(this.job.trayProcess);
      for(var i=0;i<this.selectedTray.length;i++){
        console.log("test : ", this.selectedTray[i].processName);
        this.preSelectedTray[i] = this.selectedTray[i].processName;
      }
      this.isTraySelected= true;
      console.log("selectedProcess : ",this.preSelectedTray);
      this.SelectedImage = this.job.image;
      this.isImage = true;
      this.userForm = this.formBuilder.group({
        name: [this.job.PartyName,[Validators.required]],
        jobid : [this.job.jobid,[Validators.required]],
        jobNo:[this.job.jobNo,[Validators.required]],
        date:[this.job.DeliveryDate,[Validators.required]],
        jobName : [this.job.jobName,[Validators.required]],
        //qty : [this.job.qty,[Validators.required]],
        size : [this.job.paperSize,[Validators.required]],
        processTop:[this.preSelectedTop,[Validators.required]],
        processBottom:[this.preSelectedBottom,[Validators.required]],
        processTray:[this.preSelectedTray,[Validators.required]],
        dieNo:[this.job. dieNo],
        qtyTop:[this.job.qtyTop],
        qtyBottom:[this.job.qtyBottom],
        qtyTray:[this.job.qtyTray],
        dieSizeTop:[this.job.dieSizeTop],
        dieSizeBottom:[this.job.dieSizeBottom],
        dieSizeTray:[this.job.dieSizeTray],
        specialInstructionTop : [this.job.specialInstructionTop],
        specialInstructionBottom : [this.job.specialInstructionBottom],
        specialInstructionTray : [this.job.specialInstructionTray],
        paperSizeTop : [this.job.paperSizeTop],
        paperSizeBottom : [this.job.paperSizeBottom],
        paperSizeTray : [this.job.paperSizeTray],
        tempoNoTop : [this.job.tempoNoTop],
        tempoNoBottom: [this.job.tempoNoBottom],
        tempoNoTray : [this.job.tempoNoTray],
        DeliveryDateTop:[this.job.DeliveryDateTop],
        DeliveryDateBottom:[this.job.DeliveryDateBottom],
        DeliveryDateTray :[this.job.DeliveryDateTray],
        DeliveryChNoTop:[this.job.DeliveryChNoTop],
        DeliveryChNoBottom:[this.job.DeliveryChNoBottom],
        DeliveryChNoTray:[this.job.DeliveryChNoTray],
        FinalQtyTop:[this.job.FinalQtyTop],
        FinalQtyBottom:[this.job.FinalQtyBottom],
        FinalQtyTray:[this.job.FinalQtyTray],
        image : [this.job.image]
      })
      for(var i=0;i<this.preSelectedTop.length ;i++){
        //   console.log(proc[i]);
         this.userForm.addControl(this.preSelectedTop[i]+'top',new FormControl( this.selectedTop[i].parameter,Validators.required)) 
         this.userForm.addControl("top"+this.preSelectedTop[i]+'index',new FormControl(this.selectedTop[i].index,Validators.required)); 
        
      }
      for(var i=0;i<this.preSelectedBottom.length ;i++){
        //   console.log(proc[i]);
         this.userForm.addControl(this.preSelectedBottom[i]+'bottom',new FormControl(this.selectedBottom[i].parameter,Validators.required)) 
         this.userForm.addControl("bottom"+this.preSelectedBottom[i]+'index',new FormControl(this.selectedBottom[i].index,Validators.required)); 
        
      }
      for(var i=0;i<this.preSelectedTray.length ;i++){
         this.userForm.addControl(this.preSelectedTray[i]+'tray',new FormControl(this.selectedTray[i].parameter,Validators.required)) 
         this.userForm.addControl("tray"+this.preSelectedTray[i]+'index',new FormControl(this.selectedTray[i].index,Validators.required)); 
        
      }
    })
    this.service.getAllParties().subscribe(d=>{
      this.parties = d;
      console.log("parties",this.parties);
    })
   }
   searchItem(event){
    console.log(event.target.value);
    this.itemName = event.target.value;
    let index= 0;
    this.searchResultItem = [];
    this.parties.forEach(element => {
      console.log("itemNme",this.itemName);
      if(this.itemName ==''){
        let selector = document.getElementById('searchCardItem');
        console.log(selector);
        selector.style.display = 'none';
      }else{
        console.log("element : ",element.name,"search :",this.itemName);
        if(element.name.includes(this.itemName)){
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
     let party = document.getElementById('party');
     this.userForm.controls.name.setValue(data.name);
     //party.Value = data.name
     //this.userForm.setControl('name',data.name)
     //this.formBuilder. = data.name;
    let selector = document.getElementById('searchCardItem');
    selector.style.display = 'none';
   // this.isCustomerSelected = true;
    // this.rate = data.rate;
    // this.gst = data.gst;
  
  }
   SelectProcess(event){
     const proc =event.detail.value;
     console.log("proc : ",proc);
     console.log("pre : ",this.preSelectedTop);
     let uniq = proc.filter((o)=>this.preSelectedTop.indexOf(o)===-1);
     console.log("uniqe top",uniq.length);
     if(uniq.length==0){
      let removeItem = this.preSelectedTop.filter((o)=>proc.indexOf(o)===-1);
      console.log("remove",removeItem);
      for(var i=0;i<removeItem.length ;i++){
        for(var j =0;j<this.selectedTop.length;j++){
          console.log("matching : ",removeItem[i]);
          if(this.selectedTop[j].processName == removeItem[i]){
            this.selectedTop.splice(j,1);
            this.preSelectedTop.splice(j,1);
            i--;
            console.log("matched : ",this.preSelectedTop[j]);
          }
        }
      console.log("this.selectedTop",this.selectedTop);
        this.userForm.removeControl(removeItem[i]+'top') 
        this.userForm.removeControl("top"+removeItem[i]+'index'); 
      }
      
     }else{
      for(var i=0;i<uniq.length ;i++){
        let newProc = {
          processName : uniq[i],
          parameter:'',
          status: 'pending'
        }
        this.selectedTop[this.selectedTop.length] = newProc ;
        this.preSelectedTop[this.preSelectedTop.length] = uniq[i];
           console.log("this.selectedTop",this.selectedTop);
          this.userForm.addControl(uniq[i]+'top',new FormControl('',Validators.required)) 
          this.userForm.addControl("top"+uniq[i]+'index',new FormControl('',Validators.required)); 
          if(i==proc.length -1)
          {
            this.isTopSelected=true;
          }
       }
     }
    
    
     
   }
   SelectProcessBottom(event){
    const proc =event.detail.value;
    console.log("proc : ",proc.length);
    let uniq = proc.filter((o)=>this.preSelectedBottom.indexOf(o)===-1);
    
    console.log("uniqe top",uniq.length);
     if(uniq.length==0){
      let removeItem = this.preSelectedBottom.filter((o)=>proc.indexOf(o)===-1);
      console.log("remove",removeItem);
      for(var i=0;i<removeItem.length ;i++){
        for(var j =0;j<this.selectedBottom.length;j++){
          console.log("matching : ",removeItem[i]);
          if(this.selectedBottom[j].processName == removeItem[i]){
            this.selectedBottom.splice(j,1);
            this.preSelectedBottom.splice(j,1);
            i--;
            console.log("matched : ",this.preSelectedBottom[j]);
          }
        }
      console.log("this.selectedTop",this.selectedBottom);
        this.userForm.removeControl(removeItem[i]+'bottom') 
        this.userForm.removeControl("bottom"+removeItem[i]+'index'); 
      }
      
     }else{
      for(var i=0;i<uniq.length ;i++){
        let newProc = {
          processName : uniq[i],
          parameter:'',
          status: 'pending'
        }
        this.selectedBottom[this.selectedBottom.length] = newProc ;
        this.preSelectedBottom[this.preSelectedBottom.length] = uniq[i];
           console.log("this.selectedTop",this.selectedBottom);
          this.userForm.addControl(uniq[i]+'bottom',new FormControl('',Validators.required)) 
          this.userForm.addControl("bottom"+uniq[i]+'index',new FormControl('',Validators.required)); 
          if(i==proc.length -1)
          {
            this.isBottomSelected=true;
          }
       }
     }
    
    // for(var i=0;i<uniq.length ;i++){
    //   let newProc = {
    //     processName : uniq[i],
    //     parameter:'',
    //     status: 'pending'
    //   }
    //   this.selectedBottom[this.selectedBottom.length] = newProc ;
    //    this.userForm.addControl(uniq[i]+'bottom',new FormControl('',Validators.required)) 
    //    this.userForm.addControl("bottom"+uniq[i]+'index',new FormControl('',Validators.required)); 
    //    if(i==proc.length -1)
    //    {
    //      this.isBottomSelected=true;
    //    }
    // }
  }
  SelectProcessTray(event){
    const proc =event.detail.value;
    console.log("proc : ",proc.length);
    let uniq = proc.filter((o)=>this.preSelectedTray.indexOf(o)===-1);
    if(uniq.length==0){
      let removeItem = this.preSelectedTray.filter((o)=>proc.indexOf(o)===-1);
      console.log("remove",removeItem);
      for(var i=0;i<removeItem.length ;i++){
        for(var j =0;j<this.selectedTray.length;j++){
          console.log("matching : ",removeItem[i]);
          if(this.selectedTray[j].processName == removeItem[i]){
            this.selectedTray.splice(j,1);
            this.preSelectedTray.splice(j,1);
            i--;
            console.log("matched : ",this.preSelectedTray[j]);
          }
        }
      console.log("this.selectedTop",this.selectedTray);
        this.userForm.removeControl(removeItem[i]+'tray') 
        this.userForm.removeControl("tray"+removeItem[i]+'index'); 
      }
      
     }else{
      for(var i=0;i<uniq.length ;i++){
        let newProc = {
          processName : uniq[i],
          parameter:'',
          status: 'pending'
        }
        this.selectedTray[this.selectedTray.length] = newProc ;
        this.preSelectedTray[this.preSelectedTray.length] = uniq[i];
           console.log("this.selectedTray",this.selectedTray);
          this.userForm.addControl(uniq[i]+'tray',new FormControl('',Validators.required)) 
          this.userForm.addControl("tray"+uniq[i]+'index',new FormControl('',Validators.required)); 
          if(i==proc.length -1)
          {
            this.isBottomSelected=true;
          }
       }
     }
    
    // for(var i=0;i<uniq.length ;i++){
    //   let newProc = {
    //     processName : uniq[i],
    //     parameter:'',
    //     status: 'pending'
    //   }
    //   this.selectedTray[this.selectedTray.length] = newProc ;
    //   //   console.log(proc[i]);
    //    this.userForm.addControl(uniq[i]+'tray',new FormControl('',Validators.required)) 
    //    this.userForm.addControl("tray"+uniq[i]+'index',new FormControl('',Validators.required)); 
    //    if(i==proc.length -1)
    //    {
    //      this.isTraySelected=true;
    //    }
    // }
  }
   segmentChanged(event){
    console.log(this.segmentModel);
    this.segmentModel = event.detail.value; 
    console.log(event.detail.value);
  }
  pickFile(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(data=>{
      this.isImage = true;
      this.SelectedImage = "data:image/jpeg;base64," + data;
      //alert(this.selectedImage);
      
    })
  }
  Add(form){
    this.isSubmitted = true;
    if (1!=1) {
      console.log('Please provide all the required values!')
      return false;
    } else {
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
     console.log("array form :",dataAraay);
     let processTopArray = [];
     if(this.selectedTop !=undefined){
      for(let j = 0;j<this.selectedTop.length ; j++){
        console.log("add test :",this.selectedTop[j].processName)
       let processTopJson = {
         processName : this.selectedTop[j].processName,
         parameter : dataAraay[this.selectedTop[j].processName+"top"],
         index :dataAraay["top"+this.selectedTop[j].processName+"index"],
         status: this.selectedTop[j].status
       }
       processTopArray[j]=processTopJson;
      }
     
      
     }
     console.log("before :",processTopArray);
     let processBottomArray = [];
     if(this.selectedBottom !=undefined){
      for(let j = 0;j<this.selectedBottom.length ; j++){
        console.log("error bottom",this.selectedBottom[j]);
       let processTopJson = {
         processName : this.selectedBottom[j].processName,
         parameter : dataAraay[this.selectedBottom[j].processName+"bottom"],
         index :dataAraay["bottom"+this.selectedBottom[j].processName+"index"],
         status:  this.selectedBottom[j].status
       }
       processBottomArray[j]=processTopJson
     }
     
     }

     console.log("before :",processBottomArray);

     let processTrayArray = [];
     if(this.selectedTray != undefined){
      for(let j = 0;j<this.selectedTray.length ; j++){
        let processTopJson = {
          processName : this.selectedTray[j].processName,
          parameter : dataAraay[this.selectedTray[j].processName+"tray"],
          index :dataAraay["tray"+this.selectedTray[j].processName+"index"],
          status: this.selectedTray[j].status
        }
        processTrayArray[j]=processTopJson
       }
     }
     

     console.log("before top:",processTopArray);
     processTopArray.sort(this.sortProcess);
     console.log("after top:",processTopArray);
     console.log("before processBottomArray:",processBottomArray);
     processBottomArray.sort(this.sortProcess);
     console.log("after processBottomArray:",processBottomArray);
     processTrayArray.sort(this.sortProcess);
     console.log("after :",processTrayArray);
     let job = {
      PartyName : formData.name,
      DeliveryDate : formData.date,
      jobName : formData.jobName,
      jobid:formData.jobid,
      jobNo : formData.jobNo,
      paperSize: formData.size,
      //qty:formData.qty,
      topCurrent:this.selectedTop !=undefined && processTopArray.length >= 1 ? processTopArray[0]['processName'] : '',
      topNext:this.selectedTop !=undefined  && (processTopArray.length >1)? processTopArray[1]['processName'] : '',
      topProcess:JSON.stringify(processTopArray),
      bottomCurrent : this.selectedBottom !=undefined && processBottomArray.length >= 1 ? processBottomArray[0]['processName'] : '',
      bottomNext :   this.selectedBottom !=undefined && (processBottomArray.length >1)? processBottomArray[1]['processName'] : '',
      bottomProcess : JSON.stringify(processBottomArray),
      trayCurrent: this.selectedTray !=undefined && processTrayArray.length >= 1 ? processTrayArray[0]['processName'] : '',
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
        image:this.SelectedImage
     }
     console.log("final data", job);
     this.service.updateJob(job,this.job.id);
    
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
