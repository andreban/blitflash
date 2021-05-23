/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var blitflash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! blitflash */ \"../dist/index.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\nconst connect = document.querySelector('#connect');\r\nconst disconnect = document.querySelector('#disconnect');\r\nconst status = document.querySelector('#status');\r\nconst reset = document.querySelector('#reset');\r\nconst list = document.querySelector('#list');\r\nconst statusText = document.querySelector('#status_text');\r\nconst listContent = document.querySelector('#list-content');\r\nlet blitflash;\r\nconnect.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {\r\n    const port = yield navigator.serial.requestPort();\r\n    blitflash = new blitflash__WEBPACK_IMPORTED_MODULE_0__.BlitFlasher(port);\r\n    yield blitflash.open();\r\n    connect.disabled = true;\r\n    disconnect.disabled = false;\r\n    status.disabled = false;\r\n    reset.disabled = false;\r\n    list.disabled = false;\r\n    const blitStatus = yield blitflash.status();\r\n    statusText.innerText = blitStatus;\r\n}));\r\ndisconnect.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {\r\n    yield blitflash.close();\r\n    connect.disabled = false;\r\n    disconnect.disabled = true;\r\n    status.disabled = true;\r\n    reset.disabled = true;\r\n    list.disabled = true;\r\n}));\r\nreset.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {\r\n    yield blitflash.reset();\r\n    const status = yield blitflash.status();\r\n    statusText.innerText = status;\r\n}));\r\nstatus.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {\r\n    const status = yield blitflash.status();\r\n    statusText.innerText = status;\r\n}));\r\nlist.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {\r\n    const blitRecords = yield blitflash.list();\r\n    blitRecords.forEach((record) => {\r\n        var _a, _b, _c, _d, _e;\r\n        const tr = document.createElement('tr');\r\n        let td = document.createElement('td');\r\n        td.innerText = ((_a = record.meta) === null || _a === void 0 ? void 0 : _a.title) || '';\r\n        tr.appendChild(td);\r\n        td = document.createElement('td');\r\n        td.innerText = ((_b = record.meta) === null || _b === void 0 ? void 0 : _b.description) || '';\r\n        tr.appendChild(td);\r\n        td = document.createElement('td');\r\n        td.innerText = ((_c = record.meta) === null || _c === void 0 ? void 0 : _c.author) || '';\r\n        tr.appendChild(td);\r\n        td = document.createElement('td');\r\n        td.innerText = ((_d = record.meta) === null || _d === void 0 ? void 0 : _d.date) || '';\r\n        tr.appendChild(td);\r\n        td = document.createElement('td');\r\n        td.innerText = ((_e = record.meta) === null || _e === void 0 ? void 0 : _e.version) || '';\r\n        tr.appendChild(td);\r\n        listContent.appendChild(tr);\r\n    });\r\n}));\r\n\n\n//# sourceURL=webpack://32blit-flash-demo/./src/main.ts?");

/***/ }),

/***/ "../dist/index.js":
/*!************************!*\
  !*** ../dist/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BlitFlasher = void 0;\r\nconst BlitFlasher_1 = __webpack_require__(/*! ./lib/BlitFlasher */ \"../dist/lib/BlitFlasher.js\");\r\nObject.defineProperty(exports, \"BlitFlasher\", ({ enumerable: true, get: function () { return BlitFlasher_1.BlitFlasher; } }));\r\n\n\n//# sourceURL=webpack://32blit-flash-demo/../dist/index.js?");

/***/ }),

/***/ "../dist/lib/BlitConnection.js":
/*!*************************************!*\
  !*** ../dist/lib/BlitConnection.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BlitConnection = void 0;\r\nconst BlitMetaStandAlone_1 = __webpack_require__(/*! ./BlitMetaStandAlone */ \"../dist/lib/BlitMetaStandAlone.js\");\r\nconst ReadBuffer_1 = __webpack_require__(/*! ./ReadBuffer */ \"../dist/lib/ReadBuffer.js\");\r\nclass BlitConnection {\r\n    constructor(reader, writer) {\r\n        this.reader = reader;\r\n        this.writer = writer;\r\n        this.encoder = new TextEncoder();\r\n        this.decoder = new TextDecoder();\r\n        this.readBuffer = new ReadBuffer_1.ReadBuffer();\r\n        this.readLoop();\r\n    }\r\n    readLoop() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            while (true) {\r\n                const { value, done } = yield this.reader.read();\r\n                if (value) {\r\n                    // console.log('>>>', this.decoder.decode(value));\r\n                    this.readBuffer.append(value);\r\n                }\r\n                if (done) {\r\n                    this.reader.releaseLock();\r\n                    this.readBuffer.failPendingPromises(new Error('ReadableStream is done.'));\r\n                    break;\r\n                }\r\n            }\r\n        });\r\n    }\r\n    write(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const encoded = this.encoder.encode(payload);\r\n            yield this.writer.write(encoded);\r\n        });\r\n    }\r\n    close() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.writer.close();\r\n            yield this.reader.cancel();\r\n        });\r\n    }\r\n    reset() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.write('32BL_RST\\0');\r\n            yield this.writer.ready;\r\n        });\r\n    }\r\n    status() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.write('32BLINFO\\0');\r\n            const result = yield this.readBuffer.read(8);\r\n            return this.decoder.decode(result);\r\n        });\r\n    }\r\n    list() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const records = [];\r\n            yield this.write('32BL__LS\\0');\r\n            let offset = yield this.readBuffer.readUint32(true);\r\n            while (offset !== 0xFFFFFFFF) {\r\n                let size = yield this.readBuffer.readUint32(true);\r\n                const metaHead = this.decoder.decode(yield this.readBuffer.read(8));\r\n                if (metaHead !== 'BLITMETA') {\r\n                    throw new Error(`Incorret meta header. Received ${metaHead}`);\r\n                }\r\n                const metaSize = yield this.readBuffer.readUint16(true);\r\n                let meta;\r\n                if (metaSize > 0) {\r\n                    size = size + metaSize + 10;\r\n                    meta = BlitMetaStandAlone_1.BlitMetaStandalone.parse((yield this.readBuffer.read(metaSize)).buffer);\r\n                }\r\n                records.push({\r\n                    offset: offset,\r\n                    size: size,\r\n                    meta: meta,\r\n                });\r\n                offset = yield this.readBuffer.readUint32(true);\r\n            }\r\n            return records;\r\n        });\r\n    }\r\n}\r\nexports.BlitConnection = BlitConnection;\r\n\n\n//# sourceURL=webpack://32blit-flash-demo/../dist/lib/BlitConnection.js?");

/***/ }),

/***/ "../dist/lib/BlitFlasher.js":
/*!**********************************!*\
  !*** ../dist/lib/BlitFlasher.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BlitFlasher = void 0;\r\nconst BlitConnection_1 = __webpack_require__(/*! ./BlitConnection */ \"../dist/lib/BlitConnection.js\");\r\nconst util_1 = __webpack_require__(/*! ./util */ \"../dist/lib/util.js\");\r\nclass BlitFlasher {\r\n    constructor(port) {\r\n        this.port = port;\r\n    }\r\n    open() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.port.open({\r\n                baudRate: 115200,\r\n                dataBits: 8,\r\n                stopBits: 1\r\n            });\r\n            this.connection = new BlitConnection_1.BlitConnection(this.port.readable.getReader(), this.port.writable.getWriter());\r\n        });\r\n    }\r\n    close() {\r\n        var _a;\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            (_a = this.connection) === null || _a === void 0 ? void 0 : _a.close();\r\n        });\r\n    }\r\n    status() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return this.connection.status();\r\n        });\r\n    }\r\n    list() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return this.connection.list();\r\n        });\r\n    }\r\n    reset() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (this.connection) {\r\n                yield this.connection.reset();\r\n                yield this.connection.close();\r\n                yield this.port.close();\r\n            }\r\n            yield util_1.sleep(1000);\r\n            yield this.open();\r\n        });\r\n    }\r\n}\r\nexports.BlitFlasher = BlitFlasher;\r\n\n\n//# sourceURL=webpack://32blit-flash-demo/../dist/lib/BlitFlasher.js?");

/***/ }),

/***/ "../dist/lib/BlitMetaStandAlone.js":
/*!*****************************************!*\
  !*** ../dist/lib/BlitMetaStandAlone.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.BlitMetaStandalone = exports.BlitImage = void 0;\r\nconst RandomAccessReader_1 = __webpack_require__(/*! ./RandomAccessReader */ \"../dist/lib/RandomAccessReader.js\");\r\nclass BlitImage {\r\n    constructor(type, dataLength, width, height, format, pallete, pixels) {\r\n        this.type = type;\r\n        this.dataLength = dataLength;\r\n        this.width = width;\r\n        this.height = height;\r\n        this.format = format;\r\n        this.pallete = pallete;\r\n        this.pixels = pixels;\r\n    }\r\n    static parse(reader) {\r\n        const header = reader.readString(6);\r\n        if (header !== 'SPRITE') {\r\n            throw new Error(`Invalid header for BlitImage: ${header}`);\r\n        }\r\n        const type = reader.readString(2);\r\n        const dataLength = reader.readUint32(true);\r\n        const width = reader.readUint16(true);\r\n        const height = reader.readUint16(true);\r\n        const format = reader.readUint8();\r\n        const palleteLength = reader.readUint8();\r\n        const pallete = reader.read(palleteLength * 4);\r\n        const pixels = reader.read(dataLength - 18 - palleteLength * 4);\r\n        return new BlitImage(type, dataLength, width, height, format, pallete, pixels);\r\n    }\r\n}\r\nexports.BlitImage = BlitImage;\r\n/**\r\n * As defined at\r\n * https://github.com/32blit/32blit-tools/blob/a520a742450c8da97f88f6c0ce74ac0038093e02/src/ttblit/core/struct.py#L79\r\n */\r\nclass BlitMetaStandalone {\r\n    constructor(checksum, date, title, description, version, author, blittype, category, url, filetypes, icon, splash) {\r\n        this.checksum = checksum;\r\n        this.date = date;\r\n        this.title = title;\r\n        this.description = description;\r\n        this.version = version;\r\n        this.author = author;\r\n        this.blittype = blittype;\r\n        this.category = category;\r\n        this.url = url;\r\n        this.filetypes = filetypes;\r\n        this.icon = icon;\r\n        this.splash = splash;\r\n    }\r\n    static parse(buffer) {\r\n        const reader = new RandomAccessReader_1.RandomAccessReader(buffer);\r\n        const checksum = reader.readUint32(true);\r\n        const date = reader.readString(16);\r\n        const title = reader.readString(25);\r\n        const description = reader.readString(129);\r\n        const version = reader.readString(17);\r\n        const author = reader.readString(17);\r\n        let category;\r\n        let url;\r\n        let filetypes;\r\n        const pos = reader.getPos();\r\n        const blitType = reader.readString(8);\r\n        console.log(blitType);\r\n        if (blitType === 'BLITTYPE') {\r\n            category = reader.readString(17);\r\n            url = reader.readString(129);\r\n            const filetypesLength = reader.readUint8();\r\n            filetypes = [];\r\n            for (let i = 0; i < filetypesLength; i++) {\r\n                filetypes.push(reader.readString(5));\r\n            }\r\n        }\r\n        else {\r\n            reader.setPos(pos);\r\n        }\r\n        const icon = BlitImage.parse(reader);\r\n        const splash = BlitImage.parse(reader);\r\n        return new BlitMetaStandalone(checksum, date, title, description, version, author, blitType, category, url, filetypes, icon, splash);\r\n    }\r\n}\r\nexports.BlitMetaStandalone = BlitMetaStandalone;\r\n\n\n//# sourceURL=webpack://32blit-flash-demo/../dist/lib/BlitMetaStandAlone.js?");

/***/ }),

/***/ "../dist/lib/RandomAccessReader.js":
/*!*****************************************!*\
  !*** ../dist/lib/RandomAccessReader.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.RandomAccessReader = void 0;\r\nclass RandomAccessReader {\r\n    constructor(buffer) {\r\n        this.buffer = buffer;\r\n        this.textdecoder = new TextDecoder();\r\n        this.currentPos = 0;\r\n        this.dataview = new DataView(buffer);\r\n    }\r\n    read(length) {\r\n        if (this.currentPos + length > this.dataview.byteLength) {\r\n            throw new Error(`Tried to read beyond length. pos: ${this.currentPos}, buffer byteLength: ${this.dataview.byteLength}, length: ${length} `);\r\n        }\r\n        const result = this.buffer.slice(this.currentPos, this.currentPos + length);\r\n        this.currentPos += length;\r\n        return result;\r\n    }\r\n    readUint8() {\r\n        if (this.currentPos + 1 >= this.dataview.byteLength) {\r\n            throw new Error('Tried to read beyond length.');\r\n        }\r\n        const value = this.dataview.getUint8(this.currentPos);\r\n        this.currentPos += 1;\r\n        return value;\r\n    }\r\n    readUint16(littleEndian) {\r\n        if (this.currentPos + 2 >= this.dataview.byteLength) {\r\n            throw new Error('Tried to read beyond length.');\r\n        }\r\n        const value = this.dataview.getUint16(this.currentPos, littleEndian);\r\n        this.currentPos += 2;\r\n        return value;\r\n    }\r\n    readUint32(littleEndian) {\r\n        if (this.currentPos + 4 >= this.dataview.byteLength) {\r\n            throw new Error('Tried to read beyond length.');\r\n        }\r\n        const value = this.dataview.getUint32(this.currentPos, littleEndian);\r\n        this.currentPos += 4;\r\n        return value;\r\n    }\r\n    readString(length) {\r\n        const data = new Uint8Array(this.read(length));\r\n        let end = data.findIndex((value) => value === 0);\r\n        if (end === -1) {\r\n            end = length - 1;\r\n        }\r\n        return this.textdecoder.decode(data.slice(0, end + 1));\r\n    }\r\n    getPos() {\r\n        return this.currentPos;\r\n    }\r\n    setPos(newPos) {\r\n        if (newPos >= this.dataview.byteLength) {\r\n            throw new Error('Cant set position beyond length.');\r\n        }\r\n        this.currentPos = newPos;\r\n    }\r\n    byteLength() {\r\n        return this.dataview.byteLength;\r\n    }\r\n}\r\nexports.RandomAccessReader = RandomAccessReader;\r\n\n\n//# sourceURL=webpack://32blit-flash-demo/../dist/lib/RandomAccessReader.js?");

/***/ }),

/***/ "../dist/lib/ReadBuffer.js":
/*!*********************************!*\
  !*** ../dist/lib/ReadBuffer.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.ReadBuffer = void 0;\r\nconst INITIAL_CAPACITY = 1024;\r\nclass PendingPromise {\r\n    constructor(dataLength, resolve, reject) {\r\n        this.dataLength = dataLength;\r\n        this.resolve = resolve;\r\n        this.reject = reject;\r\n    }\r\n}\r\nclass ReadBuffer {\r\n    constructor(initialCapacity = INITIAL_CAPACITY) {\r\n        this.pendingPromises = [];\r\n        this._size = 0;\r\n        this.decoder = new TextDecoder();\r\n        this.buffer = new Uint8Array(new ArrayBuffer(initialCapacity));\r\n    }\r\n    read(numBytes) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            // If we don't have any Promises pending ahead of this and have enough data we respond straight\r\n            // away.\r\n            if (this.pendingPromises.length === 0 && this.size() >= numBytes) {\r\n                return yield this.internalRead(numBytes);\r\n            }\r\n            // Otherwise, we append a Promise to our list of pending promises.\r\n            return new Promise((resolve, reject) => {\r\n                this.pendingPromises.push(new PendingPromise(numBytes, resolve, reject));\r\n            });\r\n        });\r\n    }\r\n    readUint8() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield this.read(1);\r\n            return new DataView(data.buffer).getUint8(0);\r\n        });\r\n    }\r\n    readUint16(littleEndian) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield this.read(2);\r\n            return new DataView(data.buffer).getUint16(0, littleEndian);\r\n        });\r\n    }\r\n    readUint32(littleEndian) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield this.read(4);\r\n            return new DataView(data.buffer).getUint32(0, littleEndian);\r\n        });\r\n    }\r\n    readString(size) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const data = yield this.read(size);\r\n            let end = data.findIndex((value) => value === 0);\r\n            if (end === -1) {\r\n                end = size - 1;\r\n            }\r\n            return this.decoder.decode(data.slice(0, end + 1));\r\n        });\r\n    }\r\n    append(data) {\r\n        if (this.size() + data.byteLength > this.buffer.byteLength) {\r\n            this.extendBuffer();\r\n        }\r\n        this.buffer.set(data, this.size());\r\n        this._size += data.byteLength;\r\n        this.tryResolvePendingPromises();\r\n    }\r\n    failPendingPromises(error) {\r\n        while (this.pendingPromises.length > 0) {\r\n            this.pendingPromises.shift().reject(error);\r\n        }\r\n    }\r\n    size() {\r\n        return this._size;\r\n    }\r\n    capacity() {\r\n        return this.buffer.byteLength;\r\n    }\r\n    /**\r\n     * Reads `numBytes` from the internal buffer. throws an {Error} if there's not enough data in the\r\n     * Buffer.\r\n     *\r\n     * @param numBytes number of bytes to read.\r\n     * @returns A @{Promise<Uint8Array>} which resolves if the data is successfully read and rejects\r\n     * if the buffer doesn't have enough data.\r\n     */\r\n    internalRead(numBytes) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (this.size() < numBytes) {\r\n                throw new Error(`Internal buffer has ${this.size} bytes, but tried to read ${numBytes}.`);\r\n            }\r\n            this._size -= numBytes;\r\n            const array = new Uint8Array(this.buffer.subarray(0, numBytes));\r\n            this.buffer.copyWithin(0, numBytes, numBytes + this.size());\r\n            return array;\r\n        });\r\n    }\r\n    tryResolvePendingPromises() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            while (this.pendingPromises.length > 0 && this.pendingPromises[0].dataLength <= this.size()) {\r\n                const pendingPromise = this.pendingPromises.shift();\r\n                const result = yield this.internalRead(pendingPromise.dataLength);\r\n                pendingPromise.resolve(result);\r\n            }\r\n        });\r\n    }\r\n    extendBuffer() {\r\n        const newBuffer = new Uint8Array(new ArrayBuffer(this.buffer.byteLength * 2));\r\n        newBuffer.set(this.buffer);\r\n        this.buffer = newBuffer;\r\n    }\r\n}\r\nexports.ReadBuffer = ReadBuffer;\r\n\n\n//# sourceURL=webpack://32blit-flash-demo/../dist/lib/ReadBuffer.js?");

/***/ }),

/***/ "../dist/lib/util.js":
/*!***************************!*\
  !*** ../dist/lib/util.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.sleep = void 0;\r\nfunction sleep(milliseconds) {\r\n    return new Promise(resolve => setTimeout(resolve, milliseconds));\r\n}\r\nexports.sleep = sleep;\r\n\n\n//# sourceURL=webpack://32blit-flash-demo/../dist/lib/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;