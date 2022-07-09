export const getAspectGCD = (...arr) => {
    const gcd = (x, y) => (!y ? x : getAspectGCD(y, x % y))
    return [...arr].reduce((a, b) => gcd(a, b))
}
