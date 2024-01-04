import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { TerminalService } from 'src/app/service/terminal.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent {

  constructor(private terminalService: TerminalService) { }

  @Output('closeTerminal') isTerminalOpen = new EventEmitter<{ appName: string, status: boolean }>();

  @ViewChild('texter') texter!: ElementRef;

  width: string = '40%';
  height: string = '40%';
  style: object = {color: 'red'};
  cmd: string = '';
  // displayedCmd: string = '';
  displayedCmd: any = "";
  dragPosition = {x: 0, y: 0};

  closeTerminal() {
    this.isTerminalOpen.emit({ appName: "terminal", status: false });
  }

  maximizeTerminal() {
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

  focusOnTexter(): void {
    this.texter.nativeElement.focus();
  }

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`,
    };

  }

  onEnter(value: string) {
    const command: string = value.toLowerCase().trim();

    if(command === 'clear') {
      this.displayedCmd = '';
    }
    else {
      this.displayedCmd += command + this.terminalService.check(command);
    }

    this.cmd = '';
  }




}
