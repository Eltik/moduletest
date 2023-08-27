"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let reqId = 0;
let resolveFunctions = {};
window.onmessage = function (event) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = JSON.parse(event.data);
        if (data.action === "logic") {
            try {
                yield logic(data.payload);
            }
            catch (err) {
                sendSignal(1, err.toString());
            }
        }
        else {
            resolveFunctions[data.reqId](data.responseText);
        }
    });
};
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
function sendRequest(url, headers) {
    return new Promise((resolve, reject) => {
        const currentReqId = (++reqId).toString();
        resolveFunctions[currentReqId] = resolve;
        Native.sendHTTPRequest(JSON.stringify({
            reqId: currentReqId,
            action: "HTTPRequest",
            url,
            headers
        }));
    });
}
function sendResult(result, last = false) {
    const currentReqId = (++reqId).toString();
    Native.sendHTTPRequest(JSON.stringify({
        reqId: currentReqId,
        action: "result",
        shouldExit: last,
        result: JSON.stringify(result)
    }));
}
function sendSignal(signal, message = "") {
    const currentReqId = (++reqId).toString();
    Native.sendHTTPRequest(JSON.stringify({
        reqId: currentReqId,
        action: signal === 0 ? "exit" : "error",
        result: message
    }));
}
//# sourceMappingURL=types.js.map