import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryCreatorService } from '../category-creator.service';
import { FileUploadServiceService } from '../file-upload-service.service';

declare var $: any;

@Component({
  selector: 'app-push-notification',
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss'],
  providers: [CategoryCreatorService, FileUploadServiceService]

})
export class PushNotificationComponent implements OnInit {
  public pushTitle: any = "";
  public pushMessage: any = "";
  public selectedFileName: any = "";




  constructor(private fileUploader: FileUploadServiceService, private elem: ElementRef,
    private categoryCreatorService: CategoryCreatorService) {

  }

  ngOnInit() {
  }


  public sendPush() {

    let pushtitle = this.elem.nativeElement.querySelector('#pushTitle').value;
    this.pushTitle = pushtitle;
    let pushMessage = this.elem.nativeElement.querySelector('#pushMessage').value;
    let files = this.elem.nativeElement.querySelector('#pushImage').files;
    let formData = new FormData();
    let file = files[0];
    formData.append('pushImage', file, file.name);
    formData.append('pushTitle', this.pushTitle);
    formData.append('pushMessage', pushMessage);

    this.fileUploader.sendPush(formData, file.name, this.pushTitle, pushMessage).subscribe(res => this.dataLoaded(res));
  }

  private dataLoaded(data: any): void {
    alert("dataLoaded");
  }

  fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    let fileName = file.name;
    this.selectedFileName = fileName;
  }

}
