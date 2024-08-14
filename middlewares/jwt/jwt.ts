import { decodeBase64Url } from '../../src/deps.ts'

export class JWT<
  Header extends Record<string, unknown>,
  Payload extends Record<string, unknown>,
> {
  readonly header: Header
  readonly payload: Payload
  readonly signature: string

  constructor(readonly value: string) {
    const { header, payload, signature } = this.decodeToken()

    this.header = header
    this.payload = payload
    this.signature = signature
  }

  private decodeToken() {
    const [header, payload, signature] = this.value.split('.')

    return {
      header: JSON.parse(this.decodeJwtPart(header)),
      payload: JSON.parse(this.decodeJwtPart(payload)),
      signature: signature,
    }
  }

  private decodeJwtPart(part: string) {
    const base64Decoded = decodeBase64Url(part)

    return new TextDecoder().decode(base64Decoded)
  }
}
