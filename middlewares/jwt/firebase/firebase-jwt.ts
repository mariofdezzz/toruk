import { jose } from '../../../src/deps.ts'
import { JWT } from '../jwt.ts'
import { FirebaseJWTConfig } from './firebase-jwt-config.ts'
import { FirebaseJWTHeader } from './firebase-jwt-header.ts'
import { FirebaseJWTPayload } from './firebase-jwt-payload.ts'

export class FirebaseJWT<
  Payload extends FirebaseJWTPayload,
> extends JWT<FirebaseJWTHeader, Payload> {
  private readonly publicKey: Promise<string>

  constructor(private readonly config: FirebaseJWTConfig, value: string) {
    super(value)

    this.publicKey = this.getPublicKey(this.header.kid)
  }

  async verify(): Promise<Payload> {
    const publicKey = await this.publicKey
    const key = await jose.importX509(publicKey, 'RS256')

    await jose.jwtVerify(this.value, key, {
      issuer: `https://securetoken.google.com/${this.config.projectId}`,
      audience: this.config.projectId,
    })

    return this.payload
  }

  private async getPublicKey(keyId: string): Promise<string> {
    const response = await fetch(
      `https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com`,
    )
    const keys = await response.json()

    return keys[keyId]
  }
}
