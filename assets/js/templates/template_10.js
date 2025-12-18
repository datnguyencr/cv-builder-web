class Template10 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [198, 152, 88],
            headerTextSize: 16,
        }
    ) {
        super(cvInfo, options);
    }

    blockTitleStyle() {
        return new TextStyle({
            color: this.mainColor,
            style: "bold",
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            color: this.textColor,
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: "normal",
            color: this.mainColor,
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
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
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
        ctx.advance(
            this.writeTextWithMarker(ctx, `${dates.text}`, {
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
        this.doc.rect(0, 0, this.pageWidth, 170, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                        borderColor: this.rightBackgroundColor,
                    });
                    pdf.name(right, this.cvInfo.name.toUpperCase(), {
                        style: this.nameTextStyle().clone({
                            color: this.rightBackgroundColor,
                        }),
                    });
                    pdf.title(right, this.cvInfo.title.toUpperCase(), {
                        style: this.titleTextStyle().clone({
                            color: this.rightBackgroundColor,
                        }),
                    });
                    this.drawLineBlock(right, {
                        color: this.rightBackgroundColor,
                    });
                    right.advance(15);
                    pdf.introductionBlock(right, {
                        icon: this.introductionImage,
                        uppercase: true,
                        header: false,
                        textColor: this.rightBackgroundColor,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                render: ({ left, right, pdf }) => {
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        underline: true,
                        uppercase: true,
                        style: "column",
                    });
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        underline: true,
                        uppercase: true,
                        bulletColor: this.mainColor,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        underline: true,
                        uppercase: true,
                        bulletColor: this.mainColor,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        icon: this.referenceImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        icon: this.awardImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        icon: this.hobbyImage,
                        underline: true,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
