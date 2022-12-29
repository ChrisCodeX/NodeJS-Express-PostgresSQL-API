import {Client} from 'pg';

export async function GetConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'my_store',
    user: 'chris',
    password: 'admin123'
  });
  await client.connect();
  return client;
}