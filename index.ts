import { localStorage } from "./wallet/ls";
import { fileStorage, Wallet } from "./wallet/wallet";
async function wallet() {
  try {
    const newWallet = new Wallet(new fileStorage(null as any));
    await newWallet.create();
    await newWallet.sign("I am president");
    const sign = localStorage.getItem("Signature");
    await newWallet.verify(sign, "I am president");
    await newWallet.encrypt("I am president");
    const encryptText: string = localStorage.getItem("EncryptText");
    console.log("encryptText:", encryptText);
    await newWallet.decrypt(encryptText);
  } catch (e: any) {
    console.log(e.message);
  }
}
wallet();
