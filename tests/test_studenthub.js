import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { db, server } from '../server/index.js';

console.log('Running test suite for StudentHub...');

// Test 1: Verify data integrity
assert(Array.isArray(db.students), 'Students list must be array');
assert(db.students.length > 0, 'Must have at least 1 student');
assert.strictEqual(db.students[0].name, 'Mohammed AICHOUR', 'Student name must match author');

// Test 2: Verify course catalog
assert(db.courses.length >= 4, 'Must have at least 4 registered courses');

// Test 3: Verify GPA calculation
const grades = db.grades;
const avg = grades.reduce((s, g) => s + (g.midterm + g.final) / 2, 0) / grades.length;
assert(avg >= 18.0, 'Average grade should reflect outstanding performance');

// Test 4: Schema file exists and contains valid DDL
const schema = fs.readFileSync(path.resolve('database/schema.sql'), 'utf-8');
assert(schema.includes('CREATE TABLE IF NOT EXISTS students'), 'Schema missing students table');
assert(schema.includes('CREATE TABLE IF NOT EXISTS enrollments'), 'Schema missing enrollments table');

console.log('  ✓ Model, data, and schema assertions passed.');

// Test 5: HTTP Integration Tests
const TEST_PORT = 3099;
server.listen(TEST_PORT, async () => {
  try {
    const resStudent = await fetch(`http://localhost:${TEST_PORT}/api/student`);
    assert.strictEqual(resStudent.status, 200, 'GET /api/student must return 200');
    const studentData = await resStudent.json();
    assert.strictEqual(studentData.student.name, 'Mohammed AICHOUR');

    const resCourses = await fetch(`http://localhost:${TEST_PORT}/api/courses`);
    assert.strictEqual(resCourses.status, 200, 'GET /api/courses must return 200');

    const resGrades = await fetch(`http://localhost:${TEST_PORT}/api/grades`);
    assert.strictEqual(resGrades.status, 200, 'GET /api/grades must return 200');

    const resRoot = await fetch(`http://localhost:${TEST_PORT}/`);
    assert.strictEqual(resRoot.status, 200, 'GET / must return 200 for index.html');

    console.log('  ✓ HTTP API endpoints and static serving verified.');
    console.log('✅ ALL STUDENTHUB TESTS PASSED SUCCESSFULLY (5/5 suites)!');
  } catch (err) {
    console.error('Integration test failed:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

