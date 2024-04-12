import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { ShreeMGDServiceService } from '../shree-mgdservice.service';

@Component({
  selector: 'app-filer-page',
  templateUrl: './filer-page.page.html',
  styleUrls: ['./filer-page.page.scss'],
})
export class FilerPagePage implements OnInit {
  proccess : any;
  job:any;
  loading: any;
  jobNo:any= Array();
  searchKey='';
  searchResult:any = Array();
  filter='';
  constructor(private service :ShreeMGDServiceService,private router:Router,private route: ActivatedRoute,private platform : Platform,public Alertcontroller :AlertController,
    private fileOpener: FileOpener,public loadingController: LoadingController) { 
      let filter = '';
      this.route.queryParams.subscribe(param=>{
        if (param && param.special) {
          this.filter=param.special;
          console.log("param : ",this.filter);
          this.service.getAllJobsWhere(this.filter).subscribe((d=>{
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
        }
       
      });
    this.service.getAllJobsWhere(filter).subscribe((d=>{
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
  }
  
  ngOnInit() {
  }

}
