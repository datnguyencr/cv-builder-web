const TIMELINE_MARKERS = {
    circle: (x, y, w, ctx) => {
        ctx.doc.circle(x, y - w / 2, w / 2, 'F');
    },

    line: (x, y, w, ctx) => {
        ctx.doc.line(x, y - w * 2, x, y + w);
    },

    square: (x, y, w, ctx) => {
        ctx.doc.rect(x - 3, y - 3, 6, 6, 'F');
    }
};
class PdfText {
    constructor({
        text = '',
        style = new TextStyle()
    } = {}) {
        this.text = text;
        this.style = style;
    }
}
class TextStyle {
    constructor({
        size = 12,
        color = [0, 0, 0],
        style = 'normal'
    } = {}) {
        this.size = size;
        this.color = color;
        this.style = style; // 'normal', 'bold', 'italic'
    }
}
class LayoutContext {
    constructor({
        x,
        y,
        width,
        pageHeight,
        margin,
        doc
    }) {
        this.x = x;
        this.y = y;
        this.startY = y;
        this.width = width;
        this.pageHeight = pageHeight;
        this.margin = margin;
        this.doc = doc;
    }

    advance(h) {
        this.y += h;
    }

    heightUsed() {
        return this.y - this.startY;
    }

    ensureSpace(h, onNewPage) {
        if (this.y + h > this.pageHeight - this.margin) {
            onNewPage?.();
            this.y = this.margin;
        }
    }
}

class Section {
    constructor({
        leftRatio = 1,
        rightRatio = 0,
        gap = 10,
        paddingBottom = 20,
        render
    }) {
        this.leftRatio = leftRatio;
        this.rightRatio = rightRatio;
        this.gap = gap;
        this.paddingBottom = paddingBottom;
        this.render = render;
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
        this.margin = options.margin || 30;
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
        this.mainColor = options.mainColor || [0, 0, 0];
        this.textSize = options.textSize || 12;
    }

    formatTime(monthValue) {
        if (!monthValue) return '';
        // monthValue like "2022-09" -> display "Sep 2022"
        try {
            const [y, m] = monthValue.split('-');
            const d = new Date(Number(y), Number(m) - 1);
            return d.toLocaleString(undefined, {
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return monthValue;
        }
    }
    async loadFonts() {
        await this.loadFont('assets/fonts/Adamina-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/OpenSans-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/OpenSans-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }

    renderSection(section) {
        const totalWidth = this.pageWidth - this.margin * 2;
        const leftW = totalWidth * section.leftRatio;
        const rightW = totalWidth * section.rightRatio;

        const startY = Math.max(this.leftY, this.rightY);

        const leftCtx = new LayoutContext({
            x: this.margin,
            y: startY,
            width: leftW,
            pageHeight: this.pageHeight,
            margin: this.margin,
            doc: this.doc
        });

        const rightCtx = new LayoutContext({
            x: this.margin + leftW + section.gap,
            y: startY,
            width: rightW,
            pageHeight: this.pageHeight,
            margin: this.margin,
            doc: this.doc
        });

        section.render({
            left: leftCtx,
            right: rightCtx,
            pdf: this
        });

        const used = Math.max(
            leftCtx.heightUsed(),
            rightCtx.heightUsed()
        );

        this.leftY = startY + used + section.paddingBottom;
        this.rightY = this.leftY;
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

    writeTextWithMarker(ctx, text, {
        style = new TextStyle(),
        markerWidth = 10,
        gap = 10,
        marker = null,
        lineHeight = this.lineHeight,
        padding = 0,
        customWidth = null,
        lockY = false,
        align = "left"
    } = {}) {

        this.doc.setFont(this.font, style.style);
        this.doc.setFontSize(style.size);
        this.doc.setTextColor(...style.color);

        const baseX = ctx.x + padding;
        const availableWidth = customWidth ?? ctx.width;

        const textX =
            baseX + (marker ? markerWidth + gap : 0);

        const textW =
            availableWidth - (marker ? markerWidth + gap : 0);

        const lines = this.doc.splitTextToSize(text, textW);

        const startY = ctx.y;
        let usedHeight = 0;

        for (let i = 0; i < lines.length; i++) {

            ctx.ensureSpace(lineHeight, () => {
                this.doc.addPage();
                this.drawBackground();
            });

            const y = ctx.y;

            if (i === 0 && marker) {
                marker(baseX, y, markerWidth, this);
            }

            this.doc.text(
                lines[i],
                align === "right" ? textX + textW : textX,
                y,
                align === "right" ? {
                    align: "right"
                } : undefined
            );

            ctx.advance(lineHeight);
            usedHeight += lineHeight;
        }

        if (!lockY) {
            ctx.advance(5);
            usedHeight += 5;
        } else {
            ctx.y = startY;
        }

        return usedHeight;
    }


    blockHeader(ctx, {
        title = new Text(),
        description = new Text(),
        dates = new Text(),
        timelineColor = this.mainColor,
        showTimeLine = false
    } = {}) {

        const marker = TIMELINE_MARKERS["circle"];

        this.doc.setFillColor(...timelineColor);
        this.doc.setDrawColor(...timelineColor);

        ctx.advance(this.writeTextWithMarker(
            ctx,
            `${title.text} | ${dates.text}`, {
                style: title.style,
                marker: showTimeLine ? marker : null
            }
        ));

        ctx.advance(this.writeTextWithMarker(
            ctx,
            description.text, {
                style: description.style,
                marker: showTimeLine ?
                    (x, y, w, pdf) => {
                        pdf.doc.line(
                            x + w / 2,
                            y - w * 2,
                            x + w / 2,
                            y + w + 5
                        );
                    } : null
            }
        ));
    }


    async loadImages() {
        this.educationImage = await svgToPngData(await educationSvgString(this.mainColor));
        this.workExpImage = await svgToPngData(await workExpSvgString(this.mainColor));
        this.contactImage = await svgToPngData(await contactSvgString(this.mainColor));
        this.skillImage = await svgToPngData(await skillSvgString(this.mainColor));
        this.referenceImage = await svgToPngData(await referenceSvgString(this.mainColor));
        this.awardImage = await svgToPngData(await awardSvgString(this.mainColor));
        this.introductionImage = await svgToPngData(await introductionSvgString(this.mainColor));
        this.hobbyImage = await svgToPngData(await hobbySvgString(this.mainColor));
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

    colWidth(column = "left") {
        let width = column === "left" ? this.leftWidth : this.rightWidth;
        return width - this.margin * 2;
    }

    getXOffset(column = "left") {
        return column === "left" ? this.margin : this.leftWidth + this.margin;
    }

    getYOffset(column = "left") {
        return column === "left" ? this.leftY : this.rightY;
    }

    setYOffset(column = "left", value) {
        if (column === "left") {
            this.leftY = value
        } else {
            this.rightY = value;
        }
    }

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
    row(ctx, leftFn, rightFn, {
        column = "all",
        gap = 5,
        leftRatio = 0.7,
        padding = 20,
    } = {}) {
        const startY = this.getYOffset(column);

        const totalWidth = column === "all" ? (this.pageWidth - this.margin * 2) : this.colWidth(column);
        const leftWidth = totalWidth * leftRatio;
        const rightWidth = totalWidth - leftWidth - gap;

        // Render left column
        const hLeft = leftFn({
            ctx,
            lockY: startY,
            customWidth: leftWidth,
            padding: 0
        }) || 0;

        // Render right column
        const hRight = rightFn({
            ctx,
            lockY: startY,
            customWidth: rightWidth,
            padding: leftWidth + gap
        }) || 0;

        const rowHeight = Math.max(hLeft, hRight);

        if (column === "all") {
            this.addYOffset("left", rowHeight + padding);
            this.addYOffset("right", rowHeight + padding);
        } else {
            this.addYOffset(column, rowHeight + padding);
        }
    }


    contactLabelTextStyle() {
        return new TextStyle({
            color: this.mainColor,
            style: "bold"
        });
    }
    contactValueTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: "normal"
        });
    }

    writePair(ctx, {
        label = new PdfText({
            text: "",
            style: this.contactLabelTextStyle()
        }),
        value = new PdfText({
            text: "",
            style: this.contactValueTextStyle()
        }),
        padding = 4,
        lineHeight = this.lineHeight
    } = {}) {
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

        const wrappedLines = this.doc.splitTextToSize(value.text || "", maxValueWidth);

        wrappedLines.forEach((line, i) => {
            if (y + lineHeight + this.margin > this.pageHeight - this.margin) {
                this.addPageFor(ctx);
                y = ctx.y;
            }

            this.doc.text(line, valueX, y);
            y += lineHeight;
        });

        const usedHeight = Math.max(lineHeight, wrappedLines.length * lineHeight);
        ctx.advance(usedHeight);
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
    ul(ctx, items, {
        indent = 10,
        markerWidth = 0,
        gap = 5,
        lineHeight = this.lineHeight,
        showTimeLine = false,
        timelineColor = this.mainColor
    } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, "normal");
        this.doc.setTextColor(...this.textColor);

        const markerX = ctx.x;
        const bulletX = markerX + (showTimeLine ? markerWidth : 0) + gap;
        const textX = bulletX + indent;
        const textW = ctx.width - (showTimeLine ? markerWidth : 0) - gap - indent;

        items.forEach(item => {
            const lines = this.doc.splitTextToSize(item, textW);
            let y = ctx.y;

            lines.forEach((line, i) => {
                ctx.ensureSpace(lineHeight, () => {
                    this.doc.addPage();
                    this.drawBackground();
                });

                if (showTimeLine) {
                    this.doc.setFillColor(...timelineColor);
                    this.doc.line(markerX, y - gap, markerX, y + lineHeight);
                }

                if (i === 0) {
                    this.doc.text("•", bulletX, y);
                }

                this.doc.text(line, textX, y);
                y += lineHeight;
            });

            ctx.advance(Math.max(lineHeight, lines.length * lineHeight) + 5);
        });
    }

    join(ctx, items) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, 'normal');
        this.doc.setTextColor(...this.textColor);

        const text = `- ${items.join(", ")}.`;
        const lines = this.doc.splitTextToSize(text, ctx.width);

        let y = ctx.y;
        lines.forEach(line => {
            ctx.ensureSpace(this.lineHeight, () => {
                this.doc.addPage();
                this.drawBackground();
            });

            this.doc.text(line, ctx.x, y);
            y += this.lineHeight;
        });

        ctx.advance(lines.length * this.lineHeight);
    }

    async header(ctx, {
        text = "",
        uppercase = false,
        center = false,
        linePadding = 25,
        underline = false,
        upperline = false,
        color = this.mainColor,
        lineColor = this.mainColor,
        icon = null,
        paddingTop = 20,
        paddingBottom = 20,
        dash = false,
        textSize = 14,
    } = {}) {

        ctx.advance(paddingTop);
        if (upperline) {
            this.drawHeaderLine(ctx, {
                color: lineColor,
                dash
            });
            ctx.advance(linePadding);
        }

        ctx.ensureSpace(textSize, () => {
            this.doc.addPage();
            this.drawBackground();
        });
        this.doc.setFont(this.font, "bold");
        this.doc.setFontSize(textSize);
        this.doc.setTextColor(...color);

        const title = uppercase ? text.toUpperCase() : text;
        const iconW = 14;
        const iconH = 14;
        const gap = icon ? 4 : 0;

        const y = ctx.y;
        const x = ctx.x;
        const width = ctx.width;

        if (center) {
            const textWidth = this.doc.getTextWidth(title);
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
                    align: "center"
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
            this.drawHeaderLine(ctx, {
                color: lineColor,
                dash
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

        lines.forEach(line => {
            ctx.ensureSpace(style.size, () => {
                this.doc.addPage();
                this.drawBackground();
            });

            this.doc.text(line, ctx.x, y);
            y += style.size;
        });

        ctx.advance(lines.length * style.size);
    }


    block(ctx, {
        title = new PdfText(),
        description = new PdfText(),
        dates = new PdfText(),
        detailList = [],
        indent = 10,
        showTimeLine = false,
        timelineColor = this.mainColor,
        lineGap = 10
    } = {}) {
        this.blockHeader(ctx, {
            title,
            description,
            dates,
            showTimeLine,
            timelineColor
        });
        ctx.advance(20);
        if (detailList.length) {
            this.ul(ctx, detailList, {
                lineHeight: 15,
                indent,
                showTimeLine,
                timelineColor
            });
        }

        ctx.advance(lineGap);
    }

    avatarBlock(imageBase64, {
        size = 100,
        column = "left",
        center = true,
        borderColor = this.mainColor,
        borderSize = 5,
        padding = 0,
        marginBottom = 20
    } = {}) {
        if (!imageBase64) return 0;

        const colX = this.getXOffset(column);
        const colW = this.colWidth(column);

        const x = center ?
            colX + colW / 2 - size / 2 :
            colX;

        let y = this.getYOffset(column);

        this.avatar(imageBase64, {
            size: size,
            x: x,
            y: y,
            borderColor: borderColor,
            borderSize: borderSize,
            padding: padding
        });

        y += size + marginBottom;
        this.addYOffset(column, y);
    }

    avatar(imageBase64, {
        size = 100,
        x = 0,
        y = 0,
        borderColor = this.mainColor,
        borderSize = 5,
        padding = 0,
    } = {}) {
        if (!imageBase64) return 0;

        this.doc.setDrawColor(...borderColor);
        this.doc.setLineWidth(borderSize);
        this.doc.setLineWidth(1);
        this.doc.circle(
            x + size / 2,
            y + size / 2,
            size / 2 + padding
        );

        this.doc.addImage(
            imageBase64,
            "PNG",
            x,
            y,
            size,
            size
        );

        return size + padding * 2;
    }

    name(ctx, text, {
        textSize = 24,
        lineHeight = 0,
        center = false,
        textColor = this.textColor,
        uppercase = false,
        padding = 0,
    } = {}) {

        const content = uppercase ? text.toUpperCase() : text;

        this.doc.setFont(this.font, "bold");
        this.doc.setFontSize(textSize);
        this.doc.setTextColor(...textColor);

        return this.drawText(ctx, content, {
            center,
            padding,
            lineHeight: textSize + lineHeight
        });
    }


    title(ctx, text, {
        textSize = 12,
        lineHeight = 0,
        center = false,
        textColor = this.textColor,
        uppercase = false,
        padding = 0,
    } = {}) {

        const content = uppercase ? text.toUpperCase() : text;

        this.doc.setFont(this.font, "bold");
        this.doc.setFontSize(textSize);
        this.doc.setTextColor(...textColor);

        return this.drawText(ctx, content, {
            indent: 0,
            center,
            padding,
            lineHeight: textSize + lineHeight
        });
    }

    introduction(ctx, text, {
        style = "normal",
        center = false,
        lineHeight = 15,
        textSize = this.textSize,
        textColor = this.textColor,
        padding = 0,
    } = {}) {

        this.doc.setFont(this.font, style);
        this.doc.setFontSize(textSize);
        this.doc.setTextColor(...textColor);

        return this.drawText(ctx, text, {
            style: {
                style,
                size: textSize,
                color: textColor
            },
            center,
            padding,
            lineHeight
        });
    }


    async showAvatar({} = {}) {
        this.avatarBlock(ctx, this.cvInfo.avatar, {
            column: column,
            borderColor: this.mainColor
        });
    }
    async contactInfoRow(ctx, {
        column = "left"
    } = {}) {
        const lineHeight = 15;
        const items = [{
                label: "Phone:",
                value: this.cvInfo.phone
            },
            {
                label: "Email:",
                value: this.cvInfo.email
            },
            {
                label: "Links:",
                value: this.cvInfo.url
            }
        ];

        for (const item of items) {
            ctx.ensureSpace(lineHeight, () => {
                this.addPageFor(column);
            });

            this.writePair({
                label: new PdfText({
                    text: item.label,
                    style: this.contactLabelTextStyle()
                }),
                value: new PdfText({
                    text: item.value,
                    style: this.contactValueTextStyle()
                }),
                column,
                lineHeight
            });
        }
    }
    async contactInfoColumn(ctx, {
        column = "left"
    } = {}) {
        const textSize = 10;
        const columnCount = 3;
        const columnWidth = (this.pageWidth - this.margin * 2) / columnCount;

        const columns = [{
                title: "Phone:",
                value: this.cvInfo.phone,
                index: 0
            },
            {
                title: "Email:",
                value: this.cvInfo.email,
                index: 1
            },
            {
                title: "Links:",
                value: this.cvInfo.url,
                index: 2
            }
        ];

        this.addYOffset(column, 20);

        // Draw titles
        for (const col of columns) {
            const x = this.margin + columnWidth * col.index;
            ctx.ensureSpace(this.lineHeight, () => {
                this.addPageFor(column);
            });

            this.doc.setFontSize(textSize);
            this.doc.setFont(this.font, "bold");
            this.doc.setTextColor(...this.mainColor);
            this.doc.text(col.title, x, this.getYOffset(column));
        }

        this.addYOffset(column, this.lineHeight);

        // Draw values
        for (const col of columns) {
            const x = this.margin + columnWidth * col.index;
            ctx.ensureSpace(this.lineHeight, () => {
                this.addPageFor(column);
            });

            this.doc.setFontSize(textSize);
            this.doc.setFont(this.font, "normal");
            this.doc.setTextColor(...this.textColor);
            this.doc.text(col.value, x, this.getYOffset(column));
        }

        this.addYOffset(column, this.lineHeight);
    }
    async contactInfoBlock(ctx, {
        column = "left",
        style = "column",
        uppercase = false,
        icon = null,
    } = {}) {
        switch (style) {
            case "row":
                await this.header(ctx, {
                    text: "Contact",
                    uppercase: uppercase,
                    icon: icon
                });
                await this.contactInfoRow(ctx, {
                    column
                });
                break;
            case "column":
            default:
                await this.contactInfoColumn(ctx, {
                    column
                });
                break;
        }

        this.addYOffset(column, 20);
    }

    async showContactInfo(ctx, {
        column = "left"
    } = {}) {
        await this.contactInfoBlock(ctx, {
            column,
            style: "column"
        });
    }
    async introductionBlock(ctx, {
        column = "left",
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
    } = {}) {
        this.addYOffset(column, paddingTop);

        await this.header(ctx, {
            text: "Introduction",
            uppercase: uppercase,
            center: center,
            column: column,
            underline: underline,
            upperline: upperline,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom
        });

        await this.introduction(ctx, this.cvInfo.introduction, {
            style: 'italic',
            column: column
        });
    }

    async showIntroduction({
        column = "left"
    } = {}) {
        await this.introductionBlock({
            column: column,
        });
    }
    async workExpBlock(ctx, {
        column = "left",
        paddingTop = 20,
        paddingBottom = 20,
        uppercase = false,
        center = false,
        underline = false,
        upperline = false,
        headerColor = this.mainColor,
        lineColor = this.mainColor,
        icon = null,
        showTimeLine = false,
        dash = false,
    } = {}) {
        if (!this.cvInfo.workExpArr.length) return;

        await this.header(ctx, {
            text: "Work Experience",
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            column: column,
            underline: underline,
            upperline: upperline,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash
        });

        for (const item of this.cvInfo.workExpArr) {
            const dates = item.current ?
                `${this.formatTime(item.from)} - Present` :
                `${this.formatTime(item.from)} - ${this.formatTime(item.to)}`;

            await this.block(ctx, {
                title: new PdfText({
                    text: item.title,
                    style: this.blockTitleStyle()
                }),
                description: new PdfText({
                    text: item.company,
                    style: this.blockDescriptionStyle()
                }),
                dates: new PdfText({
                    text: dates,
                    style: this.blockDatesStyle()
                }),
                detailList: item.details,
                column: column,
                showTimeLine: showTimeLine,
                padding: showTimeLine ? 10 : 0
            });
        }
    }

    async showWorkExp({
        column = "left"
    } = {}) {
        this.workExpBlock({
            column: column,
            uppercase: false,
        });
    }

    drawHeaderLine(ctx, {
        thickness = 0.5,
        dash = false,
        color = this.textColor,
        spacing = 6,
    } = {}) {

        ctx.ensureSpace(spacing, () => {
            this.doc.addPage();
            this.drawBackground();
        });

        if (dash) {
            this.doc.setLineDash([2]);
        } else {
            this.doc.setLineDash([]); // IMPORTANT: reset
        }

        this.doc.setLineWidth(thickness);
        this.doc.setDrawColor(...color);

        const y = ctx.y;
        const xStart = ctx.x;
        const xEnd = ctx.x + ctx.width;

        this.doc.line(xStart, y, xEnd, y);
        ctx.advance(spacing);
    }

    async educationBlock(ctx, {
        column = "left",
        paddingTop = 20,
        paddingBottom = 20,
        uppercase = false,
        center = false,
        underline = false,
        upperline = false,
        headerColor = this.mainColor,
        lineColor = this.mainColor,
        icon = null,
        showTimeLine = false,
        dash = false,
    } = {}) {
        if (!this.cvInfo.educationArr.length) return;

        await this.header(ctx, {
            text: "Education",
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            column: column,
            underline: underline,
            upperline: upperline,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash
        });

        for (const item of this.cvInfo.educationArr) {
            const dates = `${this.formatTime(item.from)} - ${this.formatTime(item.to)}`;

            await this.block(ctx, {
                title: new PdfText({
                    text: item.degree,
                    style: this.blockTitleStyle()
                }),
                description: new PdfText({
                    text: item.school,
                    style: this.blockDescriptionStyle()
                }),
                dates: new PdfText({
                    text: dates,
                    style: this.blockDatesStyle()
                }),
                detailList: item.details,
                column: column,
                showTimeLine: showTimeLine,
                padding: showTimeLine ? 10 : 0
            });
        }
    }

    async showEducation({
        column = "left"
    } = {}) {
        this.educationBlock({
            column: column,
            uppercase: true,
        });
    }
    async skillsBlock(ctx, {
        column = "left",
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
    } = {}) {
        if (!this.cvInfo.skillArr.length) return;

        await this.header(ctx, {
            text: "Skills",
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            underline: underline,
            upperline: upperline,
            column: column,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash
        });

        this.addYOffset(column, 10);

        this.join(ctx, this.cvInfo.skillArr.map(h => h.name), {
            column: column
        });
    }

    async showSkills({
        column = "left"
    } = {}) {
        this.skillsBlock({
            column: column,
            uppercase: false
        });
    }
    async referencesBlock(ctx, {
        column = "left",
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
    } = {}) {
        if (!this.cvInfo.referenceArr.length) return;

        await this.header(ctx, {
            text: "References",
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            underline: underline,
            upperline: upperline,
            column: column,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash
        });

        this.ul(ctx, this.cvInfo.referenceArr.map(h => h.name), {
            column: column
        });
    }

    async showReference({
        column = "left"
    } = {}) {
        this.referencesBlock({
            column: column,
            uppercase: false,
        });
    }
    async awardsBlock(ctx, {
        column = "left",
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
    } = {}) {
        if (!this.cvInfo.awardArr.length) return;

        await this.header(ctx, {
            text: "Awards",
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            underline: underline,
            upperline: upperline,
            column: column,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash
        });

        this.ul(ctx, this.cvInfo.awardArr.map(h => h.name), {
            column: column
        });
    }


    async showAward({
        column = "left"
    } = {}) {
        this.awardsBlock({
            column: column,
            uppercase: false,
        });
    }
    async hobbyBlock(ctx, {
        column = "left",
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
    } = {}) {
        if (!this.cvInfo.hobbyArr.length) return;

        await this.header(ctx, {
            text: "Hobbies",
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            uppercase: uppercase,
            center: center,
            underline: underline,
            upperline: upperline,
            column: column,
            color: headerColor,
            lineColor: lineColor,
            icon: icon,
            dash: dash
        });

        this.ul(ctx, this.cvInfo.hobbyArr.map(h => h.name), {
            column: column
        });
    }

    async showHobby({
        column = "left"
    } = {}) {
        await this.hobbyBlock({
            column: column,
            uppercase: false
        });
    }

    async showLeftColumn({
        column = "left"
    } = {}) {
        await this.showAvatar({
            column: column
        });
        await this.showName({
            column: column
        });
        await this.showTitle({
            column: column
        });
        await this.showIntroduction({
            column: column
        });
        await this.showContactInfo({
            column: column
        });
        await this.showWorkExp({
            column: column
        });
        await this.showEducation({
            column: column
        });
        await this.showSkills({
            column: column
        });
        await this.showReference({
            column: column
        });
        await this.showAward({
            column: column
        });
        await this.showHobby({
            column: column
        });
    }

    async showRightColumn({
        column = "right"
    } = {}) {

    }
    async showTopContent() {

    }

    drawText(ctx, text, {
        indent = 0,
        center = false,
        lineHeight = this.lineHeight,
        padding = 0,
    } = {}) {
        const availableWidth = ctx.width - indent - padding;
        const lines = this.doc.splitTextToSize(text, availableWidth);

        let usedHeight = 0;
        for (let i = 0; i < lines.length; i++) {

            ctx.ensureSpace(lineHeight, () => {
                this.doc.addPage();
                this.drawBackground();
            });

            const x = center ?
                ctx.x + ctx.width / 2 :
                ctx.x + indent + padding;

            this.doc.text(
                lines[i],
                x,
                ctx.y,
                center ? {
                    align: 'center'
                } : undefined
            );

            ctx.advance(lineHeight);
            usedHeight += lineHeight;
        }

        return usedHeight;
    }


    async generate() {
        await this.loadFonts();
        await this.loadImages();
        await this.drawBackground();
        await this.showTopContent();
        // await this.showLeftColumn();
        // await this.showRightColumn();
        return this.doc;
    }
}