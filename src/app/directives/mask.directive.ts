import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[mask]',
  standalone: true,
})
export class MaskDirective {
  @Input('mask') mask: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(_event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value;

    if (this.mask === 'no-numbers') {
      value = value.replace(/\d/g, '');
    } else if (this.mask) {
      value = value.replace(/\D/g, '');
      value = this.applyMask(value, this.mask);
    }

    input.value = value;
  }

  private applyMask(value: string, mask: string): string {
    let maskedValue = '';
    let dataIndex = 0;

    for (const char of mask) {
      if (dataIndex >= value.length) {
        break;
      } else if (char === '0' && dataIndex < value.length) {
        maskedValue += value[dataIndex++];
      } else if (char !== '0') {
        maskedValue += char;
      }
    }

    return maskedValue;
  }
}
