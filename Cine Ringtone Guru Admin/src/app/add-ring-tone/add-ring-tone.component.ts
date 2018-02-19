import { Component, OnInit, ElementRef } from '@angular/core';
import { FileUploadServiceService } from '../file-upload-service.service';
import { CategoryCreatorService } from '../category-creator.service';


@Component({
  selector: 'app-add-ring-tone',
  templateUrl: './add-ring-tone.component.html',
  styleUrls: ['./add-ring-tone.component.scss'],
  providers: [FileUploadServiceService, CategoryCreatorService]
})
export class AddRingToneComponent implements OnInit {
  public categoryName: any = "";
  public selectedFileName: any = "";
  public parentCategory: any = {
    categoryName: "",
    categoryImage: "",
    categoryDescription: "",
    _id: ""
  };

  public subCategory: any = {
    categoryName: "",
    subCategoryName: "",
    subCategoryImage: "",
    subCategoryDescription: "",
    _id: ""
  };


  constructor(private fileUploader: FileUploadServiceService, private elem: ElementRef,
    private categoryCreatorService: CategoryCreatorService) {

  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    //alert();
    this.categoryCreatorService.fetchParentCategory().subscribe(res => this.handleResult(res));
  }

  loadSubCategories(categoryName: any) {
    //alert(categoryName);
    this.categoryCreatorService.fetchSubCategory(categoryName).subscribe(res => this.handleFetchSubResult(res));
  }

  private handleFetchSubResult(res: any) {
    //console.log("Result :" + JSON.stringify(res));
    //console.log(res.status);
    let subResults = res.json();
    //console.log(subResults);
    if (res.status == "200") {
      this.subCategory = subResults;
    } else {

    }
  }


  private handleResult(res: any) {
    //console.log("Result :" + JSON.stringify(result));
    //console.log(res.status);
    let results = res.json();
    //console.log(results);
    if (res.status == "200") {
      this.parentCategory = results;
    } else {

    }
  }
  private handleError(error: any) {
  }


  public uploadRingTone() {

    let categoryName = this.elem.nativeElement.querySelector('#categoryName').value;
    this.categoryName = categoryName;
    let subCategoryName = this.elem.nativeElement.querySelector('#subCategoryName').value;
    let ringKeyWords = this.elem.nativeElement.querySelector('#ringKeyWords').value;
    let files = this.elem.nativeElement.querySelector('#ringTone').files;
    let formData = new FormData();
    let file = files[0];
    formData.append('RingTone', file, file.name);
    formData.append('categoryName', this.categoryName);
    this.fileUploader.uploadRingtone(formData, file.name, this.categoryName, subCategoryName, ringKeyWords).subscribe(res => this.dataLoaded(res));
  }

  private dataLoaded(data: any): void {
    alert("dataLoaded");
  }

  fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    let fileName = file.name;
    this.selectedFileName = fileName;
    this.elem.nativeElement.querySelector('#ringKeyWords').value = fileName.split("(")[0] + "";
  }
}
