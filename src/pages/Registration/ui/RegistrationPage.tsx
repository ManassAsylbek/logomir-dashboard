import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useValidateUsername } from "@/shared/services/auth/useValidateUsername";
import { useValidateOtp } from "@/shared/services/auth/useValidateOtp";
import { useRegister } from "@/shared/services/auth/useRegister";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    age: 0,
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const { mutate: validateUsername, isPending: isValidatingUsername } =
    useValidateUsername();
  const { mutate: validateOtp, isPending: isValidatingOtp } = useValidateOtp();
  const { mutate: register, isPending: isRegistering } = useRegister();

  const handleStep1Submit = () => {
    if (!formData.username) {
      alert("Введите номер телефона");
      return;
    }
    validateUsername(
      { username: formData.username },
      {
        onSuccess: () => {
          setStep(2);
        },
      }
    );
  };

  const handleStep2Submit = () => {
    if (!formData.otp) {
      alert("Введите OTP код");
      return;
    }
    validateOtp(
      { username: formData.username, code: formData.otp },
      {
        onSuccess: () => {
          setStep(3);
        },
      }
    );
  };

  const handleStep3Submit = () => {
    if (
      !formData.full_name ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Заполните все поля");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    register(
      {
        username: formData.username,
        full_name: formData.full_name,
        age: formData.age || 0,
        password: formData.password,
        is_child: false,
        roles: "company_owner",
      },
      {
        onSuccess: () => {
          navigate("/auth");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-2 p-6">
          <h1 className="text-3xl font-bold">Регистрация</h1>
          <p className="text-gray-600">
            {step === 1 && "Введите номер телефона"}
            {step === 2 && "Введите OTP код"}
            {step === 3 && "Заполните данные"}
          </p>
        </CardHeader>
        <CardBody className="p-6">
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <Input
                label="Номер телефона"
                placeholder="+996 XXX XXX XXX"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                variant="bordered"
                size="lg"
              />
              <Button
                color="success"
                size="lg"
                className="w-full"
                onPress={handleStep1Submit}
                isLoading={isValidatingUsername}
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Получить код
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <Input
                label="OTP код"
                placeholder="Введите код из SMS"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
                variant="bordered"
                size="lg"
                maxLength={6}
              />
              <Button
                color="success"
                size="lg"
                className="w-full"
                onPress={handleStep2Submit}
                isLoading={isValidatingOtp}
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Подтвердить
              </Button>
              <Button variant="light" size="sm" onPress={() => setStep(1)}>
                Назад
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <Input
                label="ФИО"
                placeholder="Введите полное имя"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                variant="bordered"
                size="lg"
              />
              <Input
                label="Возраст"
                type="number"
                placeholder="Введите возраст"
                value={formData.age.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    age: parseInt(e.target.value) || 0,
                  })
                }
                variant="bordered"
                size="lg"
              />
              <Input
                label="Пароль"
                type="password"
                placeholder="Минимум 6 символов"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                variant="bordered"
                size="lg"
              />
              <Input
                label="Подтвердите пароль"
                type="password"
                placeholder="Повторите пароль"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                variant="bordered"
                size="lg"
              />
              <Button
                color="success"
                size="lg"
                className="w-full"
                onPress={handleStep3Submit}
                isLoading={isRegistering}
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Зарегистрироваться
              </Button>
              <Button variant="light" size="sm" onPress={() => setStep(2)}>
                Назад
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Уже есть аккаунт?{" "}
              <a href="/auth" className="text-green-600 hover:underline">
                Войти
              </a>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
