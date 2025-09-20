import { toBufferBE, toBufferLE, toBigIntBE, toBigIntLE } from './index';

describe('bigint-buffer utils', () => {
  it('should convert bigint → Buffer (BE) and back', () => {
    const num = 4660n; // 0x1234
    const buf = toBufferBE(num, 4);
    expect(buf).toEqual(Buffer.from([0x00, 0x00, 0x12, 0x34]));
    expect(toBigIntBE(buf)).toBe(num);
  });

  it('should convert bigint → Buffer (LE) and back', () => {
    const num = 4660n; // 0x1234
    const buf = toBufferLE(num, 4);
    expect(buf).toEqual(Buffer.from([0x34, 0x12, 0x00, 0x00]));
    expect(toBigIntLE(buf)).toBe(num);
  });

  // 🔹 New test cases added (based on README-style examples)
  it('should handle zero correctly', () => {
    const num = 0n;
    const bufBE = toBufferBE(num, 2);
    const bufLE = toBufferLE(num, 2);
    expect(bufBE).toEqual(Buffer.from([0x00, 0x00]));
    expect(bufLE).toEqual(Buffer.from([0x00, 0x00]));
    expect(toBigIntBE(bufBE)).toBe(0n);
    expect(toBigIntLE(bufLE)).toBe(0n);
  });

  it('should handle large values consistently across BE and LE', () => {
    const num = 0xabcdef1234n;
    const bufBE = toBufferBE(num, 6);
    const bufLE = toBufferLE(num, 6);
    expect(toBigIntBE(bufBE)).toBe(num);
    expect(toBigIntLE(bufLE)).toBe(num);
  });
});
