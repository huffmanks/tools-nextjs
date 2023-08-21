import crypto from 'crypto'

export const generateKey = () => {
    const secret = '5874bd2e4ff57ccb71812481e8028e1'
    const algorithm = (str) => {
        const hash = crypto.createHash('sha256')
        hash.update(str)
        return hash.digest('binary')
    }

    const numKeys = 3

    const hmac = (data, key) => {
        const blockSize = 64
        const ipad = 0x36
        const opad = 0x5c

        if (key.length > blockSize) {
            key = algorithm(key)
        } else if (key.length < blockSize) {
            key += '\x00'.repeat(blockSize - key.length)
        }

        const innerKey = new Uint8Array(blockSize)
        const outerKey = new Uint8Array(blockSize)

        for (let i = 0; i < blockSize; i++) {
            innerKey[i] = key.charCodeAt(i) ^ ipad
            outerKey[i] = key.charCodeAt(i) ^ opad
        }

        const innerData = algorithm(innerKey + data)
        return algorithm(outerKey + innerData)
    }

    const hexKeys = []

    for (let i = 0; i < numKeys; i++) {
        const uniqueSecret = secret + Math.random().toString()
        const hmacKey = hmac('', uniqueSecret)

        // const keyLength = (i + 3) * 3
        const keyLength = 10000
        const truncatedKey = hmacKey.substring(0, keyLength)

        // const hexKey = Array.from(truncatedKey, (byte) => byte.charCodeAt(0).toString(16)).join('')
        // const hexKey = Array.from(truncatedKey, (byte) => String.fromCharCode(byte.charCodeAt(0))).join('')

        const keyString = Array.from(truncatedKey, (byte) => {
            const charCode = byte.charCodeAt(0)
            if (
                (charCode >= 48 && charCode <= 57) || // 0-9
                (charCode >= 65 && charCode <= 90) || // A-Z
                (charCode >= 97 && charCode <= 122) // a-z
            ) {
                return String.fromCharCode(charCode)
            }
        })
            .join('')
            .padEnd(keyLength, 'KCr8ASTSe4dGwF8oQv6IbG5SDcLuddmM')

        hexKeys.push(keyString)
    }

    return hexKeys
}
