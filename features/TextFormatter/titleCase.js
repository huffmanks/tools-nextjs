const SMALL_WORDS = /\b(?:an?d?|a[st]|because|but|or|of|is|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i
const TOKENS = /[^\s:–—-]+|./g
const WHITESPACE = /\s/
const IS_MANUAL_CASE = /.(?=[A-Z]|\..)/
const ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u00FF]/

export const titleCase = (input) => {
    let result = ''
    let m

    while ((m = TOKENS.exec(input)) !== null) {
        const { 0: token, index } = m

        if (
            !IS_MANUAL_CASE.test(token) &&
            (!SMALL_WORDS.test(token) || index === 0 || index + token.length === input.length) &&
            (input.charAt(index + token.length) !== ':' || WHITESPACE.test(input.charAt(index + token.length + 1)))
        ) {
            result += token.replace(ALPHANUMERIC_PATTERN, (m) => m.toUpperCase())
            continue
        }

        result += token
    }

    return result
}
