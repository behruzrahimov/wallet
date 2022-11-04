import * as _sodium from "libsodium-wrappers";
export async function generateKay() {
  await _sodium.ready;
  const sodium = _sodium;
  const key1 = sodium.crypto_sign_keypair("hex");
  const key2 = sodium.crypto_kx_keypair("hex");
  console.log("PublicKeyEd25519:", key1.publicKey);
  console.log("PrivateKeyEd25519:", key1.privateKey);
  console.log("PublicKeyX25519:", key2.publicKey);
  console.log("PrivateKeyX25519:", key2.privateKey);
  const keys = { key1, key2 };
  return keys;
}
