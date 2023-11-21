import React, { ChangeEvent } from "react";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";

interface IStepProps {
  step: string;
  steps: string[];
  setSteps: React.Dispatch<React.SetStateAction<string[]>>;
  index: number;
}

const Step: React.FC<IStepProps> = ({ step, steps, setSteps, index }) => {
  const handleStepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = e.target.value;
    setSteps(updatedSteps);
  };

  const removeStep = () => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const addStep = () => {
    const newSteps = [...steps, ""]
    setSteps(newSteps)
  }
  

  let buttonProps = {
    variant: "outline-secondary",
    onClick: addStep,
    children: <FaPlus />,
    disabled: step === ""
  }

  // If not last step
  if(index < steps.length - 1) {
    buttonProps = {
      variant: "danger",
      onClick: removeStep,
      children: <FaTrash />,
      disabled: false
    }
  }
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <InputGroup>
      <FloatingLabel label={`Step ${index+1}`}>
        <Form.Control value={step} onChange={handleStepChange} />

      </FloatingLabel>
        <Button {...buttonProps } />
      </InputGroup>
    </div>
  );
};


export default Step