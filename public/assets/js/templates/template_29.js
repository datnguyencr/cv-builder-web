class Template29 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [85, 113, 109],
            headerBackgroundColor: [152, 190, 186],
            leftRatio: 0.5,
            rightRatio: 0.5,
            normalFont: "AdventPro-Regular.ttf",
            boldFont: "AdventPro-Bold.ttf",
            italicFont: "AdventPro-Italic.ttf",
        }
    ) {
        super(cvInfo, options);
    }

    blockTitleStyle() {
        return new TextStyle({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: FontStyle.BOLD,
            color: this.textColor,
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
    }
    nameTextStyle() {
        return new TextStyle({
            color: this.rightBackgroundColor,
            size: 34,
            style: FontStyle.BOLD,
        });
    }

    titleTextStyle() {
        return new TextStyle({
            color: this.rightBackgroundColor,
            size: 20,
        });
    }

    blockHeader(
        ctx,
        {
            title = new Text(),
            description = new Text(),
            dates = new Text(),
            timelineColor = this.mainColor,
            showTimeLine = false,
        } = {}
    ) {
        const marker = TIMELINE_MARKERS["circle"];

        this.doc.setFillColor(...timelineColor);
        this.doc.setDrawColor(...timelineColor);

        ctx.advance(
            this.writeTextWithMarker(
                ctx,
                `${title.text} | ${description.text}`,
                {
                    style: title.style,
                    lineHeight: 0,
                    marker: showTimeLine ? marker : null,
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
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }

    content() {
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 0, this.pageWidth, 150, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 90,
                        borderColor: this.rightBackgroundColor,
                        padding: 5,
                        borderSize: 3,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name.toUpperCase());
                    pdf.title(right, this.cvInfo.title.toUpperCase());
                },
            })
        );

        this.renderSection(
            new Section({
                leftRatio: 0.5,
                rightRatio: 0.5,
                render: ({ left, right, pdf }) => {
                    left.advance(20);
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        uppercase: true,
                    });
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
                    right.advance(20);
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
