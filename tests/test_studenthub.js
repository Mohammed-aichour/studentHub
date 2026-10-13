import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { db } from '../server/index.js';

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

console.log('✅ StudentHub test suite passed (4/4 assertions valid)!');
