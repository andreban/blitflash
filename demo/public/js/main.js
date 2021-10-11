var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BlitFlasher } from 'blitflash';
const connect = document.querySelector('#connect');
const disconnect = document.querySelector('#disconnect');
const status = document.querySelector('#status');
const reset = document.querySelector('#reset');
const list = document.querySelector('#list');
const flash = document.querySelector('#flash');
const sd = document.querySelector('#sd');
const statusText = document.querySelector('#status_text');
const listContent = document.querySelector('#list-content');
if (BlitFlasher.supportsWebSerial()) {
    connect.disabled = false;
}
let blitflash = null;
connect.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const port = yield BlitFlasher.getOrRequestPort();
    blitflash = new BlitFlasher(port);
    yield blitflash.open();
    connect.disabled = true;
    disconnect.disabled = false;
    status.disabled = false;
    reset.disabled = false;
    list.disabled = false;
    flash.disabled = false;
    sd.disabled = false;
    const blitStatus = yield blitflash.status();
    statusText.innerText = blitStatus;
}));
disconnect.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield (blitflash === null || blitflash === void 0 ? void 0 : blitflash.close());
    blitflash = null;
    connect.disabled = false;
    disconnect.disabled = true;
    status.disabled = true;
    reset.disabled = true;
    list.disabled = true;
    flash.disabled = true;
    sd.disabled = true;
}));
reset.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (blitflash === null) {
        console.error('Not Connected');
        return;
    }
    yield blitflash.reset();
    const status = yield blitflash.status();
    statusText.innerText = status;
}));
status.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (blitflash === null) {
        console.error('Not Connected');
        return;
    }
    const status = yield blitflash.status();
    statusText.innerText = status;
}));
list.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (blitflash === null) {
        console.error('Not Connected');
        return;
    }
    const blitRecords = yield blitflash.list();
    listContent.innerHTML = '';
    blitRecords.forEach((record) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = ((_a = record.meta) === null || _a === void 0 ? void 0 : _a.title) || '';
        tr.appendChild(td);
        td = document.createElement('td');
        const imageSrc = (_c = (_b = record.meta) === null || _b === void 0 ? void 0 : _b.splash) === null || _c === void 0 ? void 0 : _c.asDataUrl();
        if (imageSrc) {
            const img = document.createElement('img');
            img.src = imageSrc;
            td.appendChild(img);
        }
        else {
            td.innerText = 'N/A';
        }
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerText = ((_d = record.meta) === null || _d === void 0 ? void 0 : _d.description) || '';
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerText = ((_e = record.meta) === null || _e === void 0 ? void 0 : _e.author) || '';
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerText = ((_f = record.meta) === null || _f === void 0 ? void 0 : _f.date) || '';
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerText = ((_g = record.meta) === null || _g === void 0 ? void 0 : _g.version) || '';
        tr.appendChild(td);
        listContent.appendChild(tr);
    });
}));
flash.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (blitflash === null) {
        console.error('Not Connected');
        return;
    }
    const response = yield fetch('snake.blit');
    const arrayBuffer = new Uint8Array(yield response.arrayBuffer());
    console.log(`Received arrayBuffer with size ${arrayBuffer.byteLength}`);
    try {
        yield blitflash.sendFile(arrayBuffer, 'flash', 'snake.blit');
        alert('snake.blit flashed successfully');
    }
    catch (e) {
        console.error('Error uploading blit file', e);
    }
}));
sd.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    if (blitflash === null) {
        console.error('Not Connected');
        return;
    }
    const response = yield fetch('snake.blit');
    const arrayBuffer = new Uint8Array(yield response.arrayBuffer());
    console.log(`Received arrayBuffer with size ${arrayBuffer.byteLength}`);
    try {
        yield blitflash.sendFile(arrayBuffer, 'sd', 'snake.blit', '/');
        alert('snake.blit flashed successfully');
    }
    catch (e) {
        console.error('Error uploading blit file', e);
    }
}));
//# sourceMappingURL=main.js.map