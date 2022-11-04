import * as _sodium from "libsodium-wrappers";
export async function signature(
  content: string,
  PublicKey: string,
  PrivateKey: string
): Promise<string> {
  await _sodium.ready;
  const sodium = _sodium;
  const signed = sodium.crypto_sign_detached(
    content,
    Buffer.from(PrivateKey, "hex")
  );
  const signedToString = Buffer.from(signed).toString("hex");
  console.log("Signature:", signedToString);
  return signedToString;
}
