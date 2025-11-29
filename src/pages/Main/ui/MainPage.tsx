import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { CustomRangeDatePicker } from "@/shared/ui/CustomRangeDatePicker";
export default function MainPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">Аналитика</h1>
        <div className="flex gap-2">
          <CustomRangeDatePicker />
        </div>
        {/* <div className="flex gap-2">
          <Select
            placeholder={currentMonth}
            className="w-32"
            size="sm"
            classNames={{
              trigger: "bg-white border border-gray-300",
            }}
          >
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </Select>
          <Select
            placeholder={currentYear.toString()}
            className="w-24"
            size="sm"
            classNames={{
              trigger: "bg-white border border-gray-300",
            }}
          >
            {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </Select>
        </div> */}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Средний % успеваемости */}
        <Card>
          <CardBody className="p-8">
            <div className="flex items-start justify-between mb-8">
              <h3 className="text-lg font-medium">Средний % успеваемости</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-7xl font-bold">76%</div>
              <Button size="sm" className="bg-[#2d2d2d] text-white">
                Узнать больше
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Предстоящих занятий */}
        <Card>
          <CardBody className="p-8">
            <div className="flex items-start justify-between mb-8">
              <h3 className="text-lg font-medium">Предстоящих занятий</h3>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-7xl font-bold">18</div>
              <Button size="sm" className="bg-[#2d2d2d] text-white">
                Узнать больше
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Сумма поступлений */}
        <Card>
          <CardBody className="p-8">
            <div className="flex items-start justify-between mb-8">
              <h3 className="text-lg font-medium">Сумма поступлений</h3>
            </div>
            <div className="flex flex-col gap-2 mt-auto">
              <div className="text-xl text-gray-600">1 083 266 сом</div>
              <div className="text-4xl font-bold">$12.389</div>
              <div className="text-sm text-gray-500">
                Выручка на начавшея момент
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Аналитика по типам занятий */}
        <Card>
          <CardBody className="p-8">
            <h3 className="text-lg font-medium mb-6">
              Аналитика по типам занятий
            </h3>

            {/* Donut Chart */}
            <div className="flex items-center justify-center mb-6 relative">
              <svg width="220" height="220" viewBox="0 0 220 220">
                {/* Light green segment - 49% */}
                <circle
                  cx="110"
                  cy="110"
                  r="80"
                  fill="none"
                  stroke="#86efac"
                  strokeWidth="40"
                  strokeDasharray="245.04 500"
                  strokeDashoffset="0"
                  transform="rotate(-90 110 110)"
                />
                {/* Dark gray segment - 21% */}
                <circle
                  cx="110"
                  cy="110"
                  r="80"
                  fill="none"
                  stroke="#6b7280"
                  strokeWidth="40"
                  strokeDasharray="105.56 500"
                  strokeDashoffset="-245.04"
                  transform="rotate(-90 110 110)"
                />
                {/* Black segment - 30% */}
                <circle
                  cx="110"
                  cy="110"
                  r="80"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="40"
                  strokeDasharray="150.8 500"
                  strokeDashoffset="-350.6"
                  transform="rotate(-90 110 110)"
                />
                {/* White center */}
                <circle cx="110" cy="110" r="60" fill="white" />
              </svg>
              {/* Labels */}
              <div className="absolute top-2 right-8 flex items-center gap-2">
                <span className="text-sm font-medium">21%</span>
              </div>
              <div className="absolute top-8 left-2 flex items-center gap-2">
                <span className="text-sm font-medium">49%</span>
              </div>
              <div className="absolute bottom-8 right-4 flex items-center gap-2">
                <span className="text-sm font-medium">30%</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#86efac]"></div>
                  <span>Артикуляционные упражнения</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#1f2937]"></div>
                  <span>Ролевые игры</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#6b7280]"></div>
                  <span>Звуковые постановки</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
