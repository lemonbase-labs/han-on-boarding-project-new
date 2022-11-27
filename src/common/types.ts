export type ID = string;

export type Person = {
  id: ID;
  password: string;
  name: string;
  createdAt: string;
};

export type Question = {
  title: string;
  description: string;
};

export type Review = {
  id: ID;
  name: string;
  creator: ID;
  reviewees: ID[];
  question: Question;
  createdAt: string;
};

type AddModel<T> = Omit<T, 'id' | 'createdAt'>;

export type PersonAdd = AddModel<Person>;

export type ReviewListItem = Omit<Review, 'reviewees' | 'question'>;

export type PersonDisplay = Omit<Person, 'password' | 'createdAt'>;

export type Login = PersonAdd;

export type Signup = Login;

export type ReviewAdd = AddModel<Review>;

export type ReviewUpdate = Omit<Review, 'creator' | 'createdAt'>;

export type ReviewFormValues = {
  name: Review['name'];
  reviewees: Review['reviewees'];
  question: Question;
};
