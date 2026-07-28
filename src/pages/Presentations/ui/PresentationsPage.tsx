import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  ArrowRight,
  Search,
  MoreVertical,
  FileText,
  ExternalLink,
} from "lucide-react";
import { useState, useMemo } from "react";
import { CreatePresentationModal } from "./CreatePresentationModal";
import EditPresentationModal from "./EditPresentationModal";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { usePresentations } from "@/shared/services/presentations/usePresentations";
import { useDeletePresentation } from "@/shared/services/presentations/useDeletePresentation";
import { Presentation } from "@/shared/api/presentations/types";
import { useTranslation } from "react-i18next";

export default function PresentationsPage() {
  const { t } = useTranslation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editPresentation, setEditPresentation] = useState<Presentation | null>(
    null,
  );
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = usePresentations(page);
  const { mutate: deletePresentation, isPending: isDeleting } =
    useDeletePresentation();

  const presentations = data?.results ?? [];
  const totalPages = data?.count ? Math.ceil(data.count / 10) : 1;

  const filtered = useMemo(
    () =>
      presentations.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [presentations, search],
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder={t("presentations.search")}
            value={search}
            onValueChange={setSearch}
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
              <div className="right-2 w-9 h-9 bg-green-400 rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-gray-800" />
              </div>
            }
            onPress={() => setIsCreateModalOpen(true)}
          >
            {t("presentations.addPresentation")}
          </Button>
        </div>

        {/* Table */}
        <Card className="p-4" radius="lg">
          <CardHeader>
            <h2 className="text-3xl font-medium">{t("presentations.title")}</h2>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-y">
                    <th className="text-left py-2 font-medium text-gray-600">
                      {t("presentations.name")}
                    </th>
                    <th className="text-left py-2 font-medium text-gray-600">
                      {t("presentations.description")}
                    </th>
                    <th className="text-left py-2 font-medium text-gray-600">
                      {t("presentations.createdAt")}
                    </th>
                    <th className="text-left py-2 font-medium text-gray-600"></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-gray-400"
                      >
                        {t("presentations.loading")}
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-gray-400"
                      >
                        {t("presentations.notFound")}
                      </td>
                    </tr>
                  ) : (
                    filtered.map((presentation) => (
                      <tr
                        key={presentation.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                              <FileText size={16} className="text-gray-500" />
                            </div>
                            <span className="font-medium">
                              {presentation.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-gray-600 max-w-xs">
                          <p className="line-clamp-2 text-sm">
                            {presentation.description}
                          </p>
                        </td>
                        <td className="py-4 text-gray-600">
                          {formatDate(presentation.created_at)}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {presentation.file && (
                              <Button
                                as="a"
                                href={presentation.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                variant="light"
                                isIconOnly
                              >
                                <ExternalLink
                                  size={16}
                                  className="text-gray-500"
                                />
                              </Button>
                            )}
                            <Dropdown>
                              <DropdownTrigger>
                                <Button isIconOnly variant="light" size="sm">
                                  <MoreVertical
                                    size={16}
                                    className="text-gray-500"
                                  />
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu aria-label="actions">
                                <DropdownItem
                                  key="edit"
                                  onPress={() =>
                                    setEditPresentation(presentation)
                                  }
                                >
                                  {t("presentations.edit")}
                                </DropdownItem>
                                <DropdownItem
                                  key="delete"
                                  className="text-danger"
                                  color="danger"
                                  onPress={() => setDeleteId(presentation.id)}
                                >
                                  {t("presentations.delete")}
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  size="sm"
                  variant="bordered"
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  {t("presentations.prev")}
                </Button>
                <span className="text-sm text-gray-600">
                  {page} / {totalPages}
                </span>
                <Button
                  size="sm"
                  variant="bordered"
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => p + 1)}
                >
                  {t("presentations.next")}
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <CreatePresentationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <EditPresentationModal
        isOpen={!!editPresentation}
        onClose={() => setEditPresentation(null)}
        presentation={editPresentation}
      />

      <ConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId !== null) {
            deletePresentation(deleteId, {
              onSuccess: () => setDeleteId(null),
            });
          }
        }}
        title={t("presentations.deleteTitle")}
        message={t("presentations.deleteMessage")}
        isLoading={isDeleting}
      />
    </>
  );
}
