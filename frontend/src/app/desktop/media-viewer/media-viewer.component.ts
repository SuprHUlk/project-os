import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.css']
})
export class MediaViewerComponent {

  @Output('closeMediaViewer') isMediaViewerOpen = new EventEmitter<{ appName: string, status: boolean }>();
  @Input() file: any = {};

  width: string = '40%';
  height: string = '40%';
  dragPosition = { x: 0, y: 0 };
  link: string = '';

  close() {
    this.isMediaViewerOpen.emit({ appName: "mediaViewer", status: false });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.file.app === 'mediaViewer') {
      this.link = this.file.link;
    }
  }

  maximize() {
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

}
