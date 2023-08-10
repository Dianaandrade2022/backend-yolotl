import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit{

  constructor(
    
  ){}
  fechacreate:string = ''
  update:FormGroup = new FormGroup({})
  imgurl:string = '';
  logo:string = "../../../../assets/img/yolotl.webp";
  images='images/*'
  imgerror:string = '';
  lista:any = [
    {url: '/admin/noticias', icon:'bi bi-newspaper me-2', name:'Noticias'},
    {url: '/admin/noticias/crear', icon:'bi bi-patch-plus-fill me-2', name:'Agregar'},
    // {url: 'admin/noticias/modificar', icon:'bi bi-cloud-upload-fill me-2', name:''},/
  ]
  ngOnInit(): void {
      this.update = new FormGroup({
        titulo: new FormControl('',[Validators.required]),
        autor: new FormControl('',[Validators.required]),
        fecha: new FormControl('',[Validators.required]),
        document: new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required]),
        img: new FormControl('',[Validators.required]),
      })
      const datecreate = new Date();
      this.fechacreate = datecreate.toLocaleDateString();
      console.log(this.fechacreate)
  }

  async updatenotice(){
   const r = await fetch('https://yolotl-e2203-default-rtdb.firebaseio.com/Noticias.json',
   
   )
  }
  getImageData(event:any){
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.imgurl = event.target.result;
      }  
    }  
  }
}
