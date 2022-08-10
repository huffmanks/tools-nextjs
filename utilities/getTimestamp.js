export const getTimestamp = (type) => {
    const options = type === 'time' ? { hour: 'numeric', minute: 'numeric', second: 'numeric' } : { year: 'numeric', month: 'short', day: 'numeric' }

    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options)
    return dateTimeFormat.format(Date.now())
}
