class Template1 extends PDFGenerator {

    constructor(cvInfo, options = {
        mainColor: [0, 95, 90]
    }) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Adamina-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/OpenSans-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/OpenSans-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }

    async showName({
        column = "left"
    } = {}) {
        this.name(this.cvInfo.name, {
            column: column,
            center: true
        });
    }

    async showTitle({
        column = "left"
    } = {}) {
        this.title(this.cvInfo.title, {
            column: column,
            center: true
        });
    }

    async showIntroduction({
        column = "left"
    } = {}) {
        this.doc.setLineWidth(2);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin, this.leftY, this.pageWidth - this.margin, this.leftY);
        this.introductionBlock({
            paddingTop : 15,
            column: column,
            uppercase:true,
            center:true,
        });
    }

    async showEducation({
        column = "left"
    } = {}) {
        this.educationBlock({
            column: column,
            uppercase: true,
            icon:this.educationImage,
        });
    }

    async showWorkExp({
        column = "left"
    } = {}) {
        await this.workExpBlock({
            column: column,
            uppercase: true,
            icon:this.workExpImage,
        });
    }

    async showSkills({
        column = "left"
    } = {}) {
        await this.skillsBlock({
            column: column,
            uppercase: true,
            icon:this.skillImage,
        });
    }

    async showAward({
        column = "left"
    } = {}) {
        await this.awardsBlock({
            column: column,
            uppercase: true,
            icon:this.awardImage,
        });
    }

    async showReference({
        column = "left"
    } = {}) {
        await this.referencesBlock({
            column: column,
            uppercase: true,
            icon:this.referenceImage,
        });
    }

    async showHobby({
        column = "left"
    } = {}) {
        await this.hobbyBlock({
            column: column,
            uppercase: true,
            icon:this.hobbyImage,
        });
    }
}