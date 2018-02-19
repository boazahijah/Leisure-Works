import { Component, OnInit } from '@angular/core';
import { CategoryCreatorService } from '../category-creator.service';
declare var $: any;

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
  providers: [CategoryCreatorService]
})
export class SubCategoryComponent implements OnInit {
  public selectedFileName: any = "No File Chosen";
  public categoryName = "";
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
  };
  public base64ImgString: any;
  constructor(private categoryCreatorService: CategoryCreatorService) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryCreatorService.fetchParentCategory().subscribe(res => this.handleLoadCategoryResult(res));
  }

  private handleLoadCategoryResult(res: any) {
    //console.log("Result :" + JSON.stringify(result));
    //console.log(res.status);
    let results = res.json();
    //console.log(results);
    if (res.status == "200") {
      this.parentCategory = results;
    } else {

    }
  }

  showNotification(from, align, color, textMessage) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    //const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "notifications",
      message: textMessage

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        }
      });
  }

  fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    let fileName = file.name;
    this.selectedFileName = fileName;

    if (this.selectedFileName) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64ImgString = btoa(binaryString);
    //console.log(btoa(binaryString));
  }


  saveSubCategory() {
    this.subCategory.subCategoryImage = this.base64ImgString;
    this.subCategory.categoryName = this.categoryName;
    //console.log(JSON.stringify(this.parentCategory));
    this.categoryCreatorService.createSubCategory(this.subCategory).subscribe(
      (status) => {
        this.handleCreateSubCategoryResult(status);
      },
      error => this.handleCreateSubCategoryError(error)
    );
  }

  private handleCreateSubCategoryResult(result: any) {
    if (result.status == "200") {
      this.showNotification('top', 'center', 3, "Sub Category Successfully Saved.");
    } else {
      this.showNotification('top', 'center', 4, "Sub Category failed to save. Please try again.");
    }

  }

  private handleCreateSubCategoryError(error: any) {
    //console.log(error);
    this.showNotification('top', 'center', 4, "Sub Category failed to save. Please try again.");

  }

}
