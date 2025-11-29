import {
  parseDate,
  CalendarDate,
  CalendarDateTime,
  ZonedDateTime,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { forwardRef } from "react";
import { DatePicker, DatePickerProps } from "@heroui/date-picker";

interface CustomDatePickerProps extends Omit<DatePickerProps, "value"> {
  value?: string;
  onChange?: (
    value: CalendarDate | CalendarDateTime | ZonedDateTime | null | undefined
  ) => void;
}

const CustomDatePicker = forwardRef<HTMLInputElement, CustomDatePickerProps>(
  ({ value, onChange, ...props }, ref) => {
    return (
      <I18nProvider locale="ru">
        <DatePicker
          {...props}
          ref={ref}
          value={value ? parseDate(value) : null}
          onChange={onChange}
          showMonthAndYearPickers
        />
      </I18nProvider>
    );
  }
);

export default CustomDatePicker;
