import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataformService } from '../dataform.service';
import { ChildService } from './child.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  public dataform!: FormGroup
  public datalist: any[] = []
  public isEdit: boolean = false
  public indexValue!: string
  public data = 1

  constructor(public fb: FormBuilder, public Childservice: ChildService) {
    this.dataform = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
      email: new FormControl('', [Validators.email, Validators.required]),
      number: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')])
    })

  }
  ngOnInit() {
    this.getalldatas()
    // this.Childservice.sub.subscribe({
    //   next: (v) => console.log(v),
    // });
    // this.Childservice.sub.next('1')
    // this.Childservice.sub2.subscribe((res: any) => console.log("res of Behaviour concepts : ", res))

  }
  getalldatas() {
    this.Childservice.getdata().subscribe((response: any) => { this.datalist = response, console.log() })
  }
  saveFormData() {
    console.log("Form Values :", this.dataform.value)
    let data = this.dataform.value
    this.Childservice.savedata(data).subscribe((res: any) => {
      console.log("post success"),
        this.getalldatas()

    })
    this.dataform.reset()

  }
  editForm(index: any) {
    this.isEdit = true
    this.indexValue = index
    console.log(index)
    this.Childservice.getdatabyid(index).subscribe((res: any) => {
      this.dataform.patchValue({
        name: res.name,
        email: res.email,

      })
    })
    this.dataform.controls?.['number'].disable()
  }
  updateForm() {
    let data = this.dataform.value
    this.Childservice.updatedata(data, this.indexValue).subscribe((res: any) => {
      console.log("update success"),
        this.getalldatas()
    })
    this.isEdit = false
    this.dataform.reset()
  }
  deleteForm(index: any) {
    console.log(index)
    this.Childservice.deletedata(index).subscribe((res: any) => {
      console.log("Delete success"),
        this.getalldatas()
    })
  }
  clear() {
    this.dataform.reset()
    this.Childservice.sub.subscribe((res: any) => console.log("res of subject concepts : ", res))
  }
}
