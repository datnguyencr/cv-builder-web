class Template13 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [211, 204, 247],
            mainColor: [0, 0, 0],
            normalFont: "Afacad-Regular.ttf",
            boldFont: "Afacad-Bold.ttf",
            italicFont: "Afacad-Italic.ttf",
        }
    ) {
        super(cvInfo, options);
    }

    blockTitleStyle() {
        return new TextStyle({
            style: "bold",
            color: this.textColor,
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: "normal",
            size: 10,
            color: this.textColor,
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: "italic",
            size: 10,
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
            this.writeTextWithMarker(ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(
                ctx,
                description.text.toUpperCase(),
                dates.text.toUpperCase(),
                {
                    leftStyle: description.style,
                    rightStyle: dates.style,
                    lineHeight: 0,
                    marker: showTimeLine
                        ? (x, y, w, pdf) => {
                              pdf.drawLine(x, y - w * 2, x, y + w + 5, {
                                  thickness: 1,
                                  color: timeLineColor,
                              });
                          }
                        : null,
                }
            )
        );
        ctx.advance(20);
    }

    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 10,
                        borderColor: this.rightBackgroundColor,
                    });
                    left.advance(40);

                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        icon: this.contactImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.skillImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.referenceImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.awardImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        icon: this.hobbyImage,
                        underline: true,
                        uppercase: true,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name, {
                        style: this.nameTextStyle().clone({
                            color: this.mainColor,
                            size: 48,
                        }),
                    });
                    pdf.title(right, this.cvInfo.title, {
                        style: this.titleTextStyle().clone({
                            size: 24,
                        }),
                        uppercase: true,
                    });
                    pdf.introductionBlock(right, {
                        headerColor: this.textColor,
                        icon: this.introductionImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.workExpImage,
                        underline: true,
                        uppercase: true,
                        showTimeLine: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        icon: this.educationImage,
                        underline: true,
                        uppercase: true,
                        showTimeLine: true,
                    });
                },
            })
        );
    }
}
