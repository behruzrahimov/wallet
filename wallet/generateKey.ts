import * as _sodium from "libsodium-wrappers";
export async function generateKay() {
  await _sodium.ready;
  const sodium = _sodium;
  let key = sodium.crypto_sign_keypair("hex");
  console.log("PublicKey:", key.publicKey);
  console.log("PrivateKey:", key.privateKey);
  return key;
}
