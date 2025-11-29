import DefaultLayout from "@/shared/layouts/ui/DefaultLayout";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { User } from "@heroui/user";
import { Progress } from "@heroui/progress";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { CustomRangeDatePicker } from "@/shared/ui/CustomRangeDatePicker";

interface Student {
  id: number;
  name: string;
  age: string;
  phone: string;
  branch: string;
  attendance: number;
  status: "active" | "inactive";
}

const mockStudents: Student[] = [
  {
    id: 1,
    name: "Оузов Хасан",
    age: "4 года",
    phone: "+996 (504) 34-44-56",
    branch: "№1",
    attendance: 76.24,
    status: "active",
  },
  {
    id: 2,
    name: "Майко Денис",
    age: "7 лет",
    phone: "+996 (555) 22-33-44",
    branch: "№1",
    attendance: 85.5,
    status: "active",
  },
  {
    id: 3,
    name: "Иван Петра",
    age: "6 лет",
    phone: "+996 (777) 33-44-55",
    branch: "№2",
    attendance: 62.18,
    status: "active",
  },
  {
    id: 4,
    name: "Иван Портиерей",
    age: "8 лет",
    phone: "+996 (500) 56-66-77",
    branch: "№1",
    attendance: 76.24,
    status: "active",
  },
  {
    id: 5,
    name: "Джеми Даниелов",
    age: "6 лет",
    phone: "+996 (502) 56-77-33",
    branch: "№2",
    attendance: 85.5,
    status: "active",
  },
  {
    id: 6,
    name: "Бекзанов Мехтар",
    age: "7 лет",
    phone: "+996 (558) 32-44-55",
    branch: "№1",
    attendance: 62.18,
    status: "active",
  },
  {
    id: 7,
    name: "Максо Тескмейло",
    age: "8 лет",
    phone: "+996 (504) 56-66-77",
    branch: "№1",
    attendance: 76.24,
    status: "active",
  },
  {
    id: 8,
    name: "Иван Портиерей",
    age: "8 лет",
    phone: "+996 (777) 56-66-77",
    branch: "№2",
    attendance: 76.24,
    status: "active",
  },
  {
    id: 9,
    name: "Хасан Лю",
    age: "3 года",
    phone: "+996 (504) 77-88-99",
    branch: "№1",
    attendance: 85.5,
    status: "active",
  },
  {
    id: 10,
    name: "Харона Лен",
    age: "8 лет",
    phone: "+996 (777) 32-44-55",
    branch: "№1",
    attendance: 62.18,
    status: "active",
  },
  {
    id: 11,
    name: "София Морозова",
    age: "6 лет",
    phone: "+996 (502) 33-44-55",
    branch: "№2",
    attendance: 76.24,
    status: "active",
  },
  {
    id: 12,
    name: "Зеита Дьюзеона",
    age: "4 года",
    phone: "+996 (555) 22-33-44",
    branch: "№1",
    attendance: 85.5,
    status: "active",
  },
];

export default function StudentsPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-6">
        {/* Filters */}
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Поиск"
            startContent={<Search className="text-default-400" size={20} />}
            className="max-w-4xl"
            classNames={{ inputWrapper: "bg-white" }}
            variant="bordered"
            size="lg"
            radius="full"
          />
          <div className="flex gap-2">
            <CustomRangeDatePicker />
          </div>
        </div>
        {/* Students Table */}
        <Card className="p-4" radius="lg">
          <CardHeader>
            <h3 className="text-3xl font-medium">Ученики</h3>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y">
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Имя
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Возраст
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Телефон
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Успеваемость
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Дата старта
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-default-200 hover:bg-default-50"
                    >
                      <td className="py-3 px-4">
                        <User
                          name={student.name}
                          avatarProps={{
                            src: `https://i.pravatar.cc/150?u=${student.id}`,
                            size: "sm",
                          }}
                        />
                      </td>
                      <td className="py-3 px-4 text-sm">{student.age}</td>
                      <td className="py-3 px-4 text-sm">{student.phone}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs px-2 py-1 bg-success-100 text-success-700 rounded">
                          {student.branch}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Progress
                            value={student.attendance}
                            color={
                              student.attendance >= 80
                                ? "success"
                                : student.attendance >= 60
                                  ? "warning"
                                  : "danger"
                            }
                            size="sm"
                            className="max-w-[100px]"
                          />
                          <span className="text-sm font-medium">
                            {student.attendance}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-xs px-2 py-1 bg-success-100 text-success-700 rounded">
                          Активен
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          as={Link}
                          to={`/students/${student.id}`}
                          size="sm"
                          color="success"
                          variant="flat"
                        >
                          Открыть
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
}
