class Template9 extends PDFGenerator {

    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [242, 241, 248],
        mainColor: [117, 92, 189]
    }) {
        super(cvInfo, options);
        this.margin = 20;
        this.rightY = this.margin;
        this.colHeight = this.pageHeight - this.margin * 2;
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Lora-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/Lora-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/Lora-Italic.ttf', 'custom', 'italic');
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
            style: 'normal',
            color: this.textColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'italic',
            color: this.textColor
        });
    }

    blockHeader({
        title = new Text({ style: new TextStyle({ style: "bold" }) }),
        description = new Text({ style: new TextStyle({ style: "bold" }) }),
        dates = new Text(),
        column = "left"
    }){
        this.normalText(title.text, {
            style: title.style,
            column: column
        });
        this.normalText(description.text, {
            style: description.style,
            column: column
        });
        this.normalText(dates.text, {
            style: dates.style,
            column: column
        });
        this.addYOffset(column,10);
    }
    async showName() {
        this.name(this.cvInfo.name, {
            textSize: 32,
            textColor: this.mainColor
        });
    }

    async showTitle() {
        this.title(this.cvInfo.title, {
            textColor: this.textColor
        });
        this.addYOffset("left", 20);
    }

    async showContactInfo() {
        let column = "left";
        await this.section({
            text: "Contact"
        });
        let textSize = 10;
        let lineHeight = 15;
        this.writePair({
            label: "Phone:",
            value: this.cvInfo.phone,
            column: column,
            textSize: textSize,
            lineHeight: lineHeight
        });
        this.writePair({
            label: "Email:",
            value: this.cvInfo.email,
            column: column,
            textSize: textSize,
            lineHeight: lineHeight
        });
        this.writePair({
            label: "Links:",
            value: this.cvInfo.url,
            column: column,
            textSize: textSize,
            lineHeight: lineHeight
        });
    }

    async showIntroduction() {
        await this.section({
            text: "Introduction",
            column: "right"
        });
        await this.introduction(this.cvInfo.introduction, {
            center: false,
            column: "right"
        });
    }

    async showEducation() {
        await this.educationBlock({
            column: "right"
        });
    }

    async showWorkExp() {
        await this.workExpBlock({
            column: "right"
        });
    }

    async showLeftColumn() {
        await this.showName();
        await this.showTitle();
        await this.showIntroduction();
        await this.showContactInfo();
    }

    async showRightColumn() {
        await this.showSkills();
        await this.showReference();
        await this.showAward();
        await this.showHobby();
        await this.showWorkExp();
        await this.showEducation();
    }
}