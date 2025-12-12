class Template3 extends PDFGenerator {


    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [246, 246, 246],
        mainColor: [95, 137, 191],
        textColor: [100, 102, 101]
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

    async showName() {
        this.name(this.cvInfo.name, {
            textSize: 32,
            textColor: this.mainColor,
            center: true
        });
    }

    async showTitle() {
        this.title(this.cvInfo.title, {
            textColor: this.textColor,
            center: true
        });
        this.addYOffset("left", 20);
    }

    async showContactInfo() {
        let column = "left";
        this.section({
            text: "Contact",
            color: this.textColor,
            underline: true,
            underlineColor: this.mainColor,
            icon: this.contactImage
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
        this.section({
            text: "Introduction",
            column: "right",
            color: this.textColor,
            underline: true,
            underlineColor: this.mainColor,
            icon: this.introductionImage
        });
        this.introduction(this.cvInfo.introduction, {
            center: false,
            column: "right"
        });
    }

    async showEducation() {
        this.educationBlock({
            column: "right",
            sectionColor: this.textColor,
            underline: true,
            underlineColor: this.mainColor,
            icon: this.educationImage
        });
    }

    async showWorkExp() {
        this.workExpBlock({
            column: "right",
            sectionColor: this.textColor,
            underline: true,
            underlineColor: this.mainColor,
            icon: this.workExpImage
        });
    }

    async showSkills() {
        this.skillsBlock({
            column: "left",
            sectionColor: this.textColor,
            underline: true,
            underlineColor: this.mainColor,
            icon: this.skillImage
        });
    }
    async showReference() {
        this.referencesBlock({
            column: "left",
            sectionColor: this.textColor,
            underline: true,
            underlineColor: this.mainColor,
            icon: this.referenceImage
        });
    }

   async  showAward() {
        this.awardsBlock({
            column: "left",
            sectionColor: this.textColor,
            underline: true,
            underlineColor: this.mainColor,
            icon: this.awardImage
        });
    }

    async showHobby() {
        await this.hobbyBlock({
            column: "left",
            sectionColor: this.textColor,
            underline: true,
            underlineColor: this.mainColor,
            icon: this.hobbyImage
        });
    }
   async  showLeftColumn() {
        this.showName();
        this.showTitle();
        this.showIntroduction();
        this.showContactInfo();
    }

    async showRightColumn() {
        await this.showSkills();
        this.showReference();
        this.showAward();
        this.showHobby();
        this.showWorkExp();
        this.showEducation();
    }

}