class Template3 extends PDFGenerator {

    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [246, 246, 246],
        mainColor: [95, 137, 191],
        textColor: [100, 102, 101]
    }) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Lora-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/Lora-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/Lora-Italic.ttf', 'custom', 'italic');
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
                    style: this.nameTextStyle().clone({
                        color: this.mainColor
                    }),
                });
                pdf.title(left, this.cvInfo.title, {});
                pdf.introductionBlock(left, {
                    headerColor: this.textColor,
                    icon: this.introductionImage,
                    underline: true,
                });
                pdf.contactInfoBlock(left, {
                    headerColor: this.textColor,
                    icon: this.contactImage,
                    underline: true,
                });
                pdf.skillListBlock(left, {
                    headerColor: this.textColor,
                    icon: this.skillImage,
                    underline: true,
                });
                pdf.referenceListBlock(left, {
                    headerColor: this.textColor,
                    icon: this.referenceImage,
                    underline: true,
                });
                pdf.awardListBlock(left, {
                    headerColor: this.textColor,
                    icon: this.awardImage,
                    underline: true,
                });
                pdf.hobbyListBlock(left, {
                    headerColor: this.textColor,
                    icon: this.hobbyImage,
                    underline: true,
                });
                pdf.workExpListBlock(right, {
                    headerColor: this.textColor,
                    icon: this.workExpImage,
                    underline: true,
                    showTimeLine: true,
                });
                pdf.educationListBlock(right, {
                    headerColor: this.textColor,
                    icon: this.educationImage,
                    underline: true,
                    showTimeLine: true
                });
            }
        }));
    }
}