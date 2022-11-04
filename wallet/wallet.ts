import { verify } from "./verify";
import { generateKay } from "./generateKey";
import { signature } from "./signature";
import { encrypt } from "./encrypt";
import { decrypt } from "./decrypt";
import { localStorage } from "./localStorage";
import * as _sodium from "libsodium-wrappers";
export interface Storage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string>;
}
export class FileStorage implements Storage {
  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }
  async getItem(key: string): Promise<any> {
    localStorage.getItem(key);
  }
}

export class Wallet {
  constructor(private storage: Storage) {}
  async create(): Promise<void> {
    const keys = await generateKay();
    await this.storage.setItem("PublicKeyEd25519", keys.key1.publicKey);
    await this.storage.setItem("PrivateKeyEd25519", keys.key1.privateKey);
    await this.storage.setItem("PublicKeyX25519", keys.key2.publicKey);
    await this.storage.setItem("PrivateKeyX25519", keys.key2.privateKey);
  }
  async sign(content: string): Promise<string> {
    const PrivateKey: string = localStorage.getItem("PrivateKeyEd25519");
    const PublicKey: string = localStorage.getItem("PublicKeyEd25519");
    // console.log("signPrivateKey", PrivateKey);
    // console.log("signPublicKey", PublicKey);
    const sign = await signature(content, PublicKey, PrivateKey);
    await this.storage.setItem("Signature", sign);
    return sign;
  }
  async verify(signature: string, content: string): Promise<boolean> {
    const PublicKeyEd25519: string = localStorage.getItem("PublicKeyEd25519");
    console.log("verifyPublicKey", PublicKeyEd25519);
    return verify(signature, content, PublicKeyEd25519);
  }
  async encrypt(content: string): Promise<string> {
    const PublicKeyX25519: string = localStorage.getItem("PublicKeyX25519");
    const encryptText = await encrypt(content, PublicKeyX25519);
    await this.storage.setItem("EncryptText", encryptText);
    return encryptText;
  }
  async decrypt(content: string): Promise<string> {
    const PrivateKeyX25519 = localStorage.getItem("PrivateKeyX25519");
    const PublicKeyX25519 = localStorage.getItem("PublicKeyX25519");
    return decrypt(content, PublicKeyX25519, PrivateKeyX25519);
  }
}
