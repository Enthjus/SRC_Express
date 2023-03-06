import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  accounts:Account[];
  nameRole:string;
  fullnameUser : string;
  constructor(
    private accountAPI: AccountService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      window.location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.accountAPI.findall().then(
      res => {
       this.accounts = res;
  }, 
  err=>{
   console.log(err);
  },);

  }
edit(e:any){
  var id = e.target.value;
  this.router.navigate(['admin/account/edit',{id:id}])
}
delete(e:any){
  var id = e.target.value;
 this.accountAPI.delete(id).then(
   res=>{
     var kq:boolean = res; 
    if(res==true){
      alert("Sussecc");
      window.location.reload();
    }else{
      alert("Error")
    }
   },err=>{
    alert("Error: "+err)
   }
 );
}


}
