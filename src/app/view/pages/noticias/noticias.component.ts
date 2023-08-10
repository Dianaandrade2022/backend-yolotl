import { Component, Input, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, getDocs, doc, deleteDoc } from '@angular/fire/firestore';
import { Loading, Notify } from 'notiflix';
import { NoticiaService } from 'src/app/services/noticia/noticia.service';
import { Storage, getDownloadURL, ref } from '@angular/fire/storage';
import { Noticia } from 'src/app/interfaces/noticia/noticia';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  logo: string = "../../../../assets/img/yolotl.webp";
  @Input()notices?:Noticia[]
  i:any = null
  _id:any
  id = ''
  getimg = ''
  lista: any = [{
      url: '/admin/noticias',
      icon: 'bi bi-newspaper me-2',
      name: 'Noticias'
    },
    {
      url: '/admin/noticias/crear',
      icon: 'bi bi-patch-plus-fill me-2',
      name: 'Agregar'
    },
  ]
  constructor(
    private afAuth: Auth,
    private noticiasrv: NoticiaService,
    private firestore: Firestore,
    private storage:Storage,
    private cooksrv:CookieService,
  ) {}
  ngOnInit(): void {
    this.mostrardatos();
    console.log(this.i)
  }

  async mostrardatos() {
    const refdata = collection(this.firestore, 'noticias');
    const querySnapshot = await getDocs(refdata)

    // const promises = querySnapshot.docs.map(async (doc) => {
    //   const id = doc.id;
    //   const data = doc.data();
    //   const imgRef = ref(this.storage, 'images/' + data["img"]);
    //   const imgUrl = await getDownloadURL(imgRef);
    //   data["img"] = imgUrl
    //   const docref = ref(this.storage, 'archivos/' + data["document"]);
    //   const docurl = await getDownloadURL(docref);
    //   data["document"] = docurl
    //   return { data };

    // });
    // this.notices = await Promise.all(promises);
    // this.notices = [...this.notices];
    if (querySnapshot.size > 0) {
      this.notices = querySnapshot.docs.map(doc => doc.data() as Noticia)
    } else {

    }
    const refimg = ref(this.storage,'images/fondojpg.jpg');
    this.getimg = await getDownloadURL(refimg);
    console.log(this.getimg);
    return this.getimg
  }

   downloadImage(url:any) {
    var link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';
    link.click();
  }
  async delete(data:any){
    this.i = data
    console.log(data)
  }
  cerrarnoticia(){
    this.i = null
    console.log(this.i)
  }


}
