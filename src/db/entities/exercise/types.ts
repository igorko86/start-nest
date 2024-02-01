export type ExerciseType = 'private' | 'public';

export type QuestionsTypes = 'true-false' | 'input-select' | 'check-box';

export type QuestionItem = {
  question: string;
  type: QuestionsTypes;
  options?: { value: string; label: string }[];
  answer?: string;
  correctAnswer?: string;
};

export type QueryGetExercises = {
  searchValue?: string;
  type?: 'all' | 'favourite';
  exerciseType?: ExerciseType;
  size?: number;
  page?: number;
  tutorId?: string;
  exerciseIds?: string[];
};
