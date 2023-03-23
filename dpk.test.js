const { deterministicPartitionKey } = require('./dpk');
const crypto = require('crypto');

describe('deterministicPartitionKey', () => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;

  const generateHash = (data) => {
    return crypto.createHash('sha3-512').update(data).digest('hex');
  };
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });
  it('returns the partition key from the event if it exists', () => {
    const event = { partitionKey: 'my-key' };
    const result = deterministicPartitionKey(event);
    expect(result).toBe('my-key');
  });

  it('returns the trivial partition key if the event is falsy', () => {
    const result = deterministicPartitionKey(null);
    expect(result).toBe('0');
  });
  it('generates a partition key from the event if it does not have one', () => {
    const event = { someData: 'foo', moreData: 'bar' };
    const data = JSON.stringify(event);
    const expected = generateHash(data);
    const result = deterministicPartitionKey(event);
    expect(result).toEqual(expected);
  });

  it('returns a trivial partition key if event is not provided', () => {
    const result = deterministicPartitionKey();
    expect(result).toEqual(TRIVIAL_PARTITION_KEY);
  });

  it('generates a hash for the candidate partition key if its length exceeds MAX_PARTITION_KEY_LENGTH', () => {
    const longString = 'a'.repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const partitionKey = deterministicPartitionKey({
      partitionKey: longString,
    });
    const expectedHash = generateHash(longString);

    expect(expectedHash.length).toBeLessThan(MAX_PARTITION_KEY_LENGTH);
  });

  it('stringifies candidate partition key if it is not a string', () => {
    const data = { foo: 'bar', baz: 42 };
    const candidate = data; // candidate is an object, not a string

    const partitionKey = deterministicPartitionKey({ partitionKey: candidate });

    expect(typeof partitionKey).toBe('string');
    expect(JSON.parse(partitionKey)).toEqual(candidate);
  });

  it('does not generate a hash for the candidate partition key if its length does not exceed MAX_PARTITION_KEY_LENGTH', () => {
    const data = { foo: 'bar', baz: 42 };
    const candidate = JSON.stringify(data).repeat(20); // candidate length > MAX_PARTITION_KEY_LENGTH

    const partitionKey = deterministicPartitionKey({ partitionKey: candidate });

    expect(partitionKey).toBe(candidate);
  });
});
