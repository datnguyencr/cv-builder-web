class Template24 extends PDFGenerator {
    constructor(
        cvInfo,
        options = {
            leftRatio: 0.4,
            rightRatio: 0.6,
            leftBackgroundColor: [20, 95, 150],
            mainColor: [20, 95, 150],
            textColor: [0, 0, 0],
            headerTextSize: 18,
            timeFormat: TimeFormat.YEAR,
            useContactIcon: true,
            phoneImageColor: [255, 255, 255],
            linkImageColor: [255, 255, 255],
            emailImageColor: [255, 255, 255],
        }
    ) {
        super(cvInfo, options);
    }

    blockDescriptionStyle() {
        return new TextStyle({
            style: "normal",
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
                              timeLineColor: timeLineColor,
                          });
                      }
                    : null,
            })
        );
        ctx.advance(20);
    }
    nameTextStyle() {
        return new TextStyle({
            color: this.textColor,
            size: 20,
            style: "bold",
        });
    }

    titleTextStyle() {
        return new TextStyle({
            color: this.textColor,
            style: "bold",
        });
    }
    contactLabelTextStyle() {
        return new TextStyle({
            color: this.rightBackgroundColor,
            style: "bold",
        });
    }
    contactValueTextStyle() {
        return new TextStyle({
            color: this.rightBackgroundColor,
            style: "normal",
        });
    }
    content() {
        this.renderSection(
            new Section({
                leftRatio: 0.4,
                rightRatio: 0.6,
                render: ({ left, right, pdf }) => {
                    pdf.avatar(left, this.cvInfo.avatar, {
                        center: true,
                        borderSize: 5,
                        padding: 7,
                        borderColor: this.rightBackgroundColor,
                    });
                          left.advance(40);
                    pdf.name(left, this.cvInfo.name.toUpperCase(), {center:true,
            
                        style: this.nameTextStyle().clone({
                            color: this.rightBackgroundColor,
                        }),
                    });
                    pdf.title(left, this.cvInfo.title, {center:true,
        
                        style: this.titleTextStyle().clone({
                            color: this.rightBackgroundColor,
                        }),
                    });
                    pdf.drawLineBlock(left, {
                        color: this.rightBackgroundColor,marginHorizontal:40,
                    });
                    pdf.contactInfoBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        linePadding: 10,
                        uppercase: true,
                    });
                    pdf.skillListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.referenceListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.awardListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });
                    pdf.hobbyListBlock(left, {
                        headerColor: this.rightBackgroundColor,
                        uppercase: true,
                        textColor: this.rightBackgroundColor,
                        bulletColor: this.rightBackgroundColor,
                    });

                    right.advance(20);
                    pdf.introductionBlock(right, {
                        uppercase: true,
                        icon: this.introductionImage,
                    });
                    pdf.workExpListBlock(right, {
                        uppercase: true,
    
                        icon: this.workExpImage,
                    });
                    pdf.educationListBlock(right, {
                        uppercase: true,

                        icon: this.educationImage,
                    });
                },
            })
        );
    }
}
