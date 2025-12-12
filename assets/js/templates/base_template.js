class TextStyle {
    constructor({
        size = 12,
        color = [0, 0, 0],
        style = 'normal'
    } = {}) {
        this.size = size; // font size
        this.color = color; // font color
        this.style = style; // 'normal', 'bold', 'italic'
    }
}
class Text {
    constructor({
        text = '',
        style = new TextStyle()
    } = {}) {
        this.text = text; // actual text (optional)
        this.style = style;
    }
}

class PDFGenerator {
    constructor(cvInfo, options = {}) {
        this.cvInfo = cvInfo;
        this.doc = new jsPDF({
            unit: 'pt',
            format: 'a4'
        });
        this.svgElement = document.getElementById("iconSVG");
        this.leftBackgroundColor = options.leftBackgroundColor || [255, 255, 255];
        this.rightBackgroundColor = options.rightBackgroundColor || [255, 255, 255];

        this.leftRatio = options.leftRatio || 1;
        this.rightRatio = options.rightRatio || 0

        // Layout
        this.margin = options.margin || 40;
        this.lineHeight = options.lineHeight || 15;

        this.pageWidth = this.doc.internal.pageSize.getWidth();
        this.pageHeight = this.doc.internal.pageSize.getHeight();

        this.leftWidth = this.pageWidth * this.leftRatio;
        this.rightWidth = this.pageWidth * this.rightRatio;

        this.leftY = this.margin;
        this.rightY = this.margin;

        // Style
        this.font = options.font || "custom";
        this.textColor = options.textColor || [0, 0, 0];
        this.mainColor = options.mainColor || [0, 95, 90];
        this.textSize = options.textSize || 12;
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Adamina-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/OpenSans-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/OpenSans-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }

    blockTitleStyle() {
        return new TextStyle({
            style: 'bold',
            color: this.textColor
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: 'italic',
            color: this.mainColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'bold',
            color: this.textColor
        });
    }

    blockHeader({
        title = new Text(),
        description = new Text(),
        dates = new Text(),
        column = "left"
    } = {}) {
        this.normalText(`${title.text} | ${dates.text}`, {
            style: title.style,
            column: column
        });
        this.normalText(description.text, {
            style: description.style,
            column: column
        });
    }
    async svgToPngData(svgString) {
        return new Promise((resolve) => {
            const blob = new Blob([svgString], {
                type: 'image/svg+xml'
            });
            const url = URL.createObjectURL(blob);
            const img = new Image();

            img.onload = () => {
                const size = 24;
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const pngData = canvas.toDataURL('image/png');
                URL.revokeObjectURL(url);
                resolve(pngData);
            };

            img.src = url;
        });
    }

    rgbToCss(rgbArray) {
        const [r, g, b] = rgbArray;
        return `rgb(${r},${g},${b})`;
    }

    async contactSvgString(color = [0, 0, 0]) {
        const cssColor = this.rgbToCss(color);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
            <path fill-rule="evenodd" d="M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.604.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clip-rule="evenodd" />
            </svg>`;
    }

    async educationSvgString(color = [0, 0, 0]) {
        const cssColor = this.rgbToCss(color);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
            <path fill-rule="evenodd" d="M9.664 1.319a.75.75 0 0 1 .672 0 41.059 41.059 0 0 1 8.198 5.424.75.75 0 0 1-.254 1.285 31.372 31.372 0 0 0-7.86 3.83.75.75 0 0 1-.84 0 31.508 31.508 0 0 0-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 0 1 3.305-2.033.75.75 0 0 0-.714-1.319 37 37 0 0 0-3.446 2.12A2.216 2.216 0 0 0 6 9.393v.38a31.293 31.293 0 0 0-4.28-1.746.75.75 0 0 1-.254-1.285 41.059 41.059 0 0 1 8.198-5.424ZM6 11.459a29.848 29.848 0 0 0-2.455-1.158 41.029 41.029 0 0 0-.39 3.114.75.75 0 0 0 .419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 1 0 1.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 0 1 3.095 2.348.75.75 0 0 0 .992 0 26.547 26.547 0 0 1 5.93-3.95.75.75 0 0 0 .42-.739 41.053 41.053 0 0 0-.39-3.114 29.925 29.925 0 0 0-5.199 2.801 2.25 2.25 0 0 1-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 0 1-1.084 3.45 26.503 26.503 0 0 0-1.281-.78A5.487 5.487 0 0 0 6 12v-.54Z" clip-rule="evenodd"/>
        </svg>`;
    }
    async workExpSvgString(color = [0, 0, 0]) {
        const cssColor = this.rgbToCss(color);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z" clip-rule="evenodd" />
        <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
        </svg>`;
    }
    async skillSvgString(color = [0, 0, 0]) {
        const cssColor = this.rgbToCss(color);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
            <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1ZM9.5 6A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1ZM3.5 10A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" />
            </svg>`;
    }
    async referenceSvgString(color = [0, 0, 0]) {
        const cssColor = this.rgbToCss(color);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
        <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
        </svg>`;
    }

    async awardSvgString(color = [0, 0, 0]) {
        const cssColor = this.rgbToCss(color);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 0 0-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 0 0-.552.698 5 5 0 0 0 4.503 5.152 6 6 0 0 0 2.946 1.822A6.451 6.451 0 0 1 7.768 13H7.5A1.5 1.5 0 0 0 6 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 .75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 0 0-1.5-1.5h-.268a6.453 6.453 0 0 1-.684-2.202 6 6 0 0 0 2.946-1.822 5 5 0 0 0 4.503-5.152.75.75 0 0 0-.552-.698A31.804 31.804 0 0 0 16 2.562v-.387a.75.75 0 0 0-.629-.74A33.227 33.227 0 0 0 10 1ZM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 0 1-1.855-2.68Zm14.95 0a3.503 3.503 0 0 1-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332Z" clip-rule="evenodd" />
        </svg>`;
    }
    async introductionSvgString(color = [0, 0, 0]) {
        const cssColor = this.rgbToCss(color);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        </svg>`;
    }
    async hobbySvgString(color = [0, 0, 0]) {
        const cssColor = this.rgbToCss(color);
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="${cssColor}" class="size-5">
        <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
        </svg>`;
    }

    async loadImages() {
        this.educationImage = await this.svgToPngData(await this.educationSvgString(this.textColor));
        this.workExpImage = await this.svgToPngData(await this.workExpSvgString(this.textColor));
        this.contactImage = await this.svgToPngData(await this.contactSvgString(this.textColor));
        this.skillImage = await this.svgToPngData(await this.skillSvgString(this.textColor));
        this.referenceImage = await this.svgToPngData(await this.referenceSvgString(this.textColor));
        this.awardImage = await this.svgToPngData(await this.awardSvgString(this.textColor));
        this.introductionImage = await this.svgToPngData(await this.introductionSvgString(this.textColor));
        this.hobbyImage = await this.svgToPngData(await this.hobbySvgString(this.textColor));
    }

    async loadFont(url, name, style) {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();

        let binary = '';
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

    /**
     * Get the width of a column.
     * @param {"left"|"right"} [column="left"] - Which column to get width for.
     * @returns {number} The width of the specified column.
     */
    colWidth(column = "left") {
        return column === "left" ? this.leftWidth : this.rightWidth;
    }
    /**
     * Get the current Y offset of a column.
     * @param {"left"|"right"} [column="left"] - Column to get Y offset for.
     * @returns {number} The current Y position of the column.
     */
    getYOffset(column = "left") {
        return column === "left" ? this.leftY : this.rightY;
    }
    /**
     * Set the Y offset of a column.
     * @param {"left"|"right"} [column="left"] - Column to set Y offset for.
     * @param {number} value - The Y position to set.
     */
    setYOffset(column = "left", value) {
        if (column === "left") {
            this.leftY = value
        } else {
            this.rightY = value;
        }
    }
    /**
     * Add a value to the current Y offset of a column.
     * @param {"left"|"right"} [column="left"] - Column to add Y offset to.
     * @param {number} value - The value to add.
     */
    addYOffset(column = "left", value) {
        if (column === "left") {
            this.leftY += value
        } else {
            this.rightY += value;
        }
    }
    drawBackground() {
        // LEFT
        this.doc.setFillColor(...this.leftBackgroundColor);
        this.doc.rect(
            0,
            0,
            this.leftWidth,
            this.pageHeight + 2,
            "F"
        );

        // RIGHT
        this.doc.setFillColor(...this.rightBackgroundColor);
        this.doc.rect(
            this.leftWidth,
            0,
            this.pageWidth - this.leftWidth,
            this.pageHeight + 2,
            "F"
        );
    }


    writePair({
        label = "",
        value = "",
        column = "left",
        padding = 4,
        textSize = this.textSize,
        lineHeight = this.lineHeight
    }) {
        const y = this.getYOffset(column);
        this.doc.setFontSize(textSize);
        const baseX = column === "left" ?
            this.margin :
            this.leftWidth + this.margin;

        const columnWidth = column === "left" ?
            this.leftWidth :
            this.rightWidth;

        this.doc.setFont(this.font, "bold");
        this.doc.setTextColor(...this.mainColor);

        const labelWidth = this.doc.getTextWidth(label);
        const valueX = baseX + labelWidth + padding;

        this.doc.text(label, baseX, y);

        const maxValueWidth = columnWidth - (labelWidth + padding);

        this.doc.setFont(this.font, "normal");
        this.doc.setTextColor(...this.textColor);

        const wrapped = this.doc.splitTextToSize(value, maxValueWidth);

        this.doc.text(wrapped, valueX, y);

        this.addYOffset(column, +lineHeight);
    }

    addPageFor(column) {
        this.doc.addPage();
        this.drawBackground();

        if (column === "left") {
            this.leftY = this.margin;
        } else {
            this.rightY = this.margin;
        }
    }

    writeText(text, {
        indent = 0,
        center = false,
        lineHeight = this.lineHeight,
        column = "left"
    } = {}) {
        const colX = column === "left" ? this.margin : this.leftWidth + this.margin;
        const colW = this.colWidth(column) - this.margin * 2;
        const lines = this.doc.splitTextToSize(text, colW - indent);

        let y = this.getYOffset(column);
        for (let i = 0; i < lines.length; i++) {
            if (y + lineHeight > this.pageHeight - this.margin) {
                this.addPageFor(column);
                y = this.getYOffset(column);
            }
            this.doc.text(lines[i], center ? colX + colW / 2 : colX + indent, y, center ? {
                align: 'center'
            } : undefined);
            y += lineHeight;
        }
        y += 5;
        this.setYOffset(column, y);
    }

    ul(items, {
        indent = 10,
        column = "left",
        lineHeight = this.lineHeight
    } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, "normal");
        this.doc.setTextColor(...this.textColor);

        const colX = column === "left" ? this.margin : this.leftWidth + this.margin;
        const colW = this.colWidth(column) - this.margin * 2;

        items.forEach(item => {
            const lines = this.doc.splitTextToSize(item, colW - indent);
            let y = this.getYOffset(column);

            for (let i = 0; i < lines.length; i++) {
                if (y + lineHeight > this.pageHeight - this.margin) {
                    this.addPageFor(column);
                    y = this.getYOffset(column);
                }
                if (i === 0) this.doc.text("•", colX, y);
                this.doc.text(lines[i], colX + indent, y);
                y += lineHeight;
            }
            y += 5;
            this.setYOffset(column, y);
        });
    }



    join(items, {
        x = this.margin,
        column = "left"
    } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, 'normal');
        this.doc.setTextColor(...this.textColor);
        this.writeText(`- ${items.join(", ")}.`, {
            indent: x - this.margin,
            lineHeight: this.lineHeight,
            column: column
        });
    }

    async section({
        text = '',
        uppercase = false,
        center = false,
        column = "left",
        underline = false,
        color = this.mainColor,
        underlineColor = this.mainColor,
        icon = null,
        paddingTop = 10,
        paddingBottom = 20
    }) {

        this.addYOffset(column, paddingTop);
        let y = this.getYOffset(column);

        this.doc.setFontSize(14);
        this.doc.setFont(this.font, 'bold');
        this.doc.setTextColor(...color);

        const title = uppercase ? text.toUpperCase() : text;

        const iconW = 14;
        const iconH = 14;
        const gap = icon ? 4 : 0;

        const colX = (column === "left") ?
            this.margin :
            this.leftWidth + this.margin;

        const colWidth = (column === "left") ?
            this.leftWidth :
            this.rightWidth;

        if (center) {

            const textWidth = this.doc.getTextWidth(title);
            const groupWidth = (icon ? iconW + gap : 0) + textWidth;
            const startX = colX + (colWidth - groupWidth) / 2;

            if (icon) {
                this.doc.addImage(icon, "PNG", startX, y - iconH + 12, iconW, iconH);
                const textX = startX + iconW + gap;
                this.doc.text(title, textX, y);
            } else {
                const centerX = colWidth / 2;
                this.doc.text(title, centerX, y, {
                    align: "center"
                });
            }
        } else {
            const textX = icon ? colX + iconW + gap : colX;

            if (icon) {
                this.doc.addImage(icon, "PNG", colX, y - iconH * .8, iconW, iconH);
            }
            this.doc.text(title, textX, y);
        }

        if (underline) {
            this.drawUnderline({
                column,
                color: underlineColor,
                offset: 10
            });
        }

        this.addYOffset(column, paddingBottom);
    }

    normalText(text, {
        style = TextStyle(),
        column = "left"
    } = {}) {
        this.doc.setFontSize(style.size);
        this.doc.setFont(this.font, style.style);
        this.doc.setTextColor(...style.color);
        this.writeText(text, {
            column: column
        });
    }

    block({
        title = new Text(),
        description = new Text(),
        dates = new Text(),
        detailList = [],
        column = "left"
    } = {}) {
        this.addYOffset(column, 10);
        this.blockHeader({
            title: title,
            description: description,
            dates: dates,
            column: column
        });
        if (detailList.length) {
            this.ul(detailList, {
                column: column,
                lineHeight: 15
            });
        }
    }

    /**
     * Render the name using writeText(), with wrapping support.
     * @param {string} text - The name text.
     * @param {Object} [options]
     * @param {"left"|"right"} [options.column="left"]
     * @param {boolean} [options.center=false]
     */
    name(text, {
        textSize = 24,
        lineHeight = 0,
        column = "left",
        center = false,
        textColor = this.textColor
    } = {}) {
        this.doc.setFontSize(textSize);
        this.doc.setFont(this.font, "bold");
        this.doc.setTextColor(...textColor);

        this.writeText(text, {
            indent: 0,
            center: center,
            lineHeight: textSize + lineHeight,
            column: column
        });
    }

    /**
     * Render the title using writeText(), with wrapping support.
     * @param {string} text - The title text.
     * @param {Object} [options]
     * @param {"left"|"right"} [options.column="left"]
     * @param {boolean} [options.center=false]
     */
    title(text, {
        textSize = 12,
        lineHeight = 0,
        column = "left",
        center = false,
        textColor = this.textColor
    } = {}) {
        this.doc.setFontSize(textSize);
        this.doc.setFont(this.font, "bold");
        this.doc.setTextColor(...textColor);

        this.writeText(text, {
            indent: 0,
            center: center,
            lineHeight: textSize + lineHeight,
            column: column
        });
    }

    introduction(text, {
        style = 'normal',
        center = false,
        column = "left"
    } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setTextColor(...this.textColor);
        this.doc.setFont(this.font, style);
        this.writeText(text, {
            center: center,
            column: column,
            lineHeight: 15
        });
    }

    async showName() {
        this.name(this.cvInfo.name, {
            textColor: this.textColor
        });
    }

    async showTitle() {
        this.title(this.cvInfo.title, {
            textColor: this.textColor
        });
    }

    async showContactInfo() {
        let textSize = 10;
        let column = "left";
        this.addYOffset(column, 20);
        var columnWidth = (this.pageWidth - this.margin * 2) / 3;
        const columns = [{
                title: "Phone:",
                value: this.cvInfo.phone,
                x: this.margin + columnWidth * 0
            },
            {
                title: "Email:",
                value: this.cvInfo.email,
                x: this.margin + columnWidth * 1
            },
            {
                title: "Links:",
                value: this.cvInfo.url,
                x: this.margin + columnWidth * 2
            }
        ];

        columns.forEach(col => {
            this.doc.setFontSize(textSize);
            this.doc.setTextColor(...this.mainColor);
            this.doc.setFont(this.font, 'bold');
            this.doc.text(col.title, col.x, this.leftY);
        });

        this.addYOffset(column, this.lineHeight)
        columns.forEach(col => {
            this.doc.setFontSize(textSize);
            this.doc.setTextColor(...this.textColor);
            this.doc.setFont(this.font, 'normal');
            this.doc.text(col.value, col.x, this.leftY);
        });
        this.addYOffset(column, 30)
    }

    async showIntroduction() {
        this.section({
            text: "Introduction",
            uppercase: true,
            center: true,
            underline: false,
            color: this.mainColor,
            underlineColor: this.mainColor
        });
        this.introduction(this.cvInfo.introduction, {
            style: 'italic'
        });
    }

    async workExpBlock({
        column = "left",
        uppercase = false,
        center = false,
        underline = false,
        sectionColor = this.mainColor,
        underlineColor = this.mainColor,
        icon = null
    }) {
        if (this.cvInfo.workExpArr.length) {
            this.section({
                text: "Work Experience",
                uppercase: uppercase,
                center: center,
                column: column,
                underline: underline,
                color: sectionColor,
                underlineColor: underlineColor,
                icon: icon
            });

            this.cvInfo.workExpArr.forEach(item => {
                const dates = item.current ? `${formatMonth(item.from)} - Present` : `${formatMonth(item.from)} - ${formatMonth(item.to)}`;
                this.block({
                    title: new Text({
                        text: item.title,
                        style: this.blockTitleStyle()
                    }),
                    description: new Text({
                        text: item.company,
                        style: this.blockDescriptionStyle()
                    }),
                    dates: new Text({
                        text: dates,
                        style: this.blockDatesStyle()
                    }),
                    detailList: item.details,
                    column: column
                });
            });
        }
    }

    async showWorkExp() {
        this.workExpBlock({
            column: "left",
            uppercase: false
        });
    }

    drawUnderline({
        column = "left",
        thickness = 1,
        offset = 5,
        color = this.textColor
    } = {}) {
        const y = this.getYOffset(column) + offset;
        const startX = column === "left" ? this.margin : this.leftWidth + this.margin;
        const endX = startX + this.colWidth(column) - this.margin * 2;

        this.doc.setLineWidth(thickness);
        this.doc.setDrawColor(...color);
        this.doc.line(startX, y, endX, y);
        this.addYOffset(column, offset + 2);
    }
    async educationBlock({
        column = "left",
        uppercase = false,
        center = false,
        underline = false,
        sectionColor = this.mainColor,
        underlineColor = this.mainColor,
        icon = null
    } = {}) {
        if (this.cvInfo.educationArr.length) {
            this.section({
                text: "Education",
                uppercase: uppercase,
                center: center,
                column: column,
                underline: underline,
                color: sectionColor,
                underlineColor: underlineColor,
                icon: icon
            });
            this.cvInfo.educationArr.forEach(item => {
                const dates = `${formatMonth(item.from)} - ${formatMonth(item.to)}`;
                this.block({
                    title: new Text({
                        text: item.degree,
                        style: this.blockTitleStyle()
                    }),
                    description: new Text({
                        text: item.school,
                        style: this.blockDescriptionStyle()
                    }),
                    dates: new Text({
                        text: dates,
                        style: this.blockDatesStyle()
                    }),
                    detailList: item.details,
                    column: column
                });
            });
        }
    }

    async showEducation() {
        this.educationBlock({
            column: "left",
            uppercase: true
        });
    }

    async skillsBlock({
        column = "left",
        uppercase = false,
        center = false,
        underline = false,
        sectionColor = this.mainColor,
        underlineColor = this.mainColor,
        icon = null
    } = {}) {
        if (this.cvInfo.skillArr.length) {
            this.section({
                text: "Skills",
                uppercase: uppercase,
                center: center,
                underline: underline,
                column: column,
                color: sectionColor,
                underlineColor: underlineColor,
                icon: icon
            });
            this.join(this.cvInfo.skillArr.map(h => h.name), {
                column: column
            });
        }
    }

    async showSkills() {
        this.skillsBlock({
            column: "left",
            uppercase: false
        });
    }

    async referencesBlock({
        column = "left",
        uppercase = false,
        center = false,
        underline = false,
        sectionColor = this.mainColor,
        underlineColor = this.mainColor,
        icon = null
    } = {}) {
        if (this.cvInfo.referenceArr.length) {
            this.section({
                text: "References",
                uppercase: uppercase,
                center: center,
                underline: underline,
                column: column,
                color: sectionColor,
                underlineColor: underlineColor,
                icon: icon
            });
            this.ul(this.cvInfo.referenceArr.map(h => h.name), {
                column: column
            });
        }
    }

    async showReference() {
        this.referencesBlock({
            column: "left",
            uppercase: false
        });
    }

    async awardsBlock({
        column = "left",
        uppercase = false,
        center = false,
        underline = false,
        sectionColor = this.mainColor,
        underlineColor = this.mainColor,
        icon = null
    } = {}) {
        if (this.cvInfo.awardArr.length) {
            this.section({
                text: "Awards",
                uppercase: uppercase,
                center: center,
                underline: underline,
                column: column,
                color: sectionColor,
                underlineColor: underlineColor,
                icon: icon
            });
            this.ul(this.cvInfo.awardArr.map(h => h.name), {
                column: column
            });
        }
    }

    async showAward() {
        this.awardsBlock({
            column: "left",
            uppercase: false
        });
    }

    async hobbyBlock({
        column = "left",
        uppercase = false,
        center = false,
        underline = false,
        sectionColor = this.mainColor,
        underlineColor = this.mainColor,
        icon = null
    } = {}) {
        if (this.cvInfo.hobbyArr.length) {
            this.section({
                text: "Hobbies",
                uppercase: uppercase,
                center: center,
                underline: underline,
                column: column,
                color: sectionColor,
                underlineColor: underlineColor,
                icon: icon 
            });
            this.ul(this.cvInfo.hobbyArr.map(h => h.name), {
                column: column
            });
        }
    }
    async showHobby() {
        await this.hobbyBlock({
            column: "left",
            uppercase: false
        });
    }

    async showLeftColumn() {
        await this.showName();
        await this.showTitle();
        await this.showIntroduction();
        await this.showContactInfo();
        await this.showWorkExp();
        await this.showEducation();
        await this.showSkills();
        await this.showReference();
        await this.showAward();
        await this.showHobby();
    }

    async showRightColumn() {

    }

    async generate() {
        await this.loadFonts();
        await this.loadImages();
        await this.drawBackground();
        await this.showLeftColumn();
        await this.showRightColumn();
        return this.doc;
    }
}