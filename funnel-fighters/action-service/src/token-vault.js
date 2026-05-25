/**
 * Token Vault — Encrypted credential storage
 * 
 * Tokens are stored AES-256-GCM encrypted on disk.
 * Only readable through the vault API — never exposed as plaintext files.
 * Agents cannot bypass this to read tokens directly.
 */

import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const VAULT_DIR = join(import.meta.dirname, '..', '.vault');
const ALGO = 'aes-256-gcm';
const KEY_LEN = 32;
const SALT_LEN = 16;
const IV_LEN = 16;
const TAG_LEN = 16;

/**
 * Derive encryption key from passphrase + salt
 */
function deriveKey(passphrase, salt) {
  return scryptSync(passphrase, salt, KEY_LEN);
}

/**
 * Encrypt a plaintext string
 * Returns: base64(salt + iv + tag + ciphertext)
 */
function encrypt(plaintext, passphrase) {
  const salt = randomBytes(SALT_LEN);
  const key = deriveKey(passphrase, salt);
  const iv = randomBytes(IV_LEN);
  const cipher = createCipheriv(ALGO, key, iv);
  
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  
  // Format: salt(16) + iv(16) + tag(16) + ciphertext
  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

/**
 * Decrypt a base64-encoded encrypted string
 */
function decrypt(encoded, passphrase) {
  const buf = Buffer.from(encoded, 'base64');
  
  const salt = buf.subarray(0, SALT_LEN);
  const iv = buf.subarray(SALT_LEN, SALT_LEN + IV_LEN);
  const tag = buf.subarray(SALT_LEN + IV_LEN, SALT_LEN + IV_LEN + TAG_LEN);
  const ciphertext = buf.subarray(SALT_LEN + IV_LEN + TAG_LEN);
  
  const key = deriveKey(passphrase, salt);
  const decipher = createDecipheriv(ALGO, key, iv);
  decipher.setAuthTag(tag);
  
  return decipher.update(ciphertext) + decipher.final('utf8');
}

export class TokenVault {
  #passphrase;
  #tokens; // In-memory decrypted cache
  
  constructor(passphrase) {
    if (!passphrase || passphrase.length < 16) {
      throw new Error('Vault passphrase must be at least 16 characters');
    }
    this.#passphrase = passphrase;
    this.#tokens = new Map();
    
    if (!existsSync(VAULT_DIR)) {
      mkdirSync(VAULT_DIR, { recursive: true, mode: 0o700 });
    }
    
    this._loadAll();
  }
  
  /**
   * Store a token (encrypts to disk immediately)
   * @param {string} agent - Agent identifier (e.g. 'nymeria', 'ygritte')
   * @param {string} platform - Platform (e.g. 'google_ads', 'meta')
   * @param {string} token - The plaintext token/credential
   * @param {object} metadata - Optional metadata (scope, expiry, etc.)
   */
  store(agent, platform, token, metadata = {}) {
    const key = `${agent}:${platform}`;
    const payload = JSON.stringify({
      token,
      metadata,
      stored_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    
    const encrypted = encrypt(payload, this.#passphrase);
    const filePath = join(VAULT_DIR, `${agent}_${platform}.enc`);
    writeFileSync(filePath, encrypted, { mode: 0o600 });
    
    this.#tokens.set(key, JSON.parse(payload));
    return { agent, platform, stored: true };
  }
  
  /**
   * Get a token — INTERNAL USE ONLY
   * This is called by the action executor, never exposed via API.
   * Returns the raw token string.
   */
  _getToken(agent, platform) {
    const key = `${agent}:${platform}`;
    const entry = this.#tokens.get(key);
    if (!entry) return null;
    return entry.token;
  }
  
  /**
   * Check if a token exists (safe to expose — doesn't return the token)
   */
  hasToken(agent, platform) {
    return this.#tokens.has(`${agent}:${platform}`);
  }
  
  /**
   * List stored credentials (agent + platform only, no tokens)
   */
  list() {
    const entries = [];
    for (const [key, value] of this.#tokens) {
      const [agent, platform] = key.split(':');
      entries.push({
        agent,
        platform,
        stored_at: value.stored_at,
        updated_at: value.updated_at,
        has_metadata: Object.keys(value.metadata || {}).length > 0
      });
    }
    return entries;
  }
  
  /**
   * Update a token (e.g. after refresh)
   */
  update(agent, platform, newToken) {
    const key = `${agent}:${platform}`;
    const existing = this.#tokens.get(key);
    if (!existing) {
      throw new Error(`No token found for ${agent}:${platform}`);
    }
    return this.store(agent, platform, newToken, {
      ...existing.metadata,
      previous_update: existing.updated_at
    });
  }
  
  /**
   * Remove a token
   */
  remove(agent, platform) {
    const key = `${agent}:${platform}`;
    this.#tokens.delete(key);
    const filePath = join(VAULT_DIR, `${agent}_${platform}.enc`);
    if (existsSync(filePath)) {
      writeFileSync(filePath, randomBytes(256)); // Overwrite before delete
      unlinkSync(filePath);
    }
    return { agent, platform, removed: true };
  }
  
  /**
   * Load all encrypted tokens from disk
   */
  _loadAll() {
    if (!existsSync(VAULT_DIR)) return;
    
    const files = readdirSync(VAULT_DIR).filter(f => f.endsWith('.enc'));
    
    for (const file of files) {
      try {
        const encrypted = readFileSync(join(VAULT_DIR, file), 'utf8');
        const payload = JSON.parse(decrypt(encrypted, this.#passphrase));
        const name = file.replace('.enc', '');
        const [agent, platform] = name.split('_');
        this.#tokens.set(`${agent}:${platform}`, payload);
      } catch (e) {
        console.error(`⚠️ Failed to decrypt ${file}: ${e.message}`);
      }
    }
  }
}
