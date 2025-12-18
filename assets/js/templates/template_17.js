class Template17 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [241, 244, 250],
            headerTextStyle: "normal",
        }
    ) {
        super(cvInfo, options);
    }

    blockDescriptionStyle() {
        return new TextStyle({
            style: "normal",
            size: 12,
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
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.7,
                rightRatio: 0.3,
                render: ({ left, right, pdf }) => {
                    this.doc.setFillColor(...this.mainColor);
                    this.doc.rect(0, 0, this.pageWidth, 160, "F");
                    left.advance(20);
                    pdf.name(left, this.cvInfo.name, {});
                    pdf.title(left, this.cvInfo.title, {});
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        header: false,
                    });
                    pdf.avatar(right, this.cvInfo.avatar, {
                        size: 100,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                        showTimeLine: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
