// src/lib/checkout.ts
export const getCheckoutIdFromLocalStorage = (): string | null => {
  const checkout = localStorage.getItem("checkout");
  return checkout ? JSON.parse(checkout).id : null;
};

export const saveCheckoutIdToLocalStorage = (checkoutId: string) => {
  localStorage.setItem("checkout", JSON.stringify({ id: checkoutId }));
};

export const removeCheckoutFromLocalStorage = () => {
  localStorage.removeItem("checkout");
};
