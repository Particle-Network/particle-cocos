export class HexConverter {
    static jsonToHexString(json: object): string {
      const jsonString = JSON.stringify(json);
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(jsonString);
      const hexArray = Array.from(uint8Array, (byte) => byte.toString(16).padStart(2, '0'));
      return hexArray.join('');
    }

    
  }
  export class Base64Convertor {
    static base64Encode(input: string): string {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const len = data.length;
        const padding = '='.repeat((4 - (len % 4)) % 4);
        const base64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      
        let base64 = '';
      
        for (let i = 0; i < len; i += 3) {
          const a = data[i];
          const b = data[i + 1] ?? 0;
          const c = data[i + 2] ?? 0;
      
          const index1 = a >> 2;
          const index2 = ((a & 3) << 4) | (b >> 4);
          const index3 = ((b & 15) << 2) | (c >> 6);
          const index4 = c & 63;
      
          base64 += base64Table[index1] + base64Table[index2] + base64Table[index3] + base64Table[index4];
        }
      
        return base64.slice(0, base64.length - padding.length) + padding;
      }
  }