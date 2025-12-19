class Template1 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [0, 95, 90],
            timeFormat: TimeFormat.YEAR,
        }
    ) {
        super(cvInfo, options);
        this.nameTextStyle = this.nameTextStyle.clone({
            color: this.mainColor,
        });
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name, {
                        center: true,
                    });
                    pdf.title(left, this.cvInfo.title, {
                        center: true,
                    });
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    pdf.introductionBlock(left, {
                        center: true,
                        uppercase: true,
                    });
                    pdf.contactInfoBlock(left, {
                        style: ContactInfoType.COLUMN,
                        uppercase: true,
                        icon: this.contactImage,
                    });
                    pdf.workExpListBlock(left, {
                        uppercase: true,
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(left, {
                        uppercase: true,
                        icon: this.educationImage,
                    });
                    pdf.skillListBlock(left, {
                        uppercase: true,
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        uppercase: true,
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        uppercase: true,
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        uppercase: true,
                        icon: this.hobbyImage,
                    });
                },
            })
        );
    }
}
