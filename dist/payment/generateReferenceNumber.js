"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceNumberGeneratorService = void 0;
class ReferenceNumberGeneratorService {
    generateReferenceNumber() {
        const prefix = 'INV';
        const uniqueIdentifier = Math.floor(Math.random() * 1000000);
        const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const referenceNumber = `${prefix}-${currentDate}-${uniqueIdentifier}`;
        return referenceNumber;
    }
}
exports.ReferenceNumberGeneratorService = ReferenceNumberGeneratorService;
//# sourceMappingURL=generateReferenceNumber.js.map