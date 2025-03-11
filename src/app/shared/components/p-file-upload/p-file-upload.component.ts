import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core'; import { MessageService } from 'primeng/api';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { PrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button'; 
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage, OutputFormat } from 'ngx-image-cropper';
import { SelectModule } from 'primeng/select';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ControlValueAccessor, FormBuilder, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-p-file-upload',
  imports: [
    FormsModule,
    FileUpload,
    ButtonModule,
    BadgeModule,
    ToastModule,
    CommonModule,
    SelectModule,
    ToggleSwitch,
    ImageCropperComponent
  ],
  templateUrl: './p-file-upload.component.html',
  styleUrl: './p-file-upload.component.scss',
  providers: [
    MessageService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PFileUploadComponent),
      multi: true
    }
  ]
})
export class PFileUploadComponent implements ControlValueAccessor{

  @Input() acceptFile?: string = "";
  @Input() selectedRatio?: number = 4/3;
  @Input() aspectRatios?: {[key: string]: string | number}[] = [
    { label: '1:1', value: 1 / 1 },
    { label: '16:9', value: 16 / 9 },
    { label: '4:3', value: 4 / 3 }
  ];
  @Input() supportedFormats?: {[key: string]: string | number}[] = [
    { label: 'PNG', value: 'png' },
    { label: 'JPEG', value: 'jpeg' },
    { label: 'WEBP', value: 'webp' }
  ];
  @Input() customUpload?: boolean = false;
  @Input() freeTransform?: boolean = false;
  @Input() selectedFormat?: OutputFormat | undefined = "jpeg";
  @Input() maxFileSize?: number = 0;
  @Input() multipleUpload?: boolean = false;

  @Output() onFileUpload: EventEmitter<{[key: string]: any}> = new EventEmitter<{[key: string]: any}>()
  @Output() onFileError: EventEmitter<{[key: string]: any}> = new EventEmitter<{[key: string]: any}>()


  public isCropEnabled: boolean = false;
  public imageFile: any;
  public croppedImage: any;
  public amberSwitch = {
    handle: {
      borderRadius: '4px'
    },
    colorScheme: {
      light: {
        root: {
          checkedBackground: '{amber.500}',
          checkedHoverBackground: '{amber.600}',
          borderRadius: '4px'
        },
        handle: {
          checkedBackground: '{amber.50}',
          checkedHoverBackground: '{amber.100}'
        }
      },
      dark: {
        root: {
          checkedBackground: '{amber.400}',
          checkedHoverBackground: '{amber.300}',
          borderRadius: '4px'
        },
        handle: {
          checkedBackground: '{amber.900}',
          checkedHoverBackground: '{amber.800}'
        }
      }
    }
  };

  public uploadedFiles: any[] = [];

  private onChange: (file: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(
    private config: PrimeNG,
    private readonly fb: FormBuilder,
    private messageService: MessageService
  ) {}


  writeValue(value: any): void {
    this.imageFile = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  choose(event: any, callback: any) {
    callback();
  }

  manageImageCroper() {
    this.imageFile = "";
    this.croppedImage = "";
    this.uploadedFiles = [];
    this.onFileUpload.emit({files: this.imageFile, objectUrl: this.croppedImage, uploadedFiles: this.uploadedFiles});
  }

  uploadEvent(callback: any) {
    console.log("calling uploadEvent");
    callback();
  }

  onTemplatedUpload(event: any) {
    this.imageFile = event.files[0];
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.onFileUpload.emit({files: this.imageFile, objectUrl: this.croppedImage, uploadedFiles: this.uploadedFiles});
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  onRemoveTemplatingFile(event: any, file: any, removeFileCallback: any, index: any) {
    removeFileCallback(event, index);
    this.manageImageCroper()
  }

  downloadImage(file: any) {
    file = this.croppedImage ? this.croppedImage : file;
    const link = document.createElement('a');
    link.href = file
    link.download = 'cropped-image.' + this.selectedFormat; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onSelect(e: FileSelectEvent) {
    this.imageFile = e.files[0];
  }

  onError(event: any) {
    console.log("event", event)
    this.onFileError.emit(event);
  }

  formatSize(bytes: any) {
      const k = 1024;
      const dm = 3;
      const sizes: any = this.config.translation.fileSizeTypes;
      if (bytes === 0) {
          return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes[i]}`;
  }

  imageCropped(e: ImageCroppedEvent) { 
    this.croppedImage = e.objectUrl;
    this.onFileUpload.emit({files: this.imageFile, objectUrl: this.croppedImage, uploadedFiles: this.uploadedFiles});
  }

  imageLoaded(e: LoadedImage) {}
  cropperReady() {}
  loadImageFailed() {
    console.log("calling-----")
  }

  changeAspectRatio(ratio: number) {
    this.selectedRatio = ratio;
  }

  toggleAspectRatio() {
    this.freeTransform = !this.freeTransform;
  }

  changeFormat(format: OutputFormat | undefined) {
    this.selectedFormat = format;
  }

}
