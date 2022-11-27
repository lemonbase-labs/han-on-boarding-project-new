import { useReviews } from '@/common/api/useReviews';
import { message, Table } from 'antd';
import { ID, ReviewListItem } from '@/common/types';
import type { ColumnsType } from 'antd/lib/table';
import { formatDate } from '@/common/utils/formatDate';
import { bind } from '@/common/utils/bind';
import { useDeleteReview } from '@/common/api/useDeleteReview';

type Props = {
  onSelectReview: (id: string) => void;
};

type Columns = { key: ReviewListItem['id'] } & Omit<ReviewListItem, 'id'>;

const useReviewTable = ({ onSelectReview }: Props) => {
  const { data: reviews, revalidate } = useReviews();
  const requestDelete = useDeleteReview();

  const deleteReview = async (id: ID) => {
    const { error } = await requestDelete(id);
    if (error) {
      message.error(error);
      return;
    }
    message.success({
      content: '삭제 성공',
      className: 'review-deleted-toast',
    });
    revalidate();
  };

  const rows = reviews?.map(({ id, name, creator, createdAt }) => ({
    key: id,
    name,
    creator,
    createdAt: formatDate(new Date(createdAt)),
  }));

  const columns: ColumnsType<Columns> = [
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
      render: (text, { key }) => (
        <a
          data-test="review-list-item-name"
          onClick={() => onSelectReview(key)}
        >
          {text}
        </a>
      ),
    },
    {
      title: '작성자',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: '생성일',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '삭제',
      key: 'delete',
      render: (_, { key }) => (
        <a
          data-test="review-list-item-delete"
          onClick={() => deleteReview(key)}
        >
          삭제
        </a>
      ),
    },
  ];

  return { rows, columns };
};

export const ReviewTable = bind(useReviewTable, ({ rows, columns }) => (
  <Table
    rowClassName="review-list-item"
    pagination={false}
    dataSource={rows}
    columns={columns}
  />
));
