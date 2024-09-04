import { decodeBase64Url } from '../../src/deps.ts'

export class JWT<
  Header extends Record<string, unknown>,
  Payload extends Record<string, unknown>,
> {
  readonly header: Header
  readonly payload: Payload
  readonly signature: string
  readonly data: string

  constructor(readonly value: string) {
    const { header, payload, signature, data } = this.decodeToken()

    this.header = header
    this.payload = payload
    this.signature = signature
    this.data = data
  }

  async verify(
    key: CryptoKey,
    payload: Array<keyof Payload> = [],
  ): Promise<boolean> {
    const verified = await crypto.subtle.verify(
      'HMAC',
      key,
      decodeBase64Url(this.signature),
      new TextEncoder().encode(this.data),
    )

    if (!verified) return false

    const verifiedPayload = payload.reduce(
      (acc, key) => key in this.payload && acc,
      true,
    )

    if (payload.includes('exp')) {
      return verifiedPayload && Number(this.payload.exp) > Date.now() / 1000
    }

    return verifiedPayload
  }

  private decodeToken() {
    const [header, payload, signature] = this.value.split('.')

    return {
      header: JSON.parse(this.decodeJwtPart(header)),
      payload: JSON.parse(this.decodeJwtPart(payload)),
      signature: signature,
      data: header + '.' + payload,
    }
  }

  private decodeJwtPart(part: string) {
    const base64Decoded = decodeBase64Url(part)

    return new TextDecoder().decode(base64Decoded)
  }
}
