class Template6 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [131, 206, 178],
            mainColor: [131, 206, 178],
            textColor: [100, 102, 101],
            headerTextSize: 20,
            headerTextStyle: "normal",
            normalFont: "Adamina-Regular.ttf",
            boldFont: "OpenSans-Bold.ttf",
            italicFont: "OpenSans-Italic.ttf",
            timeFormat: TimeFormat.YEAR,
        }
    ) {
        super(cvInfo, options);
    }

    blockTitleStyle() {
        return new TextStyle({
            color: this.leftBackgroundColor,
            style: "bold",
        });
    }

    blockDescriptionStyle() {
        return new TextStyle({
            style: "bold",
            size: 10,
            color: this.textColor,
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: "normal",
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
            this.writeTextWithMarker(ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null,
                timeLineColor: timeLineColor,
            })
        );
        ctx.advance(20);
        ctx.advance(
            this.writeTextPair(ctx, description.text, dates.text, {
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
            })
        );
        ctx.advance(20);
    }

    contactLabelTextStyle() {
        return new TextStyle({
            color: this.rightBackgroundColor,
            style: "bold",
        });
    }
    contactValueTextStyle() {
        return new TextStyle({
            color: this.rightBackgroundColor,
            style: "normal",
        });
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
                    pdf.name(left, this.cvInfo.name, {
                        style: this.nameTextStyle().clone({
                            color: this.rightBackgroundColor,
                        }),
                    });
                    pdf.drawLineBlock(left, {
                        color: this.rightBackgroundColor,
                        thickness: 3,
                    });
                    left.advance(10);
                    pdf.title(left, this.cvInfo.title, {
                        style: this.titleTextStyle().clone({
                            color: this.rightBackgroundColor,
                        }),
                    });

                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                    });
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                    });
                },
            })
        );
    }
}
