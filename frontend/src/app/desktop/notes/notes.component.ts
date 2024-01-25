import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesService } from 'src/app/service/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  @Output('closeNotes') isNotesOpen = new EventEmitter<{ appName: string, status: boolean }>();
  @Input() file: any = {};

  constructor (private formBuilder: FormBuilder, private notesService: NotesService) {
    this.notesForm = this.formBuilder.group({
      fileName: ['', Validators.required],
      content: ['']
    })
  }

  notesForm: FormGroup;

  width: string = '40%';
  height: string = '40%';
  dragPosition = { x: 0, y: 0 };


  content: string = 'You can find your saved notes inside notes folder in Explorer.';

  ngOnChanges(changes: SimpleChanges): void {
    if (this.file.app === 'notes') {
      this.content = this.file.link;
    }
  }

  close() {
    this.isNotesOpen.emit({ appName: "notes", status: false });
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

  save() {
    this.notesForm.setValue({
      fileName: this.notesForm.value.fileName + '.txt',
      content: this.content,
    });

    if(this.notesForm.valid) {
      this.notesService.saveFile(this.notesForm.value)
        .subscribe((res) => {
            this.close();
          }
        )
    }
  }
}
