class Template27 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            headerTextStyle: "normal",
        }
    ) {
        super(cvInfo, options);
    }
    nameTextStyle() {
        return new TextStyle({
            color: this.mainColor,
            size: 24,
            style: "normal",
        });
    }

    titleTextStyle() {
        return new TextStyle({
            color: this.mainColor,
            style: "normal",
        });
    }
    blockTitleStyle() {
        return new TextStyle({
            style: "bold",
            size: 14,
            color: this.textColor,
        });
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
                        width: 90,height:90,
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
                                        center:true,
                        upperline: true,
                        underline:true,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.mainColor,
                              center:true,
                        upperline: true,
                        underline:true,
                        linePadding: 10,uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.mainColor,
                           center:true,
                        upperline: true,
                        underline:true,
                        linePadding: 10,uppercase: true,
                        timeLineColor: this.textColor,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.mainColor,
                      center:true,
                        upperline: true,
                        underline:true,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.mainColor,
                                 center:true,
                        upperline: true,
                        underline:true,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.mainColor,
                          center:true,
                        upperline: true,
                        underline:true,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.mainColor,
                        center:true,
                        upperline: true,
                        underline:true,
                        linePadding: 10,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
