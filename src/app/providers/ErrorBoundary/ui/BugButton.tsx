import { Button } from "@heroui/button";
import { useEffect, useState } from "react";

// Компонент для тестирования ErrorBoundary
export const BugButton = () => {
  const [error, setError] = useState(false);
  // const { t } = useTranslation();

  const onThrow = () => setError(true);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return <Button onPress={onThrow}>{'t("throw error")'}</Button>;
};
