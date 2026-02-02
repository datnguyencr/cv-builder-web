import { AvatarShape, TimeFormat } from "./model.js";

function parseYearMonth(value) {
    if (!value || typeof value !== "string") return null;
    const val = value.trim();

    // Match YYYY-MM or YYYY/MM
    const matchFull = val.match(/^(\d{4})[-/](\d{1,2})$/);
    if (matchFull) {
        const y = Number(matchFull[1]);
        const m = Number(matchFull[2]);
        if (Number.isNaN(y) || m < 1 || m > 12) return null;
        return { y, m };
    }

    // Match YYYY
    const matchYear = val.match(/^(\d{4})$/);
    if (matchYear) {
        const y = Number(matchYear[1]);
        return { y };
    }

    return null;
}

function formatMonthYear(value, locale) {
    const parsed = parseYearMonth(value);
    if (!parsed) return value || "";

    const { y, m } = parsed;
    if (m === undefined) return String(y);

    const d = new Date(y, m - 1);
    return d.toLocaleString(locale, {
        month: "short",
        year: "numeric",
    });
}

function formatYear(value) {
    const parsed = parseYearMonth(value);
    return parsed ? String(parsed.y) : (value || "");
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
    // Reuse the robust logic from formatMonthYear
    return formatMonthYear(monthValue, undefined);
}

export async function fileToJsPdfImage(
    file,
    width = 128,
    height = 128,
    shape = AvatarShape.CICLE
) {
    // Helper: convert to PNG using canvas with high quality
    const convertToPng = (base64) =>
        new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const scaleFactor = 3; // Increase resolution
                const canvas = document.createElement("canvas");
                canvas.width = width * scaleFactor;
                canvas.height = height * scaleFactor;
                const ctx = canvas.getContext("2d");

                // Clip if circle
                if (shape === AvatarShape.CICLE) {
                    ctx.beginPath();
                    ctx.arc(
                        (width * scaleFactor) / 2,
                        (height * scaleFactor) / 2,
                        (width * scaleFactor) / 2,
                        0,
                        Math.PI * 2
                    );
                    ctx.closePath();
                    ctx.clip();
                }

                // Scale and center while maintaining aspect ratio
                const scale = Math.max(
                    (width * scaleFactor) / img.width,
                    (height * scaleFactor) / img.height
                );
                const w = img.width * scale;
                const h = img.height * scale;
                const dx = (width * scaleFactor - w) / 2;
                const dy = (height * scaleFactor - h) / 2;

                ctx.drawImage(img, dx, dy, w, h);
                resolve(canvas.toDataURL("image/png", 1.0)); // Use highest quality
            };
            img.src = base64;
        });

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
            try {
                let base64 = reader.result;

                // For webp/avif/heic support or needed reshaping
                // Note: We almost always want to re-process to ensure consistent high quality and correct shape/centering
                if (
                    base64.startsWith("data:image/") ||
                    shape !== AvatarShape.ORIGINAL
                ) {
                    base64 = await convertToPng(base64);
                }

                resolve({
                    base64,
                    type: "PNG", // Always return PNG after canvas processing
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

export function isProduction() {
    return import.meta.env.PROD;
}
