/**
 * Custom hook for form state and submission management
 */

import { useState, useCallback } from "react";
import type { FormState, SubmitStatus } from "@/types";

interface UseFormManagementReturn {
  formState: FormState;
  isSubmitting: boolean;
  submitStatus: SubmitStatus;
  updateField: (field: keyof FormState, value: string) => void;
  resetForm: () => void;
  setSubmitStatus: (status: SubmitStatus) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/**
 * Hook for managing form state and submission
 * @returns Form state, handlers, and submission status
 */
export function useFormManagement(): UseFormManagementReturn {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const updateField = useCallback((field: keyof FormState, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialFormState);
    setSubmitStatus("idle");
  }, []);

  return {
    formState,
    isSubmitting,
    submitStatus,
    updateField,
    resetForm,
    setSubmitStatus,
    setIsSubmitting,
  };
}
