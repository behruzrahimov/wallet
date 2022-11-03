import * as _sodium from "libsodium-wrappers";
export async function encrypt(
  content: string,
  publicKey: string
): Promise<string> {
  await _sodium.ready;
  const sodium = _sodium;
  const nonce = Buffer.from(
    "404142434445464748494a4b4c4d4e4f5051525354555657",
    "hex"
  );
  const encryptText =
    sodium.crypto_aead_xchacha20poly1305_ietf_encrypt_detached(
      content,
      null,
      null,
      nonce,
      new Uint8Array(Buffer.from(publicKey, "hex"))
    );
  const encrypt = {
    ciphertext: Buffer.from(encryptText.ciphertext).toString("hex"),
    mac: Buffer.from(encryptText.mac).toString("hex"),
  };

  return JSON.stringify(encrypt);
}
