import { Button, Typography } from "antd";
import { LogoutButton } from "./LogoutButton";
import { useState } from "react";
import { ReviewTable } from "./ReviewTable";
import { UpdateReview } from "./UpdateReview";
import { CreateReview } from "./CreateReview";
import { bind } from "@/common/utils/bind";

const useReviewPage = () => {
  const [selectedReview, setSelectedReview] = useState<string | undefined>();
  const shouldRenderCreate = selectedReview === "new";
  const shouldRenderUpdate = !!selectedReview && !shouldRenderCreate;

  const onClickCreate = () => setSelectedReview("new");
  const onCompleteEdit = () => setSelectedReview(undefined);

  return {
    setSelectedReview,
    onClickCreate,
    shouldRenderCreate,
    onCompleteEdit,
    shouldRenderUpdate,
    selectedReview,
  };
};

export const ReviewPage = bind(
  useReviewPage,
  ({
    setSelectedReview,
    onClickCreate,
    shouldRenderCreate,
    onCompleteEdit,
    shouldRenderUpdate,
    selectedReview,
  }) => (
    <div data-test="review-page">
      <Typography.Title level={2}>리뷰</Typography.Title>
      <ReviewTable onSelectReview={setSelectedReview} />
      <br />
      {}
      <Button block data-test={"create-review"} onClick={onClickCreate}>
        리뷰 생성
      </Button>
      <br />
      <br />
      {shouldRenderCreate && <CreateReview onComplete={onCompleteEdit} />}
      {shouldRenderUpdate && (
        <UpdateReview onComplete={onCompleteEdit} id={selectedReview!} />
      )}
      <br />
      <LogoutButton />
    </div>
  )
);
