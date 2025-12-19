class Template18 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [183, 31, 28],
            headerTextStyle: FontStyle.NORMAL,
        }
    ) {
        super(cvInfo, options);
    }
    nameTextStyle() {
        return new TextStyle({
            color: this.mainColor,
            size: 24,
            style: FontStyle.NORMAL,
        });
    }

    titleTextStyle() {
        return new TextStyle({
            color: this.mainColor,
            style: FontStyle.NORMAL,
        });
    }
    blockTitleStyle() {
        return new TextStyle({
            style: FontStyle.BOLD,
            size: 14,
            color: this.textColor,
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: FontStyle.NORMAL,
            size: 12,
            color: this.textColor,
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: FontStyle.NORMAL,
            size: 10,
            color: this.textColor,
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
                leftRatio: 0.25,
                rightRatio: 0.75,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
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
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        header: false,
                        style: "column",
                    });
                    pdf.introductionBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.mainColor,
                        upperline: true,
                        linePadding: 20,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
