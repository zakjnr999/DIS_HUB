import { cn } from "@/lib/utils";

export function BookingStepper({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: string[];
}) {
  return (
    <ol className="grid gap-2 rounded-[2rem] border border-[#E8D8C3] bg-[#FFFDF8]/70 p-2 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <li
            className={cn(
              "rounded-full border px-4 py-3 text-xs font-bold transition duration-300",
              isActive && "border-[#C8A96A] bg-[#F7EFE3] text-[#1F1B18] shadow-sm",
              isComplete && "border-[#C8A96A]/40 bg-[#E8D8C3]/34 text-[#3B2416]",
              !isActive &&
                !isComplete &&
                "border-transparent bg-transparent text-[#7B6F65]",
            )}
            key={step}
          >
            <span className="block text-[11px] uppercase tracking-[0.08em]">
              Step {index + 1}
            </span>
            {step}
          </li>
        );
      })}
    </ol>
  );
}
