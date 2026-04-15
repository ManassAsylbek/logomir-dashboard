import { useAuth } from "@/shared/services/auth/useAuth";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface IAuthForm {
  username: string;
  password: string;
}

const AuthForm = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>();

  const { mutate, isPending } = useAuth();

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <Card radius="lg" className="w-full max-w-md p-8 bg-white shadow-xl">
        <CardHeader className="flex flex-col justify-start items-start gap-2 pb-8">
          <div className="relative">
            <img
              src="/logo.png"
              alt="ЛогоМир"
              className="w-20 h-20 object-contain"
            />
          </div>
        </CardHeader>
        <CardBody>
          <h1 className="text-4xl font-semibold mb-2">{t("auth.login")}</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <Controller
              control={control}
              name="username"
              rules={{
                required: t("auth.required"),
              }}
              render={({ field }) => (
                <Input
                  labelPlacement="outside"
                  // label="E-mail"
                  {...field}
                  radius="full"
                  size="lg"
                  variant="bordered"
                  placeholder={t("auth.enterEmail")}
                  isInvalid={!!errors.username?.message}
                  errorMessage={errors.username?.message}
                  isRequired
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: t("auth.required") }}
              render={({ field }) => (
                <Input
                  radius="full"
                  size="lg"
                  variant="bordered"
                  labelPlacement="outside"
                  // label="Пароль"
                  {...field}
                  placeholder={t("auth.enterPassword")}
                  isInvalid={!!errors.password?.message}
                  errorMessage={errors.password?.message}
                  isRequired
                  type={isVisible ? "text" : "password"}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <Eye className="text-foreground-600" width={20} />
                      ) : (
                        <EyeOff className="text-foreground-600" width={20} />
                      )}
                    </button>
                  }
                />
              )}
            />

            <Button
              type="submit"
              radius="full"
              isLoading={isPending}
              className="bg-gray-800 hover:bg-gray-900 text-white font-medium h-12 justify-start"
              endContent={
                !isPending && (
                  <div className="absolute right-2 w-9 h-9 bg-green-400 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-gray-800" />
                  </div>
                )
              }
            >
              {t("auth.login")}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t("auth.dontHaveAccount")}{" "}
              <a
                href="/registration"
                className="text-green-600 hover:underline font-medium"
              >
                {t("auth.register")}
              </a>
            </p>
          </div>
        </CardBody>

        <div className="flex items-center justify-start gap-3 mt-6">
          <button
            type="button"
            className="w-11 h-11 rounded-full bg-gray-800 hover:bg-gray-900 flex items-center justify-center transition-colors"
          >
            <span className="text-white text-2xl font-bold">G</span>
          </button>
          <button
            type="button"
            className="w-11 h-11 rounded-full bg-gray-800 hover:bg-gray-900 flex items-center justify-center transition-colors"
          >
            <span className="text-white text-2xl font-bold">f</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;
