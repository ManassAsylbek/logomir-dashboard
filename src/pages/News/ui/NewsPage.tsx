import DefaultLayout from "@/shared/layouts/ui/DefaultLayout";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import CreateNewsModal from "./CreateNewsModal";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Новые методы развития речи",
    description: "Открываем набор на курс развития речи...",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    date: "2024-11-28",
  },
  {
    id: 2,
    title: "Советы логопедов: как заниматься дома",
    description: "Логопеды составили подробный план занятий дома...",
    image:
      "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop",
    date: "2024-11-25",
  },
  {
    id: 3,
    title: "Игры для развития речи ребенка",
    description: "Топ-10 развивающих игр для малышей...",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
    date: "2024-11-20",
  },
  {
    id: 4,
    title: "Как выбрать логопеда для ребенка",
    description: "Важно обратить внимание на следующие факторы...",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    date: "2024-11-18",
  },
  {
    id: 5,
    title: "Раскидывания по уходу за голосом",
    description: "Советы профессионалов для всех кто работает голосом...",
    image:
      "https://images.unsplash.com/photo-1505944357318-6743a9cb51e3?w=400&h=300&fit=crop",
    date: "2024-11-15",
  },
  {
    id: 6,
    title: "Новые технологии в логопедии",
    description: "Инновационные методы лечения нарушений речи...",
    image:
      "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=400&h=300&fit=crop",
    date: "2024-11-10",
  },
  {
    id: 7,
    title: "Развитие речи у детей с аутизмом",
    description: "Как помочь ребёнку с РАС развивать речь...",
    image:
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=300&fit=crop",
    date: "2024-11-05",
  },
  {
    id: 8,
    title: "Влияние двуязычия на развитие речи",
    description: "Как поддерживать развитие двух языков у детей...",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
    date: "2024-11-01",
  },
];

export default function NewsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setMenuOpen(menuOpen === id ? null : id);
  };

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockNews.map((news) => (
                  <Card
                    key={news.id}
                    className="relative group border-none shadow-sm"
                  >
                    <CardBody className="p-0">
                      <div className="relative">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={() => toggleMenu(news.id)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                          >
                            <svg
                              width="4"
                              height="16"
                              viewBox="0 0 4 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="2" cy="2" r="2" fill="#6B7280" />
                              <circle cx="2" cy="8" r="2" fill="#6B7280" />
                              <circle cx="2" cy="14" r="2" fill="#6B7280" />
                            </svg>
                          </button>
                          {menuOpen === news.id && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]">
                              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm rounded-t-lg transition-colors">
                                Редактировать
                              </button>
                              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600 rounded-b-lg transition-colors">
                                Удалить новость
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <h4 className="text-base font-medium mb-2 line-clamp-2 min-h-[3rem]">
                          {news.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                          {news.description}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </DefaultLayout>

      <CreateNewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
