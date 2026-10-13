/**
 * StudentHub API & Server
 * Author: Mohammed AICHOUR
 */

import http from 'node:http';
import url from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-Memory Academic Database Seed
const db = {
  students: [
    { id: 1, number: 'E202401', name: 'Mohammed AICHOUR', program: 'Génie Informatique & IA', semester: 4 }
  ],
  courses: [
    { id: 1, code: 'INFO401', title: 'Architecture Logicielle & Microservices', credits: 4, instructor: 'Dr. Bennani', room: 'Amphi B' },
    { id: 2, code: 'INFO402', title: 'Vision par Ordinateur & Deep Learning', credits: 4, instructor: 'Dr. Alami', room: 'Lab AI-1' },
    { id: 3, code: 'INFO403', title: 'Bases de Données Avancées & SQL', credits: 3, instructor: 'Pr. Chraibi', room: 'Salle 204' },
    { id: 4, code: 'INFO404', title: 'Développement Web Full-Stack', credits: 3, instructor: 'Pr. Mansouri', room: 'Lab Web' }
  ],
  grades: [
    { studentId: 1, courseCode: 'INFO401', midterm: 18.5, final: 19.0, status: 'validé' },
    { studentId: 1, courseCode: 'INFO402', midterm: 19.0, final: 19.5, status: 'validé' },
    { studentId: 1, courseCode: 'INFO403', midterm: 17.0, final: 18.0, status: 'validé' },
    { studentId: 1, courseCode: 'INFO404', midterm: 19.5, final: 20.0, status: 'validé' }
  ],
  schedule: [
    { day: 'Lundi', time: '08:30 - 11:30', course: 'Architecture Logicielle & Microservices', room: 'Amphi B' },
    { day: 'Mardi', time: '14:00 - 17:00', course: 'Vision par Ordinateur & Deep Learning', room: 'Lab AI-1' },
    { day: 'Jeudi', time: '09:00 - 12:00', course: 'Développement Web Full-Stack', room: 'Lab Web' },
    { day: 'Vendredi', time: '14:30 - 17:30', course: 'Bases de Données Avancées & SQL', room: 'Salle 204' }
  ],
  attendance: {
    totalSessions: 48,
    present: 48,
    absent: 0,
    rate: '100%'
  }
};

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Endpoints
  if (pathname === '/api/student') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, student: db.students[0] }));
    return;
  }

  if (pathname === '/api/courses') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, courses: db.courses }));
    return;
  }

  if (pathname === '/api/grades') {
    const studentGrades = db.grades.filter(g => g.studentId === 1);
    const gpa = (studentGrades.reduce((sum, g) => sum + (g.midterm + g.final) / 2, 0) / studentGrades.length).toFixed(2);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, grades: studentGrades, gpaOutOf20: parseFloat(gpa) }));
    return;
  }

  if (pathname === '/api/schedule') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, schedule: db.schedule }));
    return;
  }

  if (pathname === '/api/attendance') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, attendance: db.attendance }));
    return;
  }

  // Serve static UI if root or html
  if (pathname === '/' || pathname === '/index.html') {
    const htmlPath = path.join(__dirname, '../public/index.html');
    if (fs.existsSync(htmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(htmlPath));
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

const PORT = process.env.PORT || 3005;
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`StudentHub running at http://localhost:${PORT}`);
  });
}

export { server, db };
