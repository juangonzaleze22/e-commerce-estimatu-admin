import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){}

  transform(url): unknown {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
