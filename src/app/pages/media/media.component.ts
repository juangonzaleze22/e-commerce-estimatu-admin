import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  files: File[] = [];
  valueVideo = {};


  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event.addedFiles.length == 0)
    if (event.addedFiles.length != 0){
       const sizeVideo = Number((event.addedFiles[0].size / 1024 / 1024)) 
       if (this.files && this.files.length >= 1) {
        this.onRemove(this.files[0]);
      }
  
      if (sizeVideo > 50) {
        this.toastr.show("The video video is too big");
      } else {
        this.handleVideoUpload(event);
        this.files.push(...event.addedFiles);
      }
    }else{ 
      this.toastr.show("Please select only video");
    }

  }

  handleVideoUpload(event) {
    const { name, size, type } = event.addedFiles[0]
    const file = event.addedFiles[0];

    let reader = new FileReader();
    reader.onloadend = () => {
      const dataVideo = { name, size, type }
      this.valueVideo = { ...dataVideo, base64: reader.result }
    }
    reader.readAsDataURL(file);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }


}
