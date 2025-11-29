import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";
import { parseDate } from "@internationalized/date";
import { X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDatePicker from "../../CustomDatePicker/ui/CustomDatePicker";

const endDateParam = "end_date";
const startDateParam = "start_date";
const paramPage = "page";

interface CustomRangeDatePickerProps {
  className?: string;
}

const CustomRangeDatePicker = ({ className }: CustomRangeDatePickerProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const start_date = searchParams.get(startDateParam) || undefined;
  const end_date = searchParams.get(endDateParam) || undefined;

  const updateParams = (paramName: string, values: string[]) => {
    const params = new URLSearchParams(location.search);
    params.delete(paramPage);
    params.delete(paramName);

    if (values.length && values[0]) {
      values.forEach((value) => params.append(paramName, value));
    }

    navigate(location.pathname + "?" + params.toString());
  };

  return (
    <div
      className={cn(
        "flex gap-1 rounded-full  border-2 border-default-200 bg-white",
        className
      )}
    >
      <CustomDatePicker
        radius="full"
        size="lg"
        classNames={{ inputWrapper: "bg-white" }}
        onChange={(value) =>
          updateParams(startDateParam, value ? [value.toString()] : [""])
        }
        value={start_date}
        maxValue={end_date ? parseDate(end_date) : null}
        endContent={
          start_date && (
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className=" min-h-2 min-w-2 h-6 w-6 p-1"
              onPress={() => {
                updateParams(startDateParam, []); // Clears the date range
              }}
            >
              <X size={16} />
            </Button>
          )
        }
      />
      <CustomDatePicker
        radius="full"
        size="lg"
        classNames={{ inputWrapper: "bg-white" }}
        minValue={start_date ? parseDate(start_date) : null}
        endContent={
          end_date && (
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className=" min-h-2 min-w-2 h-6 w-6 p-1"
              onPress={() => {
                updateParams(endDateParam, []); // Clears the date range
              }}
            >
              <X size={16} />
            </Button>
          )
        }
        onChange={(value) =>
          updateParams(endDateParam, value ? [value.toString()] : [""])
        }
        value={end_date}
      />
    </div>
  );
};
export default CustomRangeDatePicker;
