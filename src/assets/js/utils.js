import { AvatarShape, TimeFormat } from "./model.js";

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

export function formatTime(
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
export async function svgToPngData(svgString) {
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
export function rgbToCss(rgbArray) {
    const [r, g, b] = rgbArray;
    return `rgb(${r},${g},${b})`;
}

export function formatMonth(monthValue) {
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

export async function fileToJsPdfImage(
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

export function escapeHtml(s) {
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
// Cache for multiple templates
const templateCache = new Map();

/**
 * Load a template from an external HTML file.
 * @param {string} url - URL of the HTML file containing a <template>.
 * @returns {HTMLTemplateElement} - The <template> element from the file.
 */
export async function loadTemplate(url) {
    if (templateCache.has(url)) {
        return templateCache.get(url);
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load template: ${url}`);

    const html = await res.text();
    const container = document.createElement("div");
    container.innerHTML = html;

    const template = container.querySelector("template");
    if (!template) throw new Error(`No <template> found in ${url}`);
    const clonedTemplate = template.cloneNode(true);
    templateCache.set(url, clonedTemplate);
    return clonedTemplate;
}
// Cache to track loaded dialogs
const dialogCache = new Map();

/**
 * Load a dialog from external HTML and append it to the body.
 * Only loads once.
 * @param {string} url - URL of the HTML file containing a <template> or dialog HTML.
 * @param {string} dialogId - The id of the dialog element inside the HTML.
 * @returns {HTMLElement} - The dialog element in the DOM.
 */
export async function loadDialog(url, dialogId) {
    if (dialogCache.has(dialogId)) {
        return dialogCache.get(dialogId);
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load dialog: ${url}`);

    const html = await res.text();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    let dialog = wrapper.querySelector(`#${dialogId}`);
    if (!dialog) {
        const tpl = wrapper.querySelector("template");
        if (!tpl) throw new Error(`No dialog or template found in ${url}`);
        dialog = tpl.content.firstElementChild;
    }
    const clonedDialog = dialog.cloneNode(true);
    document.body.appendChild(clonedDialog);
    dialogCache.set(dialogId, clonedDialog);
    return clonedDialog;
}

let devToolsOpen = false;
let hostile = false;
export function enableContentProtection() {
    // ================= Right-Click Block =================
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    loadDevToolsWarningAndDetect();
    // ================= Detection Loop =================
    setInterval(() => {
        const before = new Date();
        debugger;

        const after = new Date();
        if (after - before > 100) {
            onHostile("debugger timing");
            if (!devToolsOpen) {
                devToolsOpen = true;
                showWarning();
            }
        } else {
            if (devToolsOpen) {
                devToolsOpen = false;
                hideWarning();
            }
        }
    }, 1000);
    //  ================= Optional Keyboard Block =================
    // Prevent F12 / Ctrl+Shift+I / Ctrl+Shift+C
    document.addEventListener("keydown", (e) => {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key))
        )
            e.preventDefault();
    });
}

async function loadDevToolsWarningAndDetect() {
    try {
        const dialog = await loadDialog(
            "templates/devtools-warning.html",
            "devtoolsWarning"
        );
    } catch (err) {
        console.error(
            "Failed to load DevTools warning or start detection:",
            err
        );
    }
}

function onHostile(reason) {
    if (hostile) return;
    hostile = true;

    console.warn("Hostile detected:", reason);

    wipeContent();
}

function wipeContent() {}

function showWarning() {
    const banner = document.getElementById("devtools-warning");
    banner.classList.remove("hidden");
    banner.classList.add("animate-bounce");
}

function hideWarning() {
    const banner = document.getElementById("devtools-warning");
    banner.classList.add("hidden");
    banner.classList.remove("animate-bounce");
}
