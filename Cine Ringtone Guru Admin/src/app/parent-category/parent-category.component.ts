import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryCreatorService } from '../category-creator.service';

declare var $: any;
@Component({
  selector: 'app-parent-category',
  templateUrl: './parent-category.component.html',
  styleUrls: ['./parent-category.component.scss'],
  providers: [CategoryCreatorService]
})
export class ParentCategoryComponent implements OnInit {
  public selectedFileName: any = "No File Chosen";
  public parentCategory: any = {
    categoryName: "",
    categoryImage: "",
    categoryDescription: "",
    head: ""
  };
  public base64ImgString: any;
  constructor(private categoryCreatorService: CategoryCreatorService) {
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

  ngOnInit() {

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


  saveCategory() {
    this.parentCategory.categoryImage = this.base64ImgString;
    //console.log(JSON.stringify(this.parentCategory));
    this.categoryCreatorService.createParentCategory(this.parentCategory).subscribe(
      (status) => {
        this.handleResult(status);
      },
      error => this.handleError(error)
    );
  }

  private handleResult(result: any) {
    if (result.status == "200") {
      this.showNotification('top', 'center', 3, "Parent Category Successfully Saved.");
    } else {
      this.showNotification('top', 'center', 4, "Parent Category failed to save. Please try again.");
    }

  }

  private handleError(error: any) {
    //console.log(error);
    this.showNotification('top', 'center', 4, "Parent Category failed to save. Please try again.");

  }

  // loadUser() {
  //   this.userService.getUser().subscribe(data => this.profile = data);
  // }

}
