import DefaultLayout from "@/shared/layouts/ui/DefaultLayout";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { User } from "@heroui/user";
import { Progress } from "@heroui/progress";
import { Download } from "lucide-react";
import { useState } from "react";
import AddCommentModal from "./AddCommentModal";

interface ScheduledLesson {
  id: number;
  student: {
    name: string;
    avatar: string;
  };
  dateRange: string;
  lesson: string;
  attendance: number;
}

const mockLessons: ScheduledLesson[] = [
  {
    id: 1,
    student: {
      name: "София Морозова",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    dateRange: "с 12.03.2025",
    lesson: "12:31",
    attendance: 76.24,
  },
  {
    id: 2,
    student: {
      name: "Артём Белов",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    dateRange: "с 12.03.2025",
    lesson: "10:31",
    attendance: 76.24,
  },
  {
    id: 3,
    student: {
      name: "Ева Смирнова",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    dateRange: "с 12.03.2025",
    lesson: "10:31",
    attendance: 85.5,
  },
  {
    id: 4,
    student: {
      name: "Милана Кузнецова",
      avatar: "https://i.pravatar.cc/150?u=4",
    },
    dateRange: "с 12.03.2025",
    lesson: "10:31",
    attendance: 76.24,
  },
  {
    id: 5,
    student: {
      name: "Александр Попов",
      avatar: "https://i.pravatar.cc/150?u=5",
    },
    dateRange: "с 12.03.2025",
    lesson: "10:31",
    attendance: 62.18,
  },
  {
    id: 6,
    student: {
      name: "Дмитрий Иванов",
      avatar: "https://i.pravatar.cc/150?u=6",
    },
    dateRange: "с 12.03.2025",
    lesson: "10:31",
    attendance: 76.24,
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
          <h1 className="text-2xl font-semibold">Запланированные занятия</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockLessons.map((lesson) => (
              <Card key={lesson.id} className="p-0 shadow-sm">
                <CardBody className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs px-2.5 py-1 bg-success-100 text-success-700 rounded-full font-medium">
                      {lesson.dateRange}
                    </span>
                    <span className="text-xs px-2.5 py-1 bg-default-100 text-default-700 rounded-full font-medium">
                      {lesson.lesson}
                    </span>
                  </div>

                  <User
                    name={lesson.student.name}
                    description={lesson.dateRange}
                    avatarProps={{
                      src: lesson.student.avatar,
                      size: "md",
                    }}
                    classNames={{
                      name: "font-medium",
                      description: "text-xs",
                    }}
                  />

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-default-500">
                        Посещаемость
                      </span>
                      <span className="text-xs font-semibold">
                        {lesson.attendance}%
                      </span>
                    </div>
                    <Progress
                      value={lesson.attendance}
                      color={
                        lesson.attendance >= 80
                          ? "success"
                          : lesson.attendance >= 60
                            ? "warning"
                            : "danger"
                      }
                      size="sm"
                    />
                  </div>
                </CardBody>

                <CardFooter className="flex gap-2 px-4 pb-4 pt-0">
                  <Button
                    size="sm"
                    variant="bordered"
                    startContent={<Download size={16} />}
                    className="flex-1 text-xs"
                  >
                    Скачать QR
                  </Button>
                  <Button
                    size="sm"
                    color="success"
                    variant="flat"
                    className="flex-1 text-xs"
                    onPress={() => handleOpenModal(lesson.id)}
                  >
                    Примечание
                  </Button>
                </CardFooter>
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
