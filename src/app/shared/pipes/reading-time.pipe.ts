import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'readingTime',
  standalone: true,
})
export class ReadingTimePipe implements PipeTransform {
  transform(value: string) {
    const WORDS_PER_MINUTE = 200;
    const regex = /\w+/g;
    const wordCount = value.match(regex)?.length;
    const readingTime = wordCount ? Math.ceil(wordCount / WORDS_PER_MINUTE) : 0;

    return {
      minutes: readingTime,
      wordCount: wordCount,
    };
  }
}
