class Template6 extends PDFGenerator {

    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [131, 206, 178],
        mainColor: [131, 206, 178],
        textColor: [100, 102, 101],
        headerTextSize: 20,
        headerTextStyle: "normal"
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
            color: this.leftBackgroundColor,
            style: 'bold'
        });
    }
    blockDescriptionStyle() {
        return new TextStyle({
            style: 'bold',
            size: 10,
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
            ctx, title.text, {
                style: title.style,
                lineHeight: 0,
                marker: showTimeLine ? marker : null
            }
        ));
        ctx.advance(20);
        ctx.advance(this.writeTextPair(
            ctx, description.text, dates.text, {
                leftStyle: description.style,
                rightStyle: dates.style,
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
                    borderSize: 10,
                    borderColor: this.rightBackgroundColor,
                });
                left.advance(40);
                pdf.name(left, this.cvInfo.name, {
                    style:this.nameTextStyle().clone({color:this.rightBackgroundColor}),
                });
                pdf.drawLineBlock(left, {
                    color: this.rightBackgroundColor,
                    thickness: 3,
                });
                left.advance(10);
                pdf.title(left, this.cvInfo.title, {
                    style:this.titleTextStyle().clone({color:this.rightBackgroundColor}),
                });

                pdf.contactInfoBlock(left, {
                    headerColor: this.textColor,
                });
                pdf.introductionBlock(left, {
                    headerColor: this.textColor,
                    textColor: this.rightBackgroundColor,
                });
                pdf.skillListBlock(left, {
                    headerColor: this.textColor,
                    textColor: this.rightBackgroundColor,
                });
                pdf.referenceListBlock(left, {
                    headerColor: this.textColor,
                    textColor: this.rightBackgroundColor,
                });
                pdf.awardListBlock(left, {
                    headerColor: this.textColor,
                    textColor: this.rightBackgroundColor,
                });
                pdf.hobbyListBlock(left, {
                    headerColor: this.textColor,
                    textColor: this.rightBackgroundColor,
                });
                pdf.workExpListBlock(right, {
                    headerColor: this.textColor,
                });
                pdf.educationListBlock(right, {
                    headerColor: this.textColor,
                });
            }
        }));
    }
}