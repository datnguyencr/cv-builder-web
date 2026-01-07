const { jsPDF } = window.jspdf;
import {
    AvatarShape,
    FontStyle,
    TimeFormat,
    SkillListType,
    ContactInfoType,
} from "./model.js";
import * as Utils from "./utils.7666b820.js";

async function contactSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
            <path fill-rule="evenodd" d="M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.604.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clip-rule="evenodd" />
            </svg>`;
}

async function educationSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
            <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 0 1 .672 0 41.059 41.059 0 0 1 8.198 5.424.75.75 0 0 1-.254 1.285 31.372 31.372 0 0 0-7.86 3.83.75.75 0 0 1-.84 0 31.508 31.508 0 0 0-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 0 1 3.305-2.033.75.75 0 0 0-.714-1.319 37 37 0 0 0-3.446 2.12A2.216 2.216 0 0 0 6 9.393v.38a31.293 31.293 0 0 0-4.28-1.746.75.75 0 0 1-.254-1.285 41.059 41.059 0 0 1 8.198-5.424ZM6 11.459a29.848 29.848 0 0 0-2.455-1.158 41.029 41.029 0 0 0-.39 3.114.75.75 0 0 0 .419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 1 0 1.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 0 1 3.095 2.348.75.75 0 0 0 .992 0 26.547 26.547 0 0 1 5.93-3.95.75.75 0 0 0 .42-.739 41.053 41.053 0 0 0-.39-3.114 29.925 29.925 0 0 0-5.199 2.801 2.25 2.25 0 0 1-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 0 1-1.084 3.45 26.503 26.503 0 0 0-1.281-.78A5.487 5.487 0 0 0 6 12v-.54Z" clip-rule="evenodd"/>
        </svg>`;
}
async function workExpSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z" clip-rule="evenodd" />
        <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
        </svg>`;
}
async function skillSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
            <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
            </svg>`;
}
async function referenceSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
        </svg>`;
}

async function awardSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 0 0-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 0 0-.552.698 5 5 0 0 0 4.503 5.152 6 6 0 0 0 2.946 1.822A6.451 6.451 0 0 1 7.768 13H7.5A1.5 1.5 0 0 0 6 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 0 0-1.5-1.5h-.268a6.453 6.453 0 0 1-.684-2.202 6 6 0 0 0 2.946-1.822 5 5 0 0 0 4.503-5.152.75.75 0 0 0-.552-.698A31.804 31.804 0 0 0 16 2.562v-.387a.75.75 0 0 0-.629-.74A33.227 33.227 0 0 0 10 1ZM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 0 1-1.855-2.68Zm14.95 0a3.503 3.503 0 0 1-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332Z" clip-rule="evenodd" />
        </svg>`;
}
async function introductionSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        </svg>`;
}
async function hobbySvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
        </svg>`;
}
async function linkSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
        </svg>`;
}
async function emailSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
        <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
        </svg>`;
}
async function phoneSvgString(color = [0, 0, 0]) {
    const cssColor = Utils.rgbToCss(color);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 15.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clip-rule="evenodd" />
        </svg>`;
}

class PDFGenerator {
    constructor(cvInfo, options = {}) {
        this.cvInfo = cvInfo;
        this.svgElement = document.getElementById("iconSVG");

        const mergedOptions = {
            ...DEFAULT_OPTIONS,
            ...options,
        };

        // Layout
        this.leftBackgroundColor = mergedOptions.leftBackgroundColor;
        this.rightBackgroundColor = mergedOptions.rightBackgroundColor;
        this.leftRatio = mergedOptions.leftRatio;
        this.rightRatio = mergedOptions.rightRatio;
        this.margin = mergedOptions.margin;
        this.lineHeight = mergedOptions.lineHeight;

        // Style
        this.font = mergedOptions.font;
        this.textColor = mergedOptions.textColor;
        this.mainColor = mergedOptions.mainColor;
        this.textSize = mergedOptions.textSize;
        this.headerTextSize = mergedOptions.headerTextSize;
        this.headerTextStyle = mergedOptions.headerTextStyle;
        this.separator = mergedOptions.separator;

        this.normalFont = mergedOptions.normalFont;
        this.boldFont = mergedOptions.boldFont;
        this.italicFont = mergedOptions.italicFont;

        this.timeFormat = mergedOptions.timeFormat;
        this.headerBackgroundColor = mergedOptions.headerBackgroundColor;
        this.useContactIcon = mergedOptions.useContactIcon;

        // Derived colors (correctly depend on mainColor)
        this.educationImageColor =
            options.educationImageColor ?? this.mainColor;
        this.workExpImageColor = options.workExpImageColor ?? this.mainColor;
        this.contactImageColor = options.contactImageColor ?? this.mainColor;
        this.skillImageColor = options.skillImageColor ?? this.mainColor;
        this.referenceImageColor =
            options.referenceImageColor ?? this.mainColor;
        this.awardImageColor = options.awardImageColor ?? this.mainColor;
        this.introductionImageColor =
            options.introductionImageColor ?? this.mainColor;
        this.hobbyImageColor = options.hobbyImageColor ?? this.mainColor;
        this.phoneImageColor = options.phoneImageColor ?? this.mainColor;
        this.linkImageColor = options.linkImageColor ?? this.mainColor;
        this.emailImageColor = options.emailImageColor ?? this.mainColor;

        // Avatar
        this.avatarShape = mergedOptions.avatarShape;
        this.avatarWidth = mergedOptions.avatarWidth;
        this.avatarHeight = mergedOptions.avatarHeight;
        // Internal constants
        this.iconSize = 14;
        this.markerWidth = 10;
        this.contactLabelTextStyle = new TextStyle({
            color: this.mainColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = new TextStyle({
            color: this.textColor,
            size: 10,
            style: FontStyle.NORMAL,
        });

        this.nameTextStyle = new TextStyle({
            color: this.mainColor,
            size: 24,
            style: FontStyle.BOLD,
        });
        this.titleTextStyle = new TextStyle({
            color: this.mainColor,
            style: FontStyle.BOLD,
        });
        this.blockTitleStyle = new TextStyle({
            style: FontStyle.BOLD,
            color: this.textColor,
        });
        this.blockDescriptionStyle = new TextStyle({
            style: FontStyle.ITALIC,
            color: this.mainColor,
        });
        this.blockDatesStyle = new TextStyle({
            style: FontStyle.BOLD,
            color: this.textColor,
        });

        this.markerFill = mergedOptions.markerFill;
        this.skillListType = mergedOptions.skillListType;
        this.contactBackgroundColor = mergedOptions.contactBackgroundColor;
        this.headerLineCustomWidth = mergedOptions.headerLineCustomWidth;

        this.headerDefaults = new HeaderOptions({
            headerColor: this.mainColor,
            lineColor: this.mainColor,
            textSize: this.headerTextSize,
            backgroundColor: this.headerBackgroundColor,
        });
    }

    async loadFonts() {
        var name = "custom";
        await this.loadFont(
            `assets/fonts/${this.normalFont}`,
            name,
            FontStyle.NORMAL
        );
        await this.loadFont(
            `assets/fonts/${this.boldFont}`,
            name,
            FontStyle.BOLD
        );
        await this.loadFont(
            `assets/fonts/${this.normalFont}`,
            name,
            FontStyle.ITALIC
        );
        this.font = name;
    }

    renderSection(section) {
        const totalWidth = this.pageWidth - this.margin * 2;
        const leftW = totalWidth * section.leftRatio;
        const rightW = totalWidth * section.rightRatio;

        const startY = Math.max(this.leftY, this.rightY);

        const leftCtx = new LayoutContext({
            x: this.margin,
            y: startY,
            width: leftW - (section.leftRatio == 1 ? 0 : this.margin),
            pageHeight: this.pageHeight,
            margin: this.margin,
            doc: this.doc,
            column: "left",
        });

        const rightCtx = new LayoutContext({
            x: this.margin + leftW + section.gap,
            y: startY,
            width: rightW,
            pageHeight: this.pageHeight,
            margin: this.margin,
            doc: this.doc,
            column: "right",
        });

        leftCtx.goToCurrentPage();
        rightCtx.goToCurrentPage();

        section.render({
            left: leftCtx,
            right: rightCtx,
            pdf: this,
        });

        this.leftY = leftCtx.y + (section.paddingBottom || 0);
        this.rightY = rightCtx.y + (section.paddingBottom || 0);
    }

    writeTextPair(
        ctx,
        leftText,
        rightText,
        {
            leftStyle = new TextStyle(),
            rightStyle = new TextStyle(),
            lineHeight = this.lineHeight,
            padding = 5,
            marker = null,
            markerWidth = this.markerWidth,
            timeLineColor = this.mainColor,
            gap = 10,
        } = {}
    ) {
        const totalWidth = ctx.width - padding * 2;

        const leftW = totalWidth * 0.5;
        const rightW = totalWidth - leftW;
        const leftHeight = this.writeTextWithMarker(ctx, leftText, {
            style: leftStyle,
            lineHeight: lineHeight,
            padding: padding,
            customWidth: leftW,
            marker: marker,
            markerWidth: markerWidth,
            timeLineColor: timeLineColor,
            gap: gap,
            align: "left",
        });

        const rightHeight = this.writeTextWithMarker(ctx, rightText, {
            style: rightStyle,
            lineHeight: lineHeight,
            padding: padding + leftW,
            customWidth: rightW - gap,
            align: "right",
        });

        return Math.max(leftHeight, rightHeight);
    }

    writeTextWithMarker(
        ctx,
        text,
        {
            style = new TextStyle(),
            markerWidth = this.markerWidth,
            timeLineColor = this.mainColor,
            gap = 10,
            marker = null,
            lineHeight = this.lineHeight,
            padding = 5,
            customWidth = null,
            align = "left",
        } = {}
    ) {
        this.doc.setFont(this.font, style.style);
        this.doc.setFontSize(style.size);
        this.doc.setTextColor(...style.color);

        const baseX = ctx.x + padding;
        const availableWidth = customWidth ?? ctx.width;

        const textX = baseX + (marker ? markerWidth + gap : 0);

        const textW = availableWidth - (marker ? markerWidth + gap : 0);

        const lines = this.doc.splitTextToSize(text, textW);
        let usedHeight = 0;

        for (let i = 0; i < lines.length; i++) {
            ctx.ensureSpace(lineHeight, (column) => {
                this.addPageFor(ctx, column);
            });
            const y = ctx.y;

            if (i === 0 && marker) {
                this.doc.setLineWidth(0.5);
                this.doc.setDrawColor(...timeLineColor);
                if (this.markerFill) {
                    this.doc.setFillColor(...timeLineColor);
                } else {
                    this.doc.setFillColor(...[255, 255, 255]);
                }
                marker(baseX, y, markerWidth, this);
            }

            this.doc.text(
                lines[i],
                align === "right" ? textX + textW : textX,
                y,
                align === "right"
                    ? {
                          align: "right",
                      }
                    : undefined
            );

            usedHeight += lineHeight;
        }

        return usedHeight;
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];
        ctx.advance(
            this.writeTextWithMarker(ctx, `${title.text} | ${dates.text}`, {
                style: title.style,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(5);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(10);
    }

    async loadImages() {
        this.educationImage = await Utils.svgToPngData(
            await educationSvgString(this.educationImageColor)
        );
        this.workExpImage = await Utils.svgToPngData(
            await workExpSvgString(this.workExpImageColor)
        );
        this.contactImage = await Utils.svgToPngData(
            await contactSvgString(this.contactImageColor)
        );
        this.skillImage = await Utils.svgToPngData(
            await skillSvgString(this.skillImageColor)
        );
        this.referenceImage = await Utils.svgToPngData(
            await referenceSvgString(this.referenceImageColor)
        );
        this.awardImage = await Utils.svgToPngData(
            await awardSvgString(this.awardImageColor)
        );
        this.introductionImage = await Utils.svgToPngData(
            await introductionSvgString(this.introductionImageColor)
        );
        this.hobbyImage = await Utils.svgToPngData(
            await hobbySvgString(this.hobbyImageColor)
        );
        this.phoneImage = await Utils.svgToPngData(
            await phoneSvgString(this.phoneImageColor)
        );
        this.linkImage = await Utils.svgToPngData(
            await linkSvgString(this.linkImageColor)
        );
        this.emailImage = await Utils.svgToPngData(
            await emailSvgString(this.emailImageColor)
        );
    }

    async loadFont(url, name, style) {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();

        let binary = "";
        const bytes = new Uint8Array(arrayBuffer);
        const chunkSize = 0x8000;
        for (let i = 0; i < bytes.length; i += chunkSize) {
            const sub = bytes.subarray(i, i + chunkSize);
            binary += String.fromCharCode.apply(null, sub);
        }
        const base64 = btoa(binary);

        this.doc.addFileToVFS(`${name}.ttf`, base64);
        this.doc.addFont(`${name}.ttf`, name, style);
    }

    addPageFor(ctx, column) {
        if (ctx.currentPage < this.doc.getNumberOfPages()) {
            ctx.currentPage++;
            this.doc.setPage(ctx.currentPage);
        } else {
            this.doc.addPage();
            ctx.currentPage = this.doc.getNumberOfPages();
            this.drawBackground();
        }

        ctx.y = this.margin;

        if (column === "left") this.leftY = ctx.y;
        else this.rightY = ctx.y;
    }

    drawBackground() {
        // LEFT
        if (this.leftBackgroundColor) {
            this.doc.setFillColor(...this.leftBackgroundColor);
            this.doc.rect(0, 0, this.leftWidth, this.pageHeight, "F");
        }

        // RIGHT
        if (this.rightBackgroundColor) {
            this.doc.setFillColor(...this.rightBackgroundColor);
            this.doc.rect(
                this.leftWidth,
                0,
                this.pageWidth - this.leftWidth,
                this.pageHeight,
                "F"
            );
        }

        if (this.separator) {
            const lineThickness = 1;
            this.doc.setLineWidth(lineThickness);
            this.doc.setDrawColor(...this.mainColor);
            this.doc.line(
                this.leftWidth,
                this.margin,
                this.leftWidth,
                this.pageHeight - this.margin
            );
        }
    }

    ul(
        ctx,
        items,
        {
            indent = 10,
            markerWidth = this.markerWidth,
            gap = 10,
            lineHeight = this.lineHeight,
            showTimeLine = false,
            timeLineColor = this.mainColor,
            padding = 5,
            textColor = this.textColor,
            bulletColor = this.textColor,
        } = {}
    ) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, FontStyle.NORMAL);
        const markerX = ctx.x + markerWidth / 2;
        const bulletX = markerX + (showTimeLine ? markerWidth + gap : 0);
        const textXOffset = bulletX + indent;
        if (showTimeLine) {
            this.drawLine(markerX, ctx.y - 5, markerX, ctx.y, {
                color: timeLineColor,
                thickness: 1,
            });
        }
        items.forEach((item) => {
            const lines = this.doc.splitTextToSize(
                item,
                ctx.width - (showTimeLine ? markerWidth + gap : 0) - indent
            );
            const blockHeight = lines.length * lineHeight;

            ctx.ensureSpace(blockHeight, (column) =>
                this.addPageFor(ctx, column)
            );

            if (showTimeLine) {
                this.doc.setFillColor(...timeLineColor);
                this.doc.setLineWidth(1);
                this.drawLine(markerX, ctx.y, markerX, ctx.y + blockHeight, {
                    color: timeLineColor,
                });
            }

            this.doc.setTextColor(...bulletColor);
            this.doc.text("•", bulletX, ctx.y);

            this.doc.setTextColor(...textColor);
            lines.forEach((line, i) => {
                this.doc.text(line, textXOffset, ctx.y);
                ctx.advance(lineHeight);
            });
        });
    }

    skillList(
        ctx,
        items,
        {
            textColor = this.textColor,
            indent = 10,
            padding = 5,
            bulletColor = this.textColor,
        } = {}
    ) {
        this.ul(ctx, [items.map((h) => h.name).join(", ")], {
            textColor: textColor,
            indent: indent,
            padding: padding,
            bulletColor: bulletColor,
        });
    }

    skillbar(
        ctx,
        items,
        {
            textColor = this.textColor,
            barColor = this.mainColor,
            barBgColor = [220, 220, 220],
            barHeight = 6,
            gap = 5,
            maxValue = 100,
        } = {}
    ) {
        this.doc.setFont(this.font, FontStyle.NORMAL);
        this.doc.setFontSize(this.textSize);

        let y = ctx.y;

        items.forEach((item) => {
            ctx.ensureSpace(this.lineHeight + barHeight + gap, (column) =>
                this.addPageFor(ctx, column)
            );

            this.doc.setTextColor(...textColor);
            this.doc.text(item.name, ctx.x, y);
            y += gap;

            const barWidth = ctx.width;
            const value = Math.max(0, Math.min(item.value / maxValue, 1));

            this.doc.setFillColor(...barBgColor);
            this.doc.rect(ctx.x, y, barWidth, barHeight, "F");

            this.doc.setFillColor(...barColor);
            this.doc.rect(ctx.x, y, barWidth * value, barHeight, "F");

            y += barHeight + gap + this.lineHeight;
        });

        ctx.advance(y - ctx.y);
    }

    join(ctx, items, { textColor = this.textColor } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, FontStyle.NORMAL);
        this.doc.setTextColor(...textColor);

        const text = `- ${items.join(", ")}.`;
        const lines = this.doc.splitTextToSize(text, ctx.width);

        let y = ctx.y;
        lines.forEach((line) => {
            ctx.ensureSpace(this.lineHeight, (column) => {
                this.addPageFor(ctx, column);
            });

            this.doc.text(line, ctx.x, y);
            y += this.lineHeight;
        });

        ctx.advance(lines.length * this.lineHeight);
    }

    drawSectionHeader(ctx, title, opts = {}) {
        const normalizedOpts = {
            ...opts,
            color: opts.color ?? opts.headerColor,
        };

        const headerOpts = this.headerDefaults.merge(normalizedOpts);
        this.header(ctx, {
            text: title,
            ...headerOpts,
        });
    }

    header(
        ctx,
        {
            text = "",
            uppercase = false,
            center = false,
            linePadding = 10,
            underline = false,
            upperline = false,
            color = this.mainColor,
            lineColor = this.mainColor,
            icon = null,
            paddingTop = 20,
            paddingBottom = 20,
            dash = false,
            textSize = this.headerTextSize,
            backgroundColor = null,
            lineThickness = 1,
        } = {}
    ) {
        ctx.goToCurrentPage();
        ctx.advance(paddingTop);
        if (upperline) {
            this.drawLineBlock(ctx, {
                color: lineColor,
                dash: dash,
                thickness: lineThickness,
            });
            ctx.advance(linePadding);
        }

        ctx.ensureSpace(textSize, (column) => {
            this.addPageFor(ctx, column);
        });
        this.doc.setFont(this.font, this.headerTextStyle);
        this.doc.setFontSize(textSize);
        this.doc.setTextColor(...color);

        const title = uppercase ? text.toUpperCase() : text;
        const iconW = this.iconSize;
        const iconH = this.iconSize;
        const gap = icon ? 4 : 0;

        const y = ctx.y;
        const x = ctx.x;
        const width = ctx.width;
        const maxWidth = center ? width : width - (icon ? iconW + gap : 0);
        const lines = this.doc.splitTextToSize(title, maxWidth);

        const rectHeight = lines.length * this.textSize;

        if (backgroundColor) {
            const rectX = x;
            const rectY = y - paddingTop;
            this.doc.setFillColor(...backgroundColor);
            this.doc.rect(
                rectX,
                rectY,
                ctx.width,
                rectHeight + paddingBottom,
                "F"
            );
            ctx.advance(10);
        }

        const textWidth = this.doc.getTextWidth(title);
        if (center) {
            const groupWidth = (icon ? iconW + gap : 0) + textWidth;
            const startX = x + (width - groupWidth) / 2;

            if (icon) {
                this.doc.addImage(
                    icon,
                    "PNG",
                    startX,
                    y - iconH * 0.8,
                    iconW,
                    iconH
                );
                this.doc.text(title, startX + iconW + gap, y);
            } else {
                this.doc.text(title, x + width / 2, y, {
                    align: "center",
                });
            }
        } else {
            if (icon) {
                this.doc.addImage(
                    icon,
                    "PNG",
                    x,
                    y - iconH * 0.8,
                    iconW,
                    iconH
                );
            }
            this.doc.text(title, icon ? x + iconW + gap : x, y);
        }

        if (underline) {
            ctx.advance(linePadding);
            this.drawLineBlock(ctx, {
                color: lineColor,
                dash: dash,
                thickness: lineThickness,
                customWidth: this.headerLineCustomWidth,
            });
        }

        ctx.advance(paddingBottom);
    }

    normalText(ctx, text, style = new TextStyle()) {
        this.doc.setFontSize(style.size);
        this.doc.setFont(this.font, style.style);
        this.doc.setTextColor(...style.color);

        const lines = this.doc.splitTextToSize(text, ctx.width);
        let y = ctx.y;

        lines.forEach((line) => {
            ctx.ensureSpace(style.size, (column) => {
                this.addPageFor(ctx, column);
            });

            this.doc.text(line, ctx.x, y);
            y += style.size;
        });

        ctx.advance(lines.length * style.size);
    }

    block(
        ctx,
        {
            title = new PdfText(),
            description = new PdfText(),
            dates = new PdfText(),
            detailList = [],
            indent = 10,
            padding = 5,
            showTimeLine = false,
            timeLineColor = this.mainColor,
            bulletColor = this.textColor,
            lineGap = 10,
        } = {}
    ) {
        this.blockHeader(ctx, {
            title: title,
            description: description,
            dates: dates,
            showTimeLine: showTimeLine,
            timeLineColor: timeLineColor,
        });
        if (detailList.length) {
            this.ul(ctx, detailList, {
                lineHeight: this.lineHeight,
                indent: indent,
                padding: padding,
                showTimeLine: showTimeLine,
                timeLineColor: timeLineColor,
                bulletColor: bulletColor,
            });
        }

        ctx.advance(lineGap);
    }
    drawAvatar(
        imageBase64,
        {
            x = this.margin,
            y = this.mainColor,
            width = null,
            height = null,
            borderColor = this.mainColor,
            borderSize = 5,
            padding = 0,
        } = {}
    ) {
        if (borderSize > 0) {
            this.doc.setDrawColor(...borderColor);
            this.doc.setLineWidth(borderSize);
            if (this.avatarShape === AvatarShape.CICLE) {
                this.doc.circle(
                    x + width / 2,
                    y + height / 2,
                    width / 2 + padding
                );
            } else {
                this.doc.rect(x, y, width, height);
            }
        }
        this.doc.addImage(imageBase64, "PNG", x, y, width, height);
    }
    avatar(
        ctx,
        imageBase64,
        {
            starX = null,
            startY = null,
            width = this.avatarWidth,
            height = this.avatarHeight,
            borderColor = this.mainColor,
            borderSize = 5,
            padding = 0,
            center = false,
        } = {}
    ) {
        if (!imageBase64) return 0;

        const totalSize = height + padding * 2;
        const x = starX ?? center ? ctx.x + (ctx.width - width) / 2 : ctx.x;

        const y = startY ?? ctx.y;
        this.drawAvatar(imageBase64, {
            x: x,
            y: y,
            width: width,
            height: height,
            borderColor: borderColor,
            borderSize: borderSize,
            padding: padding,
        });
        ctx.advance(totalSize);
        return totalSize;
    }

    name(
        ctx,
        text,
        {
            style = this.nameTextStyle,
            lineHeight = 0,
            center = false,
            uppercase = false,
            padding = 0,
        } = {}
    ) {
        ctx.goToCurrentPage();
        const content = uppercase ? text.toUpperCase() : text;

        this.doc.setFont(this.font, style.style);
        this.doc.setFontSize(style.size);
        this.doc.setTextColor(...style.color);

        return this.drawText(ctx, content, {
            center,
            padding,
            lineHeight: style.size + lineHeight,
        });
    }

    title(
        ctx,
        text,
        {
            style = this.titleTextStyle,
            lineHeight = 0,
            center = false,
            uppercase = false,
            padding = 0,
        } = {}
    ) {
        ctx.goToCurrentPage();
        const content = uppercase ? text.toUpperCase() : text;

        this.doc.setFont(this.font, style.style);
        this.doc.setFontSize(style.size);
        this.doc.setTextColor(...style.color);

        return this.drawText(ctx, content, {
            indent: 0,
            center,
            padding,
            lineHeight: style.size + lineHeight,
        });
    }

    introduction(
        ctx,
        text,
        {
            style = FontStyle.NORMAL,
            center = false,
            lineHeight = 15,
            textSize = this.textSize,
            textColor = this.textColor,
            padding = 0,
        } = {}
    ) {
        this.doc.setFont(this.font, style);
        this.doc.setFontSize(textSize);
        this.doc.setTextColor(...textColor);

        return this.drawText(ctx, text, {
            style: {
                style,
                size: textSize,
                color: textColor,
            },
            center,
            padding,
            lineHeight,
        });
    }

    writePair(
        ctx,
        {
            label = new PdfText({
                text: "",
                style: this.contactLabelTextStyle,
            }),
            value = new PdfText({
                text: "",
                style: this.contactValueTextStyle,
            }),
            padding = 4,
            lineHeight = this.lineHeight,
        } = {}
    ) {
        const x = ctx.x;
        let y = ctx.y;
        const colW = ctx.width;

        this.doc.setFont(this.font, label.style.style);
        this.doc.setFontSize(label.style.size);
        this.doc.setTextColor(...label.style.color);

        const labelWidth = this.doc.getTextWidth(label.text);
        this.doc.text(label.text, x, y);

        const valueX = x + labelWidth + padding;
        const maxValueWidth = colW - labelWidth - padding;

        this.doc.setFont(this.font, value.style.style);
        this.doc.setFontSize(value.style.size);
        this.doc.setTextColor(...value.style.color);

        const wrappedLines = this.doc.splitTextToSize(
            value.text || "",
            maxValueWidth
        );

        wrappedLines.forEach((line, i) => {
            if (y + lineHeight + this.margin > this.pageHeight - this.margin) {
                this.doc.addPage();
                this.drawBackground();
                y = ctx.y;
            }

            this.doc.text(line, valueX, y);
            y += lineHeight;
        });

        const usedHeight = Math.max(
            lineHeight,
            wrappedLines.length * lineHeight
        );
        ctx.advance(usedHeight);
    }

    writePairWithIcon(
        ctx,
        {
            text = "",
            style = new PdfText({
                text: "",
                style: this.contactValueTextStyle(),
            }),
            padding = 6,
            icon = null,
            lineHeight = this.lineHeight,
        } = {}
    ) {
        if (!text && !icon) return;

        const doc = this.doc;
        const x = ctx.x;
        let y = ctx.y;

        doc.setFont(this.font, style.style);
        doc.setFontSize(style.size);
        doc.setTextColor(...style.color);

        const iconSize = icon ? this.iconSize : 0;
        const gap = icon ? padding : 0;

        if (icon) {
            doc.addImage(
                icon,
                "PNG",
                x,
                y - iconSize * 0.8,
                iconSize,
                iconSize
            );
        }

        const valueX = x + iconSize + gap;
        const maxWidth = ctx.width - iconSize - gap;

        const lines = text ? doc.splitTextToSize(text, maxWidth) : [];

        for (const line of lines) {
            if (y + lineHeight > this.pageHeight - this.margin) {
                doc.addPage();
                this.drawBackground();
                y = ctx.y;
            }

            doc.text(line, valueX, y);
            y += lineHeight;
        }

        ctx.advance(Math.max(lineHeight, lines.length * lineHeight));
    }

    contactInfoRow(ctx) {
        const lineHeight = 15;

        const items = [
            {
                label: "Phone:",
                value: this.cvInfo.phone,
                icon: this.phoneImage,
            },
            {
                label: "Email:",
                value: this.cvInfo.email,
                icon: this.emailImage,
            },
            {
                label: "Links:",
                value: this.cvInfo.url,
                icon: this.linkImage,
            },
        ];

        for (const item of items) {
            ctx.ensureSpace(lineHeight, (column) => {
                this.addPageFor(ctx, column);
            });

            if (this.useContactIcon) {
                this.writePairWithIcon(ctx, {
                    text: item.value,
                    style: this.contactValueTextStyle,
                    icon: item.icon,
                });
            } else {
                this.writePair(ctx, {
                    label: new PdfText({
                        text: item.label,
                        style: this.contactLabelTextStyle,
                    }),
                    value: new PdfText({
                        text: item.value,
                        style: this.contactValueTextStyle,
                    }),
                    lineHeight,
                });
            }
        }
    }

    contactInfoColumn(
        ctx,
        {
            bgColor = this.contactBackgroundColor,
            lineHeight = this.lineHeight,
        } = {}
    ) {
        const columns = [
            { title: "Phone:", value: this.cvInfo.phone, ratio: 0.2 },
            { title: "Email:", value: this.cvInfo.email, ratio: 0.4 },
            { title: "Links:", value: this.cvInfo.url, ratio: 0.4 },
        ];

        if (bgColor) {
            this.doc.setFillColor(...bgColor);
            this.doc.rect(
                0,
                ctx.y - lineHeight,
                this.pageWidth,
                this.textSize * 2 + lineHeight,
                "F"
            );
        }

        let offsetX = this.margin;

        this.doc.setFont(this.font, this.contactLabelTextStyle.style);
        this.doc.setFontSize(this.contactLabelTextStyle.size);
        this.doc.setTextColor(...this.contactLabelTextStyle.color);

        for (const col of columns) {
            const colWidth = col.ratio * ctx.width;

            ctx.ensureSpace(lineHeight, (column) => {
                this.addPageFor(ctx, column);
            });

            this.doc.text(col.title, offsetX, ctx.y);
            offsetX += colWidth;
        }

        ctx.advance(lineHeight);

        let usedHeight = 0;
        offsetX = this.margin;

        this.doc.setFont(this.font, this.contactValueTextStyle.style);
        this.doc.setFontSize(this.contactValueTextStyle.size);
        this.doc.setTextColor(...this.contactValueTextStyle.color);

        for (const col of columns) {
            const colWidth = col.ratio * ctx.width;
            let y = ctx.y;

            const lines = col.value
                ? this.doc.splitTextToSize(col.value, colWidth)
                : [];

            for (const line of lines) {
                if (y + lineHeight > this.pageHeight - this.margin) {
                    this.doc.addPage();
                    this.drawBackground();
                    y = ctx.y;
                }

                this.doc.text(line, offsetX, y);
                y += lineHeight;
            }

            usedHeight = Math.max(
                usedHeight,
                Math.max(lineHeight, lines.length * lineHeight)
            );

            offsetX += colWidth;
        }

        ctx.advance(usedHeight);
    }

    contactInfoBlock(
        ctx,
        {
            paddingTop = 20,
            paddingBottom = 20,
            uppercase = false,
            center = false,
            underline = false,
            upperline = false,
            headerColor = this.mainColor,
            lineColor = this.mainColor,
            icon = null,
            dash = false,
            textSize = this.headerTextSize,
            textColor = this.textColor,
            linePadding = 10,
            style = ContactInfoType.LIST,
            header = true,
            lineThickness = 1,
        } = {}
    ) {
        ctx.advance(10);
        switch (style) {
            case ContactInfoType.LIST:
                if (header) {
                    this.header(ctx, {
                        text: "Contact",
                        uppercase: uppercase,
                        center: center,
                        underline: underline,
                        upperline: upperline,
                        color: headerColor,
                        lineColor: lineColor,
                        backgroundColor: this.headerBackgroundColor,
                        icon: icon,
                        dash: dash,
                        textSize: textSize,
                        paddingTop: paddingTop,
                        paddingBottom: paddingBottom,
                        linePadding: linePadding,
                        lineThickness: lineThickness,
                    });
                }
                this.contactInfoRow(ctx);
                break;
            case ContactInfoType.COLUMN:
            default:
                this.contactInfoColumn(ctx);
                break;
        }
        ctx.advance(10);
    }

    introductionBlock(
        ctx,
        {
            paddingTop = 20,
            paddingBottom = 20,
            uppercase = false,
            center = false,
            underline = false,
            upperline = false,
            headerColor = this.mainColor,
            lineColor = this.mainColor,
            linePadding = 10,
            icon = null,
            dash = false,
            textSize = this.headerTextSize,
            textColor = this.textColor,
            fontStyle = FontStyle.ITALIC,
            header = true,
            backgroundColor = this.headerBackgroundColor,
            lineThickness = 1,
        } = {}
    ) {
        if (header) {
            this.header(ctx, {
                text: "Introduction",
                uppercase: uppercase,
                center: center,
                underline: underline,
                upperline: upperline,
                color: headerColor,
                lineColor: lineColor,
                icon: icon,
                dash: dash,
                textSize: textSize,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                backgroundColor: backgroundColor,
                linePadding: linePadding,
                lineThickness: lineThickness,
            });
        }

        this.introduction(ctx, this.cvInfo.introduction, {
            style: fontStyle,
            textColor: textColor,
        });
    }

    workExpListBlock(
        ctx,
        opts = {
            showTimeLine: false,
            textColor: this.textColor,
            bulletColor: this.textColor,
            timeLineColor: this.mainColor,
            indent: 10,
            padding: 5,
        }
    ) {
        if (!this.cvInfo.sections.experience) return;
        if (!this.cvInfo.workExpArr.length) return;
        this.drawSectionHeader(ctx, "Work Experience", opts);

        for (const item of this.cvInfo.workExpArr) {
            const dates = item.current
                ? `${Utils.formatTime(item.from, {
                      format: this.timeFormat,
                  })} - Present`
                : `${Utils.formatTime(item.from, {
                      format: this.timeFormat,
                  })} - ${Utils.formatTime(item.to, {
                      format: this.timeFormat,
                  })}`;

            this.block(ctx, {
                title: new PdfText({
                    text: item.title,
                    style: this.blockTitleStyle,
                }),
                description: new PdfText({
                    text: item.company,
                    style: this.blockDescriptionStyle,
                }),
                dates: new PdfText({
                    text: dates,
                    style: this.blockDatesStyle,
                }),
                indent: opts.indent,
                timeLineColor: opts.timeLineColor,
                bulletColor: opts.bulletColor,
                detailList: item.details,
                showTimeLine: opts.showTimeLine,
                padding: opts.showTimeLine ? 10 : 0,
            });
        }
    }

    drawLineBlock(
        ctx,
        {
            thickness = 1,
            dash = false,
            color = this.textColor,
            spacing = 5,
            marginHorizontal = 0,
            customWidth = null,
        } = {}
    ) {
        ctx.ensureSpace(spacing, (column) => {
            this.addPageFor(ctx, column);
        });
        const y = ctx.y;
        const xStart = ctx.x + marginHorizontal;
        const xEnd = customWidth ?? ctx.x + ctx.width - marginHorizontal;

        ctx.advance(spacing);
        this.drawLine(xStart, y, xEnd, y, {
            dash: dash,
            color: color,
            thickness: thickness,
        });
        ctx.advance(spacing);
    }

    drawLine(
        x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0,
        { thickness = 1, dash = false, color = this.textColor } = {}
    ) {
        if (dash) {
            this.doc.setLineDash([2]);
        } else {
            this.doc.setLineDash([]); // IMPORTANT: reset
        }
        this.doc.setLineWidth(thickness);
        this.doc.setDrawColor(...color);

        this.doc.line(x1, y1, x2, y2);
        this.doc.setLineWidth(1);
    }

    educationListBlock(
        ctx,
        opts = {
            showTimeLine: false,
            textColor: this.textColor,
            bulletColor: this.textColor,
            timeLineColor: this.mainColor,
            indent: 10,
            padding: 5,
        }
    ) {
        if (!this.cvInfo.sections.education) return;
        if (!this.cvInfo.educationArr.length) return;
        this.drawSectionHeader(ctx, "Education", opts);

        for (const item of this.cvInfo.educationArr) {
            const dates = `${Utils.formatTime(item.from, {
                format: this.timeFormat,
            })} - ${Utils.formatTime(item.to, { format: this.timeFormat })}`;

            this.block(ctx, {
                title: new PdfText({
                    text: item.degree,
                    style: this.blockTitleStyle,
                }),
                description: new PdfText({
                    text: item.school,
                    style: this.blockDescriptionStyle,
                }),
                dates: new PdfText({
                    text: dates,
                    style: this.blockDatesStyle,
                }),
                bulletColor: opts.bulletColor,
                detailList: item.details,
                indent: opts.indent,
                timeLineColor: opts.timeLineColor,
                showTimeLine: opts.showTimeLine,
                padding: opts.showTimeLine ? 10 : 0,
            });
        }
    }

    skillListBlock(
        ctx,
        {
            textColor = this.textColor,
            type = this.skillListType,
            indent = 10,
            padding = 5,
            bulletColor = this.textColor,
            paddingTop = 20,
            paddingBottom = 20,
            uppercase = false,
            center = false,
            underline = false,
            upperline = false,
            headerColor = this.mainColor,
            lineColor,
            icon = null,
            dash = false,
            textSize,
            linePadding = 10,
            lineThickness = 1,
            header = true,
            headerBackgroundColor = this.headerBackgroundColor,
        } = {}
    ) {
        if (!this.cvInfo.sections.skills) return;
        if (!this.cvInfo.skillArr.length) return;
        this.drawSectionHeader(ctx, "Skills", {
            textColor: textColor,
            indent: indent,
            padding: padding,
            bulletColor: bulletColor,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            underline: underline,
            upperline: upperline,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash,
            textSize: textSize,
            linePadding: linePadding,
            backgroundColor: headerBackgroundColor,
            lineThickness: lineThickness,
            header: header,
        });

        ctx.advance(10);
        if (type === SkillListType.LIST) {
            this.skillbar(ctx, this.cvInfo.skillArr, {
                textColor: textColor,
            });
        } else if (type === SkillListType.BAR) {
            this.skillbar(ctx, this.cvInfo.skillArr, {
                textColor: textColor,
            });
        } else {
            this.skillList(ctx, this.cvInfo.skillArr, {
                textColor: textColor,
                indent: indent,
                padding: padding,
                bulletColor: bulletColor,
            });
        }
    }

    referenceListBlock(
        ctx,
        {
            textColor = this.textColor,
            indent = 10,
            padding = 5,
            bulletColor = this.textColor,
            headerColor = this.mainColor,
            paddingTop = 20,
            paddingBottom = 20,
            uppercase = false,
            center = false,
            underline = false,
            upperline = false,
            lineColor,
            icon = null,
            dash = false,
            textSize,
            linePadding = 10,
            lineThickness = 1,
            header = true,
            headerBackgroundColor = this.headerBackgroundColor,
        } = {}
    ) {
        if (!this.cvInfo.sections.references) return;
        if (!this.cvInfo.referenceArr.length) return;
        this.drawSectionHeader(ctx, "References", {
            textColor: textColor,
            indent: indent,
            padding: padding,
            bulletColor: bulletColor,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            underline: underline,
            upperline: upperline,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash,
            textSize: textSize,
            linePadding: linePadding,
            backgroundColor: headerBackgroundColor,
            lineThickness: lineThickness,
            header: header,
        });
        this.ul(
            ctx,
            this.cvInfo.referenceArr.map((h) => h.name),
            {
                textColor: textColor,
                indent: indent,
                padding: padding,
                bulletColor: bulletColor,
            }
        );
    }

    awardListBlock(
        ctx,
        {
            textColor = this.textColor,
            indent = 10,
            padding = 5,
            bulletColor = this.textColor,
            headerColor = this.mainColor,
            paddingTop = 20,
            paddingBottom = 20,
            uppercase = false,
            center = false,
            underline = false,
            upperline = false,
            lineColor,
            icon = null,
            dash = false,
            textSize,
            linePadding = 10,
            lineThickness = 1,
            header = true,
            headerBackgroundColor = this.headerBackgroundColor,
        } = {}
    ) {
        if (!this.cvInfo.sections.awards) return;
        if (!this.cvInfo.awardArr.length) return;
        this.drawSectionHeader(ctx, "Awards", {
            textColor: textColor,
            indent: indent,
            padding: padding,
            bulletColor: bulletColor,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            underline: underline,
            upperline: upperline,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash,
            textSize: textSize,
            linePadding: linePadding,
            backgroundColor: headerBackgroundColor,
            lineThickness: lineThickness,
            header: header,
        });
        this.ul(
            ctx,
            this.cvInfo.awardArr.map((h) => h.name),
            {
                textColor: textColor,
                indent: indent,
                padding: padding,
                bulletColor: bulletColor,
            }
        );
    }

    hobbyListBlock(
        ctx,
        {
            textColor = this.textColor,
            indent = 10,
            padding = 5,
            bulletColor = this.textColor,
            headerColor = this.mainColor,
            paddingTop = 20,
            paddingBottom = 20,
            uppercase = false,
            center = false,
            underline = false,
            upperline = false,
            lineColor,
            icon = null,
            dash = false,
            textSize,
            linePadding = 10,
            lineThickness = 1,
            header = true,
            headerBackgroundColor = this.headerBackgroundColor,
        } = {}
    ) {
        if (!this.cvInfo.sections.hobbies) return;
        if (!this.cvInfo.hobbyArr.length) return;
        this.drawSectionHeader(ctx, "Hobbies", {
            textColor: textColor,
            indent: indent,
            padding: padding,
            bulletColor: bulletColor,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            underline: underline,
            upperline: upperline,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash,
            textSize: textSize,
            linePadding: linePadding,
            backgroundColor: headerBackgroundColor,
            lineThickness: lineThickness,
            header: header,
        });
        this.ul(
            ctx,
            this.cvInfo.hobbyArr.map((h) => h.name),
            {
                textColor: textColor,
                indent: indent,
                padding: padding,
                bulletColor: bulletColor,
            }
        );
    }

    content() {}

    drawText(
        ctx,
        text,
        {
            indent = 0,
            center = false,
            lineHeight = this.lineHeight,
            padding = 0,
        } = {}
    ) {
        const availableWidth = ctx.width - indent - padding;
        const lines = this.doc.splitTextToSize(text, availableWidth);

        let usedHeight = 0;
        for (let i = 0; i < lines.length; i++) {
            ctx.ensureSpace(lineHeight, (column) => {
                this.addPageFor(ctx, column);
            });

            const x = center ? ctx.x + ctx.width / 2 : ctx.x + indent + padding;

            this.doc.text(
                lines[i],
                x,
                ctx.y,
                center
                    ? {
                          align: "center",
                      }
                    : undefined
            );
            ctx.advance(lineHeight);
            usedHeight += lineHeight;
        }

        return usedHeight;
    }

    async generate() {
        this.doc = new jsPDF({
            unit: "pt",
            format: "a4",
        });
        this.pageWidth = this.doc.internal.pageSize.getWidth();
        this.pageHeight = this.doc.internal.pageSize.getHeight();

        this.leftWidth = this.pageWidth * this.leftRatio;
        this.rightWidth = this.pageWidth * this.rightRatio;

        this.leftY = this.margin;
        this.rightY = this.margin;
        await this.loadFonts();
        await this.loadImages();
        this.drawBackground();
        this.content();
        return this.doc;
    }
}

class PdfText {
    constructor({ text = "", style = new TextStyle() } = {}) {
        this.text = text;
        this.style = style;
    }
}

class TextStyle {
    constructor({
        size = 12,
        color = [0, 0, 0],
        style = FontStyle.NORMAL,
    } = {}) {
        this.size = size;
        this.color = color;
        this.style = style; // 'normal', 'bold', 'italic'
    }
    clone(overrides = {}) {
        return new TextStyle({
            size: overrides.size ?? this.size,
            color: overrides.color ?? [...this.color], // avoid shared array
            style: overrides.style ?? this.style,
        });
    }
}
class HeaderOptions {
    constructor({
        paddingTop = 20,
        paddingBottom = 20,
        uppercase = false,
        center = false,
        underline = false,
        upperline = false,
        color,
        lineColor,
        icon = null,
        dash = false,
        textSize,
        linePadding = 10,
        backgroundColor,
        lineThickness = 1,
        header = true,
    } = {}) {
        this.paddingTop = paddingTop;
        this.paddingBottom = paddingBottom;
        this.uppercase = uppercase;
        this.center = center;
        this.underline = underline;
        this.upperline = upperline;
        this.color = color;
        this.lineColor = lineColor;
        this.icon = icon;
        this.dash = dash;
        this.textSize = textSize;
        this.linePadding = linePadding;
        this.backgroundColor = backgroundColor;
        this.lineThickness = lineThickness;
        this.header = header;
    }

    merge(other = {}) {
        return new HeaderOptions({
            ...this,
            ...other,
        });
    }
}

class LayoutContext {
    constructor({ x, y, width, pageHeight, margin, doc, column }) {
        this.x = x;
        this.y = y;
        this.startY = y;
        this.width = width;
        this.pageHeight = pageHeight;
        this.margin = margin;
        this.doc = doc;
        this.column = column;
        this.currentPage = 1;
    }

    advance(h) {
        this.y += h;
    }

    heightUsed() {
        return this.y - this.startY;
    }

    ensureSpace(h, onNewPage) {
        if (this.y + h > this.pageHeight - this.margin) {
            onNewPage?.(this.column);
            this.currentPage++;
            this.y = this.margin;
        }
    }

    goToCurrentPage() {
        if (
            this.doc.internal.getCurrentPageInfo().pageNumber !==
            this.currentPage
        ) {
            this.doc.setPage(this.currentPage);
        }
    }
}

class Section {
    constructor({
        leftRatio = 1,
        rightRatio = 0,
        gap = 10,
        paddingBottom = 20,
        render,
    }) {
        this.leftRatio = leftRatio;
        this.rightRatio = rightRatio;
        this.gap = gap;
        this.paddingBottom = paddingBottom;
        this.render = render;
    }
}

const TIMELINE_MARKERS = {
    circle: (x, y, w, ctx) => {
        ctx.doc.circle(x, y - w / 2, w / 2, "FD");
    },

    line: (x, y, w, ctx) => {
        ctx.drawLine(x, y - w * 2, x, y + w);
    },
    square: (x, y, w, ctx) => {
        ctx.doc.rect(x - 3, y - 3, 6, 6, "F");
    },
};

const DEFAULT_OPTIONS = {
    leftBackgroundColor: [255, 255, 255],
    rightBackgroundColor: [255, 255, 255],

    leftRatio: 1,
    rightRatio: 0,

    // Layout
    margin: 30,
    lineHeight: 15,

    // Style
    font: "custom",
    textColor: [0, 0, 0],
    mainColor: [0, 0, 0],
    textSize: 12,
    headerTextSize: 14,
    headerTextStyle: FontStyle.BOLD,
    separator: false,

    normalFont: "Adamina-Regular.ttf",
    boldFont: "OpenSans-Bold.ttf",
    italicFont: "OpenSans-Italic.ttf",

    timeFormat: TimeFormat.MONTH_YEAR,
    headerBackgroundColor: null,

    useContactIcon: false,

    avatarShape: AvatarShape.CICLE,
    avatarWidth: 120,
    avatarHeight: 120,

    markerFill: true,
    skillListType: SkillListType.DEFAULT,
    headerLineCustomWidth: null,
};

export class Template1 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [0, 95, 90],
            timeFormat: TimeFormat.YEAR,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
        });
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name, {
                        center: true,
                    });
                    pdf.title(left, this.cvInfo.title, {
                        center: true,
                    });
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    pdf.introductionBlock(left, {
                        center: true,
                        uppercase: true,
                    });
                    pdf.contactInfoBlock(left, {
                        style: ContactInfoType.COLUMN,
                        uppercase: true,
                        icon: this.contactImage,
                    });
                    pdf.workExpListBlock(left, {
                        uppercase: true,
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(left, {
                        uppercase: true,
                        icon: this.educationImage,
                    });
                    pdf.skillListBlock(left, {
                        uppercase: true,
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        uppercase: true,
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        uppercase: true,
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        uppercase: true,
                        icon: this.hobbyImage,
                    });
                },
            })
        );
    }
}

export class Template2 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            normalFont: "Lora-Regular.ttf",
            boldFont: "Lora-Bold.ttf",
            italicFont: "Lora-Italic.ttf",
            avatarWidth: 90,
            avatarHeight: 90,
        }
    ) {
        super(cvInfo, options);
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.BOLD,
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];
        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${title.text} | ${description.text}`,
                {
                    style: title.style,
                    lineHeight: 0,
                    marker: showTimeLine ? marker : null,
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar);
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                },
            })
        );

        this.renderSection(
            new Section({
                leftRatio: 0.6,
                rightRatio: 0.4,
                render: ({ left, right, pdf }) => {
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                    });
                    pdf.contactInfoBlock(right, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        showTimeLine: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        showTimeLine: true,
                    });
                },
            })
        );
    }
}

export class Template3 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [246, 246, 246],
            mainColor: [95, 137, 191],
            textColor: [100, 102, 101],
            normalFont: "Lora-Regular.ttf",
            boldFont: "Lora-Bold.ttf",
            italicFont: "Lora-Italic.ttf",
            timeFormat: TimeFormat.YEAR,
            useContactIcon: true,
        }
    ) {
        super(cvInfo, options);
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.BOLD,
            size: 10,
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
                lineHeight: 0,
                timeLineColor: timeLineColor,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              color: timeLineColor,
                              thickness: 1,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 10,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name);
                    pdf.title(left, this.cvInfo.title);
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        underline: true,
                    });
                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        underline: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        underline: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        underline: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        underline: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        underline: true,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        underline: true,
                        showTimeLine: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        underline: true,
                        showTimeLine: true,
                    });
                },
            })
        );
    }
}

export class Template4 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            avatarWidth: 90,
            avatarHeight: 90,
        }
    ) {
        super(cvInfo, options);

        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.mainColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.mainColor,
        });

        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });

        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    pdf.introductionBlock(left);
                    pdf.contactInfoBlock(left, {
                        style: ContactInfoType.COLUMN,
                        icon: this.contactImage,
                    });
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        icon: this.hobbyImage,
                    });
                },
            })
        );
    }
}

export class Template5 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [229, 211, 194],
            leftRatio: 0.4,
            rightRatio: 0.6,
            headerTextSize: 16,
            separator: true,
            normalFont: "AdventPro-Regular.ttf",
            boldFont: "AdventPro-Bold.ttf",
            italicFont: "AdventPro-Italic.ttf",
            useContactIcon: true,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.textColor,
        });

        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.textColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.BOLD,
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${title.text} | ${description.text}`,
                {
                    style: title.style,
                    lineHeight: 0,
                    marker: showTimeLine ? marker : null,
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 170, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                    });
                    right.advance(50);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                },
            })
        );

        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                    right.advance(10);
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        uppercase: true,
                    });
                    this.drawLineBlock(right, {
                        color: this.mainColor,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        uppercase: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template6 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [131, 206, 178],
            mainColor: [131, 206, 178],
            textColor: [100, 102, 101],
            headerTextSize: 20,
            headerTextStyle: FontStyle.NORMAL,
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            timeFormat: TimeFormat.YEAR,
        }
    ) {
        super(cvInfo, options);

        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.rightBackgroundColor,
        });

        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.leftBackgroundColor,
            style: FontStyle.BOLD,
        });

        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.BOLD,
            size: 10,
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });

        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 10,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name);
                    pdf.drawLineBlock(left, {
                        color: this.rightBackgroundColor,
                        thickness: 3,
                    });
                    left.advance(10);
                    pdf.title(left, this.cvInfo.title);

                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                    });
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                    });
                },
            })
        );
    }
}

export class Template7 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [2, 55, 78],
            mainColor: [2, 55, 78],
            textColor: [0, 0, 0],
            headerTextSize: 18,
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            timeFormat: TimeFormat.YEAR,
            useContactIcon: true,
            phoneImageColor: [255, 255, 255],
            linkImageColor: [255, 255, 255],
            emailImageColor: [255, 255, 255],
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, `( ${dates.text} )`, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              timeLineColor: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 7,
                        padding: 7,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(20);
                    pdf.contactInfoBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        linePadding: 10,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    right.advance(20);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                    right.advance(20);
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        underline: true,
                        icon: this.introductionImage,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        underline: true,
                        icon: this.workExpImage,
                        showTimeLine: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        underline: true,
                        icon: this.educationImage,
                        showTimeLine: true,
                    });
                },
            })
        );
    }
}

export class Template8 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftBackgroundColor: [0, 0, 0],
            mainColor: [255, 255, 255],
            textColor: [255, 255, 255],
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            avatarHeight: 100,
            avatarWidth: 100,
        }
    ) {
        super(cvInfo, options);
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.BOLD,
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${title.text} | ${description.text}`,
                {
                    style: title.style,
                    lineHeight: 0,
                    marker: showTimeLine ? marker : null,
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                    });
                    right.advance(50);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    left.advance(10);
                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        uppercase: true,
                        style: ContactInfoType.COLUMN,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 0.5,
                rightRatio: 0.5,
                render: ({ left, right, pdf }) => {
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        uppercase: true,
                        fontStyle: FontStyle.NORMAL,
                    });
                    pdf.skillListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        uppercase: true,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    pdf.workExpListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        uppercase: true,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        uppercase: true,
                    });

                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template9 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [242, 241, 248],
            mainColor: [117, 92, 189],
            normalFont: "Lora-Regular.ttf",
            boldFont: "Lora-Bold.ttf",
            italicFont: "Lora-Italic.ttf",
            useContactIcon: true,
            skillListType: SkillListType.BAR,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.ITALIC,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 10,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name);
                    pdf.title(left, this.cvInfo.title);
                    pdf.introductionBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.introductionImage,
                    });
                    pdf.contactInfoBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.contactImage,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.hobbyImage,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.mainColor,
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.mainColor,
                        icon: this.educationImage,
                    });
                },
            })
        );
    }
}

export class Template10 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [198, 152, 88],
            headerTextSize: 16,
            avatarWidth: 100,
            avatarHeight: 120,
            avatarShape: AvatarShape.RECTANGLE,
            //skillListType: SkillListType.LIST,
            headerLineCustomWidth: 150,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.mainColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.mainColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, `${dates.text}`, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 180, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        borderColor: this.rightBackgroundColor,
                    });
                    right.advance(10);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                    this.drawLineBlock(right, {
                        color: this.rightBackgroundColor,
                    });
                    right.advance(15);
                    pdf.introductionBlock(right, {
                        icon: this.introductionImage,
                        uppercase: true,
                        header: false,
                        textColor: this.rightBackgroundColor,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    left.advance(20);
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        underline: true,
                        uppercase: true,
                        style: ContactInfoType.COLUMN,
                    });
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        underline: true,
                        uppercase: true,
                        bulletColor: this.mainColor,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        underline: true,
                        uppercase: true,
                        bulletColor: this.mainColor,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        icon: this.referenceImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        icon: this.awardImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        icon: this.hobbyImage,
                        underline: true,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template11 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            headerBackgroundColor: [208, 237, 228],
        }
    ) {
        super(cvInfo, options);
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.mainColor,
        });

        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${description.text} (${dates.text})`,
                {
                    style: description.style,
                    lineHeight: 0,
                    marker: showTimeLine
                        ? (x, y, w, pdf) => {
                              pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                                  thickness: 1,
                                  color: timeLineColor,
                              });
                          }
                        : null,
                }
            )
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 90,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    left.advance(20);
                    pdf.introductionBlock(left, {
                        header: false,
                    });
                    pdf.contactInfoBlock(left, {
                        style: ContactInfoType.COLUMN,
                        icon: this.contactImage,
                    });
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.referenceListBlock(left, {
                        icon: this.referenceImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.awardListBlock(left, {
                        icon: this.awardImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.hobbyListBlock(left, {
                        icon: this.hobbyImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                },
            })
        );
    }
}

export class Template12 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [85, 113, 109],
            headerBackgroundColor: [152, 190, 186],
            leftRatio: 0.5,
            rightRatio: 0.5,
            normalFont: "AdventPro-Regular.ttf",
            boldFont: "AdventPro-Bold.ttf",
            italicFont: "AdventPro-Italic.ttf",
            avatarWidth: 90,
            avatarHeight: 90,
        }
    ) {
        super(cvInfo, options);
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.BOLD,
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.rightBackgroundColor,
            size: 34,
            style: FontStyle.BOLD,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.rightBackgroundColor,
            size: 20,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];
        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${title.text} | ${description.text}`,
                {
                    style: title.style,
                    lineHeight: 0,
                    marker: showTimeLine ? marker : null,
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 150, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        borderColor: this.rightBackgroundColor,
                        padding: 5,
                        borderSize: 3,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                },
            })
        );

        this.renderSection(
            new Section({
                leftRatio: 0.5,
                rightRatio: 0.5,
                render: ({ left, right, pdf }) => {
                    left.advance(20);
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        uppercase: true,
                    });
                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                    right.advance(20);
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        uppercase: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template13 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [211, 204, 247],
            mainColor: [0, 0, 0],
            normalFont: "Afacad-Regular.ttf",
            boldFont: "Afacad-Bold.ttf",
            italicFont: "Afacad-Italic.ttf",
            avatarWidth: 120,
            avatarHeight: 120,
            useContactIcon: true,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
            size: 48,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            size: 24,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            style: FontStyle.BOLD,
            color: this.textColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.ITALIC,
            size: 10,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(
                ctx,
                description.text.toUpperCase(),
                dates.text.toUpperCase(),
                {
                    leftStyle: description.style,
                    rightStyle: dates.style,
                    lineHeight: 0,
                    marker: showTimeLine
                        ? (x, y, w, pdf) => {
                              pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                                  thickness: 1,
                                  color: timeLineColor,
                              });
                          }
                        : null,
                }
            )
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 10,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(40);

                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        underline: true,
                        uppercase: true,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title, {
                        uppercase: true,
                    });
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        underline: true,
                        uppercase: true,
                        showTimeLine: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        underline: true,
                        uppercase: true,
                        showTimeLine: true,
                    });
                },
            })
        );
    }
}

export class Template14 extends PDFGenerator {
    constructor(cvInfo, options = {}) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                        center: true,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name, {
                        center: true,
                    });
                    pdf.title(left, this.cvInfo.title.toUpperCase(), {
                        center: true,
                    });
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    pdf.contactInfoBlock(left, {
                        style: ContactInfoType.COLUMN,
                        uppercase: true,
                        center: true,
                        icon: this.contactImage,
                    });
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    pdf.introductionBlock(left, {
                        center: true,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        uppercase: true,
                        center: true,
                        upperline: true,
                        icon: this.workExpImage,
                        linePadding: 20,
                    });
                    pdf.educationListBlock(left, {
                        uppercase: true,
                        center: true,
                        upperline: true,
                        icon: this.educationImage,
                        linePadding: 20,
                    });
                    pdf.skillListBlock(left, {
                        uppercase: true,
                        center: true,
                        upperline: true,
                        icon: this.skillImage,
                        linePadding: 20,
                    });
                    pdf.referenceListBlock(left, {
                        uppercase: true,
                        center: true,
                        upperline: true,
                        icon: this.referenceImage,
                        linePadding: 20,
                    });
                    pdf.awardListBlock(left, {
                        uppercase: true,
                        center: true,
                        upperline: true,
                        icon: this.awardImage,
                        linePadding: 20,
                    });
                    pdf.hobbyListBlock(left, {
                        uppercase: true,
                        center: true,
                        upperline: true,
                        icon: this.hobbyImage,
                        linePadding: 20,
                    });
                },
            })
        );
    }
}

export class Template15 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [229, 229, 229],
            mainColor: [0, 0, 0],
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            style: FontStyle.BOLD,
            color: this.textColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.ITALIC,
            size: 10,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];
        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        size: 140,
                        borderSize: 10,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(20);

                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                    right.advance(20);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                    pdf.drawLineBlock(right, {
                        color: this.mainColor,
                    });
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        uppercase: true,
                    });
                    pdf.drawLineBlock(right, {
                        color: this.mainColor,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        uppercase: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template16 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [220, 227, 230],
            leftRatio: 0.4,
            rightRatio: 0.6,
            normalFont: "AdventPro-Regular.ttf",
            boldFont: "AdventPro-Bold.ttf",
            italicFont: "AdventPro-Italic.ttf",
            headerTextSize: 16,
            separator: true,
            useContactIcon: true,
            phoneImageColor: [0, 0, 0],
            linkImageColor: [0, 0, 0],
            emailImageColor: [0, 0, 0],
            avatarWidth: 90,
            avatarHeight: 90,
        }
    ) {
        super(cvInfo, options);
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.textColor,
            size: 34,
            style: FontStyle.BOLD,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.textColor,
            size: 20,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 150, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        borderColor: this.textColor,
                        borderSize: 3,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                },
            })
        );

        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    left.advance(20);
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    right.advance(20);
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template17 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [241, 244, 250],
            headerTextStyle: FontStyle.NORMAL,
            markerFill: false,
            avatarWidth: 100,
            avatarHeight: 120,
            avatarShape: AvatarShape.RECTANGLE,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.textColor,
            size: 24,
            style: FontStyle.NORMAL,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];
        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    this.doc.setFillColor(...this.mainColor);
                    this.doc.rect(0, 0, this.pageWidth, 170, "F");
                    pdf.avatar(left, this.cvInfo.avatar);
                    right.advance(20);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                    right.advance(10);
                    pdf.contactInfoBlock(right, {
                        icon: this.contactImage,
                        header: false,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template18 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [183, 31, 28],
            headerTextStyle: FontStyle.NORMAL,
            avatarWidth: 90,
            avatarHeight: 90,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
            size: 24,
            style: FontStyle.NORMAL,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
            style: FontStyle.NORMAL,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            style: FontStyle.BOLD,
            size: 14,
            color: this.textColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];
        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        header: false,
                        style: ContactInfoType.COLUMN,
                    });
                    pdf.introductionBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template19 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            avatarWidth: 90,
            avatarHeight: 110,
            avatarShape: AvatarShape.RECTANGLE,
        }
    ) {
        super(cvInfo, options);

        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.mainColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.mainColor,
        });

        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });

        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                    });
                    right.advance(15);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                    right.advance(5);
                    pdf.introductionBlock(right, {
                        header: false,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    pdf.contactInfoBlock(left, {
                        style: ContactInfoType.COLUMN,
                        icon: this.contactImage,
                        uppercase: true,
                    });
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        uppercase: true,
                    });
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 0.6,
                rightRatio: 0.4,
                render: ({ left, right, pdf }) => {
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(right, {
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(right, {
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(right, {
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template20 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [126, 56, 128],
            headerTextSize: 18,
            avatarShape: AvatarShape.RECTANGLE,
            avatarWidth: 100,
            avatarHeight: 120,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.textColor,
            size: 32,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.mainColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];
        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${description.text}   (${dates.text})`,
                {
                    style: description.style,
                    lineHeight: 0,
                    marker: showTimeLine
                        ? (x, y, w, pdf) => {
                              pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                                  thickness: 1,
                                  color: timeLineColor,
                              });
                          }
                        : null,
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.7,
                rightRatio: 0.3,
                render: ({ left, right, pdf }) => {
                    left.advance(20);
                    pdf.name(left, this.cvInfo.name);
                    pdf.title(left, this.cvInfo.title);
                    left.advance(20);
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        header: false,
                    });
                    pdf.avatar(right, this.cvInfo.avatar);
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.introductionBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.introductionImage,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.mainColor,
                        timeLineColor: this.textColor,
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.mainColor,
                        timeLineColor: this.textColor,
                        icon: this.educationImage,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.hobbyImage,
                    });
                },
            })
        );
    }
}

export class Template21 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [16, 45, 73],
            headerTextSize: 16,
            avatarWidth: 90,
            avatarHeight: 90,
            useContactIcon: true,
            introductionImageColor: [255, 255, 255],
            skillListType: SkillListType.BAR,
        }
    ) {
        super(cvInfo, options);
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.mainColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.mainColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, `${dates.text}`, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.6,
                rightRatio: 0.4,
                render: ({ left, right, pdf }) => {
                    left.advance(20);
                    pdf.name(left, this.cvInfo.name.toUpperCase());
                    pdf.title(left, this.cvInfo.title.toUpperCase());
                    pdf.contactInfoBlock(right, {
                        icon: this.contactImage,
                        uppercase: true,
                        header: false,
                    });
                },
            })
        );
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 110, this.pageWidth, 170, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    left.advance(30);
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                        borderColor: this.rightBackgroundColor,
                    });
                    pdf.introductionBlock(right, {
                        icon: this.introductionImage,
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        underline: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 0.6,
                rightRatio: 0.4,
                render: ({ left, right, pdf }) => {
                    left.advance(40);
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        underline: true,
                        uppercase: true,
                        showTimeLine: true,
                        bulletColor: this.mainColor,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        underline: true,
                        uppercase: true,
                        showTimeLine: true,
                        bulletColor: this.mainColor,
                    });
                    right.advance(40);
                    pdf.skillListBlock(right, {
                        icon: this.skillImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(right, {
                        icon: this.referenceImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.awardListBlock(right, {
                        icon: this.awardImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(right, {
                        icon: this.hobbyImage,
                        underline: true,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template22 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [20, 95, 150],
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            avatarWidth: 90,
            avatarHeight: 110,
            avatarShape: AvatarShape.RECTANGLE,
        }
    ) {
        super(cvInfo, options);
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.textColor,
            size: 16,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.mainColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.mainColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];
        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${title.text} | ${description.text}`,
                {
                    style: title.style,
                    lineHeight: 0,
                    marker: showTimeLine ? marker : null,
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    pdf.introductionBlock(left, {
                        uppercase: true,
                    });
                    pdf.contactInfoBlock(left, {
                        uppercase: true,
                        style: ContactInfoType.COLUMN,
                        icon: this.contactImage,
                    });
                    pdf.workExpListBlock(left, {
                        uppercase: true,
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(left, {
                        uppercase: true,
                        icon: this.educationImage,
                    });
                    pdf.skillListBlock(left, {
                        uppercase: true,
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        uppercase: true,
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        uppercase: true,
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        uppercase: true,
                        icon: this.hobbyImage,
                    });
                },
            })
        );
    }
}

export class Template23 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [40, 40, 40],
            textColor: [40, 40, 40],
            headerBackgroundColor: [245, 245, 245],
            headerTextStyle: FontStyle.NORMAL,
        }
    ) {
        super(cvInfo, options);

        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
            size: 26,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.textColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                        center: true,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name, {
                        center: true,
                    });
                    pdf.title(left, this.cvInfo.title.toUpperCase(), {
                        center: true,
                    });
                    pdf.drawLineBlock(left, {
                        thickness: 5,
                        color: this.headerBackgroundColor,
                    });
                    pdf.contactInfoBlock(left, {
                        style: ContactInfoType.COLUMN,
                        uppercase: true,
                        center: true,
                        icon: this.contactImage,
                    });
                    pdf.introductionBlock(left, {
                        center: true,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.workExpImage,
                        linePadding: 20,
                    });
                    pdf.educationListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.educationImage,
                        linePadding: 20,
                    });
                    pdf.skillListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.skillImage,
                        linePadding: 20,
                    });
                    pdf.referenceListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.referenceImage,
                        linePadding: 20,
                    });
                    pdf.awardListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.awardImage,
                        linePadding: 20,
                    });
                    pdf.hobbyListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.hobbyImage,
                        linePadding: 20,
                    });
                },
            })
        );
    }
}

export class Template24 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [20, 95, 150],
            mainColor: [20, 95, 150],
            textColor: [0, 0, 0],
            headerTextSize: 18,
            timeFormat: TimeFormat.YEAR,
            useContactIcon: true,
            phoneImageColor: [255, 255, 255],
            linkImageColor: [255, 255, 255],
            emailImageColor: [255, 255, 255],
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });

        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, `${dates.text}`, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              timeLineColor: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 5,
                        padding: 7,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name.toUpperCase(), {
                        center: true,
                    });
                    pdf.title(left, this.cvInfo.title, {
                        center: true,
                    });
                    pdf.drawLineBlock(left, {
                        color: this.rightBackgroundColor,
                        marginHorizontal: 40,
                    });
                    pdf.contactInfoBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });

                    right.advance(20);
                    pdf.introductionBlock(right, {
                        uppercase: true,
                        icon: this.introductionImage,
                    });
                    pdf.workExpListBlock(right, {
                        uppercase: true,

                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(right, {
                        uppercase: true,

                        icon: this.educationImage,
                    });
                },
            })
        );
    }
}

export class Template25 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [50, 123, 172],
            headerTextSize: 16,
            avatarWidth: 100,
            avatarHeight: 120,
            avatarShape: AvatarShape.RECTANGLE,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.textColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.mainColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.mainColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.NORMAL,
        });
        this.contactBackgroundColor = this.mainColor;
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, `${dates.text}`, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        borderColor: this.rightBackgroundColor,
                    });
                    right.advance(10);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                    right.advance(10);
                    pdf.introductionBlock(right, {
                        icon: this.introductionImage,
                        uppercase: true,
                        header: false,
                        textColor: this.textColor,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        uppercase: true,
                        style: ContactInfoType.COLUMN,
                    });
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        uppercase: true,
                        bulletColor: this.mainColor,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        uppercase: true,
                        bulletColor: this.mainColor,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template26 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [184, 222, 239],
            leftRatio: 0.5,
            rightRatio: 0.5,
            headerTextSize: 16,
            normalFont: "Amiri-Regular.ttf",
            boldFont: "Amiri-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            useContactIcon: [0, 0, 0],
            educationImageColor: [0, 0, 0],
            workExpImageColor: [0, 0, 0],
            contactImageColor: [0, 0, 0],
            skillImageColor: [0, 0, 0],
            referenceImageColor: [0, 0, 0],
            awardImageColor: [0, 0, 0],
            introductionImageColor: [0, 0, 0],
            hobbyImageColor: [0, 0, 0],
            phoneImageColor: [0, 0, 0],
            linkImageColor: [0, 0, 0],
            emailImageColor: [0, 0, 0],
            avatarWidth: 90,
            avatarHeight: 90,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.textColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.textColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.BOLD,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${title.text} | ${description.text}`,
                {
                    style: title.style,
                    lineHeight: 0,
                    marker: showTimeLine ? marker : null,
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 140, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        width: 80,
                        height: 80,
                        borderSize: 3,
                        padding: 5,
                        borderColor: this.rightBackgroundColor,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                },
            })
        );

        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    left.advance(10);
                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                    right.advance(20);
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        uppercase: true,
                    });
                    this.drawLineBlock(right, {
                        color: this.mainColor,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        uppercase: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template27 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            headerTextStyle: FontStyle.NORMAL,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
            size: 24,
            style: FontStyle.NORMAL,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.mainColor,
            style: FontStyle.NORMAL,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            style: FontStyle.BOLD,
            size: 14,
            color: this.textColor,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        width: 90,
                        height: 90,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name);
                    pdf.title(right, this.cvInfo.title);
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        header: false,
                        style: ContactInfoType.COLUMN,
                    });
                    pdf.introductionBlock(left, {
                        headerColor: this.mainColor,
                        center: true,
                        upperline: true,
                        underline: true,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.mainColor,
                        center: true,
                        upperline: true,
                        underline: true,
                        linePadding: 10,
                        uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.mainColor,
                        center: true,
                        upperline: true,
                        underline: true,
                        linePadding: 10,
                        uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.mainColor,
                        center: true,
                        upperline: true,
                        underline: true,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.mainColor,
                        center: true,
                        upperline: true,
                        underline: true,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.mainColor,
                        center: true,
                        upperline: true,
                        underline: true,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.mainColor,
                        center: true,
                        upperline: true,
                        underline: true,
                        linePadding: 10,
                        uppercase: true,
                    });
                },
            })
        );
    }
}

export class Template28 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [46, 160, 166],
            headerTextSize: 16,
            avatarWidth: 100,
            avatarHeight: 120,
            avatarShape: AvatarShape.RECTANGLE,
            normalFont: "AlbertSans-Regular.ttf",
            boldFont: "AlbertSans-Bold.ttf",
            italicFont: "AlbertSans-Italic.ttf",
            //skillListType: SkillListType.LIST,
            contactBackgroundColor: [27, 32, 41],
            headerLineCustomWidth: 150,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.rightBackgroundColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            color: this.textColor,
        });

        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.ITALIC,
            color: this.mainColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.rightBackgroundColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, `${dates.text}`, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 190, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        borderColor: this.rightBackgroundColor,
                    });
                    right.advance(10);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                    right.advance(10);
                    pdf.introductionBlock(right, {
                        icon: this.introductionImage,
                        uppercase: true,
                        header: false,
                        textColor: this.rightBackgroundColor,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        underline: true,
                        uppercase: true,
                        style: ContactInfoType.COLUMN,
                        lineThickness: 2,
                    });
                    left.advance(10);
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        underline: true,
                        uppercase: true,
                        bulletColor: this.mainColor,
                        lineThickness: 2,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        underline: true,
                        uppercase: true,
                        bulletColor: this.mainColor,
                        lineThickness: 2,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                        underline: true,
                        uppercase: true,
                        lineThickness: 2,
                    });
                    pdf.referenceListBlock(left, {
                        icon: this.referenceImage,
                        underline: true,
                        uppercase: true,
                        lineThickness: 2,
                    });
                    pdf.awardListBlock(left, {
                        icon: this.awardImage,
                        underline: true,
                        uppercase: true,
                        lineThickness: 2,
                    });
                    pdf.hobbyListBlock(left, {
                        icon: this.hobbyImage,
                        underline: true,
                        uppercase: true,
                        lineThickness: 2,
                    });
                },
            })
        );
    }
}

export class Template29 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            avatarWidth: 90,
            avatarHeight: 90,
            mainColor: [44, 44, 44],
            headerTextStyle: FontStyle.NORMAL,
            markerFill: false,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.textColor,
            size: 24,
            style: FontStyle.NORMAL,
        });
        this.titleTextStyle = this.titleTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.textColor,
        });
        this.blockTitleStyle = this.blockTitleStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: this.textColor,
            style: FontStyle.NORMAL,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, `${dates.text}`, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              timeLineColor: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        width: 90,
                        height: 90,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name, {
                        center: true,
                    });
                    pdf.title(left, this.cvInfo.title, {
                        center: true,
                    });
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        header: false,
                        style: ContactInfoType.COLUMN,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                },
            })
        );
    }
}

export class Template30 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [49, 65, 87],
            mainColor: [49, 65, 87],
            textColor: [100, 102, 101],
            normalFont: "Lora-Regular.ttf",
            boldFont: "Lora-Bold.ttf",
            italicFont: "Lora-Italic.ttf",
            timeFormat: TimeFormat.MONTH_YEAR,
            useContactIcon: true,
            phoneImageColor: [255, 255, 255],
            linkImageColor: [255, 255, 255],
            emailImageColor: [255, 255, 255],
            markerFill: false,
        }
    ) {
        super(cvInfo, options);
        this.contactLabelTextStyle = this.contactLabelTextStyle.clone({
            color: [255, 255, 255],
            style: FontStyle.BOLD,
        });
        this.contactValueTextStyle = this.contactValueTextStyle.clone({
            color: [255, 255, 255],
            style: FontStyle.NORMAL,
        });
        this.blockDescriptionStyle = this.blockDescriptionStyle.clone({
            style: FontStyle.NORMAL,

            color: this.mainColor,
        });
        this.blockDatesStyle = this.blockDatesStyle.clone({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.mainColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, `${dates.text}`, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              timeLineColor: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 7,
                        padding: 7,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(20);
                    pdf.contactInfoBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        linePadding: 10,
                        uppercase: true,
                        lineColor: this.rightBackgroundColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        lineColor: this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    right.advance(20);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                    right.advance(20);
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        icon: this.introductionImage,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        icon: this.workExpImage,
                        showTimeLine: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                        icon: this.educationImage,
                        showTimeLine: true,
                    });
                },
            })
        );
    }
}
