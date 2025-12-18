class Template26 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [184, 222, 239],
            leftRatio: 0.5,
            rightRatio: 0.5,
            headerTextSize: 16,
            normalFont: "Amiri-Regular.ttf",
            boldFont: "Amiri-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
                    useContactIcon: [0,0,0],
        educationImageColor  : [0,0,0],
        workExpImageColor :  [0,0,0],
        contactImageColor : [0,0,0],
        skillImageColor :  [0,0,0],
        referenceImageColor :
            [0,0,0],
        awardImageColor :  [0,0,0],
        introductionImageColor :
            [0,0,0],
        hobbyImageColor :  [0,0,0],
        phoneImageColor :  [0,0,0],
        linkImageColor : [0,0,0],
        emailImageColor :  [0,0,0],
        avatarWidth : 90,
        avatarHeight :  90,
        }
    ) {
        super(cvInfo, options);
    }

    blockDescriptionStyle() {
        return new TextStyle({
            style: "bold",
            color: this.textColor,
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: "normal",
            color: this.textColor,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timeLineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${title.text} | ${description.text}`,
                {
                    style: title.style,
                    lineHeight: 0,
                    marker: showTimeLine ? marker : null,
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                              thickness: 1,
                              color: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 140, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        width: 80,height:80,                    borderSize: 3,
                        padding: 5,
                        borderColor: this.rightBackgroundColor,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name.toUpperCase(), {});
                    pdf.title(right, this.cvInfo.title.toUpperCase(), {});
                },
            })
        );

        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        uppercase: true,
                    });
                    right.advance(10);
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        uppercase: true,
                    });
                    this.drawLineBlock(right, {
                        color: this.mainColor,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        uppercase: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
