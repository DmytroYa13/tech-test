import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], searchVal: string, fieldToSearchBy?: string): any[] {
    if (!value) {
      return null;
    }

    if (!searchVal) {
      return value;
    }

    if (fieldToSearchBy) {
      return value.filter((arrItem) => arrItem[fieldToSearchBy]?.toLowerCase().includes(searchVal?.toLowerCase()));
    } else {
      return value.filter((arrItem) => arrItem?.toLowerCase().includes(searchVal?.toLowerCase()));
    }
  }
}
