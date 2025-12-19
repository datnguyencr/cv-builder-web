class Template8 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftBackgroundColor: [0, 0, 0],
            mainColor: [255, 255, 255],
            textColor: [255, 255, 255],
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
        }
    ) {
        super(cvInfo, options);
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
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                    });
                    right.advance(50);
                    pdf.name(right, this.cvInfo.name.toUpperCase(), {});
                    pdf.title(right, this.cvInfo.title.toUpperCase(), {});
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        uppercase: true,
                        style: "column",
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 0.5,
                rightRatio: 0.5,
                render: ({ left, right, pdf }) => {
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        uppercase: true,
                        fontStyle: FontStyle.NORMAL,
                    });
                    pdf.skillListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        uppercase: true,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    pdf.workExpListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        uppercase: true,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
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
                },
            })
        );
    }
}
