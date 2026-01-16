import DefaultLayout from "@/shared/layouts/ui/DefaultLayout";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { usePayments } from "@/shared/services/payments/usePayments";
import { useUpdatePayment } from "@/shared/services/payments/useUpdatePayment";
import { Spinner } from "@heroui/spinner";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";

export default function PaymentRequestsPage() {
  const [page] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    id: number;
    status: "success" | "failed";
  } | null>(null);

  const { data: paymentsData, isLoading } = usePayments(page);
  const { mutate: updatePayment, isPending } = useUpdatePayment();

  const handleStatusChange = (
    id: number,
    status: "success" | "failed" | "pending" | "pay_pending"
  ) => {
    setPendingAction({ id, status: status as "success" | "failed" });
    setIsConfirmOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (pendingAction) {
      updatePayment(
        {
          id: pendingAction.id,
          data: { status: pendingAction.status },
        },
        {
          onSuccess: () => {
            setIsConfirmOpen(false);
            setPendingAction(null);
          },
        }
      );
    }
  };

  const filteredPayments = paymentsData?.results || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU");
  };

  const getStatusDisplay = (status?: string) => {
    switch (status) {
      case "success":
        return "Оплачено";
      case "pending":
      case "pay_pending":
        return "Ожидает";
      case "failed":
        return "Не оплачено";
      default:
        return "Неизвестно";
    }
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Card className="p-4" radius="lg">
          <CardHeader>
            <h3 className="text-3xl font-medium">Заявки на оплату</h3>
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
                      <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                        ID Пользователя
                      </th>
                      <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                        Дата создания
                      </th>
                      <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                        Сумма (сом)
                      </th>
                      <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                        Тип урока
                      </th>
                      <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                        Текущий статус
                      </th>
                      <th className="text-left py-2 px-6 text-sm font-medium text-gray-600">
                        Выбрать статус оплаты
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="border-b border-default-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6 text-sm">
                            {payment.user || "—"}
                          </td>
                          <td className="py-4 px-6 text-sm">
                            {payment.created_at
                              ? formatDate(payment.created_at)
                              : "—"}
                          </td>
                          <td className="py-4 px-6 text-sm">
                            {payment.amount || "—"}
                          </td>
                          <td className="py-4 px-6 text-sm">
                            {payment.lesson_type === "online"
                              ? "Онлайн"
                              : payment.lesson_type === "offline"
                                ? "Оффлайн"
                                : "—"}
                          </td>
                          <td className="py-4 px-6 text-sm">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                payment.status === "success"
                                  ? "bg-green-100 text-green-700"
                                  : payment.status === "failed"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {getStatusDisplay(payment.status)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="min-w-[90px] bg-[#dcfce7] text-[#16a34a] border-[#16a34a]"
                                variant="bordered"
                                onPress={() =>
                                  handleStatusChange(payment.id, "success")
                                }
                                isDisabled={
                                  isPending ||
                                  (payment.status !== "pay_pending" &&
                                    payment.status !== "pending")
                                }
                              >
                                Оплачено
                              </Button>
                              <Button
                                size="sm"
                                className="min-w-[90px] bg-[#fce7f3] text-[#db2777] border-[#db2777]"
                                variant="bordered"
                                onPress={() =>
                                  handleStatusChange(payment.id, "failed")
                                }
                                isDisabled={
                                  isPending ||
                                  (payment.status !== "pay_pending" &&
                                    payment.status !== "pending")
                                }
                              >
                                Не оплачено
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-8 text-center text-gray-500"
                        >
                          Заявки на оплату не найдены
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

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setPendingAction(null);
        }}
        onConfirm={handleConfirmStatusChange}
        title="Изменение статуса оплаты"
        message={`Вы уверены, что хотите изменить статус платежа на "${pendingAction?.status === "success" ? "Оплачено" : "Не оплачено"}"?`}
        confirmText="Подтвердить"
        cancelText="Отмена"
        isLoading={isPending}
        type={"success"}
      />
    </DefaultLayout>
  );
}
