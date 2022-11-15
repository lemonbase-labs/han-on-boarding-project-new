import { useReview } from "@/common/api/useReview";
import { useUpdateReview as useUpdateReviewAPI } from "@/common/api/useUpdateReview";
import { ID, ReviewFormValues } from "@/common/types";
import { bind } from "@/common/utils/bind";
import { message, Typography } from "antd";
import { ReviewForm } from "./ReviewForm";

type Props = {
  id: ID;
  onComplete: () => void;
};

const useUpdateReview = ({ id, onComplete }: Props) => {
  const { data: review } = useReview(id);
  const update = useUpdateReviewAPI();

  const onSubmit = async ({
    name,
    question,
    questionDescription,
    reviewees,
  }: ReviewFormValues) => {
    const payload = {
      id: review!.id,
      name,
      reviewees,
      question: {
        title: question,
        description: questionDescription,
      },
    };
    const { error } = await update(payload);

    if (error) {
      message.error(error);
      return;
    }

    message.success({
      content: "리뷰 수정 완료",
      className: "review-updated-toast",
      duration: 10,
    });
    onComplete();
  };

  return { onSubmit, review };
};

export const UpdateReview = bind(useUpdateReview, ({ onSubmit, review }) => (
  <>
    <Typography.Title level={4}>리뷰 수정</Typography.Title>
    <ReviewForm onSubmit={onSubmit} originalReview={review} />
  </>
));
