import { EventTypeEnum } from '../enums/EventTypeEnum';

export interface IMonthViewEvent {
  id: number;
  ticker: string;
  eventDate: string;
  logo: string;
  amount: number;
  total: number;
  eventType: EventTypeEnum;
  projected: boolean;
}
