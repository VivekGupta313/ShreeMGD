import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import{AngularFireAuth } from '@angular/fire/auth';

import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ProcessModule} from '../app/process/process.module';
import {UsersModule} from '../app/modal/users/users.module';
import {JobModule} from '../app/modal/job/job.module';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
// export class user{
//   id:string;
//   acess:string;
//   name:string;
//   password:string;
//   role:string;
//   userID:string;
// }
// class process{
// 
// }
export class ShreeMGDServiceService {
  users:any;
  constructor(private db:AngularFirestore,private fireAuth:AngularFireAuth,private router:Router) { 

  }
  getAllprocesses(){
    return this.db.collection('process').snapshotChanges().map(
      actions => {
          return actions.map(
              a => {

                  const data = a.payload.doc.data() as ProcessModule;
                 // console.log("new data",data);
                   data.id = a.payload.doc.id;
                  return data;
              }
          );
      }
  );
      
        // const collectionRef = this.db.collection('process').snapshotChanges().map;
        // const snapshot = await collectionRef.ref.get();
        // const albums = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
       
  }
  addProcess(data){

    return this.db.collection('process').add(data);
  }
  updateProcess(data,id){
     return this.db.doc('process/' + id ).update(data).then(data=>{
       return data;
     });
  }
  deleteProcess(id){
    return this.db.doc('process/'+id).delete().then(data=>{
      return data;
    });
  }



  getAllUsers(){
    return this.db.collection('users').snapshotChanges().map(
      actions => {
          return actions.map(
              a => {

                  const data = a.payload.doc.data() as UsersModule;
                  
                   data.id = a.payload.doc.id;
                  return data;
              }
          );
      }
  );
  }
  addUser(data){

    this.db.collection('users').add(data);
  }
  updateUser(data,id){
    this.db.doc('users/' + id ).update(data);
  }
  deleteUser(id){
    this.db.doc('users/'+id).delete();
  }



  getAllJobs(){
    return this.db.collection('job').snapshotChanges().map(
      actions => {
          return actions.map(
              a => {

                  const data = a.payload.doc.data() as JobModule;
                  
                   data.id = a.payload.doc.id;
                  return data;
              }
          );
      }
    );
  }
  getAllJobsWhere(partyName){
    console.log("party name",partyName)
  return this.db.collection('job',ref=>ref.where('PartyName','==',partyName)).snapshotChanges().map(actions =>{
      return actions.map(a=>{
        const data = a.payload.doc.data() as JobModule;
                  
        data.id = a.payload.doc.id;
       return data;
      })
    })
    
  }
  addJob(data){
    this.db.collection('job').add(data).then(res=>{
      this.router.navigate(['/job-list']);    
    });
  }
  updateJob(data,id){
    //alert(JSON.stringify(data));
    this.db.doc('job/' + id ).update(data).then(res=>{
      this.router.navigate(['/job-list']);
    });
  }
  deleteJob(id){
    this.db.doc('job/'+id).delete();
  }
  login(data) : Promise<any>{
    return new Promise(async (resolve,reject) => {
      try{
       // let result = this.fireAuth.signInWithEmailAndPassword(data.userId,data.pass);
        const collectionRef = await this.db.collection('users');
        const snapshot = await collectionRef.ref.where('userId', '==', data.userId).where('password','==',data.pass).get();
        const albums = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        console.log("login",albums);
        resolve(albums);
        
      }catch(e){
        reject(e)
      }
    })

    
  }




  getAllParties(){
    return this.db.collection('parties').snapshotChanges().map(
      actions => {
          return actions.map(
              a => {

                  const data = a.payload.doc.data() as UsersModule;
                  
                   data.id = a.payload.doc.id;
                  return data;
              }
          );
      }
  );
  }
  addParties(data){

    this.db.collection('parties').add(data);
  }
  updateParties(data,id){
    this.db.doc('parties/' + id ).update(data);
  }
  deleteParties(id){
    this.db.doc('parties/'+id).delete();
  }

}
