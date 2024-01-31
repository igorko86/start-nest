type Card = {
  id: string;
  name: string;
  image: { original: string; thumbnail: string } | null;
};
export type CardList = {
  totalCount: number;
  content: Card[];
};

export type GetCardList = {
  searchValue?: string;
  cardType?: 'public' | 'private';
};

export type GetCard = Card & {
  htmlContent: string;
  description: string;
  exercises: any[]; // TODO fix any
};
