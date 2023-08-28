export const validateNumber = (number) => {
    if (number <= 0) {
      return "El número debe ser mayor a cero";
    }
  
    // Check if the number is a decimal or integer
    const isDecimal = Number.isFinite(number) && !Number.isInteger(number);
    const isInteger = Number.isInteger(number);
  
    // Check if the number is in the correct format
    if (!isDecimal && !isInteger) {
        return "El número debe ser decimal o entero";
    }
  
    return null;
  }
  