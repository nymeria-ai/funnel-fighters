#!/usr/bin/env node

/**
 * Token Setup Script — Interactive CLI to store tokens in the vault
 * 
 * Usage:
 *   VAULT_PASSPHRASE=<secret> node src/setup-tokens.js
 * 
 * Or via the running service API:
 *   curl -X POST http://localhost:9400/token/store \
 *     -H "Content-Type: application/json" \
 *     -H "X-Admin-Key: <admin-key>" \
 *     -d '{"agent":"nymeria","platform":"meta","token":"<token>"}'
 */

import { TokenVault } from './token-vault.js';
import { createInterface } from 'node:readline';

const VAULT_PASSPHRASE = process.env.VAULT_PASSPHRASE;

if (!VAULT_PASSPHRASE) {
  console.error('❌ VAULT_PASSPHRASE environment variable is required');
  process.exit(1);
}

const vault = new TokenVault(VAULT_PASSPHRASE);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  console.log('\n🔐 Action Service — Token Setup\n');
  console.log('Currently stored credentials:');
  
  const existing = vault.list();
  if (existing.length === 0) {
    console.log('  (none)\n');
  } else {
    existing.forEach(e => {
      console.log(`  ✅ ${e.agent}:${e.platform} (stored: ${e.stored_at})`);
    });
    console.log();
  }
  
  const agent = await ask('Agent (nymeria/ygritte): ');
  const platform = await ask('Platform (google_ads/meta/youtube): ');
  
  console.log('\nPaste the token/credentials below.');
  console.log('For Google Ads, paste JSON: {"client_id":"...","client_secret":"...","refresh_token":"...","developer_token":"...","login_customer_id":"..."}');
  console.log('For Meta, paste the access token string.\n');
  
  const token = await ask('Token: ');
  
  if (!token.trim()) {
    console.log('❌ Empty token, aborting');
    process.exit(1);
  }
  
  vault.store(agent.trim(), platform.trim(), token.trim(), {
    setup_method: 'cli',
    setup_date: new Date().toISOString()
  });
  
  console.log(`\n✅ Token stored for ${agent}:${platform}`);
  console.log('Encrypted and saved to .vault/ directory\n');
  
  rl.close();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
