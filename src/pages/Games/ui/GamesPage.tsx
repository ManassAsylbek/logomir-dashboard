import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { ArrowRight, Search, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { CreateGameModal } from "./CreateGameModal";
import { useGames } from "@/shared/services/games/useGames";
import { useDeleteGame } from "@/shared/services/games/useDeleteGame";
import { Spinner } from "@heroui/spinner";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";

export default function GamesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page] = useState(1);

  const { data: gamesData, isLoading } = useGames(page);
  const { mutate: deleteGame } = useDeleteGame();

  const handleDelete = (id: number) => {
    if (confirm("Вы уверены, что хотите удалить эту игру?")) {
      deleteGame(id);
    }
  };

  const filteredGames = gamesData?.results?.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header with Search and Button */}
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-y ">
                      <th className="text-left py-2 font-medium text-gray-600">
                        Название
                      </th>
                      <th className="text-left py-2 font-medium text-gray-600">
                        Тема
                      </th>
                      <th className="text-left py-2 font-medium text-gray-600">
                        Количество вопросов
                      </th>
                      <th className="text-left py-2 font-medium text-gray-600">
                        Тип игры
                      </th>
                      <th className="text-left py-2 font-medium text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGames && filteredGames.length > 0 ? (
                      filteredGames.map((game) => (
                        <tr
                          key={game.id}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4">{game.name}</td>
                          <td className="py-4 text-gray-600">{game.theme}</td>
                          <td className="py-4 text-gray-600">
                            {game.questions?.length || 0}
                          </td>
                          <td className="py-4 text-gray-600">
                            {game.game_type}
                          </td>
                          <td className="py-4 text-right">
                            <Dropdown>
                              <DropdownTrigger>
                                <Button
                                  size="sm"
                                  variant="light"
                                  className="text-gray-600"
                                >
                                  ⋮
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu aria-label="Действия">
                                <DropdownItem
                                  key="edit"
                                  startContent={<Edit size={16} />}
                                >
                                  Редактировать
                                </DropdownItem>
                                <DropdownItem
                                  key="delete"
                                  className="text-danger"
                                  color="danger"
                                  startContent={<Trash2 size={16} />}
                                  onPress={() => handleDelete(game.id)}
                                >
                                  Удалить
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-gray-500"
                        >
                          Игры не найдены
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

      <CreateGameModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
