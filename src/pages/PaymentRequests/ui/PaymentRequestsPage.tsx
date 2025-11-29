import DefaultLayout from "@/shared/layouts/ui/DefaultLayout";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Search } from "lucide-react";

interface PaymentRequest {
  id: number;
  name: string;
  date: string;
  sum: number;
  status: "paid" | "unpaid";
}

const mockPaymentRequests: PaymentRequest[] = [
  {
    id: 1,
    name: "Хасан Иманалиев",
    date: "24.03.2024",
    sum: 1999,
    status: "paid",
  },
  {
    id: 2,
    name: "Анжи Султанова",
    date: "15.04.2024",
    sum: 1998,
    status: "unpaid",
  },
  {
    id: 3,
    name: "Дмитрий Ковалев",
    date: "30.05.2024",
    sum: 2000,
    status: "paid",
  },
  {
    id: 4,
    name: "Елена Смирнова",
    date: "07.06.2024",
    sum: 1997,
    status: "paid",
  },
  {
    id: 5,
    name: "Игорь Лебедев",
    date: "22.07.2024",
    sum: 2001,
    status: "paid",
  },
  {
    id: 6,
    name: "Светлана Романова",
    date: "12.08.2024",
    sum: 1996,
    status: "paid",
  },
  {
    id: 7,
    name: "Максим Петров",
    date: "28.09.2024",
    sum: 1995,
    status: "paid",
  },
  {
    id: 8,
    name: "Ирина Александрова",
    date: "16.11.2024",
    sum: 1992,
    status: "paid",
  },
  {
    id: 9,
    name: "Андрей Смирнов",
    date: "03.12.2024",
    sum: 1990,
    status: "paid",
  },
];

export default function PaymentRequestsPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-6">
        {/* Search */}
        <div className="flex justify-start">
          <Input
            placeholder="Поиск"
            startContent={<Search className="text-default-400" size={20} />}
            className="max-w-4xl"
            classNames={{ inputWrapper: "bg-white" }}
            variant="bordered"
            size="lg"
            radius="full"
          />
        </div>

        <Card className="p-4" radius="lg">
          <CardHeader>
            <h3 className="text-3xl font-medium">Заявки на оплату</h3>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y ">
                    <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                      Имя
                    </th>
                    <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                      Дата оплаты
                    </th>
                    <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                      Сумма (сом)
                    </th>
                    <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                      Выбрать статус оплаты
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockPaymentRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-b border-default-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm">{request.name}</td>
                      <td className="py-4 px-6 text-sm">{request.date}</td>
                      <td className="py-4 px-6 text-sm">{request.sum}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className={`min-w-[90px] ${
                              request.status === "paid"
                                ? "bg-[#dcfce7] text-[#16a34a] border-[#16a34a]"
                                : "bg-white text-gray-700 border-gray-300"
                            }`}
                            variant="bordered"
                          >
                            Оплачено
                          </Button>
                          <Button
                            size="sm"
                            className={`min-w-[90px] ${
                              request.status === "unpaid"
                                ? "bg-[#fce7f3] text-[#db2777] border-[#db2777]"
                                : "bg-white text-gray-700 border-gray-300"
                            }`}
                            variant="bordered"
                          >
                            Не оплачено
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
        {/* Table */}
      </div>
    </DefaultLayout>
  );
}
