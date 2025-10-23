import { z } from "zod";

/**
 * Resultado de uma validação de quantidade
 */
export interface ValidationResult {
  isValid: boolean;
  value?: number;
  error?: string;
}

/**
 * Schema de validação para quantidade (extraído do QuantityControl)
 */
export const quantitySchema = z
  .number()
  .int("A quantidade deve ser um número inteiro")
  .min(1, "A quantidade deve ser pelo menos 1")
  .max(99, "A quantidade não pode ser maior que 99");

/**
 * Schema para validação de string de quantidade (do input)
 */
export const quantityStringSchema = z
  .string()
  .regex(/^\d+$/, "Apenas números são permitidos")
  .transform((val) => parseInt(val, 10))
  .pipe(quantitySchema);

/**
 * Valida uma string de quantidade e retorna o resultado
 * @param value - String a ser validada
 * @returns ValidationResult com o resultado da validação
 */
export const validateQuantity = (value: string): ValidationResult => {
  try {
    const validatedQuantity = quantityStringSchema.parse(value);
    return {
      isValid: true,
      value: validatedQuantity,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.issues[0].message,
      };
    }
    return {
      isValid: false,
      error: "Quantidade inválida",
    };
  }
};

/**
 * Valida um número de quantidade
 * @param value - Número a ser validado
 * @returns ValidationResult com o resultado da validação
 */
export const validateQuantityNumber = (value: number): ValidationResult => {
  try {
    const validatedQuantity = quantitySchema.parse(value);
    return {
      isValid: true,
      value: validatedQuantity,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.issues[0].message,
      };
    }
    return {
      isValid: false,
      error: "Quantidade inválida",
    };
  }
};

/**
 * Verifica se uma quantidade está dentro dos limites permitidos
 * @param quantity - Quantidade a ser verificada
 * @returns true se estiver dentro dos limites (1-99)
 */
export const isQuantityInRange = (quantity: number): boolean => {
  return quantity >= 1 && quantity <= 99;
};

/**
 * Normaliza uma quantidade para os limites permitidos
 * @param quantity - Quantidade a ser normalizada
 * @returns Quantidade normalizada (mínimo 1, máximo 99)
 */
export const normalizeQuantity = (quantity: number): number => {
  return Math.max(1, Math.min(99, quantity));
};
