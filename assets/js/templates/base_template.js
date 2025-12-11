class PDFGenerator {
    constructor(cvInfo, options = {}) {
        this.cvInfo = cvInfo;
        this.doc = new jsPDF({
            unit: 'pt',
            format: 'a4'
        });
        this.leftBackgroundColor=options.leftBackgroundColor ||[255, 255, 255];
        this.rightBackgroundColor=options.rightBackgroundColor ||[255, 255, 255];

        this.leftRatio=options.leftRatio ||1;
        this.rightRatio=options.rightRatio ||0

        // Layout
        this.margin = options.margin || 40;
        this.lineHeight = options.lineHeight || 12;

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
    /**
     * Get the width of a column.
     * @param {"left"|"right"} [column="left"] - Which column to get width for.
     * @returns {number} The width of the specified column.
     */
    colWidth(column = "left"){
        return column === "left" ? this.leftWidth: this.rightWidth;
    }
    /**
     * Get the current Y offset of a column.
     * @param {"left"|"right"} [column="left"] - Column to get Y offset for.
     * @returns {number} The current Y position of the column.
     */
    getYOffset(column = "left"){
        return column === "left" ? this.leftY: this.rightY;
    }
    /**
     * Set the Y offset of a column.
     * @param {"left"|"right"} [column="left"] - Column to set Y offset for.
     * @param {number} value - The Y position to set.
     */
    setYOffset(column = "left",value){
        if(column === "left" ){
            this.leftY=value
        }else{ 
            this.rightY=value;
        }
    }
    /**
     * Add a value to the current Y offset of a column.
     * @param {"left"|"right"} [column="left"] - Column to add Y offset to.
     * @param {number} value - The value to add.
     */
    addYOffset(column = "left",value){
        if(column === "left" ){
            this.leftY+=value
        }else{ 
            this.rightY+=value;
        }
    }

    drawBackground() {
        this.doc.setFillColor(...this.leftBackgroundColor);
        this.doc.rect(0, 0, this.leftWidth, this.pageHeight, "F");

        this.doc.setFillColor(...this.rightBackgroundColor);
        this.doc.rect(this.leftWidth, 0, this.rightWidth, this.pageHeight, "F");
    }

    writeText(text, { indent = 0, center = false, lineHeight = this.lineHeight, column = "left" } = {}) {
        const colX = column === "left" ? 0 + this.margin : this.leftWidth + this.margin;
        const colW = column === "left" ? this.leftWidth - this.margin * 2 : this.rightWidth - this.margin * 2;
        let y = this.getYOffset(column);

        const lines = this.doc.splitTextToSize(text, colW - indent);

        lines.forEach(line => {
            if (y + lineHeight > this.pageHeight - this.margin) {
                this.doc.addPage();
                this.drawBackground(); // redraw column backgrounds
                y = this.margin;
            }

            if (center) {
                this.doc.text(line, colX + colW / 2, y, { align: 'center' });
            } else {
                this.doc.text(line, colX + indent, y);
            }

            y += lineHeight;
        });

        y += 5; // spacing after paragraph

        this.setYOffset(column,y);
    }

    /**
     * Render an unordered list in the specified column.
     * @param {string[]} items - Array of text items to display.
     * @param {Object} [options] - Options for the list.
     * @param {number} [options.indent=10] - Indentation from the column start.
     * @param {"left"|"right"} [options.column="left"] - Which column to render in.
     */
    ul(items, { indent = 10, column = "left" } = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, 'normal');
        this.doc.setTextColor(...this.textColor);

        const colX = column === "left" ? this.margin : this.leftWidth + this.margin;
        let y = this.getYOffset(column);

        items.forEach(item => {
            if (y + this.lineHeight > this.pageHeight - this.margin) {
                this.doc.addPage();
                this.drawBackground();
                y = this.margin;
            }
            this.doc.text('•', colX, y);
            this.writeText(item, { indent: indent, lineHeight: this.lineHeight, column: column });
            y = this.getYOffset(column);
        });

        this.addYOffset(column, 5);
    }

    join(items, { x = this.margin ,column = "left"} = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setFont(this.font, 'normal');
        this.doc.setTextColor(...this.textColor);
        this.writeText(`- ${items.join(", ")}.`, { indent: x  - this.margin, lineHeight: this.lineHeight,column:column });
    }

    section({ text = '', uppercase = false, center = false, column = "left" }) {
        const yOffset = 15;
        this.addYOffset(column,yOffset);
        this.doc.setFontSize(14);
        this.doc.setFont(this.font, 'bold');
        this.doc.setTextColor(...this.mainColor);
        let sectionText = uppercase ? text.toUpperCase() : text;
        this.writeText(sectionText, { indent: 0, center: center, lineHeight: 25, column: column });
    }

    normalText(text, { size = this.textSize, style = 'normal', color = this.textColor,column = "left" } = {}) {
        this.doc.setFontSize(size);
        this.doc.setFont(this.font, style);
        this.doc.setTextColor(...color);
        this.writeText(text,{column:column});
    }

    block({ title = { text= '', size= 12, color= this.textColor, style= 'normal' } = {},
            description = { text= '', size= 12, color= this.textColor, style= 'normal' } = {},
            detailList = [] ,column = "left"} = {}) {
        this.leftY += 10;
        this.normalText(title.text, { size: title.size, style: title.style, color: title.color,column:column });
        this.normalText(description.text, { size: description.size, style: description.style, color: description.color ,column:column});
        if (detailList.length) this.ul(detailList,{column:column});
    }

    /**
     * Render the name in the specified column, centered within that column.
     * @param {string} text - The name text.
     * @param {Object} [options]
     * @param {"left"|"right"} [options.column="left"] - Column to render in.
     */
    name(text, { column = "left" ,center=false} = {}) {
        this.doc.setFontSize(24);
        this.doc.setFont(this.font, 'bold');

        const y = this.getYOffset(column);
        if (center) {
            const colX = column === "left"
            ? this.leftWidth / 2
            : this.leftWidth + this.rightWidth / 2;
            this.doc.text(text, colX, y, { align: 'center' });
        } else {
            const colX = column === "left"
            ? this.margin
            : this.leftWidth + this.margin;
            this.doc.text(text, colX, y);
        }

        this.addYOffset(column, 30); // adjust spacing as needed
    }

    /**
     * Render the title in the specified column, centered within that column.
     * @param {string} text - The title text.
     * @param {Object} [options]
     * @param {"left"|"right"} [options.column="left"] - Column to render in.
     */
    title(text, { column = "left" ,center=false} = {}) {
        this.doc.setFontSize(14);
        this.doc.setFont(this.font, 'bold');

        const y = this.getYOffset(column);
        if (center) {
            const colX = column === "left"
            ? this.leftWidth / 2
            : this.leftWidth + this.rightWidth / 2;
            this.doc.text(text, colX, y, { align: 'center' });
        } else {
            const colX = column === "left"
            ? this.margin
            : this.leftWidth + this.margin;
            this.doc.text(text, colX, y);
        }

        this.addYOffset(column, 20); // adjust spacing as needed
    }


    introduction(text, { style = 'normal',center= false ,column="left"} = {}) {
        this.doc.setFontSize(this.textSize);
        this.doc.setTextColor(...this.textColor);
        this.doc.setFont(this.font, style);
        this.writeText(text, { center: center ,column:column});
    }

    showName(){
        this.name(this.cvInfo.name);
    }

    showTitle(){
        this.title(this.cvInfo.title);
    }

    showContactInfo(){
        let column="left";
        this.addYOffset(column,20);
        const columns = [
        { title: "Phone:", value: this.cvInfo.phone, x: 50 },
        { title: "Email:", value: this.cvInfo.email, x: 200 },
        { title: "Links:", value: this.cvInfo.url, x: 400 }
        ];

        columns.forEach(col => {
            this.doc.setFontSize(this.textSize);
            this.doc.setTextColor(...this.mainColor);
            this.doc.setFont(this.font, 'bold');
            this.doc.text(col.title, col.x, this.leftY);
        });

        this.addYOffset(column,this.lineHeight)
        columns.forEach(col => {
            this.doc.setFontSize(this.textSize);
            this.doc.setTextColor(...this.textColor);
            this.doc.setFont(this.font, 'normal');
            this.doc.text(col.value, col.x, this.leftY);
        });
        this.addYOffset(column,40)
    }

    showIntroduction(){
        this.section({ text: "Introduction", uppercase: true, center: true });
        this.introduction(this.cvInfo.introduction, { style: 'italic' });
    }

    workExpBlock(column="left"){
        if (this.cvInfo.workExpArr.length){
            this.section({ text: "Work Experience", uppercase: true  ,column:column});
            this.cvInfo.workExpArr.forEach(item => {
                const dates = item.current ? `${formatMonth(item.from)} - Present` : `${formatMonth(item.from)} - ${formatMonth(item.to)}`;
                this.block({
                    title: { text: `${item.title} | ${dates}`, style: 'bold', color: this.textColor },
                    description: { text: item.company, style: 'italic', color: this.mainColor },
                    detailList: item.details ,column:column
                });
            });
        }
    }

    showWorkExp(){
        this.workExpBlock();
    }

    educationBlock(column="left"){
        if (this.cvInfo.educationArr.length){
            this.section({ text: "Education", uppercase: true ,column:column});
            this.cvInfo.educationArr.forEach(item => {
                const dates = `${formatMonth(item.from)} - ${formatMonth(item.to)}`;
                this.block({
                    title: { text: `${item.degree} | ${dates}`, style: 'bold', color: this.textColor },
                    description: { text: item.school, style: 'italic', color: this.mainColor },
                    detailList: item.details,column:column
                });
            });
        }
    }

    showEducation(){
        this.educationBlock();
    }

    showSkill(){
        if (this.cvInfo.skillArr.length){
            this.section({ text: "Skills", uppercase: true });
            this.join(this.cvInfo.skillArr.map(h => h.name));
        }
    }

    showReference(){
        if (this.cvInfo.referenceArr.length){
            this.section({ text: "References", uppercase: true });
            this.ul(this.cvInfo.referenceArr.map(h => h.name));
        }
    }

    showAward(){
        if (this.cvInfo.awardArr.length){
            section({ text: "Awards", uppercase: true });
            this.ul(this.cvInfo.awardArr.map(h => h.name));
        }
    }

    showHobby(){
        if (this.cvInfo.hobbyArr.length){
            this.section({ text: "Hobbies", uppercase: true });
            this.ul(this.cvInfo.hobbyArr.map(h => h.name));
        }
    }

    generate() {
        this.drawBackground();
        this.showName();
        this.showTitle();
        this.showIntroduction();
        this.showContactInfo();
        this.showWorkExp();
        this.showEducation();
        this.showSkill();
        this.showReference();
        this.showAward();
        this.showHobby();
        return this.doc;
    }
}