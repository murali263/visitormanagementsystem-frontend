import { Directive } from '@angular/core';

@Directive({
  selector: '[appFirstletter]'
})
export class FirstletterDirective {

  transform(value:string): string {
    let first = value.substring(0,1).toUpperCase();
    return first + value.substring(1); 
  }

}
