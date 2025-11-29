import DefaultLayout from "@/shared/layouts/ui/DefaultLayout";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import CreateTherapistModal from "./CreateTherapistModal";

interface Therapist {
  id: number;
  name: string;
  email: string;
  phone: string;
  telegram: string;
  whatsapp: string;
}

const mockTherapists: Therapist[] = [
  {
    id: 1,
    name: "Хасан Иманалиев",
    email: "example@mail.com",
    phone: "+996 (777) 777-777",
    telegram: "@example",
    whatsapp: "+996 (777) 777-777",
  },
  {
    id: 2,
    name: "Алиса Турсунова",
    email: "alisa.t@example.com",
    phone: "+996 (558) 555 555",
    telegram: "@alisat",
    whatsapp: "+996 (558) 555 555",
  },
  {
    id: 3,
    name: "Игорь Смирнов",
    email: "igor.smirnov@example.com",
    phone: "+996 (888) 888 888",
    telegram: "@igors.m",
    whatsapp: "+996 (888) 888 888",
  },
  {
    id: 4,
    name: "Елена Кузнецова",
    email: "elena.k@example.com",
    phone: "+996 (666) 666 666",
    telegram: "@elenak.k",
    whatsapp: "+996 (666) 666 666",
  },
  {
    id: 5,
    name: "Дмитрий Васильев",
    email: "dmitry.v@example.com",
    phone: "+996 (444) 444 444",
    telegram: "@dmitry.v",
    whatsapp: "+996 (444) 444 444",
  },
  {
    id: 6,
    name: "Светлана Петрова",
    email: "svetlana.p@example.com",
    phone: "+996 (111) 111 111",
    telegram: "@svetlana.p",
    whatsapp: "+996 (111) 111 111",
  },
  {
    id: 7,
    name: "Олег Николаев",
    email: "oleg.n@example.com",
    phone: "+996 (222) 222 222",
    telegram: "@oleg.n",
    whatsapp: "+996 (222) 222 222",
  },
  {
    id: 8,
    name: "Мария Сергеева",
    email: "maria.s@example.com",
    phone: "+996 (333) 333 333",
    telegram: "@maria.s",
    whatsapp: "+996 (333) 333 333",
  },
  {
    id: 9,
    name: "Артём Фёдоров",
    email: "artyom.f@example.com",
    phone: "+996 (999) 999 999",
    telegram: "@artyom.f",
    whatsapp: "+996 (999) 999 999",
  },
  {
    id: 10,
    name: "Наталья Смирнова",
    email: "natalya.s@example.com",
    phone: "+996 (777) 888 999",
    telegram: "@natalya.s",
    whatsapp: "+996 (777) 888 999",
  },
  {
    id: 11,
    name: "Павел Лебедев",
    email: "pavel.l@example.com",
    phone: "+996 (555) 444 333",
    telegram: "@pavel.l",
    whatsapp: "+996 (555) 444 333",
  },
];

export default function TherapistsPage() {
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
              Создать сотрудника
            </Button>
          </div>

          {/* Therapists Table */}
          <Card className="p-4" radius="lg">
            <CardHeader>
              <h3 className="text-3xl font-medium">Логопеды</h3>
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-y">
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                        ФИО
                      </th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                        Email
                      </th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                        Телефон
                      </th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                        Telegram
                      </th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                        Whatsapp
                      </th>
                      <th className="text-left py-2 px-4 text-sm font-medium text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTherapists.map((therapist) => (
                      <tr
                        key={therapist.id}
                        className="border-b border-default-200 hover:bg-default-50"
                      >
                        <td className="py-3 px-4 text-sm">{therapist.name}</td>
                        <td className="py-3 px-4 text-sm">{therapist.email}</td>
                        <td className="py-3 px-4 text-sm">{therapist.phone}</td>
                        <td className="py-3 px-4 text-sm">
                          {therapist.telegram}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          {therapist.whatsapp}
                        </td>
                        <td className="py-3 px-4 relative">
                          <button
                            onClick={() => toggleMenu(therapist.id)}
                            className="p-1 hover:bg-gray-200 rounded"
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
                          {menuOpen === therapist.id && (
                            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
                              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                                Редактировать
                              </button>
                              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600">
                                Удалить сотрудника
                              </button>
                            </div>
                          )}
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

      <CreateTherapistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
