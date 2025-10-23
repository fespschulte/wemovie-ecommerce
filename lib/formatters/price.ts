/**
 * Formatter para preços e valores monetários
 */

/**
 * Formata um preço para o padrão brasileiro (R$ 1.234,56)
 * @param price - Valor numérico do preço
 * @returns String formatada no padrão brasileiro
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
