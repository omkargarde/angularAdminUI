import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "searchFilter", standalone: true })
export class FilterPipe implements PipeTransform {
  /**
   * Filters a list of elements based on a search string.
   *
   * @param elements The list of elements to filter.
   * @param search The search string.
   * @returns The filtered list of elements.
   */
  transform(elements: any[], search: string): any[] {
    if (!elements) return [];
    if (!search) return elements;

    const searchLower = search.toLocaleLowerCase();
    return elements.filter((element) => {
      const nameLower = element.name.toLocaleLowerCase();
      const emailLower = element.email.toLocaleLowerCase();
      const roleLower = element.role.toLocaleLowerCase();
      return (
        nameLower.includes(searchLower) ||
        emailLower.includes(searchLower) ||
        roleLower.includes(searchLower)
      );
    });
  }
}
