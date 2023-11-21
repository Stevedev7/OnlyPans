import React from "react";
import Step from "../Step";

interface IStepsProps {
    steps: string[];
    setSteps: React.Dispatch<React.SetStateAction<string[]>>;
  }

const Steps: React.FC<IStepsProps> = ({ steps, setSteps }: IStepsProps) => {

  return (
    <div>
      {steps.map((step, index) => (
        <Step
          key={index}
          step={step}
          steps={steps}
          setSteps={setSteps}
          index={index}
        />
      ))}
    </div>
  );
};

export default Steps;
