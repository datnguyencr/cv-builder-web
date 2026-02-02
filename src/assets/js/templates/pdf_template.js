import { Template1 } from "./template1";
import { Template2 } from "./template2";
import { Template3 } from "./template3";
import { Template4 } from "./template4";
import { Template5 } from "./template5";
import { Template6 } from "./template6";
import { Template7 } from "./template7";
import { Template8 } from "./template8";
import { Template9 } from "./template9";
import { Template10 } from "./template10";
import { Template11 } from "./template11";
import { Template12 } from "./template12";
import { Template13 } from "./template13";
import { Template14 } from "./template14";
import { Template15 } from "./template15";
import { Template16 } from "./template16";
import { Template17 } from "./template17";
import { Template18 } from "./template18";
import { Template19 } from "./template19";
import { Template20 } from "./template20";
import { Template21 } from "./template21";
import { Template22 } from "./template22";
import { Template23 } from "./template23";
import { Template24 } from "./template24";
import { Template25 } from "./template25";
import { Template26 } from "./template26";
import { Template27 } from "./template27";
import { Template28 } from "./template28";
import { Template29 } from "./template29";
import { Template30 } from "./template30";

let TEMPLATES = {
    1: Template1,
    2: Template2,
    3: Template3,
    4: Template4,
    5: Template5,
    6: Template6,
    7: Template7,
    8: Template8,
    9: Template9,
    10: Template10,
    11: Template11,
    12: Template12,
    13: Template13,
    14: Template14,
    15: Template15,
    16: Template16,
    17: Template17,
    18: Template18,
    19: Template19,
    20: Template20,
    21: Template21,
    22: Template22,
    23: Template23,
    24: Template24,
    25: Template25,
    26: Template26,
    27: Template27,
    28: Template28,
    29: Template29,
    30: Template30,
};

export class PDFGenerator {
    static getTemplate(id, cvInfo) {
        return new (TEMPLATES[id] || Template1)(cvInfo);
    }
}
