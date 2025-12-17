class Template7 extends PDFGenerator {

    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [2, 55, 78],
        mainColor: [2, 55, 78],
        textColor: [0, 0, 0],
        headerTextSize: 18,
    }) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Adamina-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/OpenSans-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/OpenSans-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }

    formatTime(monthValue) {
        if (!monthValue) return '';
        const y = monthValue.split('-')[0];
        return y || '';
    }

    blockTitleStyle() {
        return new TextStyle({
            color: this.textColor,
            style: 'bold'
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: 'normal',
            color: this.textColor
        });
    }

    blockDatesStyle() {
        return new TextStyle({
            style: 'normal',
            size: 10,
            color: this.textColor
        });
    }

    blockHeader(ctx, {
        title = new Text(),
        description = new Text(),
        dates = new Text(),
        timelineColor = this.mainColor,
        showTimeLine = false
    } = {}) {

        const marker = TIMELINE_MARKERS["circle"];

        this.doc.setFillColor(...timelineColor);
        this.doc.setDrawColor(...timelineColor);

        ctx.advance(this.writeTextWithMarker(
            ctx, title.text.toUpperCase(), {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null
            }
        ));
        ctx.advance(20);
        ctx.advance(this.writeTextWithMarker(
            ctx, description.text, {
                style: description.style,
                lineHeight: 0,
                 marker: showTimeLine ?
                    (x, y, w, pdf) => {
                        this.doc.setLineWidth(1);
                        pdf.drawLine(
                            x,
                            y - w * 2,
                            x,
                            y + w + 5
                        );
                    } : null
            }
        ));
        ctx.advance(20);
        ctx.advance(this.writeTextWithMarker(
            ctx, `( ${dates.text} )`, {
                style: dates.style,
                lineHeight: 0,
                      marker: showTimeLine ?
                    (x, y, w, pdf) => {
                        this.doc.setLineWidth(1);
                        pdf.drawLine(
                            x,
                            y - w * 2,
                            x,
                            y + w + 5
                        );
                    } : null
            }
        ));
        ctx.advance(20);
    }

    contactLabelTextStyle() {
        return new TextStyle({
            color: this.rightBackgroundColor,
            style: "bold"
        });
    }
    contactValueTextStyle() {
        return new TextStyle({
            color: this.rightBackgroundColor,
            style: "normal"
        });
    }
    content() {
        this.renderSection(new Section({
            leftRatio: .4,
            rightRatio: .6,
            render: ({
                left,
                right,
                pdf
            }) => {
                pdf.avatar(left, this.cvInfo.avatar, {
                    center: true,
                    borderSize: 7,padding:7,
                    borderColor: this.rightBackgroundColor,
                });
                left.advance(20);
                pdf.contactInfoBlock(left, {
                    headerColor: this.rightBackgroundColor,linePadding : 10,
                    uppercase: true,
                    underline: true,
                    lineColor: this.rightBackgroundColor,
                });
                pdf.skillListBlock(left, {
                    headerColor: this.rightBackgroundColor,
                    uppercase: true,
                    underline: true,
                    lineColor: this.rightBackgroundColor,
                    textColor: this.rightBackgroundColor,
                });
                pdf.referenceListBlock(left, {
                    headerColor: this.rightBackgroundColor,
                    uppercase: true,
                    underline: true,
                    lineColor: this.rightBackgroundColor,
                    textColor: this.rightBackgroundColor,
                });
                pdf.awardListBlock(left, {
                    headerColor: this.rightBackgroundColor,
                    uppercase: true,
                    underline: true,
                    lineColor: this.rightBackgroundColor,
                    textColor: this.rightBackgroundColor,
                });
                pdf.hobbyListBlock(left, {
                    headerColor: this.rightBackgroundColor,
                    uppercase: true,
                    underline: true,
                    lineColor: this.rightBackgroundColor,
                    textColor: this.rightBackgroundColor,
                });
                right.advance(20);
                pdf.name(right, this.cvInfo.name.toUpperCase(), {
                    textSize: 32,
                    style: this.nameTextStyle().clone({
                        color: this.mainColor
                    }),
                });
                pdf.title(right, this.cvInfo.title.toUpperCase(), {
                    textSize: 20,
                    style: this.titleTextStyle().clone({
                        color: this.mainColor
                    }),
                });
                right.advance(20);
                pdf.introductionBlock(right, {
                    headerColor: this.textColor,
                    uppercase: true,
                    underline: true,
                    icon: this.introductionImage,
                });
                pdf.workExpListBlock(right, {
                    headerColor: this.textColor,
                    uppercase: true,
                    underline: true,
                    icon: this.workExpImage,
                    showTimeLine:true,
                });
                pdf.educationListBlock(right, {
                    headerColor: this.textColor,
                    uppercase: true,
                    underline: true,
                    icon: this.educationImage,
                    showTimeLine:true,
                });
            }
        }));
    }
}