class Template11 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            headerBackgroundColor: [208, 237, 228],
        }
    ) {
        super(cvInfo, options);
    }

    blockTitleStyle() {
        return new TextStyle({
            color: this.textColor,
            style: "bold",
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: "normal",
            size: 12,
            color: this.mainColor,
        });
    }

    contactLabelTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: "bold",
        });
    }
    contactValueTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: "normal",
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
            this.writeTextWithMarker(
                ctx,
                `${description.text} (${dates.text})`,
                {
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
                }
            )
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.65,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 90,
                    });
                    right.advance(40);
                    pdf.name(right, this.cvInfo.name, {});
                    pdf.title(right, this.cvInfo.title, {});
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.drawLineBlock(left, {
                        color: this.mainColor,
                    });
                    left.advance(20);
                    pdf.introductionBlock(left, { header: false });
                    pdf.contactInfoBlock(left, {
                        style: "column",
                        icon: this.contactImage,
                    });
                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.skillListBlock(left, {
                        icon: this.skillImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.referenceListBlock(left, {
                        icon: this.referenceImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.awardListBlock(left, {
                        icon: this.awardImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                    pdf.hobbyListBlock(left, {
                        icon: this.hobbyImage,
                        headerBackgroundColor: this.headerBackgroundColor,
                        padding: 10,
                        indent: 20,
                    });
                },
            })
        );
    }
}
