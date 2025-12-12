class Template1 extends PDFGenerator {

    constructor(cvInfo, options = {}) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Adamina-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/OpenSans-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/OpenSans-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }

    async showName() {
        this.name(this.cvInfo.name, {
            center: true
        });
    }

    async showTitle() {
        this.title(this.cvInfo.title, {
            center: true
        });
    }
    async showIntroduction() {
        // Horizontal line
        this.doc.setLineWidth(2);
        this.doc.setDrawColor(...this.mainColor);
        this.doc.line(this.margin, this.leftY, this.pageWidth - this.margin, this.leftY);
        this.leftY += 20;
        this.section({
            text: "Introduction",
            uppercase: true,
            center: true
        });
        this.introduction(this.cvInfo.introduction, {
            style: 'italic',
            center: true
        });
    }
    async showEducation() {
        this.educationBlock({
            uppercase: true
        });
    }

    async showWorkExp() {
        await this.workExpBlock({
            uppercase: true
        });
    }

    async showSkills() {
        await this.skillsBlock({
            uppercase: true
        });
    }

    async showAward() {
        await this.awardsBlock({
            uppercase: true
        });
    }

    async showReference() {
        await this.referencesBlock({
            uppercase: true
        });
    }

    async showHobby() {
        await this.hobbyBlock({
            uppercase: true
        });
    }
}