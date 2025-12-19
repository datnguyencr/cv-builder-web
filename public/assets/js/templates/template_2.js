class Template2 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            normalFont: "Lora-Regular.ttf",
            boldFont: "Lora-Bold.ttf",
            italicFont: "Lora-Italic.ttf",
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
                    pdf.avatar(left, this.cvInfo.avatar, {});
                    right.advance(50);
                    pdf.name(right, this.cvInfo.name, {});
                    pdf.title(right, this.cvInfo.title, {});
                },
            })
        );

        this.renderSection(
            new Section({
                leftRatio: 0.6,
                rightRatio: 0.4,
                render: ({ left, right, pdf }) => {
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                    });
                    pdf.contactInfoBlock(right, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        showTimeLine: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        showTimeLine: true,
                    });
                },
            })
        );
    }
}
