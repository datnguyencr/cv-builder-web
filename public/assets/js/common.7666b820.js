class Skill {
    constructor({ id = 1, name = "", value = 0 }) {
        this.id = id;
        this.name = name;
        this.value = value;
    }
    copy({ id = null, name = null, value = null }) {
        return new Skill({
            id: id ?? this.id,
            name: name ?? this.name,
            value: value ?? this.value,
        });
    }
}
class CVInfo {
    static default() {
        return new CVInfo({
            sections: {
                experience: true,
                education: true,
                skills: true,
                references: true,
                awards: true,
                hobbies: true,
            },
            name: "Edward Nolan",
            title: "Software Engineer",
            email: "edward.nolan@example.com",
            phone: "+1 234 567 8901",
            url: "linkedin.com/in/edward.nolan",
            introduction:
                "Passionate software engineer with experience in building scalable web and mobile applications.",
            workExpArr: [
                {
                    id: 1,
                    title: "Frontend Developer",
                    company: "Tech Solutions Inc.",
                    from: "2021-01",
                    to: "2023-06",
                    current: false,
                    details: [
                        "Implemented client-side routing, state management, and API integrations.",
                        "Mentored junior developers.",
                    ],
                    skillArr: [
                        "Tailwind CSS",
                        "JavaScript",
                        "HTML5",
                        "CSS3",
                        "REST APIs",
                        "Git",
                    ],
                },
                {
                    id: 2,
                    title: "Frontend Developer",
                    company: "GrimWard Inc.",
                    from: "2020-02",
                    to: "2021-01",
                    current: false,
                    details: [
                        "Implemented client-side routing, state management, and API integrations.",
                        "Mentored junior developers.",
                    ],
                    skillArr: [
                        "Tailwind CSS",
                        "JavaScript",
                        "HTML5",
                        "CSS3",
                        "REST APIs",
                        "Git",
                    ],
                },
            ],
            educationArr: [
                {
                    id: 1,
                    degree: "BSc Computer Science",
                    school: "State University",
                    from: "2017-09",
                    to: "2021-06",
                    details: [
                        "Member of the university programming club.",
                        "Led a team in an Agile software development project.",
                        "GPA 4.0",
                    ],
                },
            ],
            skillArr: [
                new Skill({ id: 1, name: "JavaScript", value: 60 }),
                new Skill({ id: 2, name: "Python", value: 50 }),
                new Skill({ id: 3, name: "Dart", value: 100 }),
            ],
            referenceArr: [],
            awardArr: [],
            hobbyArr: [],
        });
    }

    constructor(data = {}) {
        this.sections = {
            experience: true,
            education: true,
            skills: true,
            references: false,
            awards: false,
            hobbies: false,
            ...data.sections,
        };

        this.name = data.name || "";
        this.title = data.title || "";
        this.email = data.email || "";
        this.phone = data.phone || "";
        this.url = data.url || "";
        this.avatar = data.avatar || "";
        this.introduction = data.introduction || "";

        this.workExpArr = data.workExpArr || [];
        this.educationArr = data.educationArr || [];
        this.skillArr = data.skillArr || [];
        this.referenceArr = data.referenceArr || [];
        this.awardArr = data.awardArr || [];
        this.hobbyArr = data.hobbyArr || [];
    }

    save() {
        localStorage.setItem("cvInfo", JSON.stringify(this));
    }

    static load() {
        const raw = localStorage.getItem("cvInfo");
        if (!raw) return CVInfo.default();

        try {
            return new CVInfo(JSON.parse(raw));
        } catch {
            console.warn("Invalid cvInfo, resetting");
            localStorage.removeItem("cvInfo");
            return CVInfo.default();
        }
    }
}

const TimeFormat = Object.freeze({
    YEAR: "YEAR",
    MONTH_YEAR: "MONTH_YEAR",
});
const AvatarShape = Object.freeze({
    CICLE: "CICLE",
    RECTANGLE: "RECTANGLE",
});

const FontStyle = Object.freeze({
    NORMAL: "NORMAL",
    BOLD: "BOLD",
    ITALIC: "ITALIC",
});
const ContactInfoType = Object.freeze({
    COLUMN: "COLUMN",
    LIST: "LIST",
});
const SkillListType = Object.freeze({
    DEFAULT: "DEFAULT",
    LIST: "LIST",
    BAR: "BAR",
});

function parseYearMonth(value) {
    if (!value || typeof value !== "string") return null;

    const parts = value.split("-");
    if (parts.length < 2) return null;

    const y = Number(parts[0]);
    const m = Number(parts[1]);

    if (Number.isNaN(y) || m < 1 || m > 12) return null;

    return { y, m };
}

function formatMonthYear(value, locale) {
    const parsed = parseYearMonth(value);
    if (!parsed) return "";

    const { y, m } = parsed;
    const d = new Date(y, m - 1);

    return d.toLocaleString(locale, {
        month: "short",
        year: "numeric",
    });
}

function formatYear(value) {
    const parsed = parseYearMonth(value);
    return parsed ? String(parsed.y) : "";
}

function formatTime(
    value,
    { locale = navigator.language || "en-US", format = TimeFormat.MONTH_YEAR }
) {
    switch (format) {
        case TimeFormat.YEAR:
            return formatYear(value);
        case TimeFormat.MONTH_YEAR:
        default:
            return formatMonthYear(value, locale);
    }
}
async function svgToPngData(svgString) {
    return new Promise((resolve) => {
        const blob = new Blob([svgString], {
            type: "image/svg+xml",
        });
        const url = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = () => {
            const size = 24;
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const pngData = canvas.toDataURL("image/png");
            URL.revokeObjectURL(url);
            resolve(pngData);
        };

        img.src = url;
    });
}

function rgbToCss(rgbArray) {
    const [r, g, b] = rgbArray;
    return `rgb(${r},${g},${b})`;
}

async function contactSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
            <path fill-rule="evenodd" d="M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.604.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clip-rule="evenodd" />
            </svg>`;
}

async function educationSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
            <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 0 1 .672 0 41.059 41.059 0 0 1 8.198 5.424.75.75 0 0 1-.254 1.285 31.372 31.372 0 0 0-7.86 3.83.75.75 0 0 1-.84 0 31.508 31.508 0 0 0-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 0 1 3.305-2.033.75.75 0 0 0-.714-1.319 37 37 0 0 0-3.446 2.12A2.216 2.216 0 0 0 6 9.393v.38a31.293 31.293 0 0 0-4.28-1.746.75.75 0 0 1-.254-1.285 41.059 41.059 0 0 1 8.198-5.424ZM6 11.459a29.848 29.848 0 0 0-2.455-1.158 41.029 41.029 0 0 0-.39 3.114.75.75 0 0 0 .419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 1 0 1.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 0 1 3.095 2.348.75.75 0 0 0 .992 0 26.547 26.547 0 0 1 5.93-3.95.75.75 0 0 0 .42-.739 41.053 41.053 0 0 0-.39-3.114 29.925 29.925 0 0 0-5.199 2.801 2.25 2.25 0 0 1-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 0 1-1.084 3.45 26.503 26.503 0 0 0-1.281-.78A5.487 5.487 0 0 0 6 12v-.54Z" clip-rule="evenodd"/>
        </svg>`;
}
async function workExpSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z" clip-rule="evenodd" />
        <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
        </svg>`;
}
async function skillSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
            <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
            </svg>`;
}
async function referenceSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
        </svg>`;
}

async function awardSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 0 0-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 0 0-.552.698 5 5 0 0 0 4.503 5.152 6 6 0 0 0 2.946 1.822A6.451 6.451 0 0 1 7.768 13H7.5A1.5 1.5 0 0 0 6 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 0 0-1.5-1.5h-.268a6.453 6.453 0 0 1-.684-2.202 6 6 0 0 0 2.946-1.822 5 5 0 0 0 4.503-5.152.75.75 0 0 0-.552-.698A31.804 31.804 0 0 0 16 2.562v-.387a.75.75 0 0 0-.629-.74A33.227 33.227 0 0 0 10 1ZM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 0 1-1.855-2.68Zm14.95 0a3.503 3.503 0 0 1-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332Z" clip-rule="evenodd" />
        </svg>`;
}
async function introductionSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        </svg>`;
}
async function hobbySvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
        </svg>`;
}
async function linkSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
        </svg>`;
}
async function emailSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
        <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
        </svg>`;
}
async function phoneSvgString(color = [0, 0, 0]) {
    const cssColor = this.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clip-rule="evenodd" />
        </svg>`;
}
function formatMonth(monthValue) {
    if (!monthValue) return "";
    // monthValue like "2022-09" -> display "Sep 2022"
    try {
        const [y, m] = monthValue.split("-");
        const d = new Date(Number(y), Number(m) - 1);
        return d.toLocaleString(undefined, {
            month: "short",
            year: "numeric",
        });
    } catch {
        return monthValue;
    }
}

function convertToPng(base64) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
        img.src = base64;
    });
}

async function fileToJsPdfImage(
    file,
    width = 128,
    height = 128,
    shape = AvatarShape.CICLE
) {
    // Helper: convert to PNG using canvas
    const convertToPng = (base64) =>
        new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");

                // Clip if circle

                if (shape === AvatarShape.CICLE) {
                    ctx.beginPath();
                    ctx.arc(width / 2, width / 2, width / 2, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();
                }

                // Scale and center
                const scale = Math.max(width / img.width, height / img.height);
                const w = img.width * scale;
                const h = img.height * scale;
                const dx = (width - w) / 2;
                const dy = (height - h) / 2;

                ctx.drawImage(img, dx, dy, w, h);
                resolve(canvas.toDataURL("image/png"));
            };
            img.src = base64;
        });

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
            try {
                let base64 = reader.result;

                // Convert non-PNG/JPEG → PNG
                if (
                    base64.startsWith("data:image/webp") ||
                    base64.startsWith("data:image/avif") ||
                    base64.startsWith("data:image/heic")
                ) {
                    base64 = await convertToPng(base64);
                }

                // If preclip circle/square
                if (
                    shape === AvatarShape.CICLE ||
                    shape === AvatarShape.RECTANGLE
                ) {
                    base64 = await convertToPng(base64); // always PNG after preclip
                }

                resolve({
                    base64,
                    type: base64.includes("image/jpeg") ? "JPEG" : "PNG",
                });
            } catch (e) {
                reject(e);
            }
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function escapeHtml(s) {
    return (s || "").toString().replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            }[c])
    );
}
