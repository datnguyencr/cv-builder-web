class Template16 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [220, 227, 230],
            leftRatio: 0.4,
            rightRatio: 0.6,
            normalFont: "AdventPro-Regular.ttf",
            boldFont: "AdventPro-Bold.ttf",
            italicFont: "AdventPro-Italic.ttf",
            headerTextSize: 16,
            separator: true,
            useContactIcon: true,
            phoneImageColor: [0, 0, 0],
            linkImageColor: [0, 0, 0],
            emailImageColor: [0, 0, 0],
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
            style: FontStyle.NORMAL,
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
            color: this.textColor,
            size: 34,
            style: FontStyle.BOLD,
        });
    }

    titleTextStyle() {
        return new TextStyle({
            color: this.textColor,
            size: 20,
        });
    }
    contactLabelTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: FontStyle.BOLD,
        });
    }
    contactValueTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: FontStyle.NORMAL,
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
            this.writeTextWithMarker(ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
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
            this.writeTextWithMarker(ctx, dates.text, {
                style: dates.style,
                lineHeight: 0,
                marker: showTimeLine
                    ? (x, y, w, pdf) => {
                          this.doc.setLineWidth(1);
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
        this.doc.rect(0, 0, this.pageWidth, 150, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 90,
                        borderColor: this.textColor,
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
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    left.advance(20);
                    pdf.introductionBlock(left, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.contactInfoBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                    right.advance(20);
                    pdf.workExpListBlock(right, {
                        headerColor: this.textColor,
                        uppercase: true,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.textColor,
                        linePadding: 20,
                        upperline: true,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
