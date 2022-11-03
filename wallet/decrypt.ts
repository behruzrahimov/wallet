import * as _sodium from "libsodium-wrappers";
export async function decrypt(content: string, key: string): Promise<string> {
  await _sodium.ready;
  const sodium = _sodium;
  const nonce = Buffer.from(
    "404142434445464748494a4b4c4d4e4f5051525354555657",
    "hex"
  );

  const decrypt = sodium.to_string(
    sodium.crypto_aead_xchacha20poly1305_ietf_decrypt_detached(
      null,
      new Uint8Array(Buffer.from(JSON.parse(content).ciphertext, "hex")),
      new Uint8Array(Buffer.from(JSON.parse(content).mac, "hex")),
      null,
      nonce,
      new Uint8Array(Buffer.from(key, "hex"))
    )
  );
  console.log("Decrypt:", decrypt);
  return decrypt;
}
