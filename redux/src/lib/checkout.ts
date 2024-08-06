export const getCheckoutFromLocalStorage = () => {
  const checkout = localStorage.getItem("checkout");
  return checkout ? JSON.parse(checkout) : null;
};

export const saveCheckoutToLocalStorage = (checkout: any) => {
  localStorage.setItem("checkout", JSON.stringify(checkout));
};
