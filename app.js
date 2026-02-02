import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

const file = './students.json';

const readStudents = () => {
    const data = fs.readFileSync(file);
    return JSON.parse(data);
};

const writeStudents = (data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

app.get('/students', (req, res) => {
    const students = readStudents();
    res.json(students);
});

app.get('/students/:id', (req, res) => {
    const students = readStudents();

    const student = students.find(s => s.id == req.params.id);

    if (!student) return res.send("Student not found");

    res.json(student);
});

app.post('/students', (req, res) => {
    const students = readStudents();

    const newStudent = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        course: req.body.course
    };

    students.push(newStudent);
    writeStudents(students);

    res.json({ message: "Student added", student: newStudent });
});

app.put('/students/:id', (req, res) => {
    let students = readStudents();

    students = students.map(s =>
        s.id == req.params.id ? { ...req.body, id: s.id } : s
    );

    writeStudents(students);

    res.send("Student updated successfully");
});

app.delete('/students/:id', (req, res) => {
    let students = readStudents();

    students = students.filter(s => s.id != req.params.id);

    writeStudents(students);

    res.send("Student deleted successfully");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});




