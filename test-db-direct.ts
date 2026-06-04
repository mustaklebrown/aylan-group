import { Client } from 'pg';
import 'dotenv/config';

async function testConn(connectionString: string, label: string) {
  console.log(`Testing ${label}...`);
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  try {
    await client.connect();
    console.log(`Success connecting to ${label}!`);
    const res = await client.query('SELECT NOW()');
    console.log(`Time from DB:`, res.rows[0].now);
    await client.end();
  } catch (err: any) {
    console.error(`Failed to connect to ${label}:`, err.message);
  }
}

async function main() {
  // Test connection pooler format
  // Format: postgresql://[DB-USER].[PROJECT-REF]:[YOUR-PASSWORD]@[POOLER-HOST]:6543/[DATABASE-NAME]
  const poolerUrl = "postgresql://postgres.hkvcuhpoyddqvdromfbg:aylangroup%402026@aws-0-eu-west-1.pooler.supabase.com:6543/postgres";
  await testConn(poolerUrl, "Supabase Pooler (Port 6543 / Transaction Mode)");

  // Supabase also supports Session Mode on port 5432 or 6543 for pooler? Wait, session mode is usually port 5432 or pooler with mode=session
  const poolerSessionUrl = "postgresql://postgres.hkvcuhpoyddqvdromfbg:aylangroup%402026@aws-0-eu-west-1.pooler.supabase.com:5432/postgres";
  await testConn(poolerSessionUrl, "Supabase Pooler (Port 5432 / Session Mode)");
}

main();
