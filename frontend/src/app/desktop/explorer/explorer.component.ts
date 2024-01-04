import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FileService } from 'src/app/service/file.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.css']
})
export class ExplorerComponent {

  constructor(private http: HttpClient, private fileService: FileService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    // Subscribe to changes in viewport size
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isSidenavOpened = !result.matches; // Close sidenav on small screens
    });
  }

  view: boolean = true;
  path: string = 'home'
  folder: string = '';
  docs: any;
  folderList: string[] = [];
  isAtHome: boolean = true;
  idx: number = -1;
  display: string = 'block';
  isSidenavOpened: boolean = true;

  @Output('closeExplorer') isExplorerOpen = new EventEmitter<{ appName: string, status: boolean }>();

  width: string = '40%';
  height: string = '40%';
  style: object = {color: 'red'};
  dragPosition = {x: 0, y: 0};

  closeExplorer() {
    this.isExplorerOpen.emit({ appName: "explorer", status: false });
  }

  maximizeExplorer() {
    if(this.width === '40%') {
      this.dragPosition = {x: 0, y: 0};
      this.width = '100%';
      this.height = '100%';
    }
    else {
      this.width = '40%';
      this.height = '40%';
    }
  }

  onFileSelected(event: Event) {
    this.fileService.upload(event)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  changeFolder(folderName: string, src: number) {
    if(folderName === this.folderList[this.idx]) return;

    if(folderName === 'home') {
      this.folderList = [];
      this.idx = -1;
      this.path = 'home'
      this.isAtHome = true;
      this.view = !this.view;
      return;
    }

    this.fileService.download(folderName)
      .subscribe(
        (res: any) => {
          this.docs = res.files;
          this.changeView(folderName, src);
        },
        (err) => {
          this.changeView(folderName, src);
        }
      )

  }

  changeView(folderName: string, src: number) {
    if(this.folderList.length !== 0 && this.idx === -1) {
      this.folderList = [];
    }

    if(this.folderList.length !== 0 && this.idx > -1 && this.idx < this.folderList.length-1) {
      this.folderList.splice(this.idx+1);
    }

    if(this.folderList.length === 0) {
      this.view = !this.view;
    }
    else {
      if(src === 1 || this.isAtHome) {
        this.view = !this.view;
      }
      else {
        this.view = !this.view;
        this.view = !this.view;
      }
    }
    this.folderList.push(folderName);
    this.path = folderName === 'application'? 'home / document': 'home / '+ folderName;
    this.isAtHome = false;
    this.idx++;
    console.log(this.folderList, this.idx);
  }

  back() {
    if(this.idx === -1) return;
    else if(this.idx === 0) {
      this.idx--;
      this.view = !this.view;
      this.path = 'home';
      this.isAtHome = true;
    }
    else {
      this.idx--;
      this.fileService.download(this.folderList[this.idx])
        .subscribe(
          (res: any) => {
            this.docs = res.files;
            this.path = this.folderList[this.idx] === 'application'? 'home / document': 'home / '+ this.folderList[this.idx];
            this.view = !this.view;
            this.view = !this.view;
            console.log(this.folderList, this.idx);
          }
        )
    }
  }

  forward() {
    if(this.folderList.length-1 === this.idx || this.folderList.length === 0) return;
    this.fileService.download(this.folderList[++this.idx])
      .subscribe(
        (res: any) => {
          this.docs = res.files;
          this.path = this.folderList[this.idx] === 'application'? 'home / document': 'home / '+ this.folderList[this.idx];
          if(!this.isAtHome) {
            this.view = !this.view;
            this.view = !this.view;
          }
          else {
            this.view = !this.view;
            this.isAtHome = false;
          }
        }
      )
  }

  showSideNav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

}
