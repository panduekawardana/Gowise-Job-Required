import 'dotenv/config';
import postgres from 'postgres';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('DATABASE_URL is not set in your .env file');
  process.exit(1);
}

console.log('Attempting to connect to the database...');

const sql = postgres(dbUrl, {
  onnotice: () => {},
  max: 1,
});

async function testConnection() {
  try {
    // Drizzle Kit uses this query to get the version
    const result = await sql`select version()`;
    console.log('Database connection successful!');
    console.log('PostgreSQL version:', result[0].version);
  } catch (error) {
    console.error('Database connection failed:');
    console.error(error);
  } finally {
    await sql.end();
    console.log('Connection closed.');
  }
}

testConnection();
