"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const colors_1 = __importDefault(require("../assets/colors"));
const fonts_1 = __importDefault(require("../assets/fonts"));
function LoginView() {
    return (<div style={{
            backgroundColor: colors_1.default.header,
            width: '100px',
            height: '100px',
            fontFamily: fonts_1.default.headerFont,
            fontWeight: fonts_1.default.headerWeight,
        }}>
      Login page
    </div>);
}
exports.default = LoginView;
