import * as _sodium from "libsodium-wrappers";
export async function encrypt(
  content: string,
  PublicKeyX25519: string
): Promise<string> {
  await _sodium.ready;
  const sodium = _sodium;
  const encryptingText = sodium.crypto_box_seal(
    content,
    new Uint8Array(Buffer.from(PublicKeyX25519, "hex"))
  );
  const encryptedText: string = Buffer.from(encryptingText).toString("hex");
  console.log("Encrypt:", encryptedText);
  return encryptedText;
}
