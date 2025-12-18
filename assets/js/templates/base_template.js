class PDFGenerator {
    constructor(cvInfo, options = {}) {
        this.cvInfo = cvInfo;
        this.doc = new jsPDF({
            unit: "pt",
            format: "a4",
        });

        this.svgElement = document.getElementById("iconSVG");
        this.leftBackgroundColor = options.leftBackgroundColor || [
            255, 255, 255,
        ];
        this.rightBackgroundColor = options.rightBackgroundColor || [
            255, 255, 255,
        ];

        this.leftRatio = options.leftRatio || 1;
        this.rightRatio = options.rightRatio || 0;

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
        this.headerTextSize = options.headerTextSize || 14;
        this.headerTextStyle = options.headerTextStyle || "bold";
        this.separator = options.separator || false;
        this.normalFont = options.normalFont || "Adamina-Regular.ttf";
        this.boldFont = options.boldFont || "OpenSans-Bold.ttf";
        this.italicFont = options.italicFont || "OpenSans-Italic.ttf";
        this.timeFormat = options.timeFormat || TimeFormat.MONTH_YEAR;
        this.headerBackgroundColor = options.headerBackgroundColor || null;
        this.iconSize = 14;
        this.markerWidth = 10;
    }

    parseYearMonth(value) {
        if (!value || typeof value !== "string") return null;

        const parts = value.split("-");
        if (parts.length < 2) return null;

        const y = Number(parts[0]);
        const m = Number(parts[1]);

        if (Number.isNaN(y) || m < 1 || m > 12) return null;

        return { y, m };
    }

    formatMonthYear(value, locale) {
        const parsed = this.parseYearMonth(value);
        if (!parsed) return "";

        const { y, m } = parsed;
        const d = new Date(y, m - 1);

        return d.toLocaleString(locale, {
            month: "short",
            year: "numeric",
        });
    }

    formatYear(value) {
        const parsed = this.parseYearMonth(value);
        return parsed ? String(parsed.y) : "";
    }

    formatTime(value, locale) {
        switch (this.timeFormat) {
            case TimeFormat.YEAR:
                return this.formatYear(value);
            case TimeFormat.MONTH_YEAR:
            default:
                return this.formatMonthYear(value, locale);
        }
    }

    async loadFonts() {
        await this.loadFont(
            `assets/fonts/${this.normalFont}`,
            "custom",
            "normal"
        );
        await this.loadFont(`assets/fonts/${this.boldFont}`, "custom", "bold");
        await this.loadFont(
            `assets/fonts/${this.normalFont}`,
            "custom",
            "italic"
        );
        this.font = "custom";
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

    nameTextStyle() {
        return new TextStyle({
            color: this.textColor,
            size: 24,
            style: "bold",
        });
    }

    titleTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: "bold",
        });
    }

    blockTitleStyle() {
        return new TextStyle({
            style: "bold",
            color: this.textColor,
        });
    }

    blockDescriptionStyle() {
        return new TextStyle({
            style: "italic",
            color: this.mainColor,
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: "bold",
            color: this.textColor,
        });
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
                this.doc.setFillColor(...timeLineColor);
                this.doc.setDrawColor(...timeLineColor);
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

        this.doc.setFillColor(...timeLineColor);
        this.doc.setDrawColor(...timeLineColor);

        ctx.advance(
            this.writeTextWithMarker(ctx, `${title.text} | ${dates.text}`, {
                style: title.style,
                marker: showTimeLine ? marker : null,
            })
        );
        ctx.advance(5);
        ctx.advance(
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(10);
    }

    async loadImages() {
        this.educationImage = await svgToPngData(
            await educationSvgString(this.mainColor)
        );
        this.workExpImage = await svgToPngData(
            await workExpSvgString(this.mainColor)
        );
        this.contactImage = await svgToPngData(
            await contactSvgString(this.mainColor)
        );
        this.skillImage = await svgToPngData(
            await skillSvgString(this.mainColor)
        );
        this.referenceImage = await svgToPngData(
            await referenceSvgString(this.mainColor)
        );
        this.awardImage = await svgToPngData(
            await awardSvgString(this.mainColor)
        );
        this.introductionImage = await svgToPngData(
            await introductionSvgString(this.mainColor)
        );
        this.hobbyImage = await svgToPngData(
            await hobbySvgString(this.mainColor)
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

    contactLabelTextStyle() {
        return new TextStyle({
            color: this.mainColor,
            style: "bold",
        });
    }
    contactValueTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: "normal",
        });
    }

    writePair(
        ctx,
        {
            label = new PdfText({
                text: "",
                style: this.contactLabelTextStyle(),
            }),
            value = new PdfText({
                text: "",
                style: this.contactValueTextStyle(),
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
        this.doc.setFont(this.font, "normal");
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
        { textColor = this.textColor, indent = 10, padding = 5 } = {}
    ) {
        this.ul(ctx, [items.map((h) => h.name).join(", ")], {
            textColor: textColor,
            indent: indent,
            padding: padding,
        });
    }

    skillbar(ctx, items, { textColor = this.textColor } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, "normal");
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

    join(ctx, items, { textColor = this.textColor } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, "normal");
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
        } = {}
    ) {
        ctx.goToCurrentPage();
        ctx.advance(paddingTop);
        if (upperline) {
            this.drawLineBlock(ctx, {
                color: lineColor,
                dash,
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
        const textWidth = Math.max(
            ...lines.map((line) => this.doc.getTextWidth(line))
        );
        const rectWidth = icon ? textWidth + iconW + gap : textWidth;
        const rectX = center ? x + (width - rectWidth) / 2 : x;
        const rectY = y - paddingTop;
        if (backgroundColor) {
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
                dash,
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
            title,
            description,
            dates,
            showTimeLine,
            timeLineColor,
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

    avatar(
        ctx,
        imageBase64,
        {
            size = 120,
            borderColor = this.mainColor,
            borderSize = 5,
            padding = 0,
            center = false,
        } = {}
    ) {
        if (!imageBase64) return 0;

        const totalSize = size + padding * 2;
        const x = center ? ctx.x + (ctx.width - size) / 2 : ctx.x;

        const y = ctx.y;

        // border
        if (borderSize > 0) {
            this.doc.setDrawColor(...borderColor);
            this.doc.setLineWidth(borderSize);
            this.doc.circle(x + size / 2, y + size / 2, size / 2 + padding);
        }

        // image
        this.doc.addImage(imageBase64, "PNG", x, y, size, size);

        ctx.advance(totalSize);
        return totalSize;
    }

    name(
        ctx,
        text,
        {
            style = this.nameTextStyle(),
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
            style = this.titleTextStyle(),
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
            style = "normal",
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

    contactInfoRow(ctx) {
        const lineHeight = 15;
        const items = [
            {
                label: "Phone:",
                value: this.cvInfo.phone,
            },
            {
                label: "Email:",
                value: this.cvInfo.email,
            },
            {
                label: "Links:",
                value: this.cvInfo.url,
            },
        ];

        for (const item of items) {
            ctx.ensureSpace(lineHeight, (column) => {
                this.addPageFor(ctx, column);
            });

            this.writePair(ctx, {
                label: new PdfText({
                    text: item.label,
                    style: this.contactLabelTextStyle(),
                }),
                value: new PdfText({
                    text: item.value,
                    style: this.contactValueTextStyle(),
                }),
                lineHeight,
            });
        }
    }

    contactInfoColumn(ctx) {
        const textSize = 10;
        const columnCount = 3;
        const columnWidth = (this.pageWidth - this.margin * 2) / columnCount;

        const columns = [
            {
                title: "Phone:",
                value: this.cvInfo.phone,
                index: 0,
            },
            {
                title: "Email:",
                value: this.cvInfo.email,
                index: 1,
            },
            {
                title: "Links:",
                value: this.cvInfo.url,
                index: 2,
            },
        ];

        for (const col of columns) {
            const x = this.margin + columnWidth * col.index;
            ctx.ensureSpace(this.lineHeight, (column) => {
                this.addPageFor(ctx, column);
            });

            this.doc.setFontSize(textSize);
            this.doc.setFont(this.font, "bold");
            this.doc.setTextColor(...this.mainColor);
            this.doc.text(col.title, x, ctx.y);
        }
        ctx.advance(this.lineHeight);

        for (const col of columns) {
            const x = this.margin + columnWidth * col.index;
            ctx.ensureSpace(this.lineHeight, (column) => {
                this.addPageFor(ctx, column);
            });

            this.doc.setFontSize(textSize);
            this.doc.setFont(this.font, "normal");
            this.doc.setTextColor(...this.textColor);
            this.doc.text(col.value, x, ctx.y);
        }
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
            style = "row",
        } = {}
    ) {
        ctx.advance(10);
        switch (style) {
            case "row":
                this.header(ctx, {
                    text: "Contact",
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
                    linePadding: linePadding,
                });
                this.contactInfoRow(ctx);
                break;
            case "column":
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
            icon = null,
            dash = false,
            textSize = this.headerTextSize,
            textColor = this.textColor,
            fontStyle = "italic",
            header = true,
            backgroundColor = this.headerBackgroundColor,
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
            });
        }

        this.introduction(ctx, this.cvInfo.introduction, {
            style: fontStyle,
            textColor: textColor,
        });
    }

    workExpListBlock(
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
            showTimeLine = false,
            dash = false,
            textSize = this.headerTextSize,
            textColor = this.textColor,
            bulletColor = this.textColor,
            timeLineColor = this.mainColor,
            linePadding = 10,
            backgroundColor = this.headerBackgroundColor,
            indent = 10,
            padding = 5,
        } = {}
    ) {
        if (!this.cvInfo.workExpArr.length) return;

        this.header(ctx, {
            text: "Work Experience",
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
            backgroundColor: backgroundColor,
            bgColor: [200, 200, 200],
        });

        for (const item of this.cvInfo.workExpArr) {
            const dates = item.current
                ? `${this.formatTime(item.from)} - Present`
                : `${this.formatTime(item.from)} - ${this.formatTime(item.to)}`;

            this.block(ctx, {
                title: new PdfText({
                    text: item.title,
                    style: this.blockTitleStyle(),
                }),
                description: new PdfText({
                    text: item.company,
                    style: this.blockDescriptionStyle(),
                }),
                dates: new PdfText({
                    text: dates,
                    style: this.blockDatesStyle(),
                }),
                indent: indent,
                timeLineColor: timeLineColor,
                bulletColor: bulletColor,
                detailList: item.details,
                showTimeLine: showTimeLine,
                padding: showTimeLine ? 10 : 0,
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
        } = {}
    ) {
        ctx.ensureSpace(spacing, (column) => {
            this.addPageFor(ctx, column);
        });
        const y = ctx.y;
        const xStart = ctx.x;
        const xEnd = ctx.x + ctx.width;
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
            showTimeLine = false,
            dash = false,
            textSize = this.headerTextSize,
            textColor = this.textColor,
            bulletColor = this.textColor,
            linePadding = 10,
            backgroundColor = this.headerBackgroundColor,
            indent = 10,
            padding = 5,
        } = {}
    ) {
        if (!this.cvInfo.educationArr.length) return;

        this.header(ctx, {
            text: "Education",
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
            backgroundColor: backgroundColor,
        });

        for (const item of this.cvInfo.educationArr) {
            const dates = `${this.formatTime(item.from)} - ${this.formatTime(
                item.to
            )}`;

            this.block(ctx, {
                title: new PdfText({
                    text: item.degree,
                    style: this.blockTitleStyle(),
                }),
                description: new PdfText({
                    text: item.school,
                    style: this.blockDescriptionStyle(),
                }),
                dates: new PdfText({
                    text: dates,
                    style: this.blockDatesStyle(),
                }),
                bulletColor: bulletColor,
                detailList: item.details,
                indent: indent,
                showTimeLine: showTimeLine,
                padding: showTimeLine ? 10 : 0,
            });
        }
    }

    skillListBlock(
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
            backgroundColor = this.headerBackgroundColor,
            type = "text",
            indent = 10,
            padding = 5,
        } = {}
    ) {
        if (!this.cvInfo.skillArr.length) return;
        this.header(ctx, {
            text: "Skills",
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
            backgroundColor: backgroundColor,
        });

        ctx.advance(10);
        if (type === "text") {
            this.skillList(ctx, this.cvInfo.skillArr, {
                textColor: textColor,
                indent: indent,
                padding: padding,
            });
        } else {
            this.skillbar(ctx, this.cvInfo.skillArr, {
                textColor: textColor,
            });
        }
    }

    referenceListBlock(
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
            backgroundColor = this.headerBackgroundColor,
            indent = 10,
            padding = 5,
        } = {}
    ) {
        if (!this.cvInfo.referenceArr.length) return;

        this.header(ctx, {
            text: "References",
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
            textColor: textColor,
            linePadding: linePadding,
            backgroundColor: backgroundColor,
        });

        this.ul(
            ctx,
            this.cvInfo.referenceArr.map((h) => h.name),
            {
                textColor: textColor,
                indent: indent,
                padding: padding,
            }
        );
    }

    awardListBlock(
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
            backgroundColor = this.headerBackgroundColor,
            indent = 10,
            padding = 5,
        } = {}
    ) {
        if (!this.cvInfo.awardArr.length) return;
        this.header(ctx, {
            text: "Awards",
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
            backgroundColor: backgroundColor,
        });

        this.ul(
            ctx,
            this.cvInfo.awardArr.map((h) => h.name),
            {
                textColor: textColor,
                indent: indent,
                padding: padding,
            }
        );
    }

    hobbyListBlock(
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
            backgroundColor = this.headerBackgroundColor,
            indent = 10,
            padding = 5,
        } = {}
    ) {
        if (!this.cvInfo.hobbyArr.length) return;

        this.header(ctx, {
            text: "Hobbies",
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
            backgroundColor: backgroundColor,
        });

        this.ul(
            ctx,
            this.cvInfo.hobbyArr.map((h) => h.name),
            {
                textColor: textColor,
                indent: indent,
                padding: padding,
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
    constructor({ size = 12, color = [0, 0, 0], style = "normal" } = {}) {
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
const TimeFormat = Object.freeze({
    YEAR: "year",
    MONTH_YEAR: "monthYear",
});

const TIMELINE_MARKERS = {
    circle: (x, y, w, ctx) => {
        ctx.doc.circle(x, y - w / 2, w / 2, "F");
    },

    line: (x, y, w, ctx) => {
        ctx.drawLine(x, y - w * 2, x, y + w);
    },
    square: (x, y, w, ctx) => {
        ctx.doc.rect(x - 3, y - 3, 6, 6, "F");
    },
};
const DATE_FORMATS = {
    circle: (x, y, w, ctx) => {
        ctx.doc.circle(x, y - w / 2, w / 2, "F");
    },

    line: (x, y, w, ctx) => {
        ctx.drawLine(x, y - w * 2, x, y + w);
    },
    square: (x, y, w, ctx) => {
        ctx.doc.rect(x - 3, y - 3, 6, 6, "F");
    },
};
