import { verify } from "./verify";
import { generateKay } from "./generateKey";
import { signature } from "./signature";
import { encrypt } from "./encrypt";
import { decrypt } from "./decrypt";
import { LsType } from "./types";
import { localStorage } from "./ls";
import * as _sodium from "libsodium-wrappers";
export interface Storage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string>;
}
export class fileStorage implements Storage {
  private ls: LsType;
  constructor(private storage: Storage) {
    this.ls = localStorage;
  }
  async setItem(key: string, value: string): Promise<void> {
    this.ls.setItem(key, value);
  }
  async getItem(key: string): Promise<any> {
    this.ls.getItem(key);
  }
}

export class Wallet {
  constructor(private storage: Storage) {}
  async create(): Promise<void> {
    const keyPair = await generateKay();
    await this.storage.setItem("PublicKey", keyPair.publicKey);
    await this.storage.setItem("PrivateKey", keyPair.privateKey);
  }
  async sign(content: string): Promise<string> {
    const PrivateKey: string = localStorage.getItem("PrivateKey");
    const PublicKey: string = localStorage.getItem("PublicKey");
    console.log("signPrivateKey", PrivateKey);
    console.log("signPublicKey", PublicKey);
    const sign = await signature(content, PublicKey, PrivateKey);
    await this.storage.setItem("Signature", sign);
    return sign;
  }
  async verify(signature: string, content: string): Promise<boolean> {
    const publicKey: string = localStorage.getItem("PublicKey");
    console.log("verifyPublicKey", publicKey);
    return verify(signature, content, publicKey);
  }
  async encrypt(content: string): Promise<string> {
    await _sodium.ready;
    const sodium = _sodium;
    const clientKeys = sodium.crypto_kx_keypair();
    const PublicKey: string = Buffer.from(clientKeys.publicKey).toString("hex");
    await this.storage.setItem("nonce_public", PublicKey);
    const encryptText = await encrypt(content, PublicKey);
    await this.storage.setItem("EncryptText", encryptText);
    return encryptText;
  }
  async decrypt(content: string): Promise<string> {
    const key = localStorage.getItem("nonce_public");
    return decrypt(content, key);
  }
}
