import express from 'express';
import { NodeVM } from 'vm2';
import cors from 'cors'; 
const app = express();

app.use(cors());
app.use(express.json());

app.post('/execute-code', async (req, res) => {
    const { code, testCases, functionName } = req.body;
    const vm = new NodeVM({
        console: 'inherit',
        sandbox: {},
        require: {
            external: true,
            root: "./",
        },
    });

    // Define test cases
    // const testCases = [
    //     { input: 2, expected: true },
    //     { input: 3, expected: false },
    //     { input: 4, expected: true },
    //     { input: 5, expected: false },
    //     // Add more test cases as needed
    // ];

    try {
        vm.run(code); // Execute the code to define the function

        console.log('code', code);
        console.log('functionName', functionName);
        console.log('testCases', testCases);

        const functionToRun = vm.run(`${code}; module.exports = ${functionName};`, 'vm.js');
        // Run test cases
        const results = testCases.map(test => ({
            input: test.input,
            expected: test.expected,
            actual: functionToRun(test.input),
        }));

        // Check if all tests pass
        const allTestsPassed = results.every(test => test.expected === test.actual);
        console.log('alltestpassed', allTestsPassed);
        res.send({
            success: true,
            allTestsPassed,
            results,
        });
    } catch (error) {
        res.send({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
