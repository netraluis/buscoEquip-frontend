import { TryDoc } from './try.types';

export type MatchDoc = {
  tryReference: string[] | TryDoc[], 
  type: string,
  title: string,
  description: string | null,
  offerUser: string | null,
  joinUser: string | null,
  selected: boolean
}