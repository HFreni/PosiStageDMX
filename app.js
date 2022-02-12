const dgram = require('dgram');

const { Sender } = require('sacn');

// PosiStageNet transmits UDP multicast at: 236.10.10.10
const PSNserver = dgram.createSocket('udp4');
const PSNport = 56565;
const sACNport = 5568;

const sACNServer = new Sender({
    universe: 1,
    port: sACNport
});

async function main() {
    await sACNServer.send({
        payload: {
            1: 100,
        },
        sourceName: "PosiStageDMX",
        priority: 100
    });

    sACNServer.close();
}

PSNserver.on('error', (err) => {
    console.log('UDP Error:\n${err.stack}');
    PSNserver.close();
});

PSNserver.on('message', (msg, rinfo) => {
    console.log("Server Recieved Message: ${msg} from ${rinfo.address}:${rinfo.port}");
});

PSNserver.on("listening", () => {
    const address = PSNserver.address();
    console.log('Server Listening on: ${address.address}:${address:port}');
});

PSNserver.bind(PSNport);
main();