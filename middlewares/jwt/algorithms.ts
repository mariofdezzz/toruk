type ImportKeyAlgorithms = Parameters<SubtleCrypto['importKey']>[2]
type JWTAlgorithms =
	| 'HS256'
	| 'HS384'
	| 'HS512'
	| 'RS256'
	| 'RS384'
	| 'RS512'
	| 'PS256'
	| 'PS384'
	| 'PS512'
	| 'ES256'
	| 'ES384'
	| 'ES512'
	| 'EdDSA'

export const ALGORITHMS = {
	HS256: {
		name: 'HMAC',
		hash: { name: 'SHA-256' },
	},
	HS384: {
		name: 'HMAC',
		hash: { name: 'SHA-384' },
	},
	HS512: {
		name: 'HMAC',
		hash: { name: 'SHA-512' },
	},
	RS256: {
		name: 'RSASSA-PKCS1-v1_5',
		hash: { name: 'SHA-256' },
	},
	RS384: {
		name: 'RSASSA-PKCS1-v1_5',
		hash: { name: 'SHA-384' },
	},
	RS512: {
		name: 'RSASSA-PKCS1-v1_5',
		hash: { name: 'SHA-512' },
	},
	PS256: {
		name: 'RSA-PSS',
		hash: { name: 'SHA-256' },
	},
	PS384: {
		name: 'RSA-PSS',
		hash: { name: 'SHA-384' },
	},
	PS512: {
		name: 'RSA-PSS',
		hash: { name: 'SHA-512' },
	},
	ES256: {
		name: 'ECDSA',
		hash: { name: 'SHA-256' },
	},
	ES384: {
		name: 'ECDSA',
		hash: { name: 'SHA-384' },
	},
	ES512: {
		name: 'ECDSA',
		hash: { name: 'SHA-512' },
	},
	EdDSA: {
		name: 'EdDSA',
	},
} satisfies Record<JWTAlgorithms, ImportKeyAlgorithms>
