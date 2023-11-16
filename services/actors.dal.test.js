const dal = require("./db");
const { getActors, getActorByActorId, addActor } = require('../services/actors.dal')
global.DEBUG = false;

describe('ACTOR TABLE OPERATIONS:', () => {
  let rowCount = 0;
  beforeAll(async() => {
    const result = await dal.query('SELECT COUNT(*) FROM actor');
    rowCount = parseInt(result.rows[0].count, 10);
    // Insert known data
    const knownActors = [
      { first_name: 'John', last_name: 'Test' },
      { first_name: 'Jane', last_name: 'Test' }
    ];
    await Promise.all(knownActors.map(actor => 
      dal.query('INSERT INTO actor (first_name, last_name) VALUES ($1, $2)', [actor.first_name, actor.last_name])
    ));
  });

  it('should return new actors from the database', async () => {
    // This is the known data in your test database
    const expectedRows = [{ actor_id: rowCount + 1, first_name: 'John', last_name: 'Test' },
                          { actor_id: rowCount + 2, first_name: 'Jane', last_name: 'Test' }];

    const rows = await getActors();
    await expect(rows[1]).toEqual(expectedRows[0]);
    await expect(rows[0]).toEqual(expectedRows[1]);
  });

  it('should return an actor from the database', async () => {
    const expectedRow = { actor_id: rowCount + 1, first_name: 'John', last_name: 'Test' };
    const row = await getActorByActorId(rowCount + 1);
    await expect(row[0]).toEqual(expectedRow);
  });

  it('should add an actor to the database', async () => {
    const expectedRow = { actor_id: rowCount + 3, first_name: 'Test', last_name: 'Test' };
    const row = await addActor('Test', 'Test');
    await expect(row[0].actor_id).toEqual(expectedRow.actor_id);
  });

  it('should add an actor to the database and increment the row count', async () => {
    const expectedRowCount = rowCount + 4;
    const row = await addActor('Test', 'Test');
    const result = await dal.query('SELECT COUNT(*) FROM actor');
    const actualRowCount = parseInt(result.rows[0].count, 10);
    await expect(row[0].actor_id).toEqual(expectedRowCount);
    await expect(actualRowCount).toEqual(expectedRowCount);
  });

  afterAll(async() => {
    // Delete test data
    await dal.query('DELETE FROM actor WHERE last_name = $1', ['Test']);
    await dal.query(`SELECT setval('actor_actor_id_seq', ${rowCount + 1} , false)`);
    await dal.end();
  });
});