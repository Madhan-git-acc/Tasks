import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataformService } from '../dataform.service';
import { Router } from '@angular/router';
import { ChildService } from '../child/child.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  public dataform!: FormGroup
  public datalist:any[]=[]
  public isEdit:boolean=false
  public indexValue!:number
  constructor(public fb: FormBuilder,public Dataformservice:DataformService, public router:Router,public Childservice:ChildService) {
    this.dataform = this.fb.group({
      name: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]),
      email: new FormControl('', [Validators.email, Validators.required]),
      number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]*')]),
      password: new FormControl('',Validators.required),
      confirmpassword: new FormControl('',Validators.required)
    },{validator : this.matchpass})
  }
  ngOnInit() {
    this.datalist=this.Dataformservice.data
  }
  saveFormData(){
    console.log("Form Values :",this.dataform.value)
    this.Dataformservice.data.push(this.dataform.value)
    this.dataform.reset()
    this.datalist=this.Dataformservice.data
  }
  editForm(index:any){
    this.isEdit=true
    this.indexValue=index
    this.dataform.controls?.['password'].disable()
    this.dataform.controls?.['confirmpassword'].disable()
    console.log(index)
    this.dataform.patchValue({
    name:index.name,
    email:index.email,
    number:index.number
    })
  }
  updateForm(){
    let data = this.dataform.value
    this.datalist.splice(this.indexValue,1)
    this.datalist.push(data);
    this.isEdit=false
    this.dataform.reset()
  }
  deleteForm(index:number){
    console.log(index)
    this.datalist.splice(index,1)
    this.datalist=this.datalist
  }
  matchpass(g:FormGroup){
    let pass1=g.controls?.['password']?.value
    let pass2=g.controls?.['confirmpassword']?.value
    return pass1 == pass2 ? null : {'notsame':true}
  }
  clear(){
    this.dataform.reset()
  }
}
