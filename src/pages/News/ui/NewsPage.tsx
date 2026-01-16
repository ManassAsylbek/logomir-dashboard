import DefaultLayout from "@/shared/layouts/ui/DefaultLayout";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight, Search, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import CreateNewsModal from "./CreateNewsModal";
import EditNewsModal from "./EditNewsModal";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { useNews } from "@/shared/services/news/useNews";
import { useDeleteNews } from "@/shared/services/news/useDeleteNews";
import { Spinner } from "@heroui/spinner";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { News } from "@/shared/api/news/types";

export default function NewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<number | null>(null);
  const [newsToEdit, setNewsToEdit] = useState<News | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page] = useState(1);

  const { data: newsData, isLoading } = useNews(page);
  const { mutate: deleteNews, isPending: isDeleting } = useDeleteNews();

  const handleDeleteClick = (id: number) => {
    setNewsToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const handleEditClick = (news: News) => {
    setNewsToEdit(news);
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (newsToDelete) {
      deleteNews(newsToDelete);
      setNewsToDelete(null);
    }
  };

  const filteredNews = newsData?.results?.filter((news) =>
    news.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              onPress={() => setIsModalOpen(true)}
            >
              Добавить новость
            </Button>
          </div>

          {/* News Grid */}
          <Card className="p-4" radius="lg">
            <CardHeader>
              <h3 className="text-3xl font-medium">Новости</h3>
            </CardHeader>
            <CardBody>
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Spinner size="lg" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredNews && filteredNews.length > 0 ? (
                    filteredNews.map((news) => (
                      <Card
                        key={news.id}
                        className="relative group border-none shadow-sm"
                      >
                        <CardBody className="p-0">
                          <div className="relative">
                            <img
                              src={
                                news.image ||
                                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
                              }
                              alt={news.name}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2">
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button
                                    size="sm"
                                    variant="light"
                                    isIconOnly
                                    className="bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white"
                                  >
                                    ⋮
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Действия">
                                  <DropdownItem
                                    key="edit"
                                    startContent={<Edit size={16} />}
                                    onPress={() => handleEditClick(news)}
                                  >
                                    Редактировать
                                  </DropdownItem>
                                  <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    startContent={<Trash2 size={16} />}
                                    onPress={() => handleDeleteClick(news.id)}
                                  >
                                    Удалить
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="p-4 bg-white">
                            <h4 className="text-base font-medium mb-2 line-clamp-2 min-h-[3rem]">
                              {news.name}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                              {news.decription}
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center text-gray-500">
                      Новости не найдены
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </DefaultLayout>

      <CreateNewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <EditNewsModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setNewsToEdit(null);
        }}
        news={newsToEdit}
      />

      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => {
          setIsConfirmDeleteOpen(false);
          setNewsToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Удаление новости"
        message="Вы уверены, что хотите удалить эту новость? Это действие нельзя отменить."
        confirmText="Удалить"
        cancelText="Отмена"
        isLoading={isDeleting}
        type="danger"
      />
    </>
  );
}
