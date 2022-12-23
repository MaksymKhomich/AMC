import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetInfoService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'
  params =  new HttpParams();
  key = 'qdmpohsx5G4aT234UVmmqCNm2TBlS9gatgDSg3Sa';

  img = [
    '../../assets/curiosity.jpg',
    '../../assets/spirit.jpg',
    '../../assets/opportunity.jpg',
  ]

  getInfo() {
    return this.http.get(this.baseUrl, {
      params: this.params.append('api_key', this.key)
    });
  }

  getPhotos(rover: any, camera: any, sol: any) {
    this.params = this.params.append('camera', camera).append('sol', sol).append('api_key', this.key)
    return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`, {
      params: this.params
    })
  }

}
