class Template20 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [126, 56, 128],
            headerTextSize: 18,
            avatarShape: AvatarShape.RECTANGLE,
            avatarWidth: 100,
            avatarHeight: 120,
        }
    ) {
        super(cvInfo, options);
    }
    nameTextStyle() {
        return new TextStyle({
            color: this.textColor,
            size: 32,
            style: FontStyle.BOLD,
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
            color: this.mainColor,
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
            this.writeTextWithMarker(
                ctx,
                `${description.text}   (${dates.text})`,
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
                    timeLineColor: timeLineColor,
                }
            )
        );
        ctx.advance(20);
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.7,
                rightRatio: 0.3,
                render: ({ left, right, pdf }) => {
                    left.advance(20);
                    pdf.name(left, this.cvInfo.name, {});
                    pdf.title(left, this.cvInfo.title, {});
                    pdf.contactInfoBlock(left, {
                        icon: this.contactImage,
                        header: false,
                    });
                    pdf.avatar(right, this.cvInfo.avatar);
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 1,
                rightRatio: 0,
                render: ({ left, right, pdf }) => {
                    pdf.introductionBlock(left, {
                        headerColor: this.mainColor,
                        icon: this.introductionImage,
                    });
                    pdf.workExpListBlock(left, {
                        headerColor: this.mainColor,
                        timeLineColor: this.textColor,
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(left, {
                        headerColor: this.mainColor,
                        timeLineColor: this.textColor,
                        icon: this.educationImage,
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
                },
            })
        );
    }
}
