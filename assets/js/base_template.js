class PDFGenerator {
    constructor(cvInfo, options = {}) {
        this.cvInfo = cvInfo;
        this.doc = new jsPDF({
            unit: 'pt',
            format: 'a4'
        });

        // Layout
        this.margin = options.margin || 40;
        this.lineHeight = options.lineHeight || 15;
        this.pageWidth = this.doc.internal.pageSize.getWidth();
        this.pageHeight = this.doc.internal.pageSize.getHeight();
        this.y = this.margin;

        // Style
        this.font = options.font || 'lato';
        this.textColor = options.textColor || [0, 0, 0];
        this.mainColor = options.mainColor || [0, 95, 90];
        this.textSize = options.textSize || 12;
    }

    // Core text writer
    writeText(text, { indent = 0, center = false, lineHeight = this.lineHeight } = {}) {
        const lines = this.doc.splitTextToSize(text, this.pageWidth - 2 * this.margin - indent);
        lines.forEach(line => {
            if (this.y + lineHeight > this.pageHeight - this.margin) {
                this.doc.addPage();
                this.y = this.margin;
            }
            if (center) {
                this.doc.text(line, this.pageWidth / 2, this.y, { align: 'center' });
            } else {
                this.doc.text(line, this.margin + indent, this.y);
            }
            this.y += lineHeight;
        });
        this.y += 5;
    }

    ul(items, { x = this.margin, indent = 10 } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, 'normal');
        this.doc.setTextColor(...this.textColor);
        items.forEach(item => {
            if (this.y + this.lineHeight > this.pageHeight - this.margin) {
                this.doc.addPage();
                this.y = this.margin;
            }
            this.doc.text('•', x, this.y);
            this.writeText(item, { indent: x + indent - this.margin, lineHeight: this.lineHeight });
        });
    }

    join(items, { x = this.margin } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, 'normal');
        this.doc.setTextColor(...this.textColor);
        this.writeText(`- ${items.join(", ")}.`, { indent: x  - this.margin, lineHeight: this.lineHeight });
    }

    section({ text = '', uppercase = false, center = false }) {
        this.y += 15;
        this.doc.setFontSize(14);
        this.doc.setFont(this.font, 'bold');
        this.doc.setTextColor(...this.mainColor);
        this.doc.text(
            uppercase ? text.toUpperCase() : text,
            center ? this.pageWidth / 2 : this.margin,
            this.y,
            center ? { align: 'center' } : null
        );
        this.y += 25;
    }

    normalText(text, { size = this.textSize, style = 'normal', color = this.textColor } = {}) {
        this.doc.setFontSize(size);
        this.doc.setFont(this.font, style);
        this.doc.setTextColor(...color);
        this.writeText(text);
    }

    block({ title = { text= '', size= 12, color= this.textColor, style= 'normal' } = {},
            description = { text= '', size= 12, color= this.textColor, style= 'normal' } = {},
            detailList = [] } = {}) {
        this.y += 10;
        this.normalText(title.text, { size: title.size, style: title.style, color: title.color });
        this.normalText(description.text, { size: description.size, style: description.style, color: description.color });
        if (detailList.length) this.ul(detailList);
    }

    // Example specialized sections
    name(text) {
        this.doc.setFontSize(24);
        this.doc.setFont(this.font, 'bold');
        this.doc.text(text, this.pageWidth / 2, this.y, { align: 'center' });
        this.y += 20;
    }

    title(text) {
        this.doc.setFontSize(14);
        this.doc.setFont(this.font, 'bold');
        this.doc.text(text, this.pageWidth / 2, this.y, { align: 'center' });
        this.y += 20;
    }

    introduction(text, { style = 'normal' } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setTextColor(...this.textColor);
        this.doc.setFont(this.font, style);
        this.writeText(text, { center: true });
    }

    generate() {
        // Header
        this.name(this.cvInfo.name);
        this.title(this.cvInfo.title);

        // Horizontal line
        this.doc.setLineWidth(2);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin, this.y, this.pageWidth - this.margin, this.y);
        this.y += 20;

        // Sections
        this.section({ text: "Introduction", uppercase: true, center: true });
        this.introduction(this.cvInfo.introduction, { style: 'italic' });

        this.y += 20;
        // Column headers
        const columns = [
        { title: "Phone:", value: this.cvInfo.phone, x: 50 },
        { title: "Email:", value: this.cvInfo.email, x: 200 },
        { title: "Links:", value: this.cvInfo.url, x: 400 }
        ];

        columns.forEach(col => {
            this.doc.setFontSize(this.textSize);
            this.doc.setTextColor(...this.mainColor);
            this.doc.setFont(this.font, 'bold');
            this.doc.text(col.title, col.x, this.y);
        });

        this.y += this.lineHeight;
        columns.forEach(col => {
            this.doc.setFontSize(this.textSize);
            this.doc.setTextColor(...this.textColor);
            this.doc.setFont(this.font, 'normal');
            this.doc.text(col.value, col.x, this.y);
        });
        this.y += 40;

        if (this.cvInfo.workExpArr.length){
            this.section({ text: "Work Experience", uppercase: true });
            this.cvInfo.workExpArr.forEach(item => {
                const dates = item.current ? `${formatMonth(item.from)} - Present` : `${formatMonth(item.from)} - ${formatMonth(item.to)}`;
                this.block({
                    title: { text: `${item.title} | ${dates}`, style: 'bold', color: this.textColor },
                    description: { text: item.company, style: 'italic', color: this.mainColor },
                    detailList: item.details
                });
            });
        }

        if (this.cvInfo.educationArr.length){
            this.section({ text: "Education", uppercase: true });
            this.cvInfo.educationArr.forEach(item => {
                const dates = `${formatMonth(item.from)} - ${formatMonth(item.to)}`;
                this.block({
                    title: { text: `${item.degree} | ${dates}`, style: 'bold', color: this.textColor },
                    description: { text: item.school, style: 'italic', color: this.mainColor },
                    detailList: item.details
                });
            });
        }

        if (this.cvInfo.skillArr.length){
            this.section({ text: "Skills", uppercase: true });
            this.join(this.cvInfo.skillArr.map(h => h.name));
        }

        if (this.cvInfo.referenceArr.length){
            this.section({ text: "References", uppercase: true });
            this.ul(this.cvInfo.referenceArr.map(h => h.name));
        }

        if (this.cvInfo.awardArr.length){
            section({ text: "Awards", uppercase: true });
            this.ul(this.cvInfo.awardArr.map(h => h.name));
        }

        if (this.cvInfo.hobbyArr.length){
            this.section({ text: "Hobbies", uppercase: true });
            this.ul(this.cvInfo.hobbyArr.map(h => h.name));
        }


        return this.doc;
    }
}