import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import type { FormProps } from 'antd';
import { useHistory } from 'react-router-dom';
import { PersonAdd, PersonDisplay } from '@/common/types';
import { useAuth } from '@/common/hooks/useAuth';
import { bind } from '@/common/utils/bind';
import { useIsFormFulfilled } from '@/common/hooks/useIsFormFulfilled';

type Props = {
  formName: string;
  authRequest: (
    arg: PersonAdd
  ) => Promise<
    { data: PersonDisplay; error: boolean } | { data: never; error: string }
  >;
};

const useAuthForm = ({ formName, authRequest }: Props) => {
  const { login } = useAuth();
  const { push } = useHistory();
  const { fulfilled: shouldSubmitActive, onFieldsChange } =
    useIsFormFulfilled();

  const onFinish = async (values: PersonAdd) => {
    const { data, error } = await authRequest(values);

    if (error) {
      message.error({ content: error, className: 'auth-error-message' });
      return;
    }

    login(data);
    push('/review');
  };

  return { onFieldsChange, formName, onFinish, shouldSubmitActive };
};

export const AuthForm = bind(
  useAuthForm,
  ({ onFieldsChange, formName, onFinish, shouldSubmitActive }) => {
    return (
      <Form onFieldsChange={onFieldsChange} name={formName} onFinish={onFinish}>
        <Form.Item label="이름" name="name" rules={[{ required: true }]}>
          <Input data-test={`${formName}-name-input`} />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true }]}
        >
          <Input.Password data-test={`${formName}-password-input`} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button
            data-test={`${formName}-submit`}
            disabled={!shouldSubmitActive}
            type="primary"
            htmlType="submit"
          >
            확인
          </Button>
        </Form.Item>
      </Form>
    );
  }
);
