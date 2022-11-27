export type ID = string;

export interface Person {
  id: ID;
  password: string;
  name: string;
  createdAt: string;
}

export interface Question {
  title: string;
  description: string;
}

export interface Review {
  id: ID;
  name: string;
  creator: ID;
  reviewees: ID[];
  question: Question;
  createdAt: string;
}

type AddModel<T> = Omit<T, 'id' | 'createdAt'>;

export type ReviewListItem = Omit<Review, 'reviewees' | 'question'>;

export type PersonDisplay = Omit<Person, 'password' | 'createdAt'>;

export type Login = AddModel<Person>;

export type Signup = AddModel<Person>;

export type ReviewAdd = AddModel<Review>;

export type ReviewUpdate = Omit<Review, 'creator' | 'createdAt'>;

export type ReviewFormValues = {
  name: Review['name'];
  reviewees: Review['reviewees'];
  question: Question['title'];
  questionDescription: Question['description'];
};
