import * as _sodium from "libsodium-wrappers";
export async function decrypt(
  content: string,
  PublicKeyX25519: string,
  PrivateKeyX25519: string
): Promise<string> {
  await _sodium.ready;
  const sodium = _sodium;
  const decrypt = sodium.to_string(
    sodium.crypto_box_seal_open(
      new Uint8Array(Buffer.from(content, "hex")),
      new Uint8Array(Buffer.from(PublicKeyX25519, "hex")),
      new Uint8Array(Buffer.from(PrivateKeyX25519, "hex"))
    )
  );
  console.log("Decrypt:", decrypt);
  return decrypt;
}
