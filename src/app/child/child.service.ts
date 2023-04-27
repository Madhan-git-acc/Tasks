import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  url: string = "http://localhost:3000/data"
  sub = new Subject<string>()
  value = '10'
  sub2 = new BehaviorSubject('1')

  constructor(private http: HttpClient) {
  }
  getdata() {
    return this.http.get(this.url)
  }
  savedata(data: any) {
    return this.http.post(this.url, data)
  }
  getdatabyid(id: string) {
    return this.http.get(this.url + '/' + id)
  }
  updatedata(data: any, id: string) {
    return this.http.put(this.url + '/' + id, data)
  }
  deletedata(id: string) {
    return this.http.delete(this.url + '/' + id)
  }

}
