/**
 * bigint-buffer utilities
 *
 * Provides helper functions for converting between bigint and Buffer
 * in both Big Endian (BE) and Little Endian (LE) formats.
 *
 * These are useful for serialization, cryptography, and encoding
 * values for use in Aztec’s protocol.
 *
 * Example:
 *   const buf = toBufferBE(4660n, 4); // <Buffer 00 00 12 34>
 *   const num = toBigIntBE(buf);      // 4660n
 */

import { Buffer } from 'buffer';

/**
 * Convert bigint → Buffer (big-endian).
 *
 * @param n      bigint to convert
 * @param width  number of bytes in the buffer
 * @returns Buffer of length `width`
 *
 * Example:
 *   toBufferBE(4660n, 4) → <Buffer 00 00 12 34>
 */
export function toBufferBE(n: bigint, width: number): Buffer {
  const hex = n.toString(16).padStart(width * 2, '0');
  return Buffer.from(hex, 'hex');
}

/**
 * Convert bigint → Buffer (little-endian).
 *
 * @param n      bigint to convert
 * @param width  number of bytes in the buffer
 * @returns Buffer of length `width` (least significant byte first)
 *
 * Example:
 *   toBufferLE(4660n, 4) → <Buffer 34 12 00 00>
 */
export function toBufferLE(n: bigint, width: number): Buffer {
  const hex = n.toString(16).padStart(width * 2, '0');
  return Buffer.from(hex.match(/.{2}/g)!.reverse().join(''), 'hex');
}

/**
 * Convert Buffer (big-endian) → bigint.
 *
 * @param buf  Buffer to convert
 * @returns bigint representation
 *
 * Example:
 *   toBigIntBE(<Buffer 00 00 12 34>) → 4660n
 */
export function toBigIntBE(buf: Buffer): bigint {
  return BigInt('0x' + buf.toString('hex'));
}

/**
 * Convert Buffer (little-endian) → bigint.
 *
 * @param buf  Buffer to convert
 * @returns bigint representation
 *
 * Example:
 *   toBigIntLE(<Buffer 34 12 00 00>) → 4660n
 */
export function toBigIntLE(buf: Buffer): bigint {
  return BigInt('0x' + Buffer.from(buf).reverse().toString('hex'));
}
