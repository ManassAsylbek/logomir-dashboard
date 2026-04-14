import { Card, CardBody, CardHeader } from "@heroui/card";
import { User } from "@heroui/user";
import { Progress } from "@heroui/progress";
import { Button } from "@heroui/button";

interface LessonHistory {
  id: number;
  name: string;
  date: string;
  lessonsCount: number;
  sum: number;
}

const mockLessonHistory: LessonHistory[] = [
  {
    id: 1,
    name: "Хасан Иманалиев",
    date: "24.03.2024",
    lessonsCount: 2,
    sum: 1999,
  },
  {
    id: 2,
    name: "Хасан Иманалиев",
    date: "12.02.2024",
    lessonsCount: 1,
    sum: 1000,
  },
  {
    id: 3,
    name: "Хасан Иманалиев",
    date: "12.02.2024",
    lessonsCount: 1,
    sum: 1000,
  },
];

export default function StudentProfilePage() {
  const studentData = {
    name: "Хасан Иманалиев",
    phone: "+996 (777)-44-55-66",
    age: "24 года",
    attendanceRatio: "15/33",
    attendancePercent: 45.45,
    joinDate: "11.02.23 11:28",
    status: "АКТИВЕН",
    avatar: "https://i.pravatar.cc/150?u=student",
  };

  return (
    <div className="space-y-6">
        {/* Profile Card */}
        <Card className="border-2 bg-[#272727]">
          <CardBody className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={studentData.avatar}
                  alt={studentData.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="text-white">
                  <p className="text-sm  mb-1">Профиль</p>
                  <h2 className="text-2xl font-medium mb-1">
                    {studentData.name}
                  </h2>
                  <p className="text-sm ">{studentData.phone}</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Information Card */}
        <Card>
          <CardHeader>
            <h3 className="text-3xl font-medium">Информация</h3>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Имя
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Возраст
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Телефон
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Успеваемость
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Дата старта
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4">
                      <User
                        name={studentData.name}
                        avatarProps={{
                          src: studentData.avatar,
                          size: "sm",
                        }}
                      />
                    </td>
                    <td className="py-4 px-4 text-sm">{studentData.age}</td>
                    <td className="py-4 px-4 text-sm">{studentData.phone}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {studentData.attendanceRatio}
                        </span>
                        <Progress
                          value={studentData.attendancePercent}
                          color="success"
                          size="sm"
                          className="max-w-[100px]"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {studentData.joinDate}
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        size="sm"
                        className="bg-transparent border border-gray-300 text-gray-700 min-w-[100px]"
                        variant="bordered"
                      >
                        {studentData.status}
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        {/* Lesson History Card */}
        <Card>
          <CardHeader>
            <h3 className="text-3xl font-medium">История занятий</h3>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Имя
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Дата занятия
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Количество часов
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                      Сумма (сом)
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockLessonHistory.map((lesson) => (
                    <tr
                      key={lesson.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <User
                          name={lesson.name}
                          avatarProps={{
                            src: `https://i.pravatar.cc/150?u=${lesson.id}`,
                            size: "sm",
                          }}
                        />
                      </td>
                      <td className="py-4 px-4 text-sm">{lesson.date}</td>
                      <td className="py-4 px-4 text-sm">
                        {lesson.lessonsCount}
                      </td>
                      <td className="py-4 px-4 text-sm">{lesson.sum}</td>
                      <td className="py-4 px-4">
                        <Button
                          size="sm"
                          className="bg-transparent border border-gray-300 text-gray-700"
                          variant="bordered"
                        >
                          Добавить примечание
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
  );
}
