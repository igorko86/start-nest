export type CardType = 'private' | 'public';

export type QueryGetCards = {
  searchValue?: string;
  type?: 'all' | 'favourite';
  cardType?: CardType;
  size?: number;
  page?: number;
  tutorId?: string;
  cardIds?: string[];
};
