const engine = require("./engine.core");

async function test() {
    const result = await engine.analyze(
        "URGENT! Send $5000 immediately to your bank account or your account will be blocked.",
        5000
    );
    console.log(result);
}

test();
