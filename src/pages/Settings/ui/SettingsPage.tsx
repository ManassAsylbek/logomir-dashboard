import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { User } from "@heroui/user";
import { Button } from "@heroui/button";
import { useUser } from "@/shared/services/user/useUser";
import { useUpdateProfile } from "@/shared/services/user/useUpdateProfile";
import { useState } from "react";
import { Spinner } from "@heroui/spinner";

const SettingsPage = () => {
  const { data: user, isLoading } = useUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    phone_number: user?.phone_number || "",
    email: user?.username || "",
    whatsapp: user?.phone_number || "",
    telegram: "",
  });

  const handleSubmit = () => {
    updateProfile({
      full_name: formData.full_name,
      phone_number: formData.phone_number,
    });
  };

  const languages = [
    { key: "ru", label: "Русский" },
    { key: "en", label: "English" },
    { key: "uk", label: "Українська" },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card className="bg-[#3d3d3d] border-none">
        <CardHeader className="pb-0">
          <h3 className="text-sm text-gray-400">Профиль</h3>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <User
              name={user?.full_name || user?.username || "User"}
              description={user?.username || ""}
              avatarProps={{
                src:
                  user?.avatar ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                size: "lg",
              }}
              classNames={{
                name: "text-white text-xl font-medium",
                description: "text-gray-400",
              }}
            />
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M14.166 2.5C14.3849 2.28113 14.6447 2.10752 14.9307 1.98906C15.2167 1.87061 15.5232 1.80969 15.8327 1.80969C16.1422 1.80969 16.4487 1.87061 16.7347 1.98906C17.0206 2.10752 17.2805 2.28113 17.4993 2.5C17.7182 2.71887 17.8918 2.97871 18.0103 3.26468C18.1287 3.55064 18.1897 3.85714 18.1897 4.16667C18.1897 4.47619 18.1287 4.78269 18.0103 5.06866C17.8918 5.35462 17.7182 5.61446 17.4993 5.83333L6.24935 17.0833L1.66602 18.3333L2.91602 13.75L14.166 2.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Language Section */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-medium">Язык</h3>
        </CardHeader>
        <CardBody>
          <Select
            placeholder="Выберите язык"
            radius="full"
            size="lg"
            defaultSelectedKeys={["ru"]}
            classNames={{
              trigger: "border-1 border-default-200 bg-transparent h-12",
              value: "text-base",
            }}
          >
            {languages.map((lang) => (
              <SelectItem key={lang.key}>{lang.label}</SelectItem>
            ))}
          </Select>
        </CardBody>
      </Card>

      {/* Contacts Section */}
      <Card className="bg-white border-none">
        <CardHeader className="flex-col items-start pb-2">
          <h3 className="text-xl font-medium">Контакты</h3>
          <p className="text-sm text-gray-600 mt-1">
            Increase conversion rates and add school contacts. Students will be
            able to ask you questions about the course or payment.
          </p>
        </CardHeader>
        <CardBody className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="logo@"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                classNames={{
                  input: "text-base",
                  inputWrapper: "bg-white border-1 border-gray-300",
                }}
                isDisabled
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Телефон</label>
              <Input
                type="tel"
                placeholder="+ 996 (771) - 15 - 15 - 17"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                classNames={{
                  input: "text-base",
                  inputWrapper: "bg-white border-1 border-gray-300",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Whatsapp</label>
              <Input
                type="tel"
                placeholder="+ 996 (771) - 15 - 15 - 17"
                value={formData.whatsapp}
                onChange={(e) =>
                  setFormData({ ...formData, whatsapp: e.target.value })
                }
                classNames={{
                  input: "text-base",
                  inputWrapper: "bg-white border-1 border-gray-300",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Telegram</label>
              <Input
                type="text"
                placeholder="@logo"
                value={formData.telegram}
                onChange={(e) =>
                  setFormData({ ...formData, telegram: e.target.value })
                }
                classNames={{
                  input: "text-base",
                  inputWrapper: "bg-white border-1 border-gray-300",
                }}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              color="primary"
              size="lg"
              onPress={handleSubmit}
              isLoading={isPending}
            >
              Сохранить изменения
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SettingsPage;
