const amountFormatter = (value) => {
    console.log("Input to amountFormatter:", value);

    // Преобразуем в строку, удаляем лишние пробелы и проверяем валидность
    const sanitizedAmount = String(value).replace(/\s+/g, '').trim();

    if (isNaN(sanitizedAmount)) {
        throw new Error("Invalid input: amount must be a number or numeric string.");
    }

    // Преобразуем строку в число, чтобы избежать ошибок с некорректным вводом
    const numericAmount = parseFloat(sanitizedAmount);

    // Форматируем число с разделением на тройки
    const formattedAmount = numericAmount.toLocaleString("ru-RU");

    // Добавляем символ рубля и возвращаем результат
    return `${formattedAmount} ₽`;
}

export {
    amountFormatter
}