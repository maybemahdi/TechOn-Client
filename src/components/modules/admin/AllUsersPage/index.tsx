"use client";
import Loading from "@/components/ui/core/Loading/Loading";
import {
  useChangeUserStatusMutation,
  useGetAllUserQuery,
} from "@/redux/features/admin/admin.api";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Pagination, Table, Tag } from "antd";
import { useState } from "react";

enum Status {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: Status;
  createdAt: string;
};

const AllUsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [objectQuery, setObjectQuery] = useState<
    { name: string; value: any }[]
  >([
    {
      name: "page",
      value: currentPage,
    },
    {
      name: "limit",
      value: pageSize,
    },
  ]);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllUserQuery(objectQuery);
  const users: User[] = response?.data?.result || [];

  //   const [users, setUsers] = useState([
  //     { name: "John Doe", email: "R0HsE@example.com", status: Status.ACTIVE },
  //     { name: "Jane Doe", email: "Jane@example.com", status: Status.BLOCKED },
  //     {
  //       name: "Michael Smith",
  //       email: "michael.smith@example.com",
  //       status: Status.PENDING,
  //     },
  //     {
  //       name: "Emily Johnson",
  //       email: "emily.j@example.com",
  //       status: Status.ACTIVE,
  //     },
  //     {
  //       name: "David Brown",
  //       email: "david.b@example.com",
  //       status: Status.BLOCKED,
  //     },
  //     {
  //       name: "Sophia Miller",
  //       email: "sophia.m@example.com",
  //       status: Status.ACTIVE,
  //     },
  //     {
  //       name: "Daniel Wilson",
  //       email: "daniel.w@example.com",
  //       status: Status.PENDING,
  //     },
  //     {
  //       name: "Olivia Taylor",
  //       email: "olivia.t@example.com",
  //       status: Status.ACTIVE,
  //     },
  //     {
  //       name: "James Anderson",
  //       email: "james.a@example.com",
  //       status: Status.BLOCKED,
  //     },
  //     {
  //       name: "Isabella Thomas",
  //       email: "isabella.t@example.com",
  //       status: Status.PENDING,
  //     },
  //   ]);

  const [changeStatus] = useChangeUserStatusMutation();
  const handleStatusChange = async (id: string, newStatus: Status) => {
    await handleAsyncWithToast(async () => {
      return changeStatus({
        userId: id,
        status: newStatus,
      });
    }, "Changing user status...");
  };

  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <span className="capitalize">{role?.toLowerCase()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: Status.ACTIVE },
        { text: "Pending", value: Status.PENDING },
        { text: "Blocked", value: Status.BLOCKED },
      ],
      onFilter: (value: string | number | boolean, record: any) =>
        record.status === value,
      render: (status: Status) => {
        const color =
          status === Status.ACTIVE
            ? "green"
            : status === Status.PENDING
            ? "gold"
            : "red";
        return (
          <Tag className="capitalize" color={color}>
            {status?.toLowerCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (_: any, record: any) => {
        const menuItems = [
          {
            key: "1",
            label: "Set Active",
            onClick: () => handleStatusChange(record?.id, Status.ACTIVE),
          },
          {
            key: "2",
            label: "Set Blocked",
            onClick: () => handleStatusChange(record?.id, Status.BLOCKED),
          },
          //   {
          //     key: "3",
          //     label: "Set Pending",
          //     onClick: () => handleStatusChange(record?.id, Status.PENDING),
          //   },
        ];

        return (
          <Dropdown menu={{ items: menuItems }} placement="bottomRight">
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <Table
        columns={columns}
        dataSource={users.map((u, i) => ({ ...u, key: i }))}
        pagination={false}
        bordered
      />
      {/* Pagination */}
      <div className="flex items-center justify-center w-fit mx-auto gap-4 my-5">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={response?.data?.totalData}
          onChange={handlePageChange}
          className="custom-pagination"
        />
      </div>
    </div>
  );
};

export default AllUsersPage;
