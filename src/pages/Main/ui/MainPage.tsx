import { Card, CardBody, CardHeader } from "@heroui/card";
import { Users, CalendarDays, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import {
  getRouteStudents,
  getRouteScheduledLessons,
} from "@/shared/const/router";

export default function MainPage() {
  const stats = [
    {
      id: 1,
      title: "Всего учеников",
      value: "156",
      icon: <Users className="text-success-600" size={32} />,
      change: "+12%",
      link: getRouteStudents(),
    },
    {
      id: 2,
      title: "Занятий сегодня",
      value: "24",
      icon: <CalendarDays className="text-warning-600" size={32} />,
      change: "+5%",
      link: getRouteScheduledLessons(),
    },

    {
      id: 4,
      title: "Средняя посещаемость",
      value: "78%",
      icon: <TrendingUp className="text-danger-600" size={32} />,
      change: "+3%",
      link: getRouteStudents(),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Добро пожаловать!</h1>
        <p className="text-default-500">Обзор системы управления школой</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.id} className="p-4">
            <CardBody className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>{stat.icon}</div>
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith("+")
                      ? "text-success-600"
                      : "text-default-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-default-500 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <Button
                as={Link}
                to={stat.link}
                size="sm"
                variant="flat"
                color="success"
              >
                Подробнее
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader>
            <h3 className="text-xl font-semibold">Последние обновления</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium">Новый ученик добавлен</p>
                  <p className="text-sm text-default-500">
                    София Морозова - Филиал №1
                  </p>
                  <p className="text-xs text-default-400 mt-1">2 часа назад</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warning-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium">Занятие запланировано</p>
                  <p className="text-sm text-default-500">Группа А - 14:00</p>
                  <p className="text-xs text-default-400 mt-1">5 часов назад</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2" />
                <div>
                  <p className="font-medium">Филиал обновлен</p>
                  <p className="text-sm text-default-500">
                    Обновлены контактные данные
                  </p>
                  <p className="text-xs text-default-400 mt-1">1 день назад</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <h3 className="text-xl font-semibold">Быстрые действия</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-3">
              <Button
                as={Link}
                to={getRouteStudents()}
                color="success"
                variant="flat"
                startContent={<Users size={20} />}
              >
                Ученики
              </Button>
              <Button
                as={Link}
                to={getRouteScheduledLessons()}
                color="warning"
                variant="flat"
                startContent={<CalendarDays size={20} />}
              >
                Занятия
              </Button>

              <Button
                color="default"
                variant="flat"
                startContent={<TrendingUp size={20} />}
              >
                Отчеты
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
