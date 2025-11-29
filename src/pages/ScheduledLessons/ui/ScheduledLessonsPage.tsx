import DefaultLayout from "@/shared/layouts/ui/DefaultLayout";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Input } from "@heroui/input";
import { ArrowRight, Download, Search } from "lucide-react";
import { useState } from "react";
import AddCommentModal from "./AddCommentModal";

interface ScheduledLesson {
  id: number;
  student: {
    name: string;
    avatar: string;
  };
  startDate: string;
  startTime: string;
  lessonCount: string;
  attendance: number;
}

const mockLessons: ScheduledLesson[] = [
  {
    id: 1,
    student: {
      name: "София Морозова",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    startDate: "С 13.00 ПО 13.02",
    startTime: "В 13:17",
    lessonCount: "2 ДЕТ",
    attendance: 16.33,
  },
  {
    id: 2,
    student: {
      name: "София Морозова",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    startDate: "С 13.00 ПО 13.02",
    startTime: "В 13:17",
    lessonCount: "2 ДЕТ",
    attendance: 16.33,
  },
  {
    id: 3,
    student: {
      name: "Артём Белов",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    startDate: "С 11.00 ПО 12.00",
    startTime: "3 ГОДА",
    lessonCount: "",
    attendance: 16.33,
  },
  {
    id: 4,
    student: {
      name: "Ева Смирнова",
      avatar: "https://i.pravatar.cc/150?u=4",
    },
    startDate: "С 12.00 ПО 13.00",
    startTime: "",
    lessonCount: "6 ЛЕТ",
    attendance: 16.33,
  },
  {
    id: 5,
    student: {
      name: "Милана Кузнецова",
      avatar: "https://i.pravatar.cc/150?u=5",
    },
    startDate: "С 18.00 ПО 14.00",
    startTime: "3 ГОДА",
    lessonCount: "",
    attendance: 16.33,
  },
  {
    id: 6,
    student: {
      name: "Александр Попов",
      avatar: "https://i.pravatar.cc/150?u=6",
    },
    startDate: "С 14.00 ПО 15.00",
    startTime: "",
    lessonCount: "7 ЛЕТ",
    attendance: 16.33,
  },
  {
    id: 7,
    student: {
      name: "Варвара Соколова",
      avatar: "https://i.pravatar.cc/150?u=7",
    },
    startDate: "С 18.00 ПО 18.02",
    startTime: "4 ГОДА",
    lessonCount: "",
    attendance: 16.33,
  },
  {
    id: 8,
    student: {
      name: "Дмитрий Иванов",
      avatar: "https://i.pravatar.cc/150?u=8",
    },
    startDate: "С 16.00 ПО 17.02",
    startTime: "",
    lessonCount: "3 ГОДА",
    attendance: 16.33,
  },
];

export default function ScheduledLessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const handleOpenModal = (lessonId: number) => {
    setSelectedLesson(lessonId);
  };

  const handleCloseModal = () => {
    setSelectedLesson(null);
  };

  return (
    <>
      <DefaultLayout>
        <div className="flex flex-col gap-6">
          {/* Search */}
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Поиск"
              startContent={<Search className="text-default-400" size={20} />}
              className="max-w-4xl"
              classNames={{ inputWrapper: "bg-white" }}
              variant="bordered"
              size="lg"
              radius="full"
            />
          </div>

          <h1 className="text-3xl font-medium">Запланированные занятия</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockLessons.map((lesson) => (
              <Card key={lesson.id} className="bg-white shadow-sm">
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                        {lesson.startDate}
                      </span>
                      {lesson.startTime && (
                        <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                          {lesson.startTime}
                        </span>
                      )}
                      {lesson.lessonCount && (
                        <span className="text-xs px-3 py-1 bg-white rounded-full border border-gray-200">
                          {lesson.lessonCount}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={lesson.student.avatar}
                      alt={lesson.student.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <h3 className="text-lg font-medium">
                      {lesson.student.name}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        {lesson.attendance}/33
                      </span>
                    </div>
                    <Progress
                      value={(lesson.attendance / 33) * 100}
                      color="success"
                      size="md"
                      className="max-w-[200px]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="md"
                      radius="full"
                      className="bg-[#2d2d2d] text-white flex-1 flex justify-between"
                      endContent={
                        <div className="absolute right-2 w-7 h-7 bg-green-400 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-gray-800" />
                        </div>
                      }
                    >
                      Google meet
                    </Button>
                    <Button
                      size="md"
                      radius="full"
                      variant="bordered"
                      className="bg-white border-gray-300 flex-1"
                      onPress={() => handleOpenModal(lesson.id)}
                    >
                      Добавить примечание
                    </Button>
                    <Button
                      size="md"
                      radius="full"
                      isIconOnly
                      className="bg-[#22bb79] text-white min-w-[44px]"
                    >
                      <Download size={20} />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </DefaultLayout>

      <AddCommentModal
        isOpen={selectedLesson !== null}
        onClose={handleCloseModal}
        lessonId={selectedLesson}
      />
    </>
  );
}
