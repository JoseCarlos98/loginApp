import { Pipe, PipeTransform } from '@angular/core';
import { Branch } from '../../interfaces/branch.interface';

@Pipe({
  name: 'branch'
})
export class BranchPipe implements PipeTransform {

  

  transform(bran:string): string {
    var nameBranch = ''


    const branchs: Branch[] = [
        {
          id: '600ef5b91cb1b163a1a011a2',
          name: 'Dubai'
        },
        {
          id: '607f145a0c75c25f9b5c5129',
          name: 'USA'
        },
        {
          id: '60df4757fb62cf40a25e79cf',
          name: 'DUB-GRAINDESK'
        },
        {
          id: '5defe517dcf0af574296a00e',
          name: 'Mexico'
        },
        {
          id: '5ccc655727a42911632383d7',
          name: 'Canada'
        },
    ]

    branchs.forEach(el =>{
      if (el.id == bran) {
        nameBranch = el.name;
      } 
    })

    
    return nameBranch;
  }

}
