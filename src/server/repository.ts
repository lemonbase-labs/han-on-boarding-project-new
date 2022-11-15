import type {
  Person,
  PersonAdd,
  Review,
  ReviewAdd,
  ReviewUpdate,
} from "@/common/types";
import { v4 as generateID } from "uuid";

type Source = {
  people: Person[];
  reviews: Review[];
};

type AddModel = {
  people: PersonAdd;
  reviews: ReviewAdd;
};

const source: Source = {
  people: [],
  reviews: [],
};

const create =
  <T extends keyof Source>(entityType: T) =>
  (creating: AddModel[T]) => {
    const newID = generateID();
    const createdAt = Date();
    const newData = { id: newID, createdAt, ...creating };

    source[entityType] = [...source[entityType], newData] as Source[T];

    const indexCreated = source[entityType].length - 1;

    return source[entityType][indexCreated];
  };

const createPerson = create("people");

const createReview = create("reviews");

const getPeople = () => [...source.people];

const getReviews = () => [...source.reviews];

const findPersonByName = (findingName: Person["name"]) => {
  return source.people.find(({ name }) => name === findingName);
};

const findReview = (findingID: Review["id"]) => {
  return source.reviews.find(({ id }) => id === findingID);
};

const updateReview = (review: ReviewUpdate) => {
  const { id: updatingID } = review;

  let indexUpdated: number | undefined = undefined;
  source.reviews = source.reviews.map((original, index) => {
    if (original.id === updatingID) {
      indexUpdated = index;
      return { ...original, ...review };
    }
    return original;
  });

  const updated = indexUpdated ? source.reviews[indexUpdated] : undefined;

  return updated;
};

const deleteReview = (id: Review["id"]) => {
  source.reviews = source.reviews.filter((review) => review.id !== id);

  return source.reviews;
};

const reviews = {
  getAll: getReviews,
  create: createReview,
  find: findReview,
  update: updateReview,
  delete: deleteReview,
};

const people = {
  getAll: getPeople,
  findByName: findPersonByName,
  create: createPerson,
};

export { reviews, people };

const createDefaultData = () => {
  source.people = [
    { id: "1", name: "han", password: "1", createdAt: Date() },
    { id: "2", name: "jake", password: "1", createdAt: Date() },
  ];
  source.reviews = [
    {
      id: "1",
      name: "리뷰 1번",
      reviewees: ["1", "2"],
      createdAt: Date(),
      creator: "han",
      question: { title: "취미", description: "취미를 작성" },
    },
    {
      id: "2",
      name: "리뷰 2번 ~",
      reviewees: ["2"],
      createdAt: Date(),
      creator: "jake",
      question: { title: "노래", description: "노래를 작성" },
    },
  ];
};

createDefaultData();
