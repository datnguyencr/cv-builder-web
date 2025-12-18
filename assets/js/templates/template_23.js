class Template23 extends PDFGenerator {
    constructor(cvInfo, options = {
        headerBackgroundColor:[245,245,245]
    }) {
        super(cvInfo, options);
    }
    nameTextStyle() {
        return new TextStyle({
            color: this.textColor,
            size: 26,
        });
    }
    titleTextStyle() {
        return new TextStyle({
            color: this.textColor,
        });
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
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                        center: true,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name, {
                        style: this.nameTextStyle().clone({
                            color: this.mainColor,
                        }),
                        center: true,
                    });
                    pdf.title(left, this.cvInfo.title.toUpperCase(), {
                        center: true,
                    });
                    pdf.drawLineBlock(left, {thickness:5,
                        color: this.headerBackgroundColor,
                    });
                    pdf.contactInfoBlock(left, {
                        style: "column",
                        uppercase: true,
                        center: true,
                        icon: this.contactImage,
                    });
                    pdf.introductionBlock(left, {
                        center: true,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.workExpImage,
                        linePadding: 20,
                    });
                    pdf.educationListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.educationImage,
                        linePadding: 20,
                    });
                    pdf.skillListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.skillImage,
                        linePadding: 20,
                    });
                    pdf.referenceListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.referenceImage,
                        linePadding: 20,
                    });
                    pdf.awardListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.awardImage,
                        linePadding: 20,
                    });
                    pdf.hobbyListBlock(left, {
                        uppercase: true,
                        center: true,
                        icon: this.hobbyImage,
                        linePadding: 20,
                    });
                },
            })
        );
    }
}
