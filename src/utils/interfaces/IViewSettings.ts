import { SortByEnum } from '../enums/SortByEnum';
import { SortDirectionEnum } from '../enums/SortDirectionEnum';
import { ViewModeEnum } from '../enums/ViewModeEnum';

export interface IViewModeSettings {
  mode: ViewModeEnum;
  sortBy: SortByEnum;
  sortDirection: SortDirectionEnum
  visibleColumns: string[];
}
