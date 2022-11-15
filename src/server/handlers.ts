import {
  Login,
  Person,
  PersonAdd,
  ReviewAdd,
  ReviewUpdate,
  Signup,
} from "@/common/types";
import { rest } from "msw";
import { people, reviews } from "./repository";

type GetHandler = Parameters<typeof rest.get>[1];
type PostHandler = Parameters<typeof rest.post>[1];
type PutHandler = Parameters<typeof rest.put>[1];
type DeleteHandler = Parameters<typeof rest.delete>[1];

export const handlers = () => [
  // 로그인 body {name,password}
  rest.post("/api/auth", login),
  // 회원가입 body {name,password}
  rest.post("/api/auth/new", signUp),
  // 회원목록 조회
  rest.get("/api/people", getPeople),
  // 리뷰목록 조회
  rest.get("/api/reviews", getReviews),
  // 리뷰 조회 ?id={reviewId}
  rest.get("/api/review", getReview),
  // 리뷰 생성 body ReviewAdd
  rest.post("/api/review", createReview),
  // 리뷰 수정 body ReviewUpdate
  rest.put("/api/review", updateReview),
  // 리뷰 삭제
  // query : ?id={reviewId}
  rest.delete("/api/review", deleteReview),
];

const login: PostHandler = async (req, res, ctx) => {
  const { name, password }: Login = await req.json();

  if (!name || !password) {
    return res(ctx.status(400));
  }

  const personMatchesName = people.findByName(name);

  if (!personMatchesName) {
    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: `Person doesn't exist`,
      })
    );
  }

  if (personMatchesName.password !== password) {
    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: `Invalid password`,
      })
    );
  }

  return res(
    ctx.status(200),
    ctx.json({ id: personMatchesName.id, name: personMatchesName.name })
  );
};

const signUp: PostHandler = async (req, res, ctx) => {
  const { name, password }: Signup = await req.json();

  if (!name || !password) {
    return res(ctx.status(400));
  }

  const personMatchesName = people.findByName(name);

  if (personMatchesName) {
    return res(
      ctx.status(401),
      ctx.json({
        errorMessage: `Name already exists`,
      })
    );
  }

  const newPerson = people.create({ name, password });

  return res(
    ctx.status(200),
    ctx.json({ id: newPerson.id, name: newPerson.name })
  );
};

const getPeople: GetHandler = (_, res, ctx) => {
  const data = people.getAll().map(({ id, name }) => ({ id, name }));

  return res(ctx.status(200), ctx.json(data));
};

const getReviews: GetHandler = (_, res, ctx) => {
  const data = reviews.getAll().map(({ id, name, creator, createdAt }) => ({
    id,
    name,
    creator,
    createdAt,
  }));

  return res(ctx.status(200), ctx.json(data));
};

const createReview: PostHandler = async (req, res, ctx) => {
  const { name, creator, reviewees, question }: ReviewAdd = await req.json();

  if (
    !name ||
    !creator ||
    !reviewees ||
    !question ||
    !question.title ||
    !question.description
  ) {
    return res(ctx.status(401));
  }

  const created = reviews.create({ name, creator, reviewees, question });

  return res(ctx.status(200), ctx.json(created));
};

const updateReview: PutHandler = async (req, res, ctx) => {
  const { id, name, reviewees, question }: ReviewUpdate = await req.json();

  if (
    !id ||
    !name ||
    !reviewees ||
    !question ||
    !question.title ||
    !question.description
  ) {
    return res(ctx.status(401));
  }

  const updated = reviews.update({ id, name, reviewees, question });

  if (!updated) {
    res(ctx.status(500));
  }

  return res(ctx.status(200), ctx.json(updated));
};

const deleteReview: DeleteHandler = (req, res, ctx) => {
  const id = req.url.searchParams.get("id");

  if (!id) {
    return res(ctx.status(400));
  }

  const reviewsAfterDelete = reviews.delete(id as string);

  return res(ctx.status(200), ctx.json(reviewsAfterDelete));
};

const getReview: GetHandler = (req, res, ctx) => {
  const id = req.url.searchParams.get("id");

  if (!id) {
    return res(ctx.status(400));
  }

  const review = reviews.find(id as string);

  return res(ctx.status(200), ctx.json(review));
};
