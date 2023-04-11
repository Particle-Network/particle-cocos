export class HexConverter {
    static jsonToHexString(json: object): string {
      const jsonString = JSON.stringify(json);
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(jsonString);
      const hexArray = Array.from(uint8Array, (byte) => byte.toString(16).padStart(2, '0'));
      return hexArray.join('');
    }
}
