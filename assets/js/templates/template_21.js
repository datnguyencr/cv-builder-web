class Template21 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            mainColor: [16, 45, 73],
            headerTextSize: 16,
            avatarWidth : 90,
        avatarHeight : 90,
        useContactIcon:true,introductionImageColor:[255, 255, 255],
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
        this.renderSection(
            new Section({
                leftRatio: 0.6,
                rightRatio: 0.4,
                render: ({ left, right, pdf }) => {
                    left.advance(20);
                    pdf.name(left, this.cvInfo.name.toUpperCase(), {
                        style: this.nameTextStyle()
                    });
                    pdf.title(left, this.cvInfo.title.toUpperCase(), {
                        style: this.titleTextStyle()
                    });
                    pdf.contactInfoBlock(right, {
                        icon: this.contactImage,
                        uppercase: true,header:false,
                    });
                },
            })
        );
        this.doc.setFillColor(...this.mainColor);
        this.doc.rect(0, 120, this.pageWidth, 170, "F");
        this.renderSection(
            new Section({
                leftRatio: 0.2,
                rightRatio: 0.8,
                render: ({ left, right, pdf }) => {
                    left.advance(30);
                    pdf.avatar(left, this.cvInfo.avatar, {
                        size: 100,
                        borderColor: this.rightBackgroundColor,
                    });
                    pdf.introductionBlock(right, {
                        icon: this.introductionImage,
                        headerColor:this.rightBackgroundColor,
                        uppercase: true,underline:true,lineColor:this.rightBackgroundColor,
                        textColor: this.rightBackgroundColor,
                    });
                },
            })
        );
        this.renderSection(
            new Section({
                leftRatio: 0.6,
                rightRatio: 0.4,
                render: ({ left, right, pdf }) => {

                    pdf.workExpListBlock(left, {
                        icon: this.workExpImage,
                        underline: true,
                        uppercase: true,showTimeLine:true,
                        bulletColor: this.mainColor,
                    });
                    pdf.educationListBlock(left, {
                        icon: this.educationImage,
                        underline: true,
                        uppercase: true,
                        showTimeLine:true,
                        bulletColor: this.mainColor,
                    });
                    pdf.skillListBlock(right, {
                        icon: this.skillImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.referenceListBlock(right, {
                        icon: this.referenceImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.awardListBlock(right, {
                        icon: this.awardImage,
                        underline: true,
                        uppercase: true,
                    });
                    pdf.hobbyListBlock(right, {
                        icon: this.hobbyImage,
                        underline: true,
                        uppercase: true,
                    });
                },
            })
        );
    }
}
