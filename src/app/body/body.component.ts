import { Component, OnInit } from '@angular/core';
import { GetInfoService } from './get-info.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{
  
  constructor(
    private getGallery: GetInfoService,
  ) { }
    
  data!: any;
  allPhotos: number = 0;
  page: number = 1;
  maxPhoto: number = 12;

  show: boolean = false;
  rover: string | undefined;
  camera: string | undefined;
  sol: number | undefined;
  
  imgs: any = this.getGallery.img;
  
  emptyList: boolean = false;
  
  ngOnInit(): void {
    this.getGallery.getInfo()
    .subscribe((res:any) => {
      this.data = res;
      this.data = this.data.rovers.slice(0, 3);
    },
      error => {
        console.log(error)
      });

  }
  

  showResult(){
    let selectedRover = document.querySelector('input[name="rover"]:checked')?.id;
    let selectedCamera = document.querySelector('input[name="camera"]:checked')?.id;
    let selectedSol = +(<HTMLInputElement>document.querySelector('input#sol')).value;

    this.getGallery.getPhotos(selectedRover, selectedCamera, selectedSol).
      subscribe((res:any) => {
        this.data = res;
        this.data = this.data.photos; 
        this.allPhotos = res.total;

        if (!this.data || (this.data.length == 0)) {

          let div = <HTMLInputElement>document.querySelector(".content");
          div.style['display'] = "none";

          this.emptyList = true;
          this.show = false;
        } 
        else {

          let div = <HTMLInputElement>document.querySelector(".content");
          div.style['display'] = "none";

          this.show = true;
          this.emptyList = false;

          console.log(this.data);
        }
      },
      error => {
        console.log(error)
        });
  }

  loadMore() {
    this.maxPhoto += 12;
    
    if (this.data.length <= this.maxPhoto) {
      document.querySelector('#loadMore')?.remove();

      let span = <HTMLInputElement>document.createElement("span");
      span.id = 'endList';
      span.style.color = "#fff";
      span.style.fontSize = "25px";
      span.style.textAlign = "center";
      span.innerText = "No more photo available";
      let div = document.querySelector('.photos-template')?.append(span);
    } 
    this.showResult();
  }

  
}
