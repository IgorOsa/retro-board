import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validator',
})
export class ValidatorPipe implements PipeTransform {
  public transform(errors: any, label: string): string | null {
    if (errors) {
      if (errors?.required) {
        return `${label} is required`;
      }
      const messages = Object?.values(errors).filter(
        (err) => typeof err === 'string'
      );
      if (messages?.length === 0) {
        if (errors.minlength?.requiredLength) {
          return `Minimum ${label.toLocaleLowerCase()} length is ${
            errors.minlength.requiredLength
          } chars`;
        }
        return `${label} is invalid`;
      }
      return messages.join(' ');
    }
    return null;
  }
}
