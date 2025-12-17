class Template9 extends PDFGenerator {

    constructor(cvInfo, options = {
        leftRatio: .4,
        rightRatio: .6,
        leftBackgroundColor: [242, 241, 248],
        mainColor: [117, 92, 189]
    }) {
        super(cvInfo, options);
    }

    async loadFonts() {
        await this.loadFont('assets/fonts/Lora-Regular.ttf', 'custom', 'normal');
        await this.loadFont('assets/fonts/Lora-Bold.ttf', 'custom', 'bold');
        await this.loadFont('assets/fonts/Lora-Italic.ttf', 'custom', 'italic');
        this.font = 'custom';
    }
    blockTitleStyle() {
        return new TextStyle({
            style: 'bold',
            color: this.textColor
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
            style: 'italic',
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
            ctx, dates.text, {
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
                    size: 90,
                    borderSize: 10,

                });
                left.advance(40);
                pdf.name(left, this.cvInfo.name, {
                    textColor: this.mainColor
                });
                pdf.title(left, this.cvInfo.title, {
                    textColor: this.mainColor
                });
                pdf.introductionBlock(left, {
                    headerColor: this.mainColor,
                    icon: this.introductionImage,
                });
                pdf.contactInfoBlock(left, {
                    headerColor: this.mainColor,
                    icon: this.contactImage,
                });
                pdf.skillsBlock(left, {
                    headerColor: this.mainColor,
                    icon: this.skillImage,
                });
                pdf.referencesBlock(left, {
                    headerColor: this.mainColor,
                    icon: this.referenceImage,
                });
                pdf.awardsBlock(left, {
                    headerColor: this.mainColor,
                    icon: this.awardImage,
                });
                pdf.hobbyBlock(left, {
                    headerColor: this.mainColor,
                    icon: this.hobbyImage,
                });
                pdf.workExpBlock(right, {
                    headerColor: this.mainColor,
                    icon: this.workExpImage,
                });
                pdf.educationBlock(right, {
                    headerColor: this.mainColor,
                    icon: this.educationImage,
                });
            }
        }));
    }
}