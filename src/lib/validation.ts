/**
 * Validation utility functions
 */

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate required field (non-empty string)
 */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate minimum string length
 */
export function minLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

/**
 * Validate maximum string length
 */
export function maxLength(value: string, max: number): boolean {
  return value.trim().length <= max;
}

/**
 * Get error message for field
 */
export function getFieldError(
  field: string,
  value: string,
  validations: {
    required?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
  }
): string | null {
  if (validations.required && !isRequired(value)) {
    return `${field} is required`;
  }
  if (validations.email && !isValidEmail(value)) {
    return "Invalid email address";
  }
  if (validations.minLength && !minLength(value, validations.minLength)) {
    return `${field} must be at least ${validations.minLength} characters`;
  }
  if (validations.maxLength && !maxLength(value, validations.maxLength)) {
    return `${field} must not exceed ${validations.maxLength} characters`;
  }
  return null;
}

/**
 * Validate entire form
 */
export function validateForm(
  formData: Record<string, string>,
  rules: Record<string, Record<string, any>>
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const [field, value] of Object.entries(formData)) {
    if (rules[field]) {
      const error = getFieldError(field, value, rules[field]);
      if (error) {
        errors[field] = error;
      }
    }
  }

  return errors;
}
