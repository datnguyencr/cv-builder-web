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
        title = new Text({
            style: new TextStyle({
                style: "bold"
            })
        }),
        description = new Text({
            style: new TextStyle({
                style: "bold"
            })
        }),
        dates = new Text(),
        column = "left"
    }) {
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
        this.addYOffset(column, 10);
    }
    async showName({column="left"}={}) {
        this.name(this.cvInfo.name, {column:column,
            textSize: 32,
            textColor: this.mainColor
        });
    }

    async showTitle({column="left"}={}) {
        this.title(this.cvInfo.title, {column:column,
            textColor: this.textColor
        });
        this.addYOffset(column, 20);
    }

    async showContactInfo({column="left"}={}) {
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

    async showIntroduction({column="left"}={}) {
        await this.section({
            text: "Introduction",
            column: column
        });
        await this.introduction(this.cvInfo.introduction, {
            center: false,
            column: column
        });
    }

    async showEducation({column="left"}={}) {
        await this.educationBlock({
            column: column
        });
    }

    async showWorkExp({column="left"}={}) {
        await this.workExpBlock({
            column: column
        });
    }

    async showLeftColumn({column="left"}={}) {
        await this.showAvatar({column:column});
        await this.showName({column:column});
        await this.showTitle({column:column});
        await this.showIntroduction({column:column});
        await this.showContactInfo({column:column});
    }

    async showRightColumn({column="right"}={}) {
        await this.showSkills({column:column});
        await this.showReference({column:column});
        await this.showAward({column:column});
        await this.showHobby({column:column});
        await this.showWorkExp({column:column});
        await this.showEducation({column:column});
    }
}