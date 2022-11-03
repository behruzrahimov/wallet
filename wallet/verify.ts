import * as _sodium from "libsodium-wrappers";
export async function verify(
  signature: string,
  content: string,
  publicKey: string
): Promise<boolean> {
  await _sodium.ready;
  const sodium = _sodium;
  const verify = sodium.crypto_sign_verify_detached(
    new Uint8Array(Buffer.from(signature, "hex")),
    content,
    new Uint8Array(Buffer.from(publicKey, "hex"))
  );
  console.log("verify:", verify);
  return verify;
}
