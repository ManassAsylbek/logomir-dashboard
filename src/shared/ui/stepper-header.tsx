const titles = [
  "Информация о владельце",
  "Активация аккаунта",
  "О компании",
] as const;

type StepIndex = 0 | 1 | 2;

export function StepperHeader({ current }: { current: StepIndex }) {
  return (
    <div className="max-w-2xl w-full mb-7">
      <div className="flex items-center">
        {[0, 1, 2].map((i, idx, arr) => {
          const isActive = current === i;
          const isCompleted = i < current;

          return (
            <div key={i} className="relative flex-1 flex flex-col items-center">
              {idx > 0 && (
                <div
                  className={[
                    "absolute left-0 right-1/2 top-3.5 h-0.5 -z-10 rounded-full",
                    idx <= current ? "bg-green-600" : "bg-gray-300",
                  ].join(" ")}
                />
              )}

              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-[13px] font-medium",
                  isCompleted || isActive
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-300 text-gray-500 bg-white",
                ].join(" ")}
              >
                {isCompleted ? "✓" : `0${i + 1}`}
              </div>

              {idx < arr.length - 1 && (
                <div
                  className={[
                    "absolute left-1/2 right-0 top-3.5 h-0.5 -z-10 rounded-full",
                    i < current ? "bg-green-600" : "bg-gray-300",
                  ].join(" ")}
                />
              )}

              <div
                className={[
                  "mt-2 text-center",
                  isActive || isCompleted
                    ? "text-green-700 font-bold"
                    : "text-gray-500 font-medium",
                ].join(" ")}
              >
                {titles[i]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
