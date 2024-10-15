import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'names'
  })
  export class NamesPipe implements PipeTransform {
    transform(input: any, field = '', sep = ','): string {
        let names: string[] = [];
        if (field) {
            input?.forEach((item: any) => {
                names.push(item[field]);
            })
        } else {
            names = input;
        }
        return names?.join(sep);
    }
}