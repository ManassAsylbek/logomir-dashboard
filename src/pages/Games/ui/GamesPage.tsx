import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { CreateGameModal } from "./CreateGameModal";

export default function GamesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const games = [
    { id: 1, name: "Игра 1", date: "24.03.2024", answers: "8" },
    { id: 2, name: "Игра 1", date: "12.02.2024", answers: "8" },
    { id: 3, name: "Игра 1", date: "15.01.2024", answers: "8" },
    { id: 4, name: "Игра 1", date: "30.04.2024", answers: "8" },
    { id: 5, name: "Игра 1", date: "05.03.2024", answers: "8" },
    { id: 6, name: "Игра 1", date: "18.05.2024", answers: "8" },
    { id: 7, name: "Игра 1", date: "22.06.2024", answers: "8" },
    { id: 8, name: "Игра 1", date: "12.02.2024", answers: "8" },
    { id: 9, name: "Игра 1", date: "12.02.2024", answers: "8" },
    { id: 10, name: "Игра 1", date: "12.09.2024", answers: "8" },
    { id: 11, name: "Игра 1", date: "28.10.2024", answers: "8" },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header with Search and Button */}
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
          <Button
            radius="full"
            size="lg"
            className="bg-[#2d2d2d] text-white w-fit pr-2"
            endContent={
              <div className=" right-2 w-9 h-9 bg-green-400 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-gray-800" />
              </div>
            }
            onPress={() => setIsCreateModalOpen(true)}
          >
            Создать игру
          </Button>
        </div>

        {/* Games Card */}
        <Card className="p-4" radius="lg">
          <CardHeader>
            <h2 className="text-3xl font-medium">Игры</h2>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y ">
                    <th className="text-left py-2 font-medium text-gray-600">
                      Название
                    </th>
                    <th className="text-left py-2 font-medium text-gray-600">
                      Дата создания
                    </th>
                    <th className="text-left py-2 font-medium text-gray-600">
                      Количество вопросов
                    </th>
                    <th className="text-left py-2 font-medium text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr
                      key={game.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4">{game.name}</td>
                      <td className="py-4 text-gray-600">{game.date}</td>
                      <td className="py-4 text-gray-600">{game.answers}</td>
                      <td className="py-4 text-right">
                        <Button
                          size="sm"
                          variant="light"
                          className="text-gray-600"
                        >
                          ⋮
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

      <CreateGameModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
