import { Injectable } from '@angular/core';

//Extends and import to use
import { Product } from '../Interfaces/product';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //Endpoit to connect
  private endpoint:string = environment.endpoint;
  private myApiUrl:string = this.endpoint + "api/product";

  constructor(private http:HttpClient) { }

  //*Service Request
  getList():Observable<ResponseApi>{
    
    return this.http.get<ResponseApi>(this.myApiUrl)

  }

  add(request:Product):Observable<ResponseApi>{
    
    return this.http.post<ResponseApi>(this.myApiUrl, request)
  }

  update(request:Product):Observable<ResponseApi>{
    
    return this.http.put<ResponseApi>(this.myApiUrl, request)
  }

  delete(id:number):Observable<ResponseApi>{

    return this.http.delete<ResponseApi>(`${this.myApiUrl}/${id}`)
  }
  
}
