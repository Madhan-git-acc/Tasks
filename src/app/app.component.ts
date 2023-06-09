import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataformService } from './dataform.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public dataform!: FormGroup
  public datalist:any[]=[]
  public isEdit:boolean=false
  public indexValue!:number
  constructor(public fb: FormBuilder,public Dataformservice:DataformService) {
    this.dataform = this.fb.group({
      name: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]*')]),
      email: new FormControl('', [Validators.email, Validators.required]),
      number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]*')])
    })
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
}
