import { usePeople } from "@/common/api/usePeople";
import { useIsFormFulfilled } from "@/common/hooks/useIsFormFulfilled";
import { Review, ReviewFormValues } from "@/common/types";
import { bind } from "@/common/utils/bind";
import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";

const { Option } = Select;

type Props = {
  onSubmit: (arg: ReviewFormValues) => void;
  originalReview?: Review;
};

const useReviewForm = ({ onSubmit, originalReview }: Props) => {
  const [form] = Form.useForm();
  const { fulfilled: shouldSubmitActive, onFieldsChange } =
    useIsFormFulfilled();
  const { data: people } = usePeople();

  useEffect(() => {
    if (originalReview) {
      form.setFieldsValue({
        name: originalReview.name,
        reviewees: originalReview.reviewees,
        question: originalReview.question.title,
        questionDescription: originalReview.question.description,
      });
    }
  }, [form, originalReview]);
  return { form, onSubmit, onFieldsChange, people, shouldSubmitActive };
};

export const ReviewForm = bind(
  useReviewForm,
  ({ form, onSubmit, onFieldsChange, people, shouldSubmitActive }) => (
    <Form
      data-test="edit-review"
      form={form}
      onFinish={onSubmit}
      name="review-form"
      onFieldsChange={onFieldsChange}
    >
      <Form.Item label="이름" name="name" rules={[{ required: true }]}>
        <Input data-test="review-name-input" />
      </Form.Item>
      <Form.Item
        name="reviewees"
        label="대상자"
        rules={[
          {
            type: "array",
            required: true,
          },
        ]}
      >
        <Select
          data-test="review-reviewee-select"
          mode="multiple"
          placeholder="대상자 선택"
        >
          {people?.map(({ id, name }) => (
            <Option
              data-test="review-reviewee-select-option"
              key={id}
              value={id}
            >
              {name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="질문" name="question" rules={[{ required: true }]}>
        <Input data-test="review-question-input" />
      </Form.Item>
      <Form.Item
        label="질문설명"
        name="questionDescription"
        rules={[{ required: true }]}
      >
        <Input data-test="review-description-input" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 9 }}>
        <Button
          data-test={`review-submit`}
          disabled={!shouldSubmitActive}
          type="primary"
          htmlType="submit"
        >
          확인
        </Button>
      </Form.Item>
    </Form>
  )
);
