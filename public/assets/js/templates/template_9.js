class Template9 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [242, 241, 248],
            mainColor: [117, 92, 189],
            normalFont: "Lora-Regular.ttf",
            boldFont: "Lora-Bold.ttf",
            italicFont: "Lora-Italic.ttf",
            useContactIcon: true,
        }
    ) {
        super(cvInfo, options);
    }

    blockDescriptionStyle() {
        return new TextStyle({
            style: FontStyle.NORMAL,
            color: this.textColor,
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: FontStyle.ITALIC,
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
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 10,
                    });
                    left.advance(40);
                    pdf.name(left, this.cvInfo.name, {
                        style: this.nameTextStyle().clone({
                            color: this.mainColor,
                        }),
                    });
                    pdf.title(left, this.cvInfo.title, {
                        style: this.titleTextStyle().clone({
                            color: this.mainColor,
                        }),
                    });
                    pdf.introductionBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.introductionImage,
                    });
                    pdf.contactInfoBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.contactImage,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.skillImage,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.referenceImage,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.awardImage,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.hobbyImage,
                    });
                    pdf.workExpListBlock(right, {
                        headerColor: this.mainColor,
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(right, {
                        headerColor: this.mainColor,
                        icon: this.educationImage,
                    });
                },
            })
        );
    }
}
