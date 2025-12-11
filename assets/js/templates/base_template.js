class PDFGenerator {
    constructor(cvInfo, options = {}) {
        this.cvInfo = cvInfo;
        this.doc = new jsPDF({
            unit: 'pt',
            format: 'a4'
        });
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
        this.font = options.font || 'lato';
        this.textColor = options.textColor || [0, 0, 0];
        this.mainColor = options.mainColor || [0, 95, 90];
        this.textSize = options.textSize || 12;
    }
    async loadFonts() {

    }
    async loadFont(url, name, style) {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();

        // convert ArrayBuffer to Base64
        let binary = '';
        const bytes = new Uint8Array(arrayBuffer);
        const chunkSize = 0x8000; // handle large fonts in chunks
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

        this.addYOffset(column, + lineHeight);
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

    section({
        text = '',
        uppercase = false,
        center = false,
        column = "left"
    }) {
        this.addYOffset(column, 10);
        this.doc.setFontSize(14);
        this.doc.setFont(this.font, 'bold');
        this.doc.setTextColor(...this.mainColor);
        let sectionText = uppercase ? text.toUpperCase() : text;
        this.writeText(sectionText, {
            indent: 0,
            center: center,
            lineHeight: this.lineHeight,
            column: column
        });
        this.addYOffset(column, 5);
    }

    normalText(text, {
        size = this.textSize,
        style = 'normal',
        color = this.textColor,
        column = "left"
    } = {}) {
        this.doc.setFontSize(size);
        this.doc.setFont(this.font, style);
        this.doc.setTextColor(...color);
        this.writeText(text, {
            column: column
        });
    }

    block({
        title = {
            text = '',
            size = 12,
            color = this.textColor,
            style = 'normal'
        } = {},
        description = {
            text = '',
            size = 12,
            color = this.textColor,
            style = 'normal'
        } = {},
        detailList = [],
        column = "left"
    } = {}) {
        this.addYOffset(column, 10);
        this.normalText(title.text, {
            size: title.size,
            style: title.style,
            color: title.color,
            column: column
        });
        this.normalText(description.text, {
            size: description.size,
            style: description.style,
            color: description.color,
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
        lineHeight = 10,
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
            lineHeight: lineHeight,
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
        lineHeight = 10,
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
            lineHeight: lineHeight,
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

    showName() {
        this.name(this.cvInfo.name,{textColor:this.textColor});
    }

    showTitle() {
        this.title(this.cvInfo.title,{textColor:this.textColor});
    }

    showContactInfo() {
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
            this.doc.setFontSize(this.textSize);
            this.doc.setTextColor(...this.mainColor);
            this.doc.setFont(this.font, 'bold');
            this.doc.text(col.title, col.x, this.leftY);
        });

        this.addYOffset(column, this.lineHeight)
        columns.forEach(col => {
            this.doc.setFontSize(this.textSize);
            this.doc.setTextColor(...this.textColor);
            this.doc.setFont(this.font, 'normal');
            this.doc.text(col.value, col.x, this.leftY);
        });
        this.addYOffset(column, 30)
    }

    showIntroduction() {
        this.section({
            text: "Introduction",
            uppercase: true,
            center: true
        });
        this.introduction(this.cvInfo.introduction, {
            style: 'italic'
        });
    }

    workExpBlock({
        column = "left",
        uppercase = false
    }) {
        if (this.cvInfo.workExpArr.length) {
            this.section({
                text: "Work Experience",
                uppercase: uppercase,
                column: column
            });
            this.cvInfo.workExpArr.forEach(item => {
                const dates = item.current ? `${formatMonth(item.from)} - Present` : `${formatMonth(item.from)} - ${formatMonth(item.to)}`;
                this.block({
                    title: {
                        text: `${item.title} | ${dates}`,
                        style: 'bold',
                        color: this.textColor
                    },
                    description: {
                        text: item.company,
                        style: 'italic',
                        color: this.mainColor
                    },
                    detailList: item.details,
                    column: column
                });
            });
        }
    }

    showWorkExp() {
        this.workExpBlock({
            column: "left",
            uppercase: false
        });
    }

    educationBlock({
        column = "left",
        uppercase = false
    } = {}) {
        if (this.cvInfo.educationArr.length) {
            this.section({
                text: "Education",
                uppercase: uppercase,
                column: column
            });
            this.cvInfo.educationArr.forEach(item => {
                const dates = `${formatMonth(item.from)} - ${formatMonth(item.to)}`;
                this.block({
                    title: {
                        text: `${item.degree} | ${dates}`,
                        style: 'bold',
                        color: this.textColor
                    },
                    description: {
                        text: item.school,
                        style: 'italic',
                        color: this.mainColor
                    },
                    detailList: item.details,
                    column: column
                });
            });
        }
    }

    showEducation() {
        this.educationBlock({
            column: "left",
            uppercase: true
        });
    }

    skillsBlock({
        column = "left",
        uppercase = false
    } = {}) {
        if (this.cvInfo.skillArr.length) {
            this.section({
                text: "Skills",
                uppercase: uppercase,
                column: column
            });
            this.join(this.cvInfo.skillArr.map(h => h.name), {
                column: column
            });
        }
    }

    showSkills() {
        this.skillsBlock({
            column: "left",
            uppercase: false
        });
    }

    referencesBlock({
        column = "left",
        uppercase = false
    } = {}) {
        if (this.cvInfo.referenceArr.length) {
            this.section({
                text: "References",
                uppercase: uppercase,
                column: column
            });
            this.ul(this.cvInfo.referenceArr.map(h => h.name), {
                column: column
            });
        }
    }

    showReference() {
        this.referencesBlock({
            column: "left",
            uppercase: false
        });
    }

    awardsBlock({
        column = "left",
        uppercase = false
    } = {}) {
        if (this.cvInfo.awardArr.length) {
            this.section({
                text: "Awards",
                uppercase: uppercase,
                column: column
            });
            this.ul(this.cvInfo.awardArr.map(h => h.name), {
                column: column
            });
        }
    }

    showAward() {
        this.awardsBlock({
            column: "left",
            uppercase: false
        });
    }

    hobbyBlock({
        column = "left",
        uppercase = false
    } = {}) {
        if (this.cvInfo.hobbyArr.length) {
            this.section({
                text: "Hobbies",
                uppercase: uppercase,
                column: column
            });
            this.ul(this.cvInfo.hobbyArr.map(h => h.name), {
                column: column
            });
        }
    }
    showHobby() {
        this.hobbyBlock({
            column: "left",
            uppercase: false
        });
    }
    showLeftColumn(){
        this.showName();
        this.showTitle();
        this.showIntroduction();
        this.showContactInfo();
        this.showWorkExp();
        this.showEducation();
        this.showSkills();
        this.showReference();
        this.showAward();
        this.showHobby();
    }

    showRightColumn(){

    }

    async generate() {
        await this.loadFonts();
        this.drawBackground();
        this.showLeftColumn();
        this.showRightColumn();
        return this.doc;
    }
}