import DefaultLayout from "@/shared/layouts/ui/DefaultLayout";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ArrowRight, Search, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import CreateTherapistModal from "./CreateTherapistModal";
import { useSpecialists } from "@/shared/services/specialists/useSpecialists";
import { useDeleteSpecialist } from "@/shared/services/specialists/useDeleteSpecialist";
import { Spinner } from "@heroui/spinner";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { useTranslation } from "react-i18next";

export default function TherapistsPage() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page] = useState(1);

  const { data: specialistsData, isLoading } = useSpecialists(page);
  const { mutate: deleteSpecialist } = useDeleteSpecialist();

  const handleDelete = (id: number) => {
    if (confirm(t("therapists.deleteConfirm"))) {
      deleteSpecialist(id);
    }
  };

  const filteredSpecialists = specialistsData?.results?.filter((specialist) => {
    const fullName =
      `${specialist.name || ""} ${specialist.last_name || ""}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-6">
          {/* Filters */}
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder={t("therapists.search")}
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
              onPress={() => setIsModalOpen(true)}
            >
              {t("therapists.createNew")}
            </Button>
          </div>

          {/* Therapists Table */}
          <Card className="p-4" radius="lg">
            <CardHeader>
              <h3 className="text-3xl font-medium">{t("therapists.title")}</h3>
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
                      <tr className="border-y">
                        <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                          {t("therapists.fullName")}
                        </th>
                        <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                          {t("therapists.phone")}
                        </th>
                        <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                          {t("therapists.description")}
                        </th>
                        <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">
                          {t("therapists.rating")}
                        </th>
                        <th className="text-left py-2 px-4 text-sm font-medium text-gray-600"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSpecialists && filteredSpecialists.length > 0 ? (
                        filteredSpecialists.map((specialist) => (
                          <tr
                            key={specialist.id}
                            className="border-b border-default-200 hover:bg-default-50"
                          >
                            <td className="py-3 px-4 text-sm">
                              {specialist.name || ""}{" "}
                              {specialist.last_name || ""}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {specialist.phone_number || "—"}
                            </td>
                            <td className="py-3 px-4 text-sm max-w-xs truncate">
                              {specialist.description || "—"}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {specialist.raiting || "—"}
                            </td>
                            <td className="py-3 px-4 relative">
                              <Dropdown>
                                <DropdownTrigger>
                                  <button className="p-1 hover:bg-gray-200 rounded">
                                    <svg
                                      width="4"
                                      height="16"
                                      viewBox="0 0 4 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        cx="2"
                                        cy="2"
                                        r="2"
                                        fill="#6B7280"
                                      />
                                      <circle
                                        cx="2"
                                        cy="8"
                                        r="2"
                                        fill="#6B7280"
                                      />
                                      <circle
                                        cx="2"
                                        cy="14"
                                        r="2"
                                        fill="#6B7280"
                                      />
                                    </svg>
                                  </button>
                                </DropdownTrigger>
                                <DropdownMenu
                                  aria-label={t("therapists.actions")}
                                >
                                  <DropdownItem
                                    key="edit"
                                    startContent={<Edit size={16} />}
                                  >
                                    {t("therapists.edit")}
                                  </DropdownItem>
                                  <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    startContent={<Trash2 size={16} />}
                                    onPress={() => handleDelete(specialist.id)}
                                  >
                                    {t("therapists.delete")}
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
                            {t("therapists.notFound")}
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
      </DefaultLayout>

      <CreateTherapistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
