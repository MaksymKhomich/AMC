import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rover'
})
export class FilterRoverPipe implements PipeTransform {
    transform(items: any[], prof: string): any[] {
        if (!items) return [];
        if (!prof) return items;
        
        return items.filter(item => {
            return Object.keys(item).some(key => {
                return String(item[key]).toLowerCase().includes(prof.toLowerCase());
            });
        });
    }
}