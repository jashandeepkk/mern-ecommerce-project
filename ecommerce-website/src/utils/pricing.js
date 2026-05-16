export const getPricing = (product) => {
  const price = Number(product?.price || 0);

  const discount = product?.discountPercentage ?? 0; 
  

  const oldPrice =
    discount > 0 ? price / (1 - discount / 100) : price;

  return {
    price,
    oldPrice,
    discount,
  };
};