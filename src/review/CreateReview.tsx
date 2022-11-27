import { useCreateReview as useCreateReviewAPI } from '@/common/api/useCreateReview';
import { useAuth } from '@/common/hooks/useAuth';
import { ReviewFormValues } from '@/common/types';
import { bind } from '@/common/utils/bind';
import { message, Typography } from 'antd';
import { ReviewForm } from './ReviewForm';

type Props = {
  onComplete: () => void;
};

const useCreateReview = ({ onComplete }: Props) => {
  const { person } = useAuth();
  const create = useCreateReviewAPI();

  const onSubmit = async (review: ReviewFormValues) => {
    const payload = {
      ...review,
      creator: person?.name ?? 'unknown',
    };

    const { error } = await create(payload);

    if (error) {
      message.error(error);
      return;
    }

    message.success({
      content: '리뷰 생성 완료',
      className: 'review-created-toast',
      duration: 10,
    });

    onComplete();
  };

  return { onSubmit };
};

export const CreateReview = bind(useCreateReview, ({ onSubmit }) => (
  <>
    <Typography.Title level={4}>리뷰 생성</Typography.Title>
    <ReviewForm onSubmit={onSubmit} />
  </>
));
