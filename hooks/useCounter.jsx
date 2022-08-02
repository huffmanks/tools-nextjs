export const useCounter = (values, setValues) => {
    const handleDecrease = () => {
        setValues((prev) => ({
            ...values,
            total: parseInt(prev.total) === 1 ? 1 : parseInt(prev.total) - 1,
        }))
    }

    const handleIncrease = () => {
        setValues((prev) => ({
            ...values,
            total: parseInt(prev.total) + 1,
        }))
    }

    return { handleDecrease, handleIncrease }
}
