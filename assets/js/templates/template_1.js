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
    formatTime(monthValue) {
        if (!monthValue) return '';
        const y = monthValue.split('-')[0];
        return y || '';
    };

    content() {
        this.renderSection(new Section({
            leftRatio: 1,
            rightRatio: 0,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.avatar(left, this.cvInfo.avatar, {
                    size: 100,
                    center: true
                });
                left.advance(40);
                pdf.name(left, this.cvInfo.name, {
                    textColor: this.mainColor,
                    center: true,
                });
                pdf.title(left, this.cvInfo.title, {
                    textColor: this.textColor,
                    center: true,
                });
                pdf.drawLineBlock(left, {
                    color: this.mainColor
                });
                pdf.introductionBlock(left, {
                    center: true,
                    uppercase: true,
                });
                pdf.contactInfoBlock(left, {
                    style: "column",
                    uppercase: true,
                    icon: this.contactImage,
                });
                pdf.workExpBlock(left, {
                    uppercase: true,
                    icon: this.workExpImage,
                });
                pdf.educationBlock(left, {
                    uppercase: true,
                    icon: this.educationImage,
                });
                pdf.skillsBlock(left, {
                    uppercase: true,
                    icon: this.skillImage,
                });
                pdf.referencesBlock(left, {
                    uppercase: true,
                    icon: this.referenceImage,
                });
                pdf.awardsBlock(left, {
                    uppercase: true,
                    icon: this.awardImage,
                });
                pdf.hobbyBlock(left, {
                    uppercase: true,
                    icon: this.hobbyImage,
                });
            }
        }));
    }
}