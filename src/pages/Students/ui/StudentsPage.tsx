import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { User } from "@heroui/user";
import { Spinner } from "@heroui/spinner";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useStudents } from "@/shared/services/students/useStudents";

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useStudents(1);

  const filteredStudents = data?.results?.filter((s) =>
    s.full_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Students Table */}
      <Card className="p-4" radius="lg">
        <CardHeader>
          <h3 className="text-3xl font-medium">Ученики</h3>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner size="lg" />
            </div>
          ) : isError ? (
            <div className="py-8 text-center text-danger-500">
              Ошибка загрузки данных
            </div>
          ) : (
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
                      Пол
                    </th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                      Статус
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents && filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-default-200 hover:bg-default-50"
                      >
                        <td className="py-3 px-4">
                          <User
                            name={student.full_name}
                            description={student.username}
                            avatarProps={{
                              src: student.avatar ?? undefined,
                              size: "sm",
                            }}
                          />
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {student.age} лет
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {student.phone_number || "—"}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {student.gender === "Male" ? "Мужской" : "Женский"}
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-gray-500"
                      >
                        Ученики не найдены
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
