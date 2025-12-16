class Template9 extends PDFGenerator {

    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [242, 241, 248],
        mainColor: [117, 92, 189]
    }) {
        super(cvInfo, options);
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
    async showName({
        column = "left"
    } = {}) {
        this.name(this.cvInfo.name, {
            column: column,
            textSize: 32,
            textColor: this.mainColor
        });
    }

    async showTitle({
        column = "left"
    } = {}) {
        this.title(this.cvInfo.title, {
            column: column,
            textColor: this.textColor
        });
        this.addYOffset(column, 20);
    }

    async showContactInfo({
        column = "left"
    } = {}) {
        await this.contactInfoBlock({
            column:column,
            style:"row",
            icon:this.contactImage});
    }

    async showIntroduction({
        column = "left"
    } = {}) {
        this.introductionBlock({
            paddingTop : 15,
            column: column,
            icon:this.introductionImage,
        });
    }

    async showEducation({
        column = "left"
    } = {}) {
        await this.educationBlock({
            column: column,
            icon: this.educationImage,
        });
    }

    async showWorkExp({
        column = "left"
    } = {}) {
        await this.workExpBlock({
            column: column,
            icon: this.workExpImage
        });
    }

    async showSkills({
        column = "left"
    } = {}) {
        await this.skillsBlock({
            column: column,
            icon:this.skillImage,
        });
    }

    async showAward({
        column = "left"
    } = {}) {
        await this.awardsBlock({
            column: column,
            icon:this.awardImage,
        });
    }
    
    async showReference({
        column = "left"
    } = {}) {
        await this.referencesBlock({
            column: column,
            icon:this.referenceImage,
        });
    }

    async showHobby({
        column = "left"
    } = {}) {
        await this.hobbyBlock({
            column: column,
            icon:this.hobbyImage,
        });
    }
    async showLeftColumn({
        column = "left"
    } = {}) {
        await this.showAvatar({
            column: column,
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
    }

    async showRightColumn({
        column = "right"
    } = {}) {
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
        await this.showWorkExp({
            column: column
        });
        await this.showEducation({
            column: column
        });
    }
}
